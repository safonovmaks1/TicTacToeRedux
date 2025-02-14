import { Field, Information } from '../components';
import { store } from '../store';
import styles from './App.module.css';

export const App = () => {
	const handleStartAgain = () => {
		store.dispatch({ type: 'RESTART_GAME' });
	};

	return (
		<div className={styles.container}>
			<div className={styles.app}>
				<h1 className={styles.title}>Игра «Крестики-Нолики»</h1>
				<div className={styles.wrapper}>
					<Field />
					<Information />
					<button className={styles.buttonReset} onClick={handleStartAgain}>
						Начать заново
					</button>
				</div>
			</div>
		</div>
	);
};
