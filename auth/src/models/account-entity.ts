import { Contains, IsEmail } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'account',
})
export class AccountEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 70 })
  @IsEmail()
  @Contains('aelion.fr')
  email: string;

  @Column({ length: 25 })
  password: string;

  @Column()
  role: string;
}
