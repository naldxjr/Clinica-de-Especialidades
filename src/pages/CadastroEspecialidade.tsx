import React, { useState } from 'react';
import styles from './CadastroPaciente.module.css';

interface Especialidade {
    id: number;
    nome: string;
}

export const CadastroEspecialidade: React.FC = () => {
    const [nome, setNome] = useState('');
    const [especialidades, setEspecialidades] = useState<Especialidade[]>([]);
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!nome.trim()) {
            alert('Por favor, digite o nome da especialidade.');
            return;
        }

        const novaEspecialidade: Especialidade = {
            id: Date.now(),
            nome: nome.trim(),
        };

        setEspecialidades((prev) => [...prev, novaEspecialidade]);
        setNome('');
    };

    return (
        <div className={styles.container}>
            <h2>Cadastro de Especialidades</h2>

            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                    <label htmlFor="nome">Nome da Especialidade:</label>
                    <input
                        type="text"
                        id="nome"
                        name="nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)} 
                        placeholder="Ex: Cardiologia"
                        required
                    />
                </div>

                <button type="submit" className={styles.submitButton}>
                    Cadastrar Especialidade
                </button>
            </form>

            <section className={styles.listaContainer}>
                <h3>Especialidades Cadastradas</h3>

                {especialidades.length === 0 ? (
                    <p className={styles.listaVazia}>Nenhuma especialidade cadastrada ainda.</p>
                ) : (
                    <table className={styles.tabela}>
                        <thead>
                            <tr>
                                <th>Nome da Especialidade</th>
                            </tr>
                        </thead>
                        <tbody>
                            {especialidades.map((esp) => (
                                <tr key={esp.id}>
                                    <td>{esp.nome}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </section>
        </div>
    );
};