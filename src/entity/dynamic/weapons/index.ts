import {Keys, Input, Vector, Engine, Animation, CollisionType, Actor} from 'excalibur'
import * as ex from 'excalibur'
import {Images} from '../../../resources'

export class Sword extends ex.Actor {
  owner: Actor
  constructor(owneOklar: Actor, x: number, y: number) {
    super({
      x: x + 48,
      y: y + 16,
      width: 32,
      height: 32,
      collisionType: ex.CollisionType.Passive,
      collider: ex.Shape.Box(32, 32)
    })
    this.addTag('weapons')
    this.owner = owneOklar
  }
  onInitialize(engine: Engine) {
    const playerSpriteSheet = ex.SpriteSheet.fromImageSource({
      image: Images.Axe,
      grid: {
        spriteWidth: 11,
        spriteHeight: 8,
        rows: 1,
        columns: 1
      }
    })
    const adad = playerSpriteSheet.getSprite(0, 0)
    adad.rotation = -1.57079633
    adad.height = 8 * 4
    adad.width = 44
    console.log('🚀 ~ Sword ~ onInitialize ~ adad:', adad)
    this.graphics.use(adad)
    // this.actions.rotateTo(Math.PI, Math.PI, ex.RotationType.CounterClockwise);
    this.actions.repeatForever((repeatCtx:any) => {
      repeatCtx.rotateTo(Math.PI+this.rotation , Math.PI*10, ex.RotationType.CounterClockwise);
      // repeatCtx.moveBy(0, 10, 10)
    })
  }

  onPostUpdate(engine: ex.Engine, elapsedMs: number): void {
    
  } 
  onCollisionStart(self: ex.Collider, other: ex.Collider, side: ex.Side, contact: ex.CollisionContact): void {
    if (other.owner.hasTag('monters')) {
      this.kill()
    }
  }
}
