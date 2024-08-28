import { Intern } from "../intern/intern-class"
import { InternType } from "../intern/intern-type"

export type PostType = {
    id?: number
    title?: string
    content: string
    media?: string
    postedAt: Date
    author: Intern
}