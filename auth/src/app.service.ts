/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { AuthBodyType } from './models/auth-body.type';
import { TokenType } from './models/token.type';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountEntity } from './models/account-entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(@InjectRepository(AccountEntity) private _repository: Repository<AccountEntity>) {}

  async login(body: AuthBodyType): Promise<TokenType | null> {
    if (await this._repository.findOne({ where: { email: body.email } })) {
      return { token: 'Ceci est un token' };
    }
    return null;
  }
}
