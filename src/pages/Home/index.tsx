import { useContext } from 'react'
import { HandPalm, Play } from 'phosphor-react'
import { FormProvider, useForm } from 'react-hook-form'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { NewCycleForm } from './components/NewCycleForm'
import { Countdown } from './components/Countdown'
import { CyclesContext } from '../../contexts/CyclesContext'

import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles'

interface NewCycleFormData {
  task: string
  minutesAmount: number
}
// or use also
// type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(10, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(10, 'O ciclo precisa ser de no mínimo 10 minutos.')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos.'),
})

export function Home() {
  const { activeCycle, createNewCycle, interruptCurrentCycle } =
    useContext(CyclesContext)

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const { handleSubmit, watch, reset } = newCycleForm

  function handleCreateNewCycle(data: NewCycleFormData) {
    createNewCycle(data)
    reset()
  }

  const isFieldTaskEmpty = watch('task')
  const isFieldMinutesAmountEmpty = watch('minutesAmount')

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />

        {activeCycle ? (
          <StopCountdownButton onClick={interruptCurrentCycle} type="submit">
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton
            disabled={!isFieldTaskEmpty && !isFieldMinutesAmountEmpty}
            type="submit"
          >
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
