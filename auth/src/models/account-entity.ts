import { Contains, IsEmail, IsEnum } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { RoleTypeEnum } from "./role-type-enum";

@Entity({
  name: "account",
})
export class AccountEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 70 })
  @IsEmail()
  @Contains("aelion.fr")
  email: string;

  @Column({ length: 25 })
  password: string;

  @Column()
  @IsEnum(RoleTypeEnum)
  role: RoleTypeEnum;
 
}
