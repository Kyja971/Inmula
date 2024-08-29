import { CompanyType } from "../company/company-type"
import { PoeType } from "../poe/poe-type"

export type InternType = {
    _id?: string
    lastName: string
    firstName: string
    occupation?: string
    gender?:string
    emails? : Array<string>
    phone?:string
    company?: CompanyType
    poe: PoeType
}