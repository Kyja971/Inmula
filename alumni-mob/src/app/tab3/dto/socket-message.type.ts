export type SocketMessageType = {
  datetime: Date,
  emitter: string,
  content: string,
  recipient?: string
}