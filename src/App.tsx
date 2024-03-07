import { InformationCircleIcon } from '@heroicons/react/outline'
import { ChartBarIcon } from '@heroicons/react/outline'
import { useState, useEffect } from 'react'
import { Alert } from './components/alerts/Alert'
import { Grid } from './components/grid/Grid'
import { Keyboard } from './components/keyboard/Keyboard'
import { AboutModal } from './components/modals/AboutModal'
import { InfoModal } from './components/modals/InfoModal'
import { StatsModal } from './components/modals/StatsModal'
import { WIN_MESSAGES } from './constants/strings'
import { isWordInWordList, isWinningWord, solutions } from './lib/words'
import { addStatsForCompletedGame, loadStats } from './lib/stats'
import {
  loadGameStateFromLocalStorage,
  saveGameStateToLocalStorage,
} from './lib/localStorage'

const ALERT_TIME_MS = 1000

function App() {
  const [currentGuess, setCurrentGuess] = useState('')
  const [solutionIndex, setSolutionIndex] = useState(0)
  const [correctGuesses, setCorrectGuesses] = useState<string[]>([])
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false)
  const [isNotEnoughLetters, setIsNotEnoughLetters] = useState(false)
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false)
  const [isWordNotFoundAlertOpen, setIsWordNotFoundAlertOpen] = useState(false)
  const [successAlert, setSuccessAlert] = useState('')
  const [guesses, setGuesses] = useState<string[]>(() => {
    const loaded = loadGameStateFromLocalStorage()
    // Make sure that our guesses apply to the current solution set
    if (loaded?.solutions.length !== solutions.length) {
      return []
    }

    for (let i = 0; i < solutions.length; ++i) {
      if (loaded.solutions[i] !== solutions[i]) {
        return []
      }
    }

    setSolutionIndex(loaded.solutionIndex)
    setCorrectGuesses(solutions.slice(0, loaded.solutionIndex))
    return loaded.guesses
  })

  const [stats, setStats] = useState(() => loadStats())

  useEffect(() => {
    saveGameStateToLocalStorage({ guesses, solutions, solutionIndex })
  }, [guesses, solutionIndex])

  useEffect(() => {
    if (guesses.length >= 10) {
      setSuccessAlert(
        WIN_MESSAGES[correctGuesses.length] +
          '\n\nThe next word was: ' +
          solutions[solutionIndex]
      )
      setTimeout(() => {
        setSuccessAlert('')
        setIsStatsModalOpen(true)
      }, ALERT_TIME_MS * 1.5 + ALERT_TIME_MS * (correctGuesses.length / 10))
    }
  }, [guesses, correctGuesses.length, solutionIndex])

  const onChar = (value: string) => {
    if (currentGuess.length < 5 && guesses.length < 10) {
      setCurrentGuess(`${currentGuess}${value}`)
    }
  }

  const onDelete = () => {
    setCurrentGuess(currentGuess.slice(0, -1))
  }

  const onEnter = () => {
    if (guesses.length >= 10) {
      return
    }
    if (!(currentGuess.length === 5)) {
      setIsNotEnoughLetters(true)
      return setTimeout(() => {
        setIsNotEnoughLetters(false)
      }, ALERT_TIME_MS)
    }

    if (!isWordInWordList(currentGuess)) {
      setIsWordNotFoundAlertOpen(true)
      return setTimeout(() => {
        setIsWordNotFoundAlertOpen(false)
      }, ALERT_TIME_MS)
    }

    if (currentGuess.length === 5 && guesses.length < 10) {
      let guesses_ = [...guesses, currentGuess]
      let solutionIndex_ = solutionIndex
      let currentSolution_ = solutions[solutionIndex]
      let correctGuesses_ = correctGuesses

      if (isWinningWord(currentGuess, solutionIndex)) {
        while (guesses_.includes(currentSolution_)) {
          correctGuesses_.push(solutions[solutionIndex_])
          ++solutionIndex_
          currentSolution_ = solutions[solutionIndex_]
        }

        setCorrectGuesses(correctGuesses_)
        setSolutionIndex(Math.min(solutionIndex_, solutions.length - 1))
      }

      setGuesses(guesses_)
      setCurrentGuess('')
      if (guesses.length === 9) {
        setStats(addStatsForCompletedGame(stats, correctGuesses.length))
      }
    }
  }

  return (
    <div className="py-8 max-w-7xl mx-auto sm:px-6 lg:px8">
      <div className="flex w-80 mx-auto items-center mb-8">
        <h1 className="text-xl grow font-bold">Nordle</h1>
        <InformationCircleIcon
          className="h-6 w-6 cursor-pointer"
          onClick={() => setIsInfoModalOpen(true)}
        />
        <ChartBarIcon
          className="h-6 w-6 cursor-pointer"
          onClick={() => setIsStatsModalOpen(true)}
        />
      </div>
      <div className="flex justify-center">
        <Grid
          guesses={guesses}
          correctGuesses={correctGuesses}
          currentGuess={currentGuess}
          solutionIndex={solutionIndex}
        />
      </div>
      <Keyboard
        onChar={onChar}
        onDelete={onDelete}
        onEnter={onEnter}
        guesses={guesses}
        solutionIndex={solutionIndex}
      />
      <InfoModal
        isOpen={isInfoModalOpen}
        handleClose={() => setIsInfoModalOpen(false)}
      />
      <StatsModal
        isOpen={isStatsModalOpen}
        handleClose={() => setIsStatsModalOpen(false)}
        guesses={guesses}
        correctGuesses={correctGuesses}
        gameStats={stats}
        handleShare={() => {
          setSuccessAlert('Game copied to clipboard')
          return setTimeout(() => setSuccessAlert(''), ALERT_TIME_MS)
        }}
      />
      <AboutModal
        isOpen={isAboutModalOpen}
        handleClose={() => setIsAboutModalOpen(false)}
      />

      <button
        type="button"
        className="mx-auto mt-8 flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 select-none"
        onClick={() => setIsAboutModalOpen(true)}
      >
        About this game
      </button>

      <Alert message="Not enough letters" isOpen={isNotEnoughLetters} />
      <Alert message="Word not found" isOpen={isWordNotFoundAlertOpen} />
      <Alert
        message={successAlert}
        isOpen={successAlert !== ''}
        variant="success"
      />
    </div>
  )
}

export default App
