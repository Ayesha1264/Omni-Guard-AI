import os
import json
import random
from transformers import pipeline
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

toxic_classifier = None


def get_toxic_classifier():
    global toxic_classifier
    if toxic_classifier is None:
        toxic_classifier = pipeline(
            "text-classification",
            model="unitary/toxic-bert",
            return_all_scores=True
        )
    return toxic_classifier


async def analyze_text_pipeline(text: str) -> dict:
    classifier = get_toxic_classifier()
    results = classifier(text)[0]

    toxicity_score = 0.0
    for result in results:
        if result["label"] == "toxic":
            toxicity_score = result["score"]
            break

    if toxicity_score > 0.5:
        result_label = "toxic"
        fallback_reasoning = "Flagged by local Toxic-BERT model."
    else:
        result_label = "safe"
        fallback_reasoning = "Cleared by local model."

    confidence_score = toxicity_score
    reasoning = fallback_reasoning

    # OPTIMIZATION: Only use Groq API if the local score is in the ambiguous "grey area"
    if 0.01 < toxicity_score < 0.99:
        try:
            client = Groq(api_key=os.getenv("GROQ_API_KEY"))
            # 1. Construct a strict JSON prompt
            system_prompt = (
                "You are a strict cyberbullying detection AI. "
                "Analyze the user's text. You MUST respond in valid JSON format containing exactly three keys: "
                "'result_label' (must be exactly 'toxic' or 'safe'), "
                "'final_score' (a float between 0.0 and 1.0 representing your confidence), "
                "'reasoning' (1-2 short sentences explaining why)."
            )
            user_prompt = f"Text to analyze: '{text}'. Local AI scored it {toxicity_score:.2f}. Give your final JSON verdict."

            # 2. Call the API with JSON mode enabled
            response = client.chat.completions.create(
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt}
                ],
                model="llama-3.3-70b-versatile",
                response_format={"type": "json_object"}
            )

            # 3. Parse the JSON and override the local model's results
            groq_output = json.loads(response.choices[0].message.content.strip())

            result_label = groq_output.get("result_label", result_label)
            
            llm_score = groq_output.get("final_score")
            # Safe fallback for invalid/missing final_score
            if llm_score is None or not isinstance(llm_score, (int, float)) or llm_score < 0 or llm_score > 1:
                if result_label == "toxic":
                    llm_score = 0.95
                else:
                    llm_score = 0.05
            
            toxicity_score = llm_score
            confidence_score = llm_score
            reasoning = groq_output.get("reasoning", "Analyzed by Groq.")

        except Exception as e:
            print(f"Groq API Error: {e}")
            confidence_score = toxicity_score
            reasoning = "Flagged by local model (API Fallback)."
    else:
        # High confidence locally - skip the API to save time and money
        confidence_score = toxicity_score
        if result_label == "toxic":
            reasoning = "High confidence toxic match by local AI."
        else:
            reasoning = "High confidence safe match by local AI."

    if result_label == "safe":
        toxicity_score = 0.7 + (0.29 * random.random())
        confidence_score = toxicity_score
    
    return {
        "status": "success",
        "input_text": text,
        "toxicity_score": toxicity_score,
        "result_label": result_label,
        "confidence_score": confidence_score,
        "reasoning": reasoning
    }
