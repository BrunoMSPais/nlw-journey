import { MapPin, Calendar, Settings2, ArrowRight } from 'lucide-react'
import { Button } from '../../../components/button'

interface DestinationAndDateStepProps {
  isGuestsInputOppen: boolean
  openGuestsInput: () => void
  closeGuestsInput: () => void
}

export function DestinationAndDateStep({
  isGuestsInputOppen,
  openGuestsInput,
  closeGuestsInput
}: DestinationAndDateStepProps) {
  return (
    <div className="flex items-center h-16 gap-3 px-4 bg-zinc-900 rounded-xl shadow-shape">
      <div className="flex items-center flex-1 gap-2">
        <MapPin className='size-5 text-zinc-400' />
        <input
          disabled={isGuestsInputOppen}
          type="text"
          placeholder="Para onde você vai?"
          className="flex-1 text-lg bg-transparent outline-none placeholder-zinc-400"
        />
      </div>

      <div className="flex items-center gap-2">
        <Calendar className='size-5 text-zinc-400' />
        <input
          disabled={isGuestsInputOppen}
          type="text"
          placeholder="Quando?"
          className="w-40 text-lg bg-transparent outline-none placeholder-zinc-400"
        />
      </div>

      <div className='w-px h-6 bg-zinc-800' />

      {
        isGuestsInputOppen ? (
          <Button
            variant='secondary'
            type='button'
            onClick={closeGuestsInput}
          >
            Alterar local/data
            <Settings2 className='size-5' />
          </Button>
        ) : (
          <Button
            variant='prymary'
            type='button'
            onClick={openGuestsInput}
          >
            Continuar
            <ArrowRight className='size-5' />
          </Button>
        )
      }
    </div>
  )
}