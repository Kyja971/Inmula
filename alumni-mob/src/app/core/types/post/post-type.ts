import { Intern } from "../intern/intern-class"
import { PostTypeEnum } from "./post-type-enum"

export type PostType = {
    id?: number
    title?: string
    content: string
    media?: string
    type : PostTypeEnum
    postedAt: Date
    authorId: string
    author: Intern
}