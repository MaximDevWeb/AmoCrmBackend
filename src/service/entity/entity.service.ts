import { Injectable } from '@nestjs/common';
import { EntityDto } from '../../dto/entity.dto/entity.dto';
import { HttpService } from '@nestjs/axios';
import { TokenService } from '../token/token.service';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class EntityService {
  constructor(
    private readonly http: HttpService,
    private tokenService: TokenService,
  ) {}

  async create(entity: EntityDto): Promise<EntityDto> {
    const token = await this.tokenService.getToken();
    const url = `https://d6757be6f1100.amocrm.ru/api/v4/${entity.type}`;
    const reqData = [{ name: entity.name }];

    const { data } = await firstValueFrom(
      this.http.post(url, reqData, {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      }),
    );

    const company = data._embedded.companies[0];

    return {
      id: company.id,
      name: entity.name,
      type: entity.type,
    };
  }
}
