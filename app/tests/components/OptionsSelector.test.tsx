import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import OptionsSelector from '@/app/components/OptionsSelector';

// Mock dos dados de entrada
const mockCategory = {
  title: 'Arquitetura',
  icon: '🏛️',
  options: {
    estilo: ['Moderno', 'Clássico'],
    ambiente: ['Interno', 'Externo'],
  },
};

const mockSelections = {
  estilo: 'Moderno',
};

describe('OptionsSelector Component', () => {
  const mockOnSelect = jest.fn();
  const mockOnGenerate = jest.fn();
  const mockOnBack = jest.fn();

  // Helper para renderizar o componente com props padrão
  const renderComponent = (allSelected = false, selections = mockSelections) => {
    return render(
      <OptionsSelector
        category={mockCategory}
        selections={selections}
        onSelect={mockOnSelect}
        onGenerate={mockOnGenerate}
        onBack={mockOnBack}
        allSelected={allSelected}
      />
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve exibir o título e o ícone da categoria corretamente', () => {
    renderComponent();
    expect(screen.getByText('Arquitetura')).toBeInTheDocument();
    expect(screen.getByText('🏛️')).toBeInTheDocument();
  });

  it('deve renderizar todos os grupos de opções e seus respectivos botões', () => {
    renderComponent();
    expect(screen.getByText('estilo')).toBeInTheDocument();
    expect(screen.getByText('Moderno')).toBeInTheDocument();
    expect(screen.getByText('Clássico')).toBeInTheDocument();
    expect(screen.getByText('ambiente')).toBeInTheDocument();
  });

  it('deve destacar a opção selecionada com a variante "contained"', () => {
    renderComponent();
    const selectedBtn = screen.getByRole('button', { name: /Moderno/i });
    const unselectedBtn = screen.getByRole('button', { name: /Clássico/i });

    // No MUI, variant="contained" geralmente adiciona a classe MuiButton-contained
    expect(selectedBtn).toHaveClass('MuiButton-contained');
    expect(unselectedBtn).toHaveClass('MuiButton-outlined');
  });

  it('deve chamar onSelect com a chave e o valor corretos ao clicar em uma opção', async () => {
    const user = userEvent.setup();
    renderComponent();
    
    await user.click(screen.getByText('Externo'));
    
    expect(mockOnSelect).toHaveBeenCalledWith('ambiente', 'Externo');
  });

  it('deve desabilitar o botão "Gerar Prompt" quando allSelected for false', () => {
    renderComponent(false);
    const generateBtn = screen.getByRole('button', { name: /Gerar Prompt Personalizado/i });
    expect(generateBtn).toBeDisabled();
  });

  it('deve habilitar e chamar onGenerate quando allSelected for true', async () => {
    const user = userEvent.setup();
    renderComponent(true);
    
    const generateBtn = screen.getByRole('button', { name: /Gerar Prompt Personalizado/i });
    expect(generateBtn).not.toBeDisabled();
    
    await user.click(generateBtn);
    expect(mockOnGenerate).toHaveBeenCalledTimes(1);
  });

  it('deve chamar onBack ao clicar no botão de voltar', async () => {
    const user = userEvent.setup();
    renderComponent();
    
    await user.click(screen.getByText(/Voltar às categorias/i));
    expect(mockOnBack).toHaveBeenCalledTimes(1);
  });
});