"use client";
import React, { useState } from 'react';
import { Box, Typography, Button, Paper, Alert } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface PromptDisplayProps {
  generatedPrompt: string;
  onBack: () => void;
}

const PromptDisplay: React.FC<PromptDisplayProps> = ({ generatedPrompt, onBack }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Box maxWidth="md" mx="auto">
      <Button onClick={onBack} color="primary" sx={{ mb: 4 }}>
        ← Gerar novo prompt
      </Button>
      <Box
        sx={{
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 3,
          p: 4,
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h5" color="text.primary">
            Seu Prompt Personalizado
          </Typography>
          <Button
            variant="contained"
            startIcon={copied ? <CheckCircleIcon /> : <ContentCopyIcon />}
            onClick={copyToClipboard}
          >
            {copied ? 'Copiado!' : 'Copiar'}
          </Button>
        </Box>
        <Paper variant="outlined" sx={{ p: 3, bgcolor: 'grey.50', whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>
          {generatedPrompt}
        </Paper>
        <Alert severity="info" sx={{ mt: 3 }}>
          💡 <strong>Dica:</strong> Copie este prompt e cole no ChatGPT, Claude ou qualquer outra IA generativa para obter resultados profissionais!
        </Alert>
      </Box>
    </Box>
  );
};

export default PromptDisplay;