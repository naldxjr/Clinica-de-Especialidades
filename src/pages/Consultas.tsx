import React, { useMemo, useState } from 'react';
import { Box, Card, CardContent, Divider, FormControl, InputLabel, List, ListItemButton, ListItemText, MenuItem, Select, Typography } from '@mui/material';
import { useAppData } from '../context/AppDataContext';
import type { Consulta, StatusConsulta } from '../types';
import ConsultaDetalhes from '../components/ControleConsultasAuditoria/ConsultaDetalhes';
import ControleStatus from '../components/ControleConsultasAuditoria/ControleStatus';
import AuditoriaConsulta from '../components/ControleConsultasAuditoria/AuditoriaConsulta';
import Pagamento from '../components/PagamentosRelatorios/Pagamento';

const filtros: (StatusConsulta | 'Todos')[] = ['Todos', 'Agendada', 'Confirmada', 'Cancelada', 'Concluída'];

const Consultas: React.FC = () => {
  const { state } = useAppData();
  const [filtro, setFiltro] = useState<(typeof filtros)[number]>('Todos');
  const [selecionada, setSelecionada] = useState<Consulta | null>(state.consultas[0] ?? null);

  const lista = useMemo(() => {
    let l = state.consultas;
    if (filtro !== 'Todos') l = l.filter((c) => c.status === filtro);
    return [...l].sort((a, b) => a.hora.localeCompare(b.hora));
  }, [state.consultas, filtro]);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>Consultas</Typography>

      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
            <FormControl size="small" sx={{ minWidth: 180 }}>
              <InputLabel id="status-filtro">Filtrar por status</InputLabel>
              <Select labelId="status-filtro" label="Filtrar por status" value={filtro} onChange={(e) => setFiltro(e.target.value as any)}>
                {filtros.map((f) => (
                  <MenuItem key={f} value={f}>{f}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 2 }}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>Lista</Typography>
                <List dense>
                  {lista.map((c) => (
                    <ListItemButton key={c.id} selected={c.id === selecionada?.id} onClick={() => setSelecionada(c)}>
                      <ListItemText primary={`${c.hora} • ${c.paciente}`} secondary={`${c.medico} • ${c.convenio || 'Particular'} • ${c.status}`} />
                    </ListItemButton>
                  ))}
                  {lista.length === 0 && <Typography>Nenhuma consulta.</Typography>}
                </List>
              </CardContent>
            </Card>

            <Box>
              <ConsultaDetalhes consulta={selecionada ?? undefined} />
              {selecionada && (
                <>
                  <ControleStatus consultaId={selecionada.id} />
                  <Pagamento consultaId={selecionada.id} />
                  <AuditoriaConsulta consultaId={selecionada.id} />
                </>
              )}
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Consultas;
