import { getGuessStatuses } from '../../lib/statuses'
import { Cell } from './Cell'

type Props = {
  guesses: string[]
  guessIndex: number
  correctGuesses: string[]
  solutionIndex: number
}

export const CompletedRow = ({ guesses, guessIndex, correctGuesses, solutionIndex }: Props) => {
  const guess = guesses[guessIndex]
  const statuses = getGuessStatuses(guess, solutionIndex)

  let firstInstance = true
  for (let i=guessIndex - 1; i >= 0; --i) {
    if (guesses[i] === guess) {
      firstInstance = false
    }
  }

  // The game is over
  if (guesses.length === 10) {
    return (
      <div className="flex justify-center items-center mb-1">
        {guess.split('').map((letter, i) => (
          <Cell
            key={i}
            value={letter}
            status={correctGuesses.includes(guess) && firstInstance ? 'correct' : statuses[i]}
          />
        ))}
      </div>
    )
  }

  // Correct and this is the first instance of the word
  // So put arrows
  if (correctGuesses.includes(guess) && firstInstance) {
    return (
      <div className="flex justify-center items-center mb-1">
        <div className="w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[14px] mr-1 border-green-500"></div>
        {guess.split('').map((letter, i) => (
          <Cell key={i} value={letter} status={statuses[i]} />
        ))}
        <div className="w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-r-[14px] ml-1 border-green-500"></div>
      </div>
    )
  }

  // Incorrect and the game isn't over
  return (
    <div className="flex justify-center items-center mb-1">
        <div className="w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[14px] mr-1 border-slate-400"></div>
        {guess.split('').map((letter, i) => (
          <Cell key={i} value={letter} status={statuses[i]} />
        ))}
        <div className="w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-r-[14px] ml-1 border-slate-400"></div>
    </div>
  )
}
