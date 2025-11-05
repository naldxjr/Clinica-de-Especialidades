// Tipos compartilhados da aplicação
export type StatusConsulta = 'Agendada' | 'Confirmada' | 'Cancelada' | 'Concluída';
export type StatusPagamento = 'pago' | 'pendente' | 'cancelado';

export interface Consulta {
  id: string;
  paciente: string;
  medico: string;
  convenio?: string | null; // null/undefined => particular
  data: string; // ISO date
  hora: string; // HH:mm
  status: StatusConsulta;
}

export interface AuditoriaItem {
  id: string;
  consultaId: string;
  de?: StatusConsulta | null;
  para: StatusConsulta;
  timestamp: string; // ISO date
  usuario: string;
  observacao?: string;
}

export interface Pagamento {
  id: string;
  consultaId: string;
  valor: number;
  metodo: 'cartao' | 'pix' | 'boleto' | 'dinheiro';
  status: StatusPagamento;
  data: string; // ISO date
}

export interface AppState {
  consultas: Consulta[];
  auditoria: AuditoriaItem[];
  pagamentos: Pagamento[];
}
