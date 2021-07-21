import type { CanActivate, ExecutionContext } from '@nestjs/common'
import { Injectable } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import type { Observable } from 'rxjs'

@Injectable()
export class CatsGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = GqlExecutionContext.create(context)
    return true
  }
}
