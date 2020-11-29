import React from 'react';
import cn from 'classnames';
import styles from './SnowFlakes.module.scss';

interface IProps {
    item: string
}

const SnowFlakes: React.FC<IProps> = ({ item }) => {
    
    return (
        <div className={styles['snowflake_item']}>{item}</div>
    );
}

export default SnowFlakes;