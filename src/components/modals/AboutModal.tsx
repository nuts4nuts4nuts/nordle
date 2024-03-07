import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const AboutModal = ({ isOpen, handleClose }: Props) => {
  return (
    <BaseModal title="About" isOpen={isOpen} handleClose={handleClose}>
      <p className="text-sm text-gray-500">
        This is Nordle. <a href="https://github.com/nuts4nuts4nuts/nordle" className="underline font-bold">Find my code here.</a>
      </p>
    </BaseModal>
  )
}
