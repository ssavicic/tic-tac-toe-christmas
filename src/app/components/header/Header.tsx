import React from 'react';
import cn from 'classnames';
import styles from './Header.module.scss';

interface IProps {
    title: string;
    intro?: string;
}

const Header: React.FC<IProps> = ({ title, intro }) => {
    
    return (
        <div className={styles['header']}>
            <p>{intro}</p>
            <h1 className={styles['header_heading']}>{title}</h1>
        </div>
    );
}

export default Header;