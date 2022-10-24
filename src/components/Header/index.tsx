import { HeaderContainer } from './styles'

import logoIgnite from '../../assets/logo-ignite.svg'

export function Header() {
  return (
    <HeaderContainer>
      <img src={logoIgnite} alt="Logo" />
      <nav>
        <a href="">Timer</a>
        <a href="">History</a>
      </nav>
    </HeaderContainer>
  )
}
