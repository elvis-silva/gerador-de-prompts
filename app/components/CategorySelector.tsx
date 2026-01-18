import React from 'react';
import { Grid, Card, CardContent, CardActionArea, Typography, Box, SvgIconProps } from '@mui/material';

// Definimos que o ícone pode ser uma String (emoji) ou um Componente de ícone do MUI
interface Category {
  slug: string;
  title: string;
  icon: React.ElementType<SvgIconProps> | any; 
  color: string;
  options: Record<string, string[]>;
}

interface CategorySelectorProps {
  categories: Category[];
  onSelect: (category: Category) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ categories, onSelect }) => {
  return (
    <Grid container spacing={3}>
      {categories.map((cat) => {
        // Lógica para verificar se o ícone é um componente ou string
        const IconComponent = typeof cat.icon !== 'string' ? cat.icon : null;

        return (
          <Grid size={{xs:12, sm:6, md:4, lg:3}} key={cat.slug}>
            <Card
              sx={{
                height: '100%',
                transition: '0.3s',
                border: '2px solid transparent',
                '&:hover': {
                  borderColor: cat.color,
                  transform: 'translateY(-5px)',
                },
              }}
            >
              <CardActionArea onClick={() => onSelect(cat)} sx={{ height: '100%' }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
                    {IconComponent ? (
                      // Renderiza o Componente de Ícone com a cor da categoria
                      <IconComponent sx={{ fontSize: 48, color: cat.color }} />
                    ) : (
                      // Renderiza a String (Emoji)
                      <Typography sx={{ fontSize: 40 }}>{cat.icon}</Typography>
                    )}
                  </Box>
                  
                  <Typography variant="h6" component="div" fontWeight="600">
                    {cat.title}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default CategorySelector;