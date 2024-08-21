import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/* eslint-disable prettier/prettier */
@Entity({
    name:'post'
})
export class PostEntity {
    @PrimaryGeneratedColumn()
    id:number

    @Column({length: 75})
    title:string

    @Column()
    postedAt: Date

    @Column({type: 'text'})
    content: string

    /**
     * @todo move to OneToMany
     */
    @Column()
    media: string

    /**
     * @todo Either move to ManytoOne or enum
     */
    @Column()
    type: string

    @Column()
    autor: string

}
