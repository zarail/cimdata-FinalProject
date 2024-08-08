import { useState, useEffect } from 'react';
import { fetchCapital } from '../helperFunctions';
import { distanceCalculator } from '../helperFunctions';
import { capitalizeWords } from '../helperFunctions';

let attempt = 0;

export function useFormHandler(ranCapInfo, getCapitalInfo) {
	const getInitialHighScore = () => {
		const storedHighScore = localStorage.getItem('highScore');
		return storedHighScore ? JSON.parse(storedHighScore) : 0;
	};

	const [inputValue, setInputValue] = useState('');
	const [currentGuess, setCurrentGuess] = useState(null);
	const [currentGuessInfo, setCurrentGuessInfo] = useState(null);
	const [prevGuess, setPrevGuess] = useState(null);
	const [prevGuessInfo, setPrevGuessInfo] = useState(null);
	const [feedback, setFeedback] = useState('');
	const [hint, setHint] = useState('');
	const [score, setScore] = useState(20);
	const [isWinner, setIsWinner] = useState(false);
	const [isLoser, setIsLoser] = useState(false);
	const [highScore, setHighScore] = useState(getInitialHighScore);

	useEffect(() => {
		localStorage.setItem('highScore', JSON.stringify(highScore));
	}, [highScore]);

	useEffect(() => {}, [
		currentGuess,
		currentGuessInfo,
		prevGuess,
		prevGuessInfo,
	]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!inputValue || inputValue.trim() === '') {
			setFeedback('❗❗ Please enter a capital city!');
			return;
		}
		attempt++;

		const formattedInput = capitalizeWords(inputValue);

		if (formattedInput) {
			try {
				const capitalInfo = await fetchCapital(formattedInput);
				setCurrentGuessInfo(capitalInfo);
				setCurrentGuess(formattedInput);
			} catch (error) {
				console.error('⛔️ Error fetching capital info:', error);
				setFeedback(
					'⛔️ Error finding capital. Please check your spelling and try again. 🧐'
				);
			}
			setInputValue('');
		}
	};

	useEffect(() => {
		if (
			currentGuess &&
			ranCapInfo &&
			currentGuess.toLocaleLowerCase() ===
				ranCapInfo.rCCapitalName.toLocaleLowerCase()
		) {
			winner();
		} else if (
			attempt > 0 &&
			currentGuess &&
			ranCapInfo &&
			currentGuess.toLocaleLowerCase() !==
				ranCapInfo.rCCapitalName.toLocaleLowerCase()
		) {
			setFeedback(`No, it wasn't ${currentGuess}! 🤔`);
			setHint('Make another guess!');
			setScore(score - 1);

			const lat1 = currentGuessInfo.capitalLat;
			const lon1 = currentGuessInfo.capitalLon;
			const lat2 = ranCapInfo.rCCapitalLat;
			const lon2 = ranCapInfo.rCCapitalLon;
			const currentDistance = distanceCalculator(lat1, lon1, lat2, lon2);
			if (prevGuessInfo) {
				const lat1 = prevGuessInfo.capitalLat;
				const lon1 = prevGuessInfo.capitalLon;
				const prevDistance = distanceCalculator(lat1, lon1, lat2, lon2);
				if (currentDistance < prevDistance) {
					setFeedback('You are getting warmer! 🔥');
					setHint(`Previous guess: ${prevGuess}`);
					setScore(score - 1);
					loser();
				} else {
					setFeedback('You are getting colder! ❄️');
					setHint(`Previous guess: ${prevGuess}`);
					setScore(score - 1);
					loser();
				}
			}
			setPrevGuess(currentGuess);
			setPrevGuessInfo(currentGuessInfo);
		}
	}, [currentGuess, currentGuessInfo, ranCapInfo]);

	function loser() {
		if (score === 1) {
			setFeedback('You lost! 😟');
			setIsLoser(true);
			return;
		}
	}

	function winner() {
		setFeedback('Congrats! You won! 🎉');
		setIsWinner(true);
		if (score > highScore) {
			setHighScore(score);
		}
		return;
	}

	const gameFinished = isWinner || isLoser;

	const handleReset = async () => {
		await getCapitalInfo();
		setInputValue('');
		setCurrentGuess(null);
		setCurrentGuessInfo(null);
		setPrevGuess(null);
		setPrevGuessInfo(null);
		setFeedback('');
		setHint('');
		setScore(20);
		setIsWinner(false);
		setIsLoser(false);
		attempt = 0;
	};

	const handleGiveUp = () => {
		setFeedback('You gave up! 😢');
		setIsLoser(true);
	};

	return {
		inputValue,
		setInputValue,
		currentGuess,
		currentGuessInfo,
		prevGuess,
		prevGuessInfo,
		feedback,
		hint,
		score,
		highScore,
		isWinner,
		isLoser,
		gameFinished,
		handleSubmit,
		handleReset,
		handleGiveUp,
	};
}
