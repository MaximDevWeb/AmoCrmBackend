import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Token } from '../../auth/token.entity';
import { Repository } from 'typeorm';
import { TokenDto } from '../../dto/token.dto/token.dto';
import { HttpService } from '@nestjs/axios';
import * as http from 'http';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(Token)
    private tokenRep: Repository<Token>,
    private readonly http: HttpService,
  ) {}

  async getToken(): Promise<Token> {
    const token = await this.findLast();

    if (token) {
      return token;
    } else {
      const { data } = await firstValueFrom(
        this.http.get('https://test.gnzs.ru/oauth/get-token.php', {
          headers: {
            'X-Client-Id': 30878566,
          },
        }),
      );

      return await this.create({
        token: data.access_token,
      });
    }
  }

  findLast(): Promise<Token> {
    return this.tokenRep.findOne({
      where: {},
      order: { id: 'DESC' },
    });
  }

  create(tokenDto: TokenDto): Promise<Token> {
    const token = new Token();
    token.token = tokenDto.token;

    return this.tokenRep.save(token);
  }
}
