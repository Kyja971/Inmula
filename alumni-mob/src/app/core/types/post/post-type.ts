import { Intern } from "../intern/intern-class"
import { InternType } from "../intern/intern-type"
import { PostTypeEnum } from "./post-type-enum"

export type PostType = {
    id?: number
    title?: string
    content: string
    media?: string
    type : PostTypeEnum
    postedAt: Date
    author: Intern
}