import { WORDS } from '../constants/wordlist'
import { VALIDGUESSES } from '../constants/validGuesses'

export const isWordInWordList = (word: string) => {
  return (
    WORDS.includes(word.toLowerCase()) ||
    VALIDGUESSES.includes(word.toLowerCase())
  )
}

export const isWinningWord = (word: string, solutionIndex: number) => {
  return solutions[solutionIndex] === word
}

const shuffle = (wordList: string[]) => {
  const min = 0
  for (let i=wordList.length - 1; i > 0; --i) {
    const max = i - 1
    const swap_index = Math.floor(Math.random() * (max - min + 1)) + min;
    // Could be xor swap or whatever... screw it
    const placeholder = wordList[i]
    wordList[i] = wordList[swap_index]
    wordList[swap_index] = placeholder
  }
}

export const getWordOfDay = () => {
  // January 30, 2022 Game Epoch
  const epochMs = new Date('January 30, 2022 00:00:00').valueOf()
  const now = Date.now()
  const msInDay = 86400000
  const day = Math.floor((now - epochMs) / msInDay)
  const nextday = (day + 1) * msInDay + epochMs

  const number_of_boards = WORDS.length / 10
  const index = day % number_of_boards
  const trueIndex = index * 10
  const seed = Math.floor(day / number_of_boards)

  let seedrandom = require('seedrandom');
  seedrandom(seed, {global: true})
  let words = WORDS
  shuffle(words)
  const solutions = words.slice(trueIndex, trueIndex + 10)

  return {
    solutions: solutions.map(word => word.toUpperCase()),
    day: day,
    tomorrow: nextday,
  }
}

export const { solutions, day, tomorrow } = getWordOfDay()
