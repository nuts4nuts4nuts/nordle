import { BaseModal } from './BaseModal'


type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const InfoModal = ({ isOpen, handleClose }: Props) => {
  return (
    <BaseModal title="How to play" isOpen={isOpen} handleClose={handleClose}>
      <p className="text-sm text-gray-500">
        After guessing one word, keep trying to guess more. There are ten 
        potential words each day.
      </p>
    </BaseModal>
  )
}
