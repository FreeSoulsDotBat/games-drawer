import { useState } from 'react'
import './App.scss'
import { MdDelete, MdEdit } from 'react-icons/md'
import { IoMdAddCircle } from 'react-icons/io'
import { FaSave } from 'react-icons/fa'

function App() {
	const [games, setGames] = useState<
		{ id: string; value: string; isEditing: boolean }[]
	>([])
	const [newGame, setNewGame] = useState<string>('')
	const [gameEdition, setGameEdition] = useState<string>('')
	const [gameraffled, setGameRaffled] = useState<string>('')

	const handleAddGame = (value: string) => {
		setGames((prev) => [
			...prev,
			{
				id: `${Math.ceil(Math.random() * 10000)}${value}`,
				value,
				isEditing: false
			}
		])
		setNewGame('')
	}

	const handleSetToEdit = (id: string) => {
		setGameEdition(games.find((item) => item.id === id)?.value ?? '')
		setGames(
			games.map((item) =>
				item.id === id ? { ...item, isEditing: true } : item
			)
		)
	}

	const handleRemoveGame = (id: string) => {
		setGames(games.filter((item) => item.id != id))
	}

	const handleEditGame = (id: string, value: string) => {
		setGames(
			games.map((item) =>
				item.id === id ? { ...item, value, isEditing: false } : item
			)
		)
		setGameEdition('')
	}

	const handleRaffle = () => {
		// const maximumRaffle = 10000
		// const pseudoRandomNumber = Math.random()
		// const raffle = Math.ceil(
		// 	(pseudoRandomNumber == 0 ? 0.1 : pseudoRandomNumber) *
		// 		Math.random() *
		// 		10000
		// )
		// const eachRange = maximumRaffle / games.length
		// const gameRaffled =
	}

	return (
		<>
			<div className="app">
				<div className="app__raffle">
					<h1 className="app__title">SORTEADOR DE GAMES</h1>
					<div className="app__input-container">
						<div className="app__input-box">
							<label htmlFor="add-game" className="app__label">
								Adicione um game para sortear:
							</label>
							<input
								type="text"
								id="add-game"
								className="app__add-game"
								value={newGame}
								onChange={(e) => setNewGame(e.target.value)}
							/>
						</div>
						<IoMdAddCircle
							size={30}
							style={{ cursor: 'pointer' }}
							onClick={() => handleAddGame(newGame)}
						/>
					</div>
					<div className="app__games-raffle-container">
						<div className="app__games-container">
							{games.map(({ value, id, isEditing }) => (
								<div key={id} className="app__games-row">
									{isEditing ? (
										<input
											type="text"
											className="app__edit-game"
											value={gameEdition}
											onChange={(e) =>
												setGameEdition(e.target.value)
											}
										/>
									) : (
										<p className="app__games-title">
											{value}
										</p>
									)}

									<div className="app__game-operations">
										{isEditing ? (
											<FaSave
												size={32}
												style={{ cursor: 'pointer' }}
												onClick={() =>
													handleEditGame(
														id,
														gameEdition
													)
												}
											/>
										) : (
											<>
												<MdEdit
													size={32}
													style={{
														cursor: 'pointer'
													}}
													onClick={() =>
														handleSetToEdit(id)
													}
												/>
												<MdDelete
													size={32}
													style={{
														cursor: 'pointer'
													}}
													onClick={() =>
														handleRemoveGame(id)
													}
												/>
											</>
										)}
									</div>
								</div>
							))}
						</div>
						<div className="app__raffle-container">
							<button
								type="button"
								disabled={games.length < 2}
								className="app__raffle-button"
								onClick={() => handleRaffle()}
							>
								SORTEAR
							</button>
							<div className="app__raffle-result"></div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default App
