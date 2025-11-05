import React from 'react';
import { Card, CardContent, Typography, Divider, Box, Chip } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import EventNoteIcon from '@mui/icons-material/EventNote';
import type { Consulta } from '../../types';

interface Props {
  consulta?: Consulta | null;
}

const ConsultaDetalhes: React.FC<Props> = ({ consulta }) => {
  if (!consulta) return <Typography>Selecione uma consulta</Typography>;

  return (
    <Card sx={{ maxWidth: 700, m: '16px auto' }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>Detalhes da Consulta</Typography>
        <Divider sx={{ mb: 2 }} />

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <PersonIcon color="primary" sx={{ mr: 1 }} />
          <Typography><strong>Paciente:</strong> {consulta.paciente}</Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <LocalHospitalIcon color="primary" sx={{ mr: 1 }} />
          <Typography><strong>Médico:</strong> {consulta.medico}</Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <EventNoteIcon color="primary" sx={{ mr: 1 }} />
          <Typography><strong>Data:</strong> {new Date(consulta.data).toLocaleDateString()}</Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <AccessTimeIcon color="primary" sx={{ mr: 1 }} />
          <Typography><strong>Hora:</strong> {consulta.hora}</Typography>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Chip label={`Status: ${consulta.status}`} color="info" />
          {consulta.convenio ? (
            <Chip sx={{ ml: 1 }} label={`Convênio: ${consulta.convenio}`} />
          ) : (
            <Chip sx={{ ml: 1 }} label="Particular" />
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ConsultaDetalhes;
