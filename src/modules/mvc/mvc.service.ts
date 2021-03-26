import { Injectable } from '@nestjs/common'

@Injectable()
export class MVCService {
  getViewName() {
    return 'index'
  }
}
