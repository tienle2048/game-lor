import {Actor, Color, vec, ActorArgs, Rectangle} from 'excalibur'
import {BaseEntity} from '../BaseEntity'

export class HPBar extends Actor {
  owner: BaseDynamic
  maxHp: number
  line: Rectangle
  constructor(owner: BaseDynamic, maxHp: number) {
    super({
      pos: vec(-30, -48),

      color: Color.Red,
      z: 100
    })
    this.owner = owner
    this.maxHp = maxHp

    this.line = new Rectangle({
      width: 50,
      height: 10,
      color: Color.Green
    })
    this.graphics.use(this.line, {anchor: vec(0, 0.5)})
    this.addChild(
      new Actor({
        pos: vec(30, 0),
        width: 60,
        height: 10,
        color: Color.Red,
        z: 99
      })
    )
  }

  onInitialize() {}

  onPreUpdate(engine: ex.Engine, elapsedMs: number): void {
    const dada = (this.owner.hp / this.maxHp) * 60

    this.line.width = dada
    if (this.owner.hp <= 0) {
      this.owner.kill()
    }
  }
}

interface BaseDynamicParams {
  hp: number
}

export class BaseDynamic extends BaseEntity {
  hp: number
  constructor(prams: ActorArgs & BaseDynamicParams) {
    super(prams)
    this.addChild(new HPBar(this, prams.hp))
    this.hp = prams.hp
  }
}
