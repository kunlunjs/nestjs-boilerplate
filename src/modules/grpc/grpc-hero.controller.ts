import { Public } from '@/common/decorators'
import { Controller, Get, Inject, OnModuleInit, Param } from '@nestjs/common'
import { ClientGrpc, GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices'
import { Subject } from 'rxjs'
import { Observable, ReplaySubject } from 'rxjs'
import { toArray } from 'rxjs/operators'
import { HeroById } from './interfaces/hero-by-id.interface'
import { Hero } from './interfaces/hero.interface'

interface HeroService {
  findOne(data: HeroById): Observable<Hero>
  findMany(upstream: Observable<HeroById>): Observable<Hero>
}

@Controller('grpc-hero')
export class GRPCHeroController implements OnModuleInit {
  private readonly items: Hero[] = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Doe' }
  ]
  private heroService: HeroService

  constructor(@Inject('HERO_PACKAGE') private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.heroService = this.client.getService<HeroService>('HeroService')
  }

  // GET /api/grpc-hero
  @Public()
  @Get()
  getMany(): Observable<Hero[]> {
    const ids$ = new ReplaySubject<HeroById>()
    ids$.next({ id: 1 })
    ids$.next({ id: 2 })
    ids$.complete()

    const stream = this.heroService.findMany(ids$.asObservable())
    return stream.pipe(toArray())
  }

  // GET /api/grpc-hero/1
  @Public()
  @Get(':id')
  getById(@Param('id') id: string): Observable<Hero> {
    return this.heroService.findOne({ id: +id })
  }

  @GrpcMethod('HeroService')
  findOne(data: HeroById): Hero | undefined {
    return this.items.find(({ id }) => id === data.id)
  }

  @GrpcStreamMethod('HeroService')
  findMany(data$: Observable<HeroById>): Observable<Hero> {
    const hero$ = new Subject<Hero>()

    const onNext = (heroById: HeroById) => {
      const item = this.items.find(({ id }) => id === heroById.id)
      hero$.next(item)
    }
    const onComplete = () => hero$.complete()
    // deprecated https://stackoverflow.com/questions/55472124/subscribe-is-deprecated-use-an-observer-instead-of-an-error-callback
    // data$.subscribe(onNext, null, onComplete)
    data$.subscribe({
      next: onNext,
      complete: onComplete
    })

    return hero$.asObservable()
  }
}
