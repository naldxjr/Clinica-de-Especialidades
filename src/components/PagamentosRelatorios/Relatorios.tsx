import React, { useMemo } from 'react';
import { Card, CardContent, Divider, Typography } from '@mui/material';
import { useAppData } from '../../context/AppDataContext';

function mesAno(iso: string) {
  const d = new Date(iso);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

const Relatorios: React.FC = () => {
  const { state } = useAppData();

  const totalPorConvenio = useMemo(() => {
    const mapa = new Map<string, number>();
    state.consultas.forEach((c) => {
      const chave = c.convenio || 'Particular';
      mapa.set(chave, (mapa.get(chave) || 0) + 1);
    });
    return Array.from(mapa, ([k, v]) => ({ chave: k, total: v }));
  }, [state.consultas]);

  const totalRecebidoPorMes = useMemo(() => {
    const soma = new Map<string, number>();
    state.pagamentos
      .filter((p) => p.status === 'pago')
      .forEach((p) => {
        const chave = mesAno(p.data);
        soma.set(chave, (soma.get(chave) || 0) + p.valor);
      });
    return Array.from(soma, ([k, v]) => ({ mes: k, total: v }));
  }, [state.pagamentos]);

  const partVsConv = useMemo(() => {
    let part = 0, conv = 0;
    state.consultas.forEach((c) => (c.convenio ? conv++ : part++));
    return { particular: part, convenio: conv };
  }, [state.consultas]);

  return (
    <Card sx={{ mt: 2 }}>
      <CardContent>
        <Typography variant="h6">Relatórios</Typography>
        <Divider sx={{ my: 1 }} />
        <Typography variant="subtitle1">Total de consultas por convênio</Typography>
        {totalPorConvenio.map((r) => (
          <Typography key={r.chave}>{r.chave}: {r.total}</Typography>
        ))}

        <Divider sx={{ my: 1 }} />
        <Typography variant="subtitle1">Total recebido por mês</Typography>
        {totalRecebidoPorMes.map((r) => (
          <Typography key={r.mes}>{r.mes}: R$ {r.total.toFixed(2)}</Typography>
        ))}

        <Divider sx={{ my: 1 }} />
        <Typography variant="subtitle1">Consultas particulares vs convênio</Typography>
        <Typography>Particular: {partVsConv.particular} | Convênio: {partVsConv.convenio}</Typography>
      </CardContent>
    </Card>
  );
};

export default Relatorios;
