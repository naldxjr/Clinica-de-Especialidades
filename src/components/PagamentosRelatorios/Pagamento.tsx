import React, { useMemo, useState } from 'react';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useAppData } from '../../context/AppDataContext';
import type { Pagamento as PagamentoType } from '../../types';

interface Props {
  consultaId: string;
}

const Pagamento: React.FC<Props> = ({ consultaId }) => {
  const { state, registrarPagamento } = useAppData();
  const consulta = useMemo(() => state.consultas.find(c => c.id === consultaId), [state.consultas, consultaId]);

  const [valor, setValor] = useState<number>(0);
  const [metodo, setMetodo] = useState<PagamentoType['metodo']>('pix');
  const [status, setStatus] = useState<PagamentoType['status']>('pendente');

  if (!consulta) return <Typography>Consulta não encontrada.</Typography>;

  const salvar = () => {
    registrarPagamento({ consultaId, valor: Number(valor), metodo, status });
    setValor(0);
    setMetodo('pix');
    setStatus('pendente');
  };

  return (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap', my: 2 }}>
      <Typography><strong>Consulta:</strong> {consulta.paciente} — {consulta.hora}</Typography>

      <TextField size="small" type="number" label="Valor (R$)" value={valor} onChange={(e) => setValor(Number(e.target.value))} />

      <FormControl size="small">
        <InputLabel>Metodo</InputLabel>
        <Select label="Metodo" value={metodo} onChange={(e) => setMetodo(e.target.value as any)}>
          <MenuItem value="cartao">Cartão</MenuItem>
          <MenuItem value="pix">PIX</MenuItem>
          <MenuItem value="boleto">Boleto</MenuItem>
          <MenuItem value="dinheiro">Dinheiro</MenuItem>
        </Select>
      </FormControl>

      <FormControl size="small">
        <InputLabel>Status</InputLabel>
        <Select label="Status" value={status} onChange={(e) => setStatus(e.target.value as any)}>
          <MenuItem value="pendente">Pendente</MenuItem>
          <MenuItem value="pago">Pago</MenuItem>
          <MenuItem value="cancelado">Cancelado</MenuItem>
        </Select>
      </FormControl>

      <Button variant="contained" onClick={salvar}>Salvar Pagamento</Button>
    </Box>
  );
};

export default Pagamento;
