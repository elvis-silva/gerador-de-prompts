import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CategorySelector from '@/app/components/CategorySelector';
import { Home as HomeIcon } from '@mui/icons-material';

// Dados de mock para os testes
const mockCategories = [
  {
    slug: 'tecnologia',
    title: 'Tecnologia',
    icon: HomeIcon, // Testando como componente MUI
    color: '#1976d2',
    options: { items: ['Laptop', 'Mouse'] },
  },
  {
    slug: 'comida',
    title: 'Comida',
    icon: '🍕', // Testando como string/emoji
    color: '#ff9800',
    options: { items: ['Pizza', 'Burger'] },
  },
];

describe('CategorySelector Component', () => {
  const mockOnSelect = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve renderizar todos os cards de categoria fornecidos', () => {
    render(<CategorySelector categories={mockCategories} onSelect={mockOnSelect} />);
    
    expect(screen.getByText('Tecnologia')).toBeInTheDocument();
    expect(screen.getByText('Comida')).toBeInTheDocument();
  });

  it('deve renderizar um ícone MUI quando o ícone for um componente', () => {
    render(<CategorySelector categories={[mockCategories[0]]} onSelect={mockOnSelect} />);
    
    // Procura pelo elemento SVG que o MUI renderiza para ícones
    const icon = screen.getByTestId('HomeIcon'); 
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveStyle({ color: '#1976d2' });
  });

  it('deve renderizar um emoji quando o ícone for uma string', () => {
    render(<CategorySelector categories={[mockCategories[1]]} onSelect={mockOnSelect} />);
    
    expect(screen.getByText('🍕')).toBeInTheDocument();
  });

  it('deve chamar a função onSelect com os dados corretos ao clicar em um card', () => {
    render(<CategorySelector categories={mockCategories} onSelect={mockOnSelect} />);
    
    const categoryCard = screen.getByText('Tecnologia').closest('button');
    if (categoryCard) {
      fireEvent.click(categoryCard);
    }

    expect(mockOnSelect).toHaveBeenCalledTimes(1);
    expect(mockOnSelect).toHaveBeenCalledWith(mockCategories[0]);
  });

  it('deve aplicar estilos de hover (regressão visual básica via style props)', () => {
    render(<CategorySelector categories={[mockCategories[0]]} onSelect={mockOnSelect} />);
    
    const card = screen.getByText('Tecnologia').closest('.MuiPaper-root');
    expect(card).toHaveStyle('border: 2px solid transparent');
  });
});