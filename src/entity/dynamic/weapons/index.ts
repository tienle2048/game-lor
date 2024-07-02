import {Keys, Input, Vector, Engine, Animation, CollisionType, Actor} from 'excalibur'
import * as ex from 'excalibur'
import {Images} from '../../../resources'
import { BaseDynamic } from '../BaseDynamic'
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
  onInitialize(engine: Engine) {
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
    // this.actions.rotateTo(Math.PI, Math.PI, ex.RotationType.CounterClockwise);
    this.actions.repeatForever((repeatCtx:any) => {
      repeatCtx.rotateTo(Math.PI+this.rotation , Math.PI*20, ex.RotationType.CounterClockwise);
    })
  }

  updateDame(newDame: number){
    this.dame = newDame;
  }

  onCollisionStart(self: ex.Collider, other: ex.Collider, side: ex.Side, contact: ex.CollisionContact): void {
    if (other.owner.hasTag('monters')) {
      (other.owner as BaseDynamic).takeDamage(this.dame)
      this.kill()
    }
  }
}
