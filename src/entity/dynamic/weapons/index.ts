// @ts-nocheck
import { Vector } from 'excalibur';
// import { Engine} from 'excalibur'
import * as ex from 'excalibur'
import { vec } from 'excalibur'
import {Images} from '../../../resources'
import {BaseDynamic} from '../BaseDynamic'
export class Sword extends ex.Actor {
  dame: number
  constructor(x: number, y: number, dame: number) {
    super({
      x: x + 48,
      y: y + 16,
      width: 32,
      height: 32,
      collisionType: ex.CollisionType.Passive,
      collider: ex.Shape.Box(32, 32)
    })
    this.dame = dame
    this.addTag('weapons')
  }
  onInitialize(engine: ex.Engine) {
    const playerSpriteSheet = ex.SpriteSheet.fromImageSource({
      image: Images.Shuriken,
      grid: {
        spriteWidth: 16,
        spriteHeight: 16,
        rows: 1,
        columns: 1
      }
    })
    const adad = playerSpriteSheet.getSprite(0, 0)
    adad.rotation = -1.57079633
    adad.height = 16 * 2
    adad.width = 16 * 2
    this.graphics.use(adad)
    Vector
    // this.actions.rotateTo(Math.PI, Math.PI, ex.RotationType.CounterClockwise);
    this.actions.repeatForever((repeatCtx: any) => {
      repeatCtx.rotateTo(Math.PI + this.rotation, Math.PI * 20, ex.RotationType.CounterClockwise)
    })
  }

  updateDame(newDame: number) {
    this.dame = newDame
  }

  onCollisionStart(self: ex.Collider, other: ex.Collider, side: ex.Side, contact: ex.CollisionContact): void {
    if (other.owner.hasTag('monters')) {
      // other.owner.vel = ex.vec(100,100)
      const oklaaa = (other.owner as BaseDynamic).takeDamage(this.dame)
      this.kill()
    }
  }
}

export class SwordOkla extends ex.Actor {
  dame: number
  constructor(x: number, y: number, dame: number) {
    super({
      x: x + 48,
      y: y + 16,
      width: 32,
      height: 32,
      collisionType: ex.CollisionType.Passive,
      collider: ex.Shape.Box(23 * 4, 23 * 4)
    })
    this.dame = dame
    this.addTag('weapons')
  }
  onInitialize(engine: ex.Engine) {
    const playerSpriteSheet = ex.SpriteSheet.fromImageSource({
      image: Images.BigShuriken,
      grid: {
        spriteWidth: 23,
        spriteHeight: 23,
        rows: 1,
        columns: 2
      }
    })
    
    const leftIdle = new ex.Animation({
      frames: [
        {graphic: playerSpriteSheet.getSprite(0, 0) as ex.Sprite, duration: 20},
        {graphic: playerSpriteSheet.getSprite(1, 0) as ex.Sprite, duration: 20}
      ]
    })
    // adad.rotation = -1.57079633
    leftIdle.scale = vec(4,4)// = 23 * 4
    // leftIdle.width = 23 * 4
    this.graphics.use(leftIdle)
    // this.actions.rotateTo(Math.PI, Math.PI, ex.RotationType.CounterClockwise);
    // this.actions.repeatForever((repeatCtx:any) => {
    //   repeatCtx.rotateTo(Math.PI+this.rotation , Math.PI*20, ex.RotationType.CounterClockwise);
    // })
  }

  updateDame(newDame: number) {
    this.dame = newDame
  }

  onCollisionStart(self: ex.Collider, other: ex.Collider, side: ex.Side, contact: ex.CollisionContact): void {
    if (other.owner.hasTag('player')) {
      // other.owner.vel = ex.vec(100,100)
      const oklaaa = (other.owner as BaseDynamic).takeDamage(this.dame)
      // this.kill()
    }
  }
}
