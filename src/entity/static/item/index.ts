// @ts-nocheck
import * as ex from 'excalibur'
import {GameManager} from '../../../manager'
import {Images} from '../../../resources'

export class Ldadddad extends ex.Actor {
  manager: GameManager
  exp: number
  constructor(x: number, y: number, manager: GameManager) {
    super({
      pos: ex.vec(x, y),
      width: 10,
      height: 10,
      color: ex.Color.Chartreuse,
      z: 1000,
      collisionType: ex.CollisionType.Passive
    })
    this.manager = manager
    this.exp = 1
  }
  onInitialize(engine: ex.Engine<any>): void {
    this.graphics.use(
      ex.SpriteSheet.fromImageSource({
        image: Images.WaterPot,
        grid: {
          spriteWidth: 9,
          spriteHeight: 11,
          rows: 1,
          columns: 1
        }
      }).getSprite(0, 0, {
        width: 9 * 1.5,
        height: 11 * 1.5
      })
    )
  }

  onPreUpdate(engine: ex.Engine<any>, delta: number): void {
    if (this.manager) {
      const posPlayer = this.manager.player.pos
      const ad = posPlayer.sub(this.pos)
      this.vel = ad.normalize().scale(ex.vec(800, 800))
    }
  }

  onCollisionStart(self: ex.Collider, other: ex.Collider, side: ex.Side, contact: ex.CollisionContact): void {
    if (other.owner.hasTag('player')) {
      this.manager.updateExp(this.exp)
      this.kill()
    }
  }
}
