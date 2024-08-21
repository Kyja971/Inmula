/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'poe',
})
export class Poe {
    
  @PrimaryGeneratedColumn()
  id: number;

  @Column({length: 75})
  type:string

  /**
   * @todo OnetoMany
   */
  @Column({length: 75})
  name:string

  @Column()
  beginAt: Date

  @Column()
  endAt: Date
}
