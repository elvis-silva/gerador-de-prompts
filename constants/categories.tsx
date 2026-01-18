import Link from 'next/link';
import { Gavel, HeartPulse, Megaphone, PenTool, LayoutGrid } from 'lucide-react';

export const categories = [
  {
    title: "Jurídico",
    slug: "juridico",
    description: "Prompts para petições, resumos de casos e análise de contratos.",
    icon: <Gavel className="w-8 h-8 text-blue-600" />,
    color: "bg-blue-50"
  },
  {
    title: "Saúde",
    slug: "saude",
    description: "Explicações para pacientes e roteiros de anamnese otimizados.",
    icon: <HeartPulse className="w-8 h-8 text-red-600" />,
    color: "bg-red-50"
  },
  {
    title: "Marketing",
    slug: "marketing",
    description: "Copywriting de alta conversão e planejamento de conteúdo social.",
    icon: <Megaphone className="w-8 h-8 text-orange-600" />,
    color: "bg-orange-50"
  },
  {
    title: "Educação",
    slug: "educacao",
    description: "Planos de aula, questões de prova e resumos pedagógicos.",
    icon: <PenTool className="w-8 h-8 text-green-600" />,
    color: "bg-green-50"
  },
  {
    title: "Blog",
    slug: "blog",
    description: "Planos de aula, questões de prova e resumos pedagógicos.",
    icon: <PenTool className="w-8 h-8 text-green-600" />,
    color: "bg-blue-50"
  },
  {
    title: "Email",
    slug: "email",
    description: "Planos de aula, questões de prova e resumos pedagógicos.",
    icon: <PenTool className="w-8 h-8 text-green-600" />,
    color: "bg-red-50"
  },
  {
    title: "Social Media",
    slug: "social",
    description: "Planos de aula, questões de prova e resumos pedagógicos.",
    icon: <PenTool className="w-8 h-8 text-green-600" />,
    color: "bg-orange-50"
  },
  {
    title: "Influencer",
    slug: "influencer",
    description: "Planos de aula, questões de prova e resumos pedagógicos.",
    icon: <PenTool className="w-8 h-8 text-green-600" />,
    color: "bg-green-50"
  }
];
