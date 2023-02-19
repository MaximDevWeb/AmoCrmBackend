import { Body, Controller, Get, Post } from '@nestjs/common';
import { EntityDto } from '../../../dto/entity.dto/entity.dto';
import { EntityService } from '../../../service/entity/entity.service';
import { TokenService } from '../../../service/token/token.service';
import { TokenDto } from '../../../dto/token.dto/token.dto';

@Controller('entity')
export class EntityController {
  constructor(
    private entityService: EntityService,
    private tokenService: TokenService,
  ) {}

  @Post('store')
  store(@Body() entity: EntityDto) {
    return this.entityService.create(entity);
  }
}
