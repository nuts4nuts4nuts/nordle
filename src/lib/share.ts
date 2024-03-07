import { getGuessStatuses } from './statuses'
import { day } from './words'

export const shareStatus = (guesses: string[], correctGuesses: string[]) => {
  navigator.clipboard.writeText(
    `Nordle ${day} - ${correctGuesses.length}/10\n\n` +
      generateEmojiGrid(guesses, correctGuesses) + "\nnordle.net"
  )
}

export const generateEmojiGrid = (guesses: string[], correctGuesses: string[]) => {
  let emojiGrid: string[] = []
  let solutionIndex = 0;
  for (let i=0; i < guesses.length; ++i) {
    const status = getGuessStatuses(guesses[i], solutionIndex)
    emojiGrid.push(guesses[i]
		   .split('')
		   .map((letter, i) => {
		     switch (status[i]) {
		       case 'correct':
			 return '🟩'
		       case 'present':
			 return '🟦'
		       default:
			 return '⬜'
		     }
		   })
		   .join(''))
  }

  return emojiGrid.join('\n')
}
