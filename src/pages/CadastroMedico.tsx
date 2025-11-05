import React, { useState } from 'react';
import styles from './CadastroPaciente.module.css';

interface Medico {
    id: number;
    nome: string;
    crm: string; 
    especialidade: string;
}

export const CadastroMedico: React.FC = () => {
    const [formData, setFormData] = useState({
        nome: '',
        crm: '',
        especialidade: '',
    });

    const [medicos, setMedicos] = useState<Medico[]>([]);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const novoMedico: Medico = {
            id: Date.now(),
            ...formData,
        };

        setMedicos((prevMedicos) => [...prevMedicos, novoMedico]);

        setFormData({
            nome: '',
            crm: '',
            especialidade: '',
        });
    };

    return (
        <div className={styles.container}>
            <h2>Cadastro de Médicos</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                    <label htmlFor="nome">Nome Completo:</label>
                    <input
                        type="text"
                        id="nome"
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="crm">CRM:</label>
                    <input
                        type="text"
                        id="crm"
                        name="crm"
                        value={formData.crm}
                        onChange={handleChange}
                        placeholder="000000-SP"
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="especialidade">Especialidade:</label>
                    <input
                        type="text"
                        id="especialidade"
                        name="especialidade"
                        value={formData.especialidade}
                        onChange={handleChange}
                        placeholder="Ex: Cardiologia, Ortopedia"
                        required
                    />
                </div>

                <button type="submit" className={styles.submitButton}>
                    Cadastrar Médico
                </button>
            </form>

            <section className={styles.listaContainer}>
                <h3>Médicos Cadastrados</h3>

                {medicos.length === 0 ? (
                    <p className={styles.listaVazia}>Nenhum médico cadastrado ainda.</p>
                ) : (
                    <table className={styles.tabela}>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>CRM</th>
                                <th>Especialidade</th>
                            </tr>
                        </thead>
                        <tbody>
                            {medicos.map((medico) => (
                                <tr key={medico.id}>
                                    <td>{medico.nome}</td>
                                    <td>{medico.crm}</td>
                                    <td>{medico.especialidade}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </section>
        </div>
    );
};