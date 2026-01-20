"use client";
import React, { useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import CategorySelector from '@/app/components/CategorySelector';
import OptionsSelector from '@/app/components/OptionsSelector';
import PromptDisplay from '@/app/components/PromptDisplay';

const categories:any = [
  {
    slug: 'marketing',
    title: 'Marketing Digital',
    icon: '📱',
    color: '#e3f2fd',
    options: {
      objetivo: ['Aumentar vendas', 'Gerar leads', 'Criar autoridade', 'Engajamento'],
      tom: ['Profissional', 'Casual', 'Inspirador', 'Urgente'],
      plataforma: ['Instagram', 'LinkedIn', 'Facebook', 'TikTok', 'Blog'],
      tamanho: ['Curto (até 100 palavras)', 'Médio (100-300 palavras)', 'Longo (300+ palavras)']
    }
  },
  {
    slug: 'redacao',
    title: 'Redação Criativa',
    icon: '✍️',
    color: '#f3e5f5',
    options: {
      tipo: ['Artigo de blog', 'E-mail marketing', 'Roteiro de vídeo', 'Post para redes sociais'],
      tom: ['Formal', 'Informal', 'Humorístico', 'Educativo'],
      publico: ['Jovens (18-25)', 'Adultos (26-45)', 'Empresários', 'Geral'],
      tamanho: ['Curto', 'Médio', 'Longo']
    }
  },
  {
    slug: 'negocios',
    title: 'Negócios',
    icon: '💼',
    color: '#e8f5e9',
    options: {
      tipo: ['Proposta comercial', 'Análise de mercado', 'Plano de negócios', 'Relatório'],
      setor: ['Tecnologia', 'Varejo', 'Serviços', 'Indústria', 'Saúde'],
      tom: ['Executivo', 'Técnico', 'Persuasivo', 'Analítico'],
      formato: ['Resumido', 'Detalhado', 'Apresentação']
    }
  },
  {
    slug: 'educacao',
    title: 'Educação',
    icon: '📚',
    color: '#fffde7',
    options: {
      tipo: ['Plano de aula', 'Material didático', 'Exercícios', 'Resumo'],
      nivel: ['Fundamental', 'Médio', 'Superior', 'Técnico'],
      materia: ['Matemática', 'Português', 'História', 'Ciências', 'Geral'],
      formato: ['Texto', 'Lista', 'Questões', 'Explicativo']
    }
  },
  {
    slug: 'saude-bemestar',
    title: 'Saúde e Bem-estar',
    icon: '🏥',
    color: '#e0f7fa',
    options: {
      tipo: ['Artigo sobre saúde', 'Dicas de fitness', 'Receitas saudáveis', 'Guia de bem-estar'],
      tom: ['Motivacional', 'Informativo', 'Prático', 'Científico'],
      publico: ['Atletas', 'Iniciantes', 'Idosos', 'Geral'],
      tamanho: ['Curto', 'Médio', 'Longo']
    }
  },
  {
    slug: 'financas',
    title: 'Finanças Pessoais',
    icon: '💰',
    color: '#f1f8e9',
    options: {
      tipo: ['Guia de investimentos', 'Dicas de economia', 'Análise financeira', 'Plano orçamentário'],
      tom: ['Acessível', 'Especialista', 'Motivacional', 'Cauteloso'],
      publico: ['Iniciantes', 'Investidores', 'Famílias', 'Empreendedores'],
      formato: ['Artigo', 'Infográfico', 'Vídeo script', 'E-book snippet']
    }
  },
  {
    slug: 'ecommerce',
    title: 'E-commerce',
    icon: '🛒',
    color: '#fff3e0',
    options: {
      tipo: ['Descrição de produto', 'Estratégia de vendas', 'Análise de mercado', 'Campanha de e-mail'],
      setor: ['Moda', 'Eletrônicos', 'Beleza', 'Alimentos', 'Geral'],
      tom: ['Persuasivo', 'Descriptivo', 'Urgente', 'Informativo'],
      tamanho: ['Curto', 'Médio', 'Longo']
    }
  },
  {
    slug: 'desenvolvimento-pessoal',
    title: 'Desenvolvimento Pessoal',
    icon: '🌟',
    color: '#f3e5f5',
    options: {
      tipo: ['Dicas de produtividade', 'Histórias motivacionais', 'Guias de hábitos', 'Exercícios mentais'],
      tom: ['Inspirador', 'Prático', 'Reflexivo', 'Energético'],
      publico: ['Estudantes', 'Profissionais', 'Empreendedores', 'Geral'],
      formato: ['Artigo', 'Podcast script', 'Post social', 'Livro capítulo']
    }
  },
  {
    slug: 'tecnologia',
    title: 'Tecnologia e IA',
    icon: '🤖',
    color: '#e8eaf6',
    options: {
      tipo: ['Review de ferramenta', 'Tutorial de IA', 'Análise de tendências', 'Guia de implementação'],
      tom: ['Técnico', 'Acessível', 'Entusiástico', 'Crítico'],
      publico: ['Desenvolvedores', 'Usuários casuais', 'Empresas', 'Estudantes'],
      tamanho: ['Curto', 'Médio', 'Longo']
    }
  },
  {
    slug: 'imobiliario',
    title: 'Imobiliário',
    icon: '🏠',
    color: '#e0f2f1',
    options: {
      tipo: ['Descrição de propriedade', 'Guia de compra', 'Análise de mercado', 'Dicas de decoração'],
      tom: ['Profissional', 'Atraente', 'Informativo', 'Persuasivo'],
      publico: ['Compradores', 'Vendedores', 'Investidores', 'Locatários'],
      formato: ['Anúncio', 'Artigo', 'Vídeo script', 'Relatório']
    }
  },
  {
    slug: 'viagens',
    title: 'Viagens e Turismo',
    icon: '✈️',
    color: '#e1f5fe',
    options: {
      tipo: ['Guia de destino', 'Dicas de viagem', 'Relato de experiência', 'Planejamento de roteiro'],
      tom: ['Aventuroso', 'Relaxante', 'Cultural', 'Econômico'],
      publico: ['Famílias', 'Casais', 'Solo', 'Grupos'],
      tamanho: ['Curto', 'Médio', 'Longo']
    }
  },
  {
    slug: 'culinaria',
    title: 'Culinária e Gastronomia',
    icon: '🍳',
    color: '#fffde7',
    options: {
      tipo: ['Receita', 'Review de restaurante', 'Guia de ingredientes', 'História culinária'],
      tom: ['Gourmet', 'Caseiro', 'Saudável', 'Exótico'],
      publico: ['Iniciantes', 'Chefs', 'Vegetarianos', 'Geral'],
      formato: ['Passo a passo', 'Artigo', 'Vídeo script', 'Lista']
    }
  },
  {
    slug: 'sustentabilidade',
    title: 'Sustentabilidade e Meio Ambiente',
    icon: '🌍',
    color: '#e8f5e9',
    options: {
      tipo: ['Artigo ambiental', 'Dicas ecológicas', 'Análise de impacto', 'Guia sustentável'],
      tom: ['Urgente', 'Informativo', 'Otimista', 'Crítico'],
      publico: ['Ativistas', 'Empresas', 'Consumidores', 'Estudantes'],
      tamanho: ['Curto', 'Médio', 'Longo']
    }
  },
  {
    slug: 'entretenimento',
    title: 'Entretenimento e Cultura Pop',
    icon: '🎬',
    color: '#f3e5f5',
    options: {
      tipo: ['Review de filme/série', 'Análise de música', 'Notícias de celebridades', 'Guia de eventos'],
      tom: ['Crítico', 'Entusiástico', 'Humorístico', 'Analítico'],
      publico: ['Fãs', 'Críticos', 'Geral', 'Jovens'],
      formato: ['Artigo', 'Podcast script', 'Post social', 'Lista']
    }
  },
];

const PromptGenerator = () => {
  const [selectedCategory, setSelectedCategory] = useState<typeof categories[0] | null>(null);
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [generatedPrompt, setGeneratedPrompt] = useState('');

  const handleCategorySelect = (category: typeof categories[0]) => {
    setSelectedCategory(category);
    setSelections({});
    setGeneratedPrompt('');
  };

  const handleOptionSelect = (optionKey: string, value: string) => {
    setSelections((prev) => ({
      ...prev,
      [optionKey]: value,
    }));
  };

  const generatePrompt = () => {
    if (!selectedCategory) return;

    const vars = selections;
    let prompt = '';

    switch (selectedCategory.slug) {
      case 'marketing':
        prompt = `Desenvolva um conteúdo estratégico de marketing digital alinhado às melhores práticas do setor, incorporando análise de dados e otimização SEO/SEM:

🎯 Objetivo Principal: ${vars.objetivo || '[não especificado]'}
🗣️ Tom de Voz: ${vars.tom || '[não especificado]'}
📱 Plataforma Alvo: ${vars.plataforma || '[não especificado]'}
📏 Extensão Aproximada: ${vars.tamanho || '[não especificado]'}

Diretrizes Avançadas:
- Empregue uma linguagem ${vars.tom?.toLowerCase() || 'profissional'} que ressoe emocionalmente com o público-alvo, utilizando técnicas de neuromarketing.
- Otimize para algoritmos da ${vars.plataforma || 'plataforma escolhida'}, incluindo palavras-chave de cauda longa e elementos multimídia.
- Foque em métricas de desempenho para ${vars.objetivo?.toLowerCase() || 'o objetivo definido'}, como taxa de conversão, ROI e engajamento.
- Integre calls-to-action (CTAs) persuasivos baseados em princípios de psicologia comportamental (e.g., escassez, prova social).
- Sugira hashtags otimizadas, elementos visuais A/B testáveis e integrações com ferramentas de automação como Google Analytics ou HubSpot.
- Incorpore storytelling avançado com arco narrativo para maximizar retenção e compartilhamento.`;
        break;

      case 'redacao':
        prompt = `Componha uma peça de redação criativa de alto calibre, empregando técnicas literárias avançadas e princípios de narrativa profissional:

📝 Tipo de Conteúdo: ${vars.tipo || '[não especificado]'}
🎭 Tom Predominante: ${vars.tom || '[não especificado]'}
👥 Público-Alvo: ${vars.publico || '[não especificado]'}
📏 Extensão: ${vars.tamanho || '[não especificado]'}

Protocolos Profissionais:
- Adapte a linguagem e o vocabulário ao perfil demográfico e psicográfico de ${vars.publico || 'o público especificado'}, considerando níveis de leitura Flesch-Kincaid.
- Sustente um tom ${vars.tom?.toLowerCase() || 'consistente'} através de dispositivos retóricos como aliteração, metáforas e ironia.
- Estruture com uma introdução que capture atenção imediata (hook), corpo com desenvolvimento progressivo e conclusão que ressoe emocionalmente.
- Integre elementos de SEO se aplicável, como headings e bullet points para legibilidade.
- Empregue técnicas de edição profissional, garantindo fluxo, coesão e ausência de redundâncias.
- Sugira variações para A/B testing em plataformas digitais.`;
        break;

      case 'negocios':
        prompt = `Elabore um documento de negócios executivo, fundamentado em frameworks estratégicos como SWOT, Porter's Five Forces ou Balanced Scorecard:

📊 Tipo de Documento: ${vars.tipo || '[não especificado]'}
🏢 Setor Específico: ${vars.setor || '[não especificado]'}
🗣️ Tom: ${vars.tom || '[não especificado]'}
📑 Formato: ${vars.formato || '[não especificado]'}

Requisitos Estratégicos:
- Adote uma linguagem ${vars.tom?.toLowerCase() || 'executiva'} precisa, com jargão setorial apropriado e dados quantitativos.
- Incorpore análises específicas do setor de ${vars.setor || '[setor]'}, incluindo tendências de mercado, benchmarks competitivos e projeções financeiras.
- Apresente insights acionáveis suportados por dados, gráficos e modelos econômicos.
- Estruture em formato ${vars.formato?.toLowerCase() || 'profissional'}, com seções claras, sumário executivo e apêndices.
- Inclua KPIs mensuráveis, riscos mitigados e recomendações baseadas em cenários (best/worst case).
- Integre ferramentas como Excel para modelagem ou PowerPoint para visualizações.`;
        break;

      case 'educacao':
        prompt = `Desenvolva material educacional pedagógico avançado, alinhado a frameworks como Bloom's Taxonomy ou Universal Design for Learning (UDL):

📚 Tipo de Material: ${vars.tipo || '[não especificado]'}
🎓 Nível Educacional: ${vars.nivel || '[não especificado]'}
📖 Disciplina: ${vars.materia || '[não especificado]'}
📄 Formato: ${vars.formato || '[não especificado]'}

Orientações Pedagógicas:
- Ajuste a complexidade cognitiva ao ${vars.nivel || 'nível definido'}, promovendo do conhecimento básico à síntese e avaliação.
- Integre exemplos multidisciplinares, estudos de caso reais e atividades interativas para engajamento.
- Empregue linguagem didática clara, com glossários, diagramas e analogias para acessibilidade.
- Estruture em ${vars.formato?.toLowerCase() || 'formato otimizado'}, incluindo objetivos de aprendizado, conteúdo principal e avaliações formativas.
- Adicione elementos gamificados ou multimídia para facilitar retenção e aplicação prática.
- Inclua rubricas de avaliação e adaptações para necessidades especiais.`;
        break;

      case 'saude-bemestar':
        prompt = `Crie conteúdo especializado em saúde e bem-estar, baseado em evidências científicas e diretrizes de organizações como WHO ou ACSM:

🏥 Tipo de Conteúdo: ${vars.tipo || '[não especificado]'}
🗣️ Tom: ${vars.tom || '[não especificado]'}
👥 Público-Alvo: ${vars.publico || '[não especificado]'}
📏 Tamanho: ${vars.tamanho || '[não especificado]'}

Instruções Profissionais:
- Utilize um tom ${vars.tom?.toLowerCase() || 'motivacional'} apoiado por referências médicas peer-reviewed e meta-análises.
- Foque em intervenções holísticas, integrando aspectos físicos, mentais e nutricionais com protocolos baseados em evidências.
- Inclua dicas acionáveis, protocolos de segurança, contraindicações e monitoramento de progresso via métricas como BMI ou VO2 max.
- Adapte ao perfil de ${vars.publico || 'o público'}, considerando fatores etários, condições pré-existentes e barreiras socioeconômicas.
- Sugira integrações com apps de tracking (e.g., MyFitnessPal) e recursos adicionais como estudos clínicos ou webinars.
- Enfatize prevenção, sustentabilidade e abordagens personalizadas via IA.`;
        break;

      case 'financas':
        prompt = `Elabore conteúdo avançado em finanças pessoais, utilizando modelos econômicos como CAPM ou princípios de behavioral finance:

💰 Tipo de Conteúdo: ${vars.tipo || '[não especificado]'}
🗣️ Tom: ${vars.tom || '[não especificado]'}
👥 Público-Alvo: ${vars.publico || '[não especificado]'}
📑 Formato: ${vars.formato || '[não especificado]'}

Requisitos Especializados:
- Adote um tom ${vars.tom?.toLowerCase() || 'especialista'} com análises quantitativas, fórmulas e simulações de cenários.
- Inclua exemplos com cálculos detalhados, diversificação de portfólio e estratégias de mitigação de riscos (e.g., hedging).
- Foque em táticas práticas alinhadas a regulamentações fiscais e tendências macroeconômicas.
- Personalize para ${vars.publico || 'o público'}, abordando ciclos de vida financeira e vieses cognitivos.
- Inclua alertas sobre volatilidade de mercado, diversificação e ferramentas como Excel para modelagem financeira.
- Integre insights de finanças comportamentais para decisões informadas.`;
        break;

      case 'ecommerce':
        prompt = `Gere conteúdo otimizado para e-commerce, incorporando estratégias de conversão como AIDA e análise de funil de vendas:

🛒 Tipo de Conteúdo: ${vars.tipo || '[não especificado]'}
🏢 Setor: ${vars.setor || '[não especificado]'}
🗣️ Tom: ${vars.tom || '[não especificado]'}
📏 Tamanho: ${vars.tamanho || '[não especificado]'}

Diretrizes Estratégicas:
- Empregue um tom ${vars.tom?.toLowerCase() || 'persuasivo'} com copywriting avançado, focando em benefícios únicos de venda (USPs).
- Destaque features, depoimentos de clientes e comparações competitivas para o setor de ${vars.setor || '[setor]'}.

- Integre CTAs otimizados para conversão, com urgência e escassez.
- Otimize para SEO e-commerce, incluindo schema markup e palavras-chave de intenção de compra.
- Sugira elementos visuais como 360° views, vídeos de unboxing e integrações com plataformas como Shopify ou Google Shopping.`;
        break;

      case 'desenvolvimento-pessoal':
        prompt = `Crie conteúdo transformador de desenvolvimento pessoal, baseado em frameworks como GROW ou teorias de Maslow:

🌟 Tipo de Conteúdo: ${vars.tipo || '[não especificado]'}
🗣️ Tom: ${vars.tom || '[não especificado]'}
👥 Público-Alvo: ${vars.publico || '[não especificado]'}
📑 Formato: ${vars.formato || '[não especificado]'}

Orientações Avançadas:
- Mantenha um tom ${vars.tom?.toLowerCase() || 'inspirador'} com exercícios reflexivos e metas SMART.
- Inclua narrativas baseadas em psicologia positiva, resiliência e growth mindset.
- Use histórias reais ou case studies para ilustrar transformações.
- Adapte para ${vars.publico || 'o público'}, considerando estágios de carreira ou vida.
- Termine com planos acionáveis, trackers de progresso e recursos como livros de autoajuda ou apps de mindfulness.`;
        break;

      case 'tecnologia':
        prompt = `Desenvolva conteúdo técnico sobre tecnologia e IA, alinhado a standards como IEEE ou frameworks ágeis:

🤖 Tipo de Conteúdo: ${vars.tipo || '[não especificado]'}
🗣️ Tom: ${vars.tom || '[não especificado]'}
👥 Público-Alvo: ${vars.publico || '[não especificado]'}
📏 Tamanho: ${vars.tamanho || '[não especificado]'}

Instruções Especializadas:
- Use um tom ${vars.tom?.toLowerCase() || 'técnico'} com terminologia precisa, diagramas UML e exemplos de código.
- Explique conceitos avançados como machine learning pipelines ou ética em IA de forma escalonada.
- Inclua tutoriais hands-on com dependências e troubleshooting.
- Foque no público de ${vars.publico || '[público]'}, de iniciantes a experts.
- Sugira ferramentas open-source, repositórios GitHub e tendências como edge computing.`;
        break;

      case 'imobiliario':
        prompt = `Elabore conteúdo imobiliário profissional, utilizando análises como comparables (comps) e projeções de ROI:

🏠 Tipo de Conteúdo: ${vars.tipo || '[não especificado]'}
🗣️ Tom: ${vars.tom || '[não especificado]'}
👥 Público-Alvo: ${vars.publico || '[não especificado]'}
📑 Formato: ${vars.formato || '[não especificado]'}

Requisitos Setoriais:
- Adote um tom ${vars.tom?.toLowerCase() || 'profissional'} com dados de mercado, avaliações e tendências urbanas.
- Destaque features como sustentabilidade, localização GIS e valor de revenda.
- Inclua guias com checklists, cálculos financeiros e riscos legais.
- Personalize para ${vars.publico || 'o público'}, abordando necessidades específicas.
- Sugira visuais como tours virtuais 3D, mapas interativos e integrações com MLS.`;
        break;

      case 'viagens':
        prompt = `Crie conteúdo imersivo sobre viagens e turismo, incorporando princípios de experiência do usuário e sustentabilidade:

✈️ Tipo de Conteúdo: ${vars.tipo || '[não especificado]'}
🗣️ Tom: ${vars.tom || '[não especificado]'}
👥 Público-Alvo: ${vars.publico || '[não especificado]'}
📏 Tamanho: ${vars.tamanho || '[não especificado]'}

Diretrizes Profissionais:
- Use um tom ${vars.tom?.toLowerCase() || 'aventuroso'} com descrições sensoriais e itinerários otimizados.
- Integre dicas práticas, orçamentos detalhados e considerações culturais/éticas.
- Foque em experiências autênticas, evitando overtourism.
- Adapte para ${vars.publico || 'o público'}, incluindo acessibilidade e preferências.
- Sugira apps de viagem, mapas personalizados e conteúdo multimídia como vlogs.`;
        break;

      case 'culinaria':
        prompt = `Desenvolva conteúdo gastronômico sofisticado, baseado em técnicas culinárias profissionais e ciência alimentar:

🍳 Tipo de Conteúdo: ${vars.tipo || '[não especificado]'}
🗣️ Tom: ${vars.tom || '[não especificado]'}
👥 Público-Alvo: ${vars.publico || '[não especificado]'}
📑 Formato: ${vars.formato || '[não especificado]'}

Instruções Especializadas:
- Empregue um tom ${vars.tom?.toLowerCase() || 'gourmet'} com receitas precisas, pairings e variações.
- Inclua ciência por trás dos ingredientes, nutrição e técnicas como sous-vide.
- Foque em sustentabilidade, sazonalidade e adaptações dietéticas.
- Personalize para ${vars.publico || 'o público'}, de novatos a experts.
- Sugira plating visuals, vídeos tutoriais e integrações com apps de receitas.`;
        break;

      case 'sustentabilidade':
        prompt = `Gere conteúdo aprofundado sobre sustentabilidade, alinhado a frameworks como UN SDGs ou circular economy:

🌍 Tipo de Conteúdo: ${vars.tipo || '[não especificado]'}
🗣️ Tom: ${vars.tom || '[não especificado]'}
👥 Público-Alvo: ${vars.publico || '[não especificado]'}
📏 Tamanho: ${vars.tamanho || '[não especificado]'}

Orientações Estratégicas:
- Use um tom ${vars.tom?.toLowerCase() || 'urgente'} com dados científicos, case studies e métricas de impacto (e.g., carbon footprint).
- Integre soluções inovadoras, políticas e ações individuais/empresariais.
- Foque em interseccionalidade, como justiça ambiental e economia verde.
- Adapte para ${vars.publico || 'o público'}, promovendo engajamento.
- Sugira infográficos, calculadoras de impacto e recursos como relatórios IPCC.`;
        break;

      case 'entretenimento':
        prompt = `Crie conteúdo cultural pop analítico, utilizando teorias de mídia e análise crítica:

🎬 Tipo de Conteúdo: ${vars.tipo || '[não especificado]'}
🗣️ Tom: ${vars.tom || '[não especificado]'}
👥 Público-Alvo: ${vars.publico || '[não especificado]'}
📑 Formato: ${vars.formato || '[não especificado]'}

Diretrizes Profissionais:
- Adote um tom ${vars.tom?.toLowerCase() || 'crítico'} com spoilers alertados, temas subjacentes e referências intertextuais.
- Inclua análises de narrativa, personagens e impacto sociocultural.
- Foque em tendências, easter eggs e comparações com obras semelhantes.
- Personalize para ${vars.publico || 'o público'}, incentivando discussões.
- Sugira trailers embeds, playlists e integrações com IMDB ou Spotify.`;
        break;

      default:
        prompt = 'Selecione uma categoria e preencha as opções para gerar seu prompt personalizado.';
    }

    setGeneratedPrompt(prompt);
  };

  const allOptionsSelected =
    !!selectedCategory && Object.keys(selectedCategory.options).every((key) => selections[key]);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.100' }}>
      <Box py={6} px={2} textAlign="center" bgcolor="common.white" borderBottom={1} borderColor="divider">
        <Typography variant="h3" fontWeight="bold" color="text.primary">
          Gerador de Prompts <span style={{ color: '#1976d2' }}>Especializados</span>
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" maxWidth="md" mx="auto">
          Pare de lutar com a IA. Escolha seu nicho e gere comandos estruturados que entregam resultados profissionais.
        </Typography>
      </Box>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {!selectedCategory && (
          <Box>
            <Typography variant="h5" fontWeight="bold" color="text.primary" mb={3}>
              Selecione sua área de atuação
            </Typography>
            <CategorySelector categories={categories} onSelect={handleCategorySelect} />
          </Box>
        )}
        {selectedCategory && !generatedPrompt && (
          <OptionsSelector
            category={selectedCategory}
            selections={selections}
            onSelect={handleOptionSelect}
            onGenerate={generatePrompt}
            onBack={() => setSelectedCategory(null)}
            allSelected={allOptionsSelected}
          />
        )}
        {generatedPrompt && (
          <PromptDisplay
            generatedPrompt={generatedPrompt}
            onBack={() => {
              setGeneratedPrompt('');
              setSelections({});
            }}
          />
        )}
      </Container>
    </Box>
  );
};

export default PromptGenerator;