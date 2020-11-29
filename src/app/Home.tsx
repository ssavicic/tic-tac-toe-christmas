import React, { useState, useEffect } from 'react';
import styles from './Home.module.scss';
import santa from '../images/santa.png';
import SnowFlakes from './components/snowFlakes/SnowFlakes';
import Copyright from './components/copyright/Copyright';
import Header from './components/header/Header';

interface IGame {
    vsComputer: true
}

const snowflakes = [
    { item: 'X' },
    { item: 'O' },
    { item: 'X' },
    { item: 'O' },
    { item: 'X' },
    { item: 'O' },
    { item: 'X' },
    { item: 'O' },
    { item: 'X' },
    { item: 'O' }
]

const Home: React.FC<IGame> = () => {

    const [mode, setMode] = useState(true);

    const setGameMode = () => {
        setMode(!mode);
        localStorage.setItem('vsComputer', mode.toString());
    }

    useEffect(() => {
        localStorage.clear();
    }, [])
    
    return (
        <div className={styles['intro']}>
            {snowflakes.map((x: any, i) => <SnowFlakes item={x.item} key={i} />)}
            <Header title="Welcome to Tic-Tac-Toe game" />
            <div className={styles['intro_options']}>
                <img className={styles['intro_santa']} src={santa} alt="Santa" width={200} />
                <p>Choose game mode:</p>
                <button className={styles['intro_mode']} onClick={setGameMode}>
                    {mode || null ? 'Player vs Player' : 'Player vs Computer' }
                </button>
                <a className={styles['intro_start']} href="/game">Start the game</a>
            </div>
            <Copyright text="Winter eddition. Copyright ssavicic." />
        </div>
    );
}

export default Home;