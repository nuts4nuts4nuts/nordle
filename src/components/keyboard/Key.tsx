import { ReactNode } from 'react'
import classnames from 'classnames'
import { KeyValue } from '../../lib/keyboard'
import { CharStatus } from '../../lib/statuses'

type Props = {
  children?: ReactNode
  value: KeyValue
  width?: number
  status?: CharStatus
  onClick: (value: KeyValue) => void
}

export const Key = ({
  children,
  status,
  width = 42,
  value,
  onClick,
}: Props) => {
  const classes = classnames(
    'flex items-center justify-center rounded mx-0.5 text-xs font-bold cursor-pointer select-none',
    {
      'bg-slate-200 hover:bg-slate-300 active:bg-slate-400': !status,
      'bg-slate-400 text-white': status === 'absent',
      'bg-green-500 hover:bg-green-600 active:bg-green-700 text-white':
        status === 'correct',
      'bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white':
        status === 'present',
    }
  )

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    onClick(value)
    event.currentTarget.blur()
  }

  return (
    <button
      style={{ width: `${width}px`, height: '42px' }}
      className={classes}
      onClick={handleClick}
    >
      {children || value}
    </button>
  )
}
