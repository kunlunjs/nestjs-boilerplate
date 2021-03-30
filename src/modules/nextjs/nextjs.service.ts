import * as path from 'path'
import { Injectable, OnModuleInit } from '@nestjs/common'
import next from 'next'
import NextServer from 'next/dist/next-server/server/next-server'

@Injectable()
export class NextJSService implements OnModuleInit {
  private server

  async onModuleInit(): Promise<void> {
    try {
      this.server = next({
        dev: true,
        dir: path.join(process.cwd(), './nextjs')
      })
      await this.server.prepare()
    } catch (e) {
      console.log(e)
    }
  }

  getNextServer(): NextServer {
    return this.server
  }
}
