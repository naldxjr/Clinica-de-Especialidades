import React, { useMemo } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import { useAppData } from '../../context/AppDataContext';

const cores = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const GraficoConsultas: React.FC = () => {
  const { state } = useAppData();

  const porConvenio = useMemo(() => {
    const mapa = new Map<string, number>();
    state.consultas.forEach((c) => {
      const chave = c.convenio || 'Particular';
      mapa.set(chave, (mapa.get(chave) || 0) + 1);
    });
    return Array.from(mapa, ([name, value]) => ({ name, value }));
  }, [state.consultas]);

  const particularVsConvenio = useMemo(() => {
    let part = 0, conv = 0;
    state.consultas.forEach((c) => (c.convenio ? conv++ : part++));
    return [
      { name: 'Particular', value: part },
      { name: 'Convênio', value: conv },
    ];
  }, [state.consultas]);

  return (
    <Card sx={{ mt: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>Consultas por Convênio</Typography>
        <div style={{ width: '100%', height: 260 }}>
          <ResponsiveContainer>
            <BarChart data={porConvenio}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" name="Consultas" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <Typography variant="h6" sx={{ mt: 3 }} gutterBottom>Particular vs Convênio</Typography>
        <div style={{ width: '100%', height: 260 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie data={particularVsConvenio} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                {particularVsConvenio.map((_, idx) => (
                  <Cell key={idx} fill={cores[idx % cores.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default GraficoConsultas;
