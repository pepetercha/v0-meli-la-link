'use client';

import { Button } from '@/components/ui/button';
import { Facebook, Instagram, ShoppingCart, Github, Linkedin, Mail } from 'lucide-react';

const socialLinks = [
  {
    name: 'Facebook',
    icon: Facebook,
    url: 'https://facebook.com/valdocer',
    color: 'hover:text-blue-500',
    bgColor: 'hover:bg-blue-500/10',
  },
  {
    name: 'Instagram',
    icon: Instagram,
    url: 'https://instagram.com/valdocer',
    color: 'hover:text-pink-500',
    bgColor: 'hover:bg-pink-500/10',
  },
  {
    name: 'Mercado Libre',
    icon: ShoppingCart,
    url: 'https://mercadolibre.com/u/valdocer',
    color: 'hover:text-yellow-500',
    bgColor: 'hover:bg-yellow-500/10',
  },
  {
    name: 'GitHub',
    icon: Github,
    url: 'https://github.com/valdocer',
    color: 'hover:text-slate-300',
    bgColor: 'hover:bg-slate-300/10',
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    url: 'https://linkedin.com/in/valdocer',
    color: 'hover:text-blue-600',
    bgColor: 'hover:bg-blue-600/10',
  },
  {
    name: 'Email',
    icon: Mail,
    url: 'mailto:valdocer@example.com',
    color: 'hover:text-red-500',
    bgColor: 'hover:bg-red-500/10',
  },
];

export function SocialLinks() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {socialLinks.map((link) => {
        const Icon = link.icon;
        return (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex flex-col items-center justify-center p-4 rounded-lg border border-slate-600 bg-slate-700/30 transition-all duration-200 ${link.bgColor} ${link.color}`}
          >
            <Icon className="w-6 h-6 mb-2" />
            <span className="text-sm font-medium text-center">{link.name}</span>
          </a>
        );
      })}
    </div>
  );
}