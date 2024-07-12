import { UserRoundPlus, ArrowRight } from "lucide-react";
import { Button } from "../../../components/button";

interface InviteGuestsStepProps {
  openGuestsModal: () => void;
  openConfirmTripModal: () => void;
  emailsToInvite: string[];
}

export function InviteGuestsStep({
  openGuestsModal,
  openConfirmTripModal,
  emailsToInvite
} : InviteGuestsStepProps) {
  return (
    <div className="flex items-center h-16 gap-3 px-4 bg-zinc-900 rounded-xl shadow-shape">
      <div className="flex items-center flex-1 gap-2">
        <button
          onClick={openGuestsModal}
          type="button"
          className="flex items-center flex-1 gap-2 text-lg bg-transparent outline-none text-zinc-400"
        >
          <UserRoundPlus className='size-5 text-zinc-400' />
          {emailsToInvite.length > 0 ? (
            <span className='flex-1 text-lg text-zinc-400'>
              {emailsToInvite.length} pessoa{emailsToInvite.length > 1 && 's'} convidada{emailsToInvite.length > 1 && 's'}
            </span>
          ) : (
            <span className='flex-1 text-lg text-zinc-400'>
              Quem estará na viagem?
            </span>
          )}
        </button>
      </div>

      <div className='w-px h-6 bg-zinc-800' />

      <Button
        variant='prymary'
        type='button'
        onClick={openConfirmTripModal}
      >
        Confirmar viagem
        <ArrowRight className='size-5' />
      </Button>
    </div>
  )
}