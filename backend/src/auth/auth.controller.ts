import {
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe
} from '@nestjs/common'
import { AuthDto } from './auth.dto'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('register')
  async register(@Body() dto: AuthDto) {
    return await this.authService.register(dto)
  }
}
