import { UserRoundPlus, ArrowRight } from 'lucide-react'

import { Button } from '../../../components/button'

interface InviteGuestsStepProps {
  emailsToInvite: string[]
  openGuestsModal: () => void
  openConfirmTripModal: () => void
}

export function InviteGuestsStep({
  emailsToInvite,
  openGuestsModal,
  openConfirmTripModal
}: InviteGuestsStepProps) {
  return (
    <div className='flex items-center h-16 gap-3 px-4 bg-zinc-900 rounded-xl shadow-shape'>
      <button
        type='button'
        onClick={openGuestsModal}
        className='flex items-center flex-1 gap-2 text-left'
      >
        <UserRoundPlus className='size-5 text-zinc-400' />
        {emailsToInvite.length > 0 ? (
          <span className='flex-1 text-lg text-zinc-100'>
            {emailsToInvite.length} pessoa(s) convidada(s)
          </span>
        ) : (
          <span className='flex-1 text-lg text-zinc-400'>
            Quem estará na viagem?
          </span>
        )}
      </button>

      <div className='w-px h-6 bg-zinc-800' />

      <Button onClick={openConfirmTripModal}>
        Confirmar viagem
        <ArrowRight className='size-5' />
      </Button>
    </div>
  )
}
