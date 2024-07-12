import { FormEvent, useState } from 'react'
import { InviteGuestsModal } from './invite-guests-modal'
import { ConfirmTripModal } from './confirm-trip-modal'
import { useNavigate } from 'react-router-dom'
import { DestinationAndDateStep } from './steps/destination-and-date-step'
import { InviteGuestsStep } from './steps/invite-guests-step'

export function CreateTripPage() {
  const navigate = useNavigate()

  const [isGuestsInputOppen, setIsGuestsInputOppen] = useState(false)
  const [isGuestsModalOppen, setIsGuestsModalOppen] = useState(false)
  const [isConfirmTripModalOppen, setIsConfirmTripModalOppen] = useState(false)
  const [emailsToInvite, setEmailsToInvite] = useState<string[]>([])

  function openGuestsInput() {
    setIsGuestsInputOppen(true)
  }
  
  function closeGuestsInput() {
    setIsGuestsInputOppen(false)
  }
  
  function openGuestsModal() {
    setIsGuestsModalOppen(true)
  }
  
  function closeGuestsModal() {
    setIsGuestsModalOppen(false)
  }
  
  function openConfirmTripModal() {
    setIsConfirmTripModalOppen(true)
  }
  
  function closeConfirmTripModal() {
    setIsConfirmTripModalOppen(false)
  }

  function addNewEmailToInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget)
    const email = data.get('email')?.toString()

    if (!email) return

    if (emailsToInvite.includes(email)) return

    setEmailsToInvite([...emailsToInvite, email])

    event.currentTarget.reset()
  }

  function removeEmailToInvite(emailToRemove: string) {
    const newEmailList = emailsToInvite.filter(email => email !== emailToRemove)

    setEmailsToInvite(newEmailList)
  }

  function createTrip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    navigate('trips/123')
  }

  return (
    <div className="flex items-center justify-center h-screen bg-center bg-no-repeat bg-pattern">
      <div className="w-full max-w-3xl px-6 space-y-10 text-center">
        <div className='flex flex-col gap-3'>
          <img src="/logo.svg" alt="plann.er" />
          <p className="text-zinc-300 taxt-lg">
            Convide seus amigos e planeje sua próxima viagem!
          </p>
        </div>

        <div className='space-y-4'>
          <DestinationAndDateStep
            isGuestsInputOppen={isGuestsInputOppen}
            openGuestsInput={openGuestsInput}
            closeGuestsInput={closeGuestsInput}
          />

          {isGuestsInputOppen && (
              <InviteGuestsStep
                openGuestsModal={openGuestsModal}
                openConfirmTripModal={openConfirmTripModal}
                emailsToInvite={emailsToInvite}
              />
          )}
        </div>

        <p className="text-sm text-zinc-500">
          Ao planejar sua viagem pela plann.er você automaticament concorda <br/>
          com nossos <a href="#" className="underline text-zinc-300">termos de uso</a> e as <a href="#" className="underline text-zinc-300">políticas de privacidade</a>.
        </p>
      </div>

      {
        isGuestsModalOppen && (
          <InviteGuestsModal
            emailsToInvite={emailsToInvite}
            addNewEmailToInvite={addNewEmailToInvite}
            closeGuestsModal={closeGuestsModal}
            removeEmailToInvite={removeEmailToInvite}
          />
        )
      }

      {
        isConfirmTripModalOppen && (
          <ConfirmTripModal
            createTrip={createTrip}
            closeConfirmTripModal={closeConfirmTripModal}
          />
        )
      }
    </div>
  )
}