import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  public getHello(): string {
    return '<h1>Minha loja.com</h1>';
  }
}
