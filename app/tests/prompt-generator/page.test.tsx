import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import PromptGenerator from '@/app/prompt-generator/PromptGenerator';

// Aumentamos o timeout para interações complexas se necessário
describe('Fluxo Completo do PromptGenerator', () => {
  
  it('deve iniciar exibindo o seletor de categorias e o título principal', () => {
    render(<PromptGenerator />);
    
    expect(screen.getByText(/Gerador de Prompts/i)).toBeInTheDocument();
    expect(screen.getByText(/Selecione sua área de atuação/i)).toBeInTheDocument();
    // Verifica se uma das categorias padrão está lá
    expect(screen.getByText('Marketing Digital')).toBeInTheDocument();
  });

  it('deve navegar para a seleção de opções ao clicar em uma categoria', async () => {
    const user = userEvent.setup();
    render(<PromptGenerator />);

    const categoryCard = screen.getByText('Marketing Digital');
    await user.click(categoryCard);

    // Deve sumir o seletor de categorias e aparecer o título da categoria selecionada
    expect(screen.queryByText(/Selecione sua área de atuação/i)).not.toBeInTheDocument();
    expect(screen.getByText('Marketing Digital')).toBeInTheDocument();
    expect(screen.getByText('objetivo')).toBeInTheDocument();
  });

  it('deve habilitar o botão de gerar apenas quando todas as opções forem selecionadas', async () => {
    const user = userEvent.setup();
    render(<PromptGenerator />);

    await user.click(screen.getByText('Marketing Digital'));
    
    const generateBtn = screen.getByRole('button', { name: /Gerar Prompt Personalizado/i });
    expect(generateBtn).toBeDisabled();

    // Selecionando todas as opções (4 para Marketing)
    await user.click(screen.getByText('Aumentar vendas'));
    await user.click(screen.getByText('Profissional'));
    await user.click(screen.getByText('Instagram'));
    await user.click(screen.getByText('Médio (100-300 palavras)'));

    expect(generateBtn).not.toBeDisabled();
  });

  it('deve gerar e exibir o prompt correto baseado nas seleções de Marketing', async () => {
    const user = userEvent.setup();
    render(<PromptGenerator />);

    // Fluxo até a geração
    await user.click(screen.getByText('Marketing Digital'));
    await user.click(screen.getByText('Aumentar vendas'));
    await user.click(screen.getByText('Profissional'));
    await user.click(screen.getByText('Instagram'));
    await user.click(screen.getByText('Médio (100-300 palavras)'));
    
    await user.click(screen.getByRole('button', { name: /Gerar Prompt Personalizado/i }));

    // Valida se o texto gerado contém as variáveis escolhidas
    expect(screen.getByText(/Seu Prompt Personalizado/i)).toBeInTheDocument();
    const promptContainer = screen.getByText(/🎯 Objetivo Principal: Aumentar vendas/i);
    expect(promptContainer).toBeInTheDocument();
    expect(promptContainer).toHaveTextContent('📱 Plataforma Alvo: Instagram');
  });

  it('deve resetar o estado ao clicar em "Gerar novo prompt" no final do fluxo', async () => {
    const user = userEvent.setup();
    render(<PromptGenerator />);

    // Chegar até o final
    await user.click(screen.getByText('Marketing Digital'));
    await user.click(screen.getByText('Aumentar vendas'));
    await user.click(screen.getByText('Profissional'));
    await user.click(screen.getByText('Instagram'));
    await user.click(screen.getByText('Médio (100-300 palavras)'));
    await user.click(screen.getByRole('button', { name: /Gerar Prompt Personalizado/i }));

    // Clicar em voltar
    const backBtn = screen.getByText(/Gerar novo prompt/i);
    await user.click(backBtn);

    // Deve voltar para a tela inicial (seleção de categorias)
    expect(screen.getByText(/Selecione sua área de atuação/i)).toBeInTheDocument();
  });
});