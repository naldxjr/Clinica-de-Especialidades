import React, { useMemo, useState } from 'react';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';
import type { StatusConsulta } from '../../types';
import { useAppData } from '../../context/AppDataContext';

interface Props {
  consultaId: string;
}

const opcoes: StatusConsulta[] = ['Agendada', 'Confirmada', 'Cancelada', 'Concluída'];

const ControleStatus: React.FC<Props> = ({ consultaId }) => {
  const { state, atualizarStatusConsulta } = useAppData();
  const consulta = useMemo(() => state.consultas.find(c => c.id === consultaId), [state.consultas, consultaId]);
  const [novo, setNovo] = useState<StatusConsulta>(consulta?.status ?? 'Agendada');
  const [observacao, setObservacao] = useState('');

  if (!consulta) return <Typography>Consulta não encontrada.</Typography>;

  const onChange = (e: SelectChangeEvent) => setNovo(e.target.value as StatusConsulta);

  const salvar = () => {
    if (novo === consulta.status) return;
    atualizarStatusConsulta(consulta.id, novo, 'usuario-demo', observacao || undefined);
    setObservacao('');
  };

  return (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap', my: 2 }}>
      <FormControl size="small">
        <InputLabel id="status-label">Status</InputLabel>
        <Select labelId="status-label" value={novo} label="Status" onChange={onChange}>
          {opcoes.map((s) => (
            <MenuItem key={s} value={s}>{s}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField size="small" label="Observação (opcional)" value={observacao} onChange={(e) => setObservacao(e.target.value)} sx={{ minWidth: 260 }} />

      <Button variant="contained" onClick={salvar}>Atualizar</Button>
    </Box>
  );
};

export default ControleStatus;
