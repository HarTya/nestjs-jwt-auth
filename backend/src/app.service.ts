import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  getStatus() {
    return {
      status: 'On(tha)linë!'
    }
  }
}
