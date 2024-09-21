import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from 'src/app.service';
import { AuthDto } from 'src/utils/dto/auth-dto';
import { ActivationService } from './activation.service';

@Controller('activation')
export class ActivationController {

    constructor(
        private _activationService: ActivationService
    ) {}

    @MessagePattern({ message: "setPassword" })
    setPassword(payload: any): Promise<AuthDto> {
      return this._activationService.setPassword(payload);
    }

}
