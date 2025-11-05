import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { AppState, AuditoriaItem, Consulta, Pagamento, StatusConsulta } from '../types';

const STORAGE_KEY = 'clinica_app_state_v1';

const estadoInicial: AppState = {
  consultas: [],
  auditoria: [],
  pagamentos: [],
};

function carregarEstado(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return estadoInicial;
    const parsed = JSON.parse(raw) as AppState;
    return parsed || estadoInicial;
  } catch {
    return estadoInicial;
  }
}

function salvarEstado(state: AppState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

interface Contexto {
  state: AppState;
  setConsultas: (lista: Consulta[]) => void;
  setPagamentos: (lista: Pagamento[]) => void;
  registrarAuditoria: (item: Omit<AuditoriaItem, 'id' | 'timestamp'> & { timestamp?: string }) => void;
  atualizarStatusConsulta: (consultaId: string, novoStatus: StatusConsulta, usuario?: string, observacao?: string) => void;
  registrarPagamento: (pag: Omit<Pagamento, 'id' | 'data'> & { data?: string }) => void;
}

const AppDataContext = createContext<Contexto | undefined>(undefined);

export const AppDataProvider: React.FC<{ children: React.ReactNode; seed?: boolean }> = ({ children, seed }) => {
  const [state, setState] = useState<AppState>(() => {
    const loaded = carregarEstado();
    if (loaded.consultas.length === 0 && seed) {
      const agora = new Date();
      const base: AppState = {
        consultas: [
          { id: 'c1', paciente: 'Ana Silva', medico: 'Dr. Carlos', convenio: 'Unimed', data: agora.toISOString(), hora: '09:00', status: 'Agendada' },
          { id: 'c2', paciente: 'João Souza', medico: 'Dra. Maria', convenio: null, data: agora.toISOString(), hora: '10:30', status: 'Confirmada' },
        ],
        auditoria: [],
        pagamentos: [],
      };
      salvarEstado(base);
      return base;
    }
    return loaded;
  });

  useEffect(() => {
    salvarEstado(state);
  }, [state]);

  const setConsultas = useCallback((lista: Consulta[]) => {
    setState((s) => ({ ...s, consultas: lista }));
  }, []);

  const setPagamentos = useCallback((lista: Pagamento[]) => {
    setState((s) => ({ ...s, pagamentos: lista }));
  }, []);

  const registrarAuditoria = useCallback<Contexto['registrarAuditoria']>((item) => {
    setState((s) => ({
      ...s,
      auditoria: [
        ...s.auditoria,
        {
          id: crypto.randomUUID(),
          timestamp: item.timestamp ?? new Date().toISOString(),
          ...item,
        },
      ],
    }));
  }, []);

  const atualizarStatusConsulta = useCallback<Contexto['atualizarStatusConsulta']>((consultaId, novoStatus, usuario = 'sistema', observacao) => {
    setState((s) => {
      const consulta = s.consultas.find((c) => c.id === consultaId);
      if (!consulta) return s;
      const anterior = consulta.status;
      const consultas = s.consultas.map((c) => (c.id === consultaId ? { ...c, status: novoStatus } : c));
      const auditoria: AuditoriaItem = {
        id: crypto.randomUUID(),
        consultaId,
        de: anterior,
        para: novoStatus,
        timestamp: new Date().toISOString(),
        usuario,
        observacao,
      };
      return { ...s, consultas, auditoria: [...s.auditoria, auditoria] };
    });
  }, []);

  const registrarPagamento = useCallback<Contexto['registrarPagamento']>((pag) => {
    setState((s) => ({
      ...s,
      pagamentos: [
        ...s.pagamentos,
        {
          id: crypto.randomUUID(),
          data: pag.data ?? new Date().toISOString(),
          ...pag,
        },
      ],
    }));
  }, []);

  const value = useMemo<Contexto>(() => ({
    state,
    setConsultas,
    setPagamentos,
    registrarAuditoria,
    atualizarStatusConsulta,
    registrarPagamento,
  }), [state, setConsultas, setPagamentos, registrarAuditoria, atualizarStatusConsulta, registrarPagamento]);

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
};

export function useAppData() {
  const ctx = useContext(AppDataContext);
  if (!ctx) throw new Error('useAppData deve ser usado dentro de AppDataProvider');
  return ctx;
}
