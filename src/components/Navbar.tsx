import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

export const Navbar: React.FC = () => {
    return (
        <nav className={styles.navbar}>
            <Link to="/" className={styles.linkHome}>Clínica de Especialidades</Link>
            <Link to="/pacientes" className={styles.link}>Pacientes</Link>
            <Link to="/medicos" className={styles.link}>Médicos</Link>
            <Link to="/especialidades" className={styles.link}>Especialidades</Link>
            <Link to="/convenios" className={styles.link}>Convênios</Link>
            <Link to="/planos" className={styles.link}>Planos</Link>
        </nav>
    );
};