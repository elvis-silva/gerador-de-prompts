import React from 'react';
import { Grid, Typography, Button, Box } from '@mui/material';

interface OptionsSelectorProps {
  category: {
    title: string;
    icon: string;
    options: Record<string, string[]>;
  };
  selections: Record<string, string>;
  onSelect: (key: string, value: string) => void;
  onGenerate: () => void;
  onBack: () => void;
  allSelected: boolean;
}

const OptionsSelector: React.FC<OptionsSelectorProps> = ({
  category,
  selections,
  onSelect,
  onGenerate,
  onBack,
  allSelected,
}) => {
  return (
    <Box maxWidth="md" mx="auto">
      <Button onClick={onBack} color="primary" sx={{ mb: 4 }}>
        ← Voltar às categorias
      </Button>
      <Box
        sx={{
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 3,
          p: 4,
        }}
      >
        <Box display="flex" alignItems="center" mb={3}>
          <Typography variant="h2" sx={{ mr: 2 }}>
            {category.icon}
          </Typography>
          <Typography variant="h4" color="text.primary">
            {category.title}
          </Typography>
        </Box>
        <Box display="flex" flexDirection="column" gap={4}>
          {Object.entries(category.options).map(([key, options]) => (
            <Box key={key}>
              <Typography variant="subtitle1" fontWeight="bold" mb={2} color="text.primary" sx={{ textTransform: 'capitalize' }}>
                {key}
              </Typography>
              <Grid container spacing={2}>
                {options.map((option) => (
                  <Grid size={{xs:6}} key={option}>
                    <Button
                      variant={selections[key] === option ? 'contained' : 'outlined'}
                      fullWidth
                      onClick={() => onSelect(key, option)}
                      sx={{
                        justifyContent: 'flex-start',
                        textTransform: 'none',
                        ...(selections[key] === option && { bgcolor: 'primary.light', color: 'primary.contrastText' }),
                      }}
                    >
                      {option}
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </Box>
          ))}
        </Box>
        <Button
          variant="contained"
          fullWidth
          size="large"
          onClick={onGenerate}
          disabled={!allSelected}
          sx={{ mt: 4, py: 2 }}
        >
          Gerar Prompt Personalizado
        </Button>
      </Box>
    </Box>
  );
};

export default OptionsSelector;