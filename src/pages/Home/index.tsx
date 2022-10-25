export function Home() {
  return (
    <div>
      <form action="">
        <label htmlFor="task">Vou trabalhar em</label>
        <input id="task" type="text" />

        <label htmlFor="minutesAmount">durante</label>
        <input id="minutesAmount" type="text" />

        <span>minutos.</span>
      </form>
    </div>
  )
}
