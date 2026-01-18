import React from 'react';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import PromptDisplay from '@/app/components/PromptDisplay';

// Mock da API de Clipboard (necessário pois o JSDOM não a possui por padrão)
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn().mockImplementation(() => Promise.resolve()),
  },
});

describe('PromptDisplay Component', () => {
  const mockOnBack = jest.fn();
  const testPrompt = "Este é um prompt de teste gerado pela IA.";

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers(); // Habilita timers falsos para testar o timeout do botão
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('deve exibir o prompt gerado corretamente', () => {
    render(<PromptDisplay generatedPrompt={testPrompt} onBack={mockOnBack} />);
    
    expect(screen.getByText(testPrompt)).toBeInTheDocument();
  });

  it('deve chamar onBack ao clicar no botão de voltar', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<PromptDisplay generatedPrompt={testPrompt} onBack={mockOnBack} />);
    
    const backBtn = screen.getByRole('button', { name: /Gerar novo prompt/i });
    await user.click(backBtn);
    
    expect(mockOnBack).toHaveBeenCalledTimes(1);
  });

  it('deve copiar o texto para o clipboard e mostrar feedback visual', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<PromptDisplay generatedPrompt={testPrompt} onBack={mockOnBack} />);
    
    const copyBtn = screen.getByRole('button', { name: /Copiar/i });
    
    await user.click(copyBtn);

    // Verifica se a API do navegador foi chamada
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(testPrompt);
    
    // Verifica se o texto do botão mudou
    expect(screen.getByText('Copiado!')).toBeInTheDocument();
  });

  it('deve resetar o texto do botão para "Copiar" após 2 segundos', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<PromptDisplay generatedPrompt={testPrompt} onBack={mockOnBack} />);
    
    const copyBtn = screen.getByRole('button', { name: /Copiar/i });
    await user.click(copyBtn);
    
    expect(screen.getByText('Copiado!')).toBeInTheDocument();

    // Avança o tempo em 2000ms
    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(screen.getByText('Copiar')).toBeInTheDocument();
  });
});