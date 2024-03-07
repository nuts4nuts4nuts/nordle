import {
  GameStats,
  loadStatsFromLocalStorage,
  saveStatsToLocalStorage,
} from './localStorage'

export const addStatsForCompletedGame = (
  gameStats: GameStats,
  correctWords: number
) => {
  const stats = { ...gameStats }

  stats.totalGames += 1

  stats.wordDistribution[correctWords] += 1
  stats.currentStreak += 1

  if (stats.bestStreak < stats.currentStreak) {
    stats.bestStreak = stats.currentStreak
  }

  stats.averageWords = getAverageWords(stats)

  saveStatsToLocalStorage(stats)
  return stats
}

const defaultStats: GameStats = {
  wordDistribution: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  currentStreak: 0,
  bestStreak: 0,
  totalGames: 0,
  averageWords: 0,
}

export const loadStats = () => {
  return loadStatsFromLocalStorage() || defaultStats
}

const getAverageWords = (gameStats: GameStats) => {
  const { totalGames, wordDistribution } = gameStats

  let wordSum = 0
  for (let i = 0; i < wordDistribution.length; ++i) {
    wordSum += i * wordDistribution[i]
  }
  return wordSum / totalGames
}
