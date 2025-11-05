import React, { useState, useEffect } from 'react';
import styles from './CadastroPaciente.module.css';

const CONVENIOS_STORAGE_KEY = 'clinica:convenios';
const PLANOS_STORAGE_KEY = 'clinica:planos';

interface Convenio {
    id: number;
    nome: string;
}

interface Plano {
    id: number;
    nome: string;
    convenioId: number;
    convenioNome: string;
}

export const CadastroPlano: React.FC = () => {
    const [formData, setFormData] = useState({
        nome: '',
        convenioId: '',
    });

    const [planos, setPlanos] = useState<Plano[]>([]);
    const [convenios, setConvenios] = useState<Convenio[]>([]);

    useEffect(() => {
        const conveniosSalvos = localStorage.getItem(CONVENIOS_STORAGE_KEY);
        if (conveniosSalvos) {
            setConvenios(JSON.parse(conveniosSalvos));
        }

        const planosSalvos = localStorage.getItem(PLANOS_STORAGE_KEY);
        if (planosSalvos) {
            setPlanos(JSON.parse(planosSalvos));
        }
    }, []);

    useEffect(() => {
        if (planos.length >= 0) {
            localStorage.setItem(PLANOS_STORAGE_KEY, JSON.stringify(planos));
        }
    }, [planos]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.nome || !formData.convenioId) {
            alert('Por favor, preencha o nome do plano e selecione um convênio.');
            return;
        }

        const convenioSelecionado = convenios.find(
            (c) => c.id === Number(formData.convenioId)
        );

        if (!convenioSelecionado) {
            alert('Erro: Convênio selecionado não encontrado.');
            return;
        }

        const novoPlano: Plano = {
            id: Date.now(),
            nome: formData.nome,
            convenioId: convenioSelecionado.id,
            convenioNome: convenioSelecionado.nome,
        };

        setPlanos((prev) => [...prev, novoPlano]);

        setFormData({ nome: '', convenioId: '' });
    };

    return (
        <div className={styles.container}>
            <h2>Cadastro de Planos</h2>

            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                    <label htmlFor="convenioId">Convênio:</label>
                    <select
                        id="convenioId"
                        name="convenioId"
                        value={formData.convenioId}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>Selecione um convênio</option>
                        {convenios.length === 0 ? (
                            <option value="" disabled>Cadastre um convênio primeiro</option>
                        ) : (
                            convenios.map((convenio) => (
                                <option key={convenio.id} value={convenio.id}>
                                    {convenio.nome}
                                </option>
                            ))
                        )}
                    </select>
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="nome">Nome do Plano:</label>
                    <input
                        type="text"
                        id="nome"
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        placeholder="Ex: Unipart, Unipleno, Plano Bronze"
                        required
                    />
                </div>

                <button type="submit" className={styles.submitButton}>
                    Cadastrar Plano
                </button>
            </form>

            <section className={styles.listaContainer}>
                <h3>Planos Cadastrados</h3>

                {planos.length === 0 ? (
                    <p className={styles.listaVazia}>Nenhum plano cadastrado ainda.</p>
                ) : (
                    <table className={styles.tabela}>
                        <thead>
                            <tr>
                                <th>Nome do Plano</th>
                                <th>Convênio Associado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {planos.map((plano) => (
                                <tr key={plano.id}>
                                    <td>{plano.nome}</td>
                                    <td>{plano.convenioNome}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </section>
        </div>
    );
};