"use client";
import React, { useState, useEffect, use } from 'react';
import { nicheData } from '@/constants/nicheData';
import { Copy, ArrowLeft, CheckCircle } from 'lucide-react';
import Link from 'next/link';

interface DynamicNichePageProps {
  params: Promise<{ nicho: string }>;
}

const TONE_OPTIONS = ['Profissional', 'Casual', 'Técnico', 'Criativo'];
const COPY_SUCCESS_DURATION = 2000;

export default function DynamicNichePage({ params }: DynamicNichePageProps) {
  const { nicho } = use(params);
  const currentNiche = nicheData[nicho];

  const [role, setRole] = useState('');
  const [task, setTask] = useState('');
  const [tone, setTone] = useState('Profissional');
  const [context, setContext] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (currentNiche) {
      setRole(currentNiche.roles[0]);
      setTask(currentNiche.tasks[0]);
    }
  }, [currentNiche]);

  if (!currentNiche) {
    return (
      <div className="p-20 text-center">
        <p className="text-gray-600 mb-4">Nicho não encontrado.</p>
        <Link href="/" className="text-blue-600 underline hover:text-blue-700">
          Voltar para Home
        </Link>
      </div>
    );
  }

  const generatedPrompt = `Atue como um ${role}. Sua tarefa principal é: ${task}. 
Considere o seguinte contexto adicional: "${context || 'Não fornecido'}".
O tom de voz deve ser ${tone}. Responda de forma estruturada e profissional.`;

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), COPY_SUCCESS_DURATION);
    } catch (error) {
      console.error('Erro ao copiar:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <Header />
        <NicheTitle title={currentNiche.title} description={currentNiche.description} />
        
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
          <FormSection
            role={role}
            task={task}
            tone={tone}
            context={context}
            roles={currentNiche.roles}
            tasks={currentNiche.tasks}
            onRoleChange={setRole}
            onTaskChange={setTask}
            onToneChange={setTone}
            onContextChange={setContext}
          />
          
          <ResultSection
            prompt={generatedPrompt}
            copied={copied}
            onCopy={handleCopyToClipboard}
          />
        </div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <Link 
      href="/" 
      className="flex items-center text-gray-500 hover:text-gray-800 mb-6 transition"
    >
      <ArrowLeft size={20} className="mr-2" />
      Voltar para Home
    </Link>
  );
}

interface NicheTitleProps {
  title: string;
  description: string;
}

function NicheTitle({ title, description }: NicheTitleProps) {
  return (
    <>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Gerador de Prompt para <span className="text-blue-600">{title}</span>
      </h1>
      <p className="text-gray-600 mb-8">{description}</p>
    </>
  );
}

interface FormSectionProps {
  role: string;
  task: string;
  tone: string;
  context: string;
  roles: string[];
  tasks: string[];
  onRoleChange: (value: string) => void;
  onTaskChange: (value: string) => void;
  onToneChange: (value: string) => void;
  onContextChange: (value: string) => void;
}

function FormSection({
  role,
  task,
  tone,
  context,
  roles,
  tasks,
  onRoleChange,
  onTaskChange,
  onToneChange,
  onContextChange,
}: FormSectionProps) {
  const selectClassName = "w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none";
  
  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
      <SelectField
        label="Seu Papel:"
        value={role}
        options={roles}
        onChange={onRoleChange}
        className={selectClassName}
      />

      <SelectField
        label="O que você quer fazer?"
        value={task}
        options={tasks}
        onChange={onTaskChange}
        className={selectClassName}
      />

      <div className="md:col-span-2">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Contexto ou Detalhes (Opcional):
        </label>
        <textarea
          value={context}
          onChange={(e) => onContextChange(e.target.value)}
          placeholder="Ex: O cliente é uma empresa de tecnologia focada em sustentabilidade..."
          className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none h-32 resize-none"
        />
      </div>
    </div>
  );
}

interface SelectFieldProps {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  className?: string;
}

function SelectField({ label, value, options, onChange, className }: SelectFieldProps) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={className}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

interface ResultSectionProps {
  prompt: string;
  copied: boolean;
  onCopy: () => void;
}

function ResultSection({ prompt, copied, onCopy }: ResultSectionProps) {
  return (
    <div className="bg-gray-900 p-8">
      <div className="flex justify-between items-center mb-4">
        <span className="text-gray-400 text-sm font-mono uppercase tracking-widest">
          Prompt Gerado
        </span>
        <button
          onClick={onCopy}
          className={`flex items-center gap-2 px-6 py-2 rounded-full font-bold transition ${
            copied
              ? 'bg-green-500 text-white'
              : 'bg-white text-gray-900 hover:bg-blue-50'
          }`}
          aria-label={copied ? 'Prompt copiado' : 'Copiar prompt'}
        >
          {copied ? <CheckCircle size={18} /> : <Copy size={18} />}
          {copied ? 'Copiado!' : 'Copiar'}
        </button>
      </div>
      <p className="text-gray-100 font-mono text-sm leading-relaxed whitespace-pre-line">
        {prompt}
      </p>
    </div>
  );
}