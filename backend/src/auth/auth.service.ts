import { BadRequestException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { User } from '@prisma/client'
import { hash } from 'argon2'
import { PrismaService } from 'src/prisma.service'
import { normalizeWhitespace } from 'src/utils/normalizeWhitespace'
import { AuthDto } from './auth.dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService
  ) {}

  async register(dto: AuthDto) {
    const isUserExist = await this.prisma.user.findUnique({
      where: {
        username: normalizeWhitespace(dto.username)
      }
    })

    if (isUserExist)
      throw new BadRequestException('К сожалению, этот ник уже занят')

    const user = await this.prisma.user.create({
      data: {
        username: normalizeWhitespace(dto.username),
        password: await hash(normalizeWhitespace(dto.password))
      }
    })

    return this.getAuthInfo(user)
  }

  private getAuthInfo(user: User) {
    const data = { id: user.id }

    const accessToken = this.jwt.sign(data, {
      expiresIn: '1m'
    })

    const refreshToken = this.jwt.sign(data, {
      expiresIn: '7d'
    })

    return {
      user: {
        id: user.id,
        username: user.username
      },
      accessToken,
      refreshToken
    }
  }
}
