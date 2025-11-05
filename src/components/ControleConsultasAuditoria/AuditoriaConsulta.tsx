import React, { useMemo, useState } from 'react';
import { Box, Card, CardContent, Chip, Divider, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import type { AuditoriaItem, StatusConsulta } from '../../types';
import { useAppData } from '../../context/AppDataContext';

interface Props {
  consultaId?: string;
}

const filtros: (StatusConsulta | 'Todos')[] = ['Todos', 'Agendada', 'Confirmada', 'Cancelada', 'Concluída'];

function formatarData(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString();
}

const AuditoriaConsulta: React.FC<Props> = ({ consultaId }) => {
  const { state } = useAppData();
  const [filtro, setFiltro] = useState<(typeof filtros)[number]>('Todos');

  const items = useMemo(() => {
    let lista: AuditoriaItem[] = state.auditoria;
    if (consultaId) lista = lista.filter((a) => a.consultaId === consultaId);
    if (filtro !== 'Todos') lista = lista.filter((a) => a.para === filtro);
    return [...lista].sort((a, b) => a.timestamp.localeCompare(b.timestamp));
  }, [state.auditoria, consultaId, filtro]);

  return (
    <Card sx={{ mt: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">Auditoria de Status</Typography>
          <FormControl size="small" sx={{ minWidth: 160 }}>
            <InputLabel id="filtro-label">Filtro</InputLabel>
            <Select labelId="filtro-label" label="Filtro" value={filtro} onChange={(e) => setFiltro(e.target.value as any)}>
              {filtros.map((f) => (
                <MenuItem key={f} value={f}>{f}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Divider sx={{ my: 1 }} />

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {items.map((i) => (
            <Box key={i.id} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Chip size="small" label={formatarData(i.timestamp)} />
              <Typography>
                <strong>{i.usuario}</strong>: {i.de ? `${i.de} -> ` : ''}{i.para}
                {i.observacao ? ` • ${i.observacao}` : ''}
              </Typography>
            </Box>
          ))}
          {items.length === 0 && <Typography variant="body2">Sem registros.</Typography>}
        </Box>
      </CardContent>
    </Card>
  );
};

export default AuditoriaConsulta;
