import { Expose } from 'class-transformer';
import { PoeType } from '../poe/poe-type';
import { CompanyType } from '../company/company-type';

export class Intern {
    @Expose({ name: '_id' })
    id?: string
    @Expose({ name: 'lastname' })
    lastName!: string
    @Expose({ name: 'firstname' })
    firstName!: string
    @Expose()
    gender!:string
    @Expose()
    emails!: Array<string>
    @Expose({name: "phonenumber"})
    phone!: string
    @Expose({name: "function"})
    occupation!: string
    @Expose()
    company!: CompanyType
    @Expose()
    poe!: PoeType
}