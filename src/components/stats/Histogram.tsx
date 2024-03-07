import { GameStats } from '../../lib/localStorage'
import { Progress } from './Progress'

type Props = {
  gameStats: GameStats
}

export const Histogram = ({ gameStats }: Props) => {
  const wordDistribution = gameStats.wordDistribution
  const maxValue = Math.max(...wordDistribution)

  return (
    <div className="columns-1 justify-left m-2 text-sm">
      {wordDistribution.map((value, i) => (
        <Progress
          key={i}
          index={i}
          size={90 * (value / maxValue)}
          label={String(value)}
        />
      ))}
    </div>
  )
}
