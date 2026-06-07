import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Twitter, Github, Linkedin, MessageSquare } from 'lucide-react';
import { cn } from '../lib/utils';

interface FooterProps {
  isDark: boolean;
}

const Footer: React.FC<FooterProps> = ({ isDark }) => {
  const socialLinks = [
    { icon: Twitter, href: '#' },
    { icon: Github, href: '#' },
    { icon: Linkedin, href: '#' },
    { icon: MessageSquare, href: '#' },
  ];

  const productLinks = ['Features', 'Pricing', 'API Docs', 'Changelog'];
  const companyLinks = ['About Us', 'Impact', 'Careers', 'Blog'];
  const legalLinks = ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Contact Us'];

  return (
    <footer className={cn(
      'border-t pt-20 pb-8',
      isDark ? 'border-slate-800' : 'border-slate-200'
    )}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-black tracking-tight">
                Omni <span className="gradient-text">Guard AI</span>
              </span>
            </Link>
            <p className={cn(
              'leading-relaxed mb-8 max-w-sm',
              isDark ? 'text-slate-400' : 'text-slate-600'
            )}>
              Advanced AI-powered cyberbullying detection for a safer digital world. Protecting users from harmful content across text, images, and videos.
            </p>
            <div className="flex gap-4">
              {socialLinks.map(({ icon: Icon, href }, index) => (
                <a
                  key={index}
                  href={href}
                  className={cn(
                    'w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300',
                    isDark 
                      ? 'bg-card hover:bg-gradient-to-br hover:from-primary/20 hover:to-secondary/20' 
                      : 'bg-slate-100 hover:bg-gradient-to-br hover:from-primary/10 hover:to-secondary/10'
                  )}
                >
                  <Icon className={cn('w-5 h-5', isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900')} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Product</h4>
            <ul className="space-y-4">
              {productLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to="/features"
                    className={cn(
                      'block transition-colors duration-200',
                      isDark ? 'text-slate-400 hover:text-primary' : 'text-slate-600 hover:text-primary'
                    )}
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Company</h4>
            <ul className="space-y-4">
              {companyLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link === 'About Us' ? '/mission' : '/impact'}
                    className={cn(
                      'block transition-colors duration-200',
                      isDark ? 'text-slate-400 hover:text-primary' : 'text-slate-600 hover:text-primary'
                    )}
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Legal</h4>
            <ul className="space-y-4">
              {legalLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className={cn(
                      'block transition-colors duration-200',
                      isDark ? 'text-slate-400 hover:text-primary' : 'text-slate-600 hover:text-primary'
                    )}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="stylish-line mb-8" />

        <div className={cn(
          'text-center text-sm',
          isDark ? 'text-slate-500' : 'text-slate-500'
        )}>
          <p>&copy; 2026 Omni Guard AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
