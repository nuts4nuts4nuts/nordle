import { Cell } from './Cell'

type Props = {
  guess: string
}

export const CurrentRow = ({ guess }: Props) => {
  const splitGuess = guess.split('')
  const emptyCells = Array.from(Array(5 - splitGuess.length))

  return (
    <div className="flex justify-center items-center mb-1">
        <div className="w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[14px] mr-1 border-slate-200"></div>
        {splitGuess.map((letter, i) => (
          <Cell key={i} value={letter} />
        ))}
        {emptyCells.map((_, i) => (
          <Cell key={i} />
        ))}
        <div className="w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-r-[14px] ml-1 border-slate-200"></div>
    </div>
  )
}
