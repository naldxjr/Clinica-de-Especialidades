import React from 'react';
import { Box, Typography } from '@mui/material';
import Relatorios from '../components/PagamentosRelatorios/Relatorios';
import GraficoConsultas from '../components/PagamentosRelatorios/GraficoConsultas';

const RelatoriosFinanceiros: React.FC = () => {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>Relatórios e Dashboards</Typography>
      <Relatorios />
      <GraficoConsultas />
    </Box>
  );
};

export default RelatoriosFinanceiros;
