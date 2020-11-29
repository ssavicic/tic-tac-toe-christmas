import React from 'react';
import cn from 'classnames';
import styles from './Copyright.module.scss';

interface IProps {
    text: string
}

const Copyright: React.FC<IProps> = ({ text }) => {
    
    return (
        <div className={styles['copyright']}>
            <p>{text}</p>
        </div>
    );
}

export default Copyright;