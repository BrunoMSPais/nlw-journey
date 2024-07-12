import { useState } from 'react'
import { format } from 'date-fns'
import 'react-day-picker/dist/style.css'
import { DateRange, DayPicker } from 'react-day-picker'
import { MapPin, Calendar, Settings2, ArrowRight, X } from 'lucide-react'

import { Button } from '../../../components/button'

interface DestinationAndDateStepProps {
  isGuestsInputOpen: boolean
  openGuestsInput: () => void
  closeGuestsInput: () => void
  eventStartAndEndDates: DateRange | undefined
  setDestination: (destination: string) => void
  setEventStartAndEndDates: (dates: DateRange | undefined) => void
}

export function DestinationAndDateStep({
  setDestination,
  openGuestsInput,
  closeGuestsInput,
  isGuestsInputOpen,
  eventStartAndEndDates,
  setEventStartAndEndDates,
}: DestinationAndDateStepProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)

  function openDatePicker() {
    setIsDatePickerOpen(true)
  }

  function closeDatePicker() {
    setIsDatePickerOpen(false)
  }

  const displayedDate =
    eventStartAndEndDates &&
    eventStartAndEndDates.from &&
    eventStartAndEndDates.to
      ? format(eventStartAndEndDates.from, "d' de 'LLL")
          .concat(' até ')
          .concat(format(eventStartAndEndDates.to, "d' de 'LLL"))
      : null

  return (
    <div className='flex items-center h-16 gap-3 px-4 bg-zinc-900 rounded-xl shadow-shape'>
      <div className='flex items-center flex-1 gap-2'>
        <MapPin className='size-5 text-zinc-400' />
        <input
          type='text'
          disabled={isGuestsInputOpen}
          placeholder='Para onde você vai?'
          className='flex-1 text-lg bg-transparent outline-none placeholder-zinc-400'
          onChange={event => setDestination(event.target.value)}
        />
      </div>

      <button
        onClick={openDatePicker}
        disabled={isGuestsInputOpen}
        className='flex items-center gap-2 text-left w-[240px]'
      >
        <Calendar className='size-5 text-zinc-400' />
        <span className='flex-1 w-40 text-lg text-zinc-400'>
          {displayedDate || 'Quando'}
        </span>
      </button>

      {isDatePickerOpen && (
        <div className='fixed inset-0 flex items-center justify-center bg-black/60'>
          <div className='px-6 py-5 space-y-5 rounded-xl shadow-shape bg-zinc-900'>
            <div className='space-y-2'>
              <div className='flex items-center justify-between'>
                <h2 className='font-semibold font-lg'>Selecione a data</h2>
                <button>
                  <X
                    onClick={closeDatePicker}
                    className='size-5 text-zinc-400'
                  />
                </button>
              </div>
            </div>

            <DayPicker
              mode='range'
              selected={eventStartAndEndDates}
              onSelect={setEventStartAndEndDates}
            />
          </div>
        </div>
      )}

      <div className='w-px h-6 bg-zinc-800' />

      {isGuestsInputOpen ? (
        <Button onClick={closeGuestsInput} variant='secondary'>
          Alterar local/data
          <Settings2 className='size-5' />
        </Button>
      ) : (
        <Button onClick={openGuestsInput}>
          Continuar
          <ArrowRight className='size-5' />
        </Button>
      )}
    </div>
  )
}
