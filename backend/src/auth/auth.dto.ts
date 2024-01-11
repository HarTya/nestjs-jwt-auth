import { Prisma } from '@prisma/client'
import { Transform, TransformFnParams } from 'class-transformer'
import {
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength
} from 'class-validator'
import { normalizeWhitespace } from 'src/utils/normalizeWhitespace'

export class AuthDto implements Prisma.UserCreateInput {
  @IsString({
    message: 'Ник должен быть строкой'
  })
  @Transform(({ value }: TransformFnParams) => normalizeWhitespace(value))
  @MinLength(2, {
    message: 'Ник слишком короткий'
  })
  @MaxLength(16, {
    message: 'Ник слишком длинный'
  })
  username: string

  @IsString({
    message: 'Пароль должен быть строкой'
  })
  @Transform(({ value }: TransformFnParams) => normalizeWhitespace(value))
  @IsStrongPassword(
    {
      minLength: 2,
      minLowercase: 0,
      minUppercase: 0,
      minNumbers: 1,
      minSymbols: 0
    },
    {
      message: 'Пароль недостаточно надёжный'
    }
  )
  @MaxLength(8, {
    message: 'Пароль слишком надёжный'
  })
  password: string
}
