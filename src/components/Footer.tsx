import React from 'react';
import styles from './Footer.module.css';

export const Footer: React.FC = () => {
    return (
        <footer className={styles.footer}>
            <p>© 2025 - Clínica de Especialidades. Todos os direitos reservados.</p>
        </footer>
    );
};