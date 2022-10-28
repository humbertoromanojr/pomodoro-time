import { useForm } from 'react-hook-form'
import { Play } from 'phosphor-react'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountdownButton,
  TaskInput,
} from './styles'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(10, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(10, 'O ciclo precisa ser de no mínimo 10 minutos.')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos.'),
})

interface NewCycleFormData {
  task: string
  minutesAmount: number
}

export function Home() {
  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  function handleCreateNewCycle(data: NewCycleFormData) {
    console.log(data)
    reset()
  }

  const isFieldTaskEmpty = watch('task')
  const isFieldMinutesAmountEmpty = watch('minutesAmount')

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            list="task-suggestions"
            type="text"
            placeholder="Dê um nome para o seu projeto"
            {...register('task')}
          />
          <datalist id="task-suggestions">
            <option value="Projeto 01" />
            <option value="Projeto 01" />
            <option value="Projeto 01" />
            <option value="Projeto 01" />
            <option value="Projeto 01" />
          </datalist>

          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput
            id="minutesAmount"
            type="number"
            placeholder="00"
            step={10}
            min={10}
            // max={60}
            {...register('minutesAmount', { valueAsNumber: true })}
          />

          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartCountdownButton
          disabled={!isFieldTaskEmpty && !isFieldMinutesAmountEmpty}
          type="submit"
        >
          <Play size={24} />
          Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}
