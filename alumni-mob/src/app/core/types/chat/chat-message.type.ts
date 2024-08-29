export type ChatMessageType = {
  emitter: string,
  recipient: string | undefined,
  datetime: Date,
  content: string
}
