import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DateRange } from 'react-day-picker'

import { api } from '../../lib/axios'

import { DestinationAndDateStep } from './steps/destination-and-date-step'
import { InviteGuestsStep } from './steps/invite-guests-step'
import { InviteGuestsModal } from './invite-guests-modal'
import { ConfirmTripModal } from './confirm-trip-modal'

export function CreateTripPage() {
  const navigate = useNavigate()
  const [emailsToInvite, setEmailsToInvite] = useState([
    'diego@rocketseat.com.br',
    'john@acme.com'
  ])
  const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false)
  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false)
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false)

  const [ownerName, setOwnerName] = useState('')
  const [ownerEmail, setOwnerEmail] = useState('')
  const [destination, setDestination] = useState('')
  const [eventStartAndEndDates, setEventStartAndEndDates] = useState<
    DateRange | undefined
  >()

  function openGuestsInput() {
    setIsGuestsInputOpen(true)
  }

  function closeGuestsInput() {
    setIsGuestsInputOpen(false)
  }

  function openGuestsModal() {
    setIsGuestsModalOpen(true)
  }

  function closeGuestsModal() {
    setIsGuestsModalOpen(false)
  }

  function openConfirmTripModal() {
    setIsConfirmTripModalOpen(true)
  }

  function closeConfirmTripModal() {
    setIsConfirmTripModalOpen(false)
  }

  function addNewEmailToInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    const email = data.get('email')?.toString()

    if (!email) return

    if (emailsToInvite.includes(email)) return

    setEmailsToInvite([...emailsToInvite, email])

    event.currentTarget.reset()
  }

  function removeEmailFromInvites(emailToRemove: string) {
    const newEmailList = emailsToInvite.filter(email => email !== emailToRemove)

    setEmailsToInvite(newEmailList)
  }

  async function createTrip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!destination) return

    if (!eventStartAndEndDates?.from || !eventStartAndEndDates?.to) return

    if (emailsToInvite.length === 0) return

    if (!ownerName || !ownerEmail) return

    const response = await api.post('/trips', {
      starts_at: eventStartAndEndDates.from,
      ends_at: eventStartAndEndDates.to,
      emails_to_invite: emailsToInvite,
      owner_email: ownerEmail,
      owner_name: ownerName,
      destination
    })

    const { tripId } = response.data

    navigate(`/trips/${tripId}`)
  }

  return (
    <div className='flex items-center justify-center h-screen bg-center bg-no-repeat bg-pattern'>
      <div className='w-full max-w-3xl px-6 space-y-10 text-center'>
        <div className='flex flex-col items-center gap-3'>
          <img src='/logo.svg' alt='plann.er' />
          <p className='text-lg text-zinc-300'>
            Convide seus amigos e planeje sua próxima viagem!
          </p>
        </div>

        <div className='space-y-4'>
          <DestinationAndDateStep
            setEventStartAndEndDates={setEventStartAndEndDates}
            eventStartAndEndDates={eventStartAndEndDates}
            isGuestsInputOpen={isGuestsInputOpen}
            closeGuestsInput={closeGuestsInput}
            openGuestsInput={openGuestsInput}
            setDestination={setDestination}
          />

          {isGuestsInputOpen && (
            <InviteGuestsStep
              openConfirmTripModal={openConfirmTripModal}
              openGuestsModal={openGuestsModal}
              emailsToInvite={emailsToInvite}
            />
          )}
        </div>

        <p className='text-sm text-zinc-500'>
          Ao planejar sua viagem pela plann.er você automaticamente concorda{' '}
          <br />
          com nossos{' '}
          <a className='underline text-zinc-300' href='#'>
            termos de uso
          </a>{' '}
          e{' '}
          <a className='underline text-zinc-300' href='#'>
            políticas de privacidade
          </a>
          .
        </p>
      </div>

      {isGuestsModalOpen && (
        <InviteGuestsModal
          removeEmailFromInvites={removeEmailFromInvites}
          addNewEmailToInvite={addNewEmailToInvite}
          closeGuestsModal={closeGuestsModal}
          emailsToInvite={emailsToInvite}
        />
      )}

      {isConfirmTripModalOpen && (
        <ConfirmTripModal
          closeConfirmTripModal={closeConfirmTripModal}
          setOwnerEmail={setOwnerEmail}
          setOwnerName={setOwnerName}
          createTrip={createTrip}
        />
      )}
    </div>
  )
}
