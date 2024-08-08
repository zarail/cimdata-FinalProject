import { useFormHandler } from '../hooks/useFormHandler';
import { useRandomCapitalInfo } from '../hooks/useRandomCapitalInfo';
import { CapitalInfoDisplay } from './CapitalInfoDisplay';

export default function CapitalMain() {
	const { rCInfo, getCapitalInfo } = useRandomCapitalInfo();

	const {
		inputValue,
		setInputValue,
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
	} = useFormHandler(rCInfo, getCapitalInfo);

	return (
		<div className="capital-main">
			<div className="capital-actions">
				{!gameFinished && (
					<button className="capital-button" onClick={handleReset}>
						PLAY AGAIN
					</button>
				)}
				{!gameFinished && (
					<button className="capital-button-secondary" onClick={handleGiveUp}>
						GIVE UP
					</button>
				)}
				<div className="capital-scores">
					<h4 className="capital-score">Your score: {score}</h4>
					<h4 className="capital-highscore">Highscore: {highScore}</h4>
				</div>
			</div>
			<div className="capital-form-container">
				{!gameFinished && (
					<form className="capital-form" onSubmit={handleSubmit}>
						<label htmlFor="capitalInput" className="capital-label">
							<h3>Guess the secret capital city:</h3>
						</label>
						<div className="input-button-container">
							<input
								id="capitalInput"
								type="text"
								className="capital-input"
								value={inputValue}
								onChange={(e) => setInputValue(e.target.value)}
							/>
							<button type="submit" className="capital-button">
								SUBMIT
							</button>
						</div>
					</form>
				)}
			</div>
			<div className="capital-feedback">
				<h4>{feedback}</h4>
			</div>
			{!(isLoser || isWinner) && (
				<div className="capital-hint">
					<h5>{hint}</h5>
				</div>
			)}
			{/* <div className="capital-hint">
				<h5>{hint}</h5>
			</div> */}
			<div className="capital-endgame">
				{(isLoser || isWinner) && (
					<h4>
						<CapitalInfoDisplay {...rCInfo} />
					</h4>
				)}
			</div>
			{gameFinished && (
				<button className="capital-button" onClick={handleReset}>
					PLAY AGAIN
				</button>
			)}
		</div>
	);
}
