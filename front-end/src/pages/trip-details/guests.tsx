import { CircleDashed, CircleCheck, UserCog } from "lucide-react";
import { Button } from "../../components/button";

export function Guests() {
  return (
    <div className='space-y-6'>
      <h2 className="text-xl font-semibold">
        Convidados
      </h2>

      <div className="space-y-5">
        <div className="flex items-center justify-between gap-4">
          <div className='space-y-1.5'>
            <span className="block font-medium text-zinc-100">Jessica White</span>
            <span className='block text-sm truncate text-zinc-400'>jessica.white44@yahoo.com</span>
          </div>

          <CircleDashed className='size-5 text-zinc-400 shrink-0' />
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className='space-y-1.5'>
            <span className="block font-medium text-zinc-100">Lacy Stiedemann</span>
            <span className='block text-sm truncate text-zinc-400'>lacy.stiedemann@gmail.com</span>
          </div>

          <CircleCheck className='size-5 text-lime-300 shrink-0' />
        </div>
      </div>

      <Button
        variant='secondary'
        size='full'
        type='button'
      >
        <UserCog className='size-5' />
        Gerenciar convidados
      </Button>
    </div>
  )
}