import { CompletedRow } from './CompletedRow'
import { CurrentRow } from './CurrentRow'
import { EmptyRow } from './EmptyRow'

type Props = {
  guesses: string[]
  correctGuesses: string[]
  currentGuess: string
  solutionIndex: number
}

export const Grid = ({ guesses, correctGuesses, currentGuess, solutionIndex }: Props) => {
  const empties =
    guesses.length < 9 ? Array.from(Array(9 - guesses.length)) : []

  let solutionIndices = Array(10).fill(solutionIndex)
  if (guesses.length === 10) {
    let currentSolution = 0
    for (let i=0; i < guesses.length; ++i) {
      solutionIndices[i] = currentSolution
      if (correctGuesses.includes(guesses[i])) {
        ++currentSolution
      }
    }
  }

  return (
    <div className="w-80 pb-6">
      {guesses.map((guess, i) => (
        <CompletedRow
          key={i}
          guesses={guesses}
          guessIndex={i}
          correctGuesses={correctGuesses}
          solutionIndex={solutionIndices[i]}
        />
      ))}
      {guesses.length < 10 && <CurrentRow guess={currentGuess} />}
      {empties.map((_, i) => (
        <EmptyRow key={i} />
      ))}
    </div>
  )
}
