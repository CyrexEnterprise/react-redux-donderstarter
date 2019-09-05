import { AuthPayloads } from 'containers/Auth/types'

export interface LoginProps {
  logUserIn: (payload: AuthPayloads['login']) => void,
}
