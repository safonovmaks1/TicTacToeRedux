import { useEffect, useState } from 'react';
import { store } from '../../store';
import styles from './Information.module.css';

export const Information = () => {
	const [state, setState] = useState(store.getState());
	const { isDraw, isGameEnded, winner, currentPlayer } = state;

	useEffect(() => {
		const unsubscribe = store.subscribe(() => {
			setState(store.getState());
		});

		return () => unsubscribe();
	}, []);

	let status = '';

	if (isDraw) {
		status = 'Ничья';
	} else if (isGameEnded) {
		status = `Победа: ${winner}`;
	} else {
		status = `Ходит: ${currentPlayer}`;
	}

	return <div className={styles.status}>{status}</div>;
};
