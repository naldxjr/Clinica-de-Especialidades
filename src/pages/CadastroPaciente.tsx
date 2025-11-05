import React, { useState } from 'react';
import styles from './CadastroPaciente.module.css';


interface Paciente {
    id: number;
    nome: string;
    cpf: string;
    dataNascimento: string;
    telefone: string;
}

export const CadastroPaciente: React.FC = () => {

    const [formData, setFormData] = useState({
        nome: '',
        cpf: '',
        dataNascimento: '',
        telefone: '',
    });


    const [pacientes, setPacientes] = useState<Paciente[]>([]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const novoPaciente: Paciente = {
            id: Date.now(),
            ...formData,
        };


        setPacientes((prevPacientes) => [...prevPacientes, novoPaciente]);


        setFormData({
            nome: '',
            cpf: '',
            dataNascimento: '',
            telefone: '',
        });

        console.log('Paciente cadastrado:', novoPaciente);
        console.log('Todos os pacientes:', [...pacientes, novoPaciente]);
    };

    return (
        <div className={styles.container}>
            <h2>Cadastro de Pacientes</h2>


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
                    <label htmlFor="cpf">CPF:</label>
                    <input
                        type="text"
                        id="cpf"
                        name="cpf"
                        value={formData.cpf}
                        onChange={handleChange}
                        placeholder="000.000.000-00"
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="dataNascimento">Data de Nascimento:</label>
                    <input
                        type="date"
                        id="dataNascimento"
                        name="dataNascimento"
                        value={formData.dataNascimento}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="telefone">Telefone:</label>
                    <input
                        type="tel"
                        id="telefone"
                        name="telefone"
                        value={formData.telefone}
                        onChange={handleChange}
                        placeholder="(00) 90000-0000"
                        required
                    />
                </div>

                <button type="submit" className={styles.submitButton}>
                    Cadastrar Paciente
                </button>
            </form>

            <section className={styles.listaContainer}>
                <h3>Pacientes Cadastrados</h3>


                {pacientes.length === 0 ? (
                    <p className={styles.listaVazia}>Nenhum paciente cadastrado ainda.</p>
                ) : (
                    <table className={styles.tabela}>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>CPF</th>
                                <th>Data Nasc.</th>
                                <th>Telefone</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pacientes.map((paciente) => (
                                <tr key={paciente.id}>
                                    <td>{paciente.nome}</td>
                                    <td>{paciente.cpf}</td>
                                    <td>{paciente.dataNascimento}</td>
                                    <td>{paciente.telefone}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </section>
        </div>
    );
};