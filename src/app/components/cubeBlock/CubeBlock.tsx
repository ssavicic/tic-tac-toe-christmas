import React from 'react';
import styles from './CubeBlock.module.scss';
import cn from 'classnames';

interface IBlock {
    name?: string;
    onClick?: (e: React.MouseEvent) => void;
    mark?: string;
    active?: boolean;
}

const CubeBlock: React.FC<IBlock> = ({ name, onClick, mark, active }) => {
    
    return (
        <div className={cn(styles['block'], styles[active ? 'block-active' : ''])} onClick={onClick}>
            <span className={styles['block_name']}>{name}</span>
            <span className={cn(
                styles['block_mark'], 
                styles[`block_mark-${mark}`],  
                styles[active ? 'block_mark-active' : ''])}>{mark}</span>
        </div>
    );
}

export default CubeBlock;