import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountEntity } from 'src/models/account-entity';
import { encodePaswrd } from 'src/utils/bcrytpt';
import { Repository } from 'typeorm';

@Injectable()
export class ActivationService {

    constructor(
        @InjectRepository(AccountEntity) private _repository: Repository<AccountEntity>,
    ) {}

    async setPassword(payload: any) {
        let existingAuth = await this._repository.findOne({
          where: { email: payload.email }
        })
        
        existingAuth.password = encodePaswrd(payload.password)
        return await this._repository.save(existingAuth)
      }

}
