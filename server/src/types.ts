import { ServerEmit, ServerOn } from '../../interface/socket-interfaces'

export type TypedServerSocket = {
  on: ServerOn
  emit: ServerEmit
}
