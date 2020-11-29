import React, { useState } from 'react';
import cn from 'classnames';
import styles from './GameScreen.module.scss';
import CubeBlock from '../components/cubeBlock/CubeBlock';
import Copyright from '../components/copyright/Copyright';
import Header from '../components/header/Header';

interface IPlayfield {
    id: number;
    status: string;
}

const GameScrean: React.FC = () => {

    const fieldStatus = {
        X: 'X',
        O: 'O',
        unused: '',
    };

    const players = {
        playerOne: 1,
        playerTwo: 2
    }

    const initialPlayfied = [
        { id: 0, status: fieldStatus.unused },
        { id: 1, status: fieldStatus.unused },
        { id: 2, status: fieldStatus.unused },
        { id: 3, status: fieldStatus.unused },
        { id: 4, status: fieldStatus.unused },
        { id: 5, status: fieldStatus.unused },
        { id: 6, status: fieldStatus.unused },
        { id: 7, status: fieldStatus.unused },
        { id: 8, status: fieldStatus.unused }
    ]

    const winnerCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    const initialState = {
        currentPlayer: players.playerOne,
        playfield: initialPlayfied,
        winner: null,
        stalemate: false
    };

    const [active, setActive] = useState(false);
    const [data, setData] = useState(initialState);

    const playerVsAI = localStorage.getItem('vsComputer');

    const pickField = (i: any) => {
        setActive(!active);

        if (data.winner || data.stalemate) {
            // prevent if there is a winner
            return;
        }

        let playfield: IPlayfield[] = Array.from(data.playfield);
        if (playfield[i].status !== fieldStatus.unused) {
            // prevent double fill
            return;
        }

        const status = data.currentPlayer === players.playerOne ? fieldStatus.X : fieldStatus.O;
        playfield[i].status = status;

        let currentPlayer = null;

        // game mode check
        if (playerVsAI) {
  
            // play as AI
            let availableFields = playfield.filter(f => f.status === fieldStatus.unused);

            if (availableFields.length) {

                let aiMove = getAiMove(availableFields);
                playfield[aiMove].status = fieldStatus.O;

            }

            // switch to human
            currentPlayer = players.playerOne;

        } else {
            // switch players
            currentPlayer = data.currentPlayer === players.playerOne ? players.playerTwo : players.playerOne;
        }

        let winner = null;

        winnerCombos.forEach(combo => {
            let fields = playfield.filter(p => combo.includes(p.id));

            if (fields.every(f => f.status === fieldStatus.X)) {
                winner = players.playerOne;
            } else if (fields.every(f => f.status === fieldStatus.O)) {
                winner = players.playerTwo;
            }
        });

        let stalemate = data.playfield && data.playfield.every(f => f.status !== fieldStatus.unused) && !winner;

        setData({ ...data, currentPlayer, playfield, winner, stalemate });
    };

    const getAiMove = (availableFields: Array<any>): number => {
        let minimum = 0;
        let maximum = availableFields.length - 1;

        let randomAiMove = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
        return availableFields[randomAiMove].id;
    }

    return (
        <div className={styles['game']}>
            <Header intro="Your choice is:" title={playerVsAI == 'true' ? 'Player vs Computer' : 'Player vs Player'} />
            <div className={styles['game_status']}>
                On move: {data.currentPlayer === players.playerOne
                    ?
                    <span className={styles['game_on-move']}>Player 1</span>
                    :
                    <span className={styles['game_on-move']}>Player 2</span>}
            </div>
            <div className={styles['game_wrapper']}>
                {data.playfield.map((field: any, i) =>
                    <CubeBlock key={i} onClick={() => pickField(i)} mark={field.status} active={field.status !== fieldStatus.unused} />
                )}
            </div>
            <div className={styles['game_winner']}>
                {data.winner ? `${data.winner === players.playerOne ? 'Congratulations, winner is a Player One!' : 'Congratulations, winner is a Player Two!'}` : ''}
                {data.stalemate ? 'No winner' : ''}
            </div>
            <div className={styles['game_end']}>
                {data.winner || data.stalemate ? <a className={cn(styles['game_button'], styles['game_cant-stop'])} href="/game">Play again</a> : ''}
                <a className={cn(styles['game_button'], styles['game_im-pussy'])} href="/">Quit</a>
            </div>
            <Copyright text="Winter eddition. Copyright ssavicic." />
        </div>
    );
}

export default GameScrean;