import React, { useState, useEffect } from 'react'; 
import styles from './CadastroPaciente.module.css';

const CONVENIOS_STORAGE_KEY = 'clinica:convenios';

interface Convenio {
    id: number;
    nome: string;
}

export const CadastroConvenio: React.FC = () => {
    const [nome, setNome] = useState('');
    const [convenios, setConvenios] = useState<Convenio[]>([]);

    useEffect(() => {
        const conveniosSalvos = localStorage.getItem(CONVENIOS_STORAGE_KEY);
        if (conveniosSalvos) {
            setConvenios(JSON.parse(conveniosSalvos));
        }
    }, []); 

    useEffect(() => {

        if (convenios.length > 0) {
            localStorage.setItem(CONVENIOS_STORAGE_KEY, JSON.stringify(convenios));
        }
    }, [convenios]);


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!nome.trim()) {
            alert('Por favor, digite o nome do convênio.');
            return;
        }

        const novoConvenio: Convenio = {
            id: Date.now(),
            nome: nome.trim(),
        };


        setConvenios((prev) => [...prev, novoConvenio]);
        setNome('');
    };

    return (
        <div className={styles.container}>
            <h2>Cadastro de Convênios</h2>

            <form onSubmit={handleSubmit} className={styles.form}>
                {/* ... (o formulário é o mesmo) ... */}
                <div className={styles.formGroup}>
                    <label htmlFor="nome">Nome do Convênio:</label>
                    <input
                        type="text"
                        id="nome"
                        name="nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        placeholder="Ex: Unimed, Bradesco Saúde"
                        required
                    />
                </div>

                <button type="submit" className={styles.submitButton}>
                    Cadastrar Convênio
                </button>
            </form>

            <section className={styles.listaContainer}>
                <h3>Convênios Cadastrados</h3>
                {convenios.length === 0 ? (
                    <p className={styles.listaVazia}>Nenhum convênio cadastrado ainda.</p>
                ) : (
                    <table className={styles.tabela}>
                        <thead>
                            <tr>
                                <th>Nome do Convênio</th>
                            </tr>
                        </thead>
                        <tbody>
                            {convenios.map((conv) => (
                                <tr key={conv.id}>
                                    <td>{conv.nome}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </section>
        </div>
    );
};