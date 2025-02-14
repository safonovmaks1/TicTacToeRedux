import { useEffect, useState } from 'react';
import { WIN_PATTERNS } from '../../const';
import { store } from '../../store';
import styles from './Field.module.css';

export const Field = () => {
	const [state, setState] = useState(store.getState());
	const { field, isGameEnded, currentPlayer } = state;

	useEffect(() => {
		const unsubscribe = store.subscribe(() => {
			setState(store.getState());
		});

		return () => unsubscribe();
	}, []);

	const handleSetCurrentPlayer = (item, index) => {
		if (item === '' && !isGameEnded) {
			const newField = field.map((el, i) => (index === i ? currentPlayer : el));
			store.dispatch({ type: 'SET_FIELD', payload: newField });

			const hasEmptyField = field.some((el) => el === '');
			if (!hasEmptyField) {
				store.dispatch({ type: 'SET_IS_DRAW', payload: true });
			} else if (isWinner(newField, currentPlayer)) {
				store.dispatch({ type: 'SET_IS_GAME_ENDED', payload: true });
				store.dispatch({ type: 'SET_WINNER', payload: currentPlayer });
			} else {
				store.dispatch({
					type: 'SET_CURRENT_PLAYER',
					payload: currentPlayer === 'X' ? 'O' : 'X',
				});
			}
		}
	};

	const isWinner = (newFields, currentPlayer) => {
		for (let i = 0; i < WIN_PATTERNS.length; i++) {
			const [a, b, c] = WIN_PATTERNS[i];
			if (
				newFields[a] === currentPlayer &&
				newFields[b] === currentPlayer &&
				newFields[c] === currentPlayer
			) {
				return true;
			}
		}
		return false;
	};

	return (
		<div className={styles.box}>
			{field.map((item, i) => (
				<button
					key={i}
					onClick={() => handleSetCurrentPlayer(item, i)}
					className={`${styles.item} ${item === 'O' ? styles.zero : ''}`}
					disabled={isGameEnded}>
					{item}
				</button>
			))}
		</div>
	);
};
