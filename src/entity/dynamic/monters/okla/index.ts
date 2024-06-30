import {Keys, Input, Vector, Engine, Animation, CollisionType, Actor} from 'excalibur'
import * as ex from 'excalibur'
import {Images} from '../../../../resources'
import {BaseMonter} from '../baseMonter'

export const MonterCollisionGroup = ex.CollisionGroupManager.create('monter')
export class BambooMonter extends BaseMonter {
  hp: number = 10
  constructor(x: number, y: number) {
    super({
      x,
      y,
      width: 64,
      height: 64,
      collisionType: CollisionType.Active,
      collisionGroup: MonterCollisionGroup,
      collider: ex.Shape.Box(60, 60)
    })
    // this.graphics.use(animation)
  }
  onInitialize(engine: Engine) {
    this.addTag("monters")
    const playerSpriteSheet = ex.SpriteSheet.fromImageSource({
      image: Images.Bamboo,
      grid: {
        spriteWidth: 16,
        spriteHeight: 16,
        rows: 8,
        columns: 8
      }
    })

    const leftIdle = new ex.Animation({
      frames: [{graphic: playerSpriteSheet.getSprite(0, 2) as ex.Sprite, duration: 200}]
    })
    leftIdle.scale = ex.vec(4, 4)
    this.graphics.add('left-idle', leftIdle)

    const rightIdle = new ex.Animation({
      frames: [{graphic: playerSpriteSheet.getSprite(0, 2) as ex.Sprite, duration: 200}]
    })
    rightIdle.scale = ex.vec(4, 4)
    this.graphics.add('right-idle', rightIdle)

    const upIdle = new ex.Animation({
      frames: [{graphic: playerSpriteSheet.getSprite(0, 3) as ex.Sprite, duration: 200}]
    })
    upIdle.scale = ex.vec(4, 4)
    this.graphics.add('up-idle', upIdle)

    const downIdle = new ex.Animation({
      frames: [{graphic: playerSpriteSheet.getSprite(0, 0) as ex.Sprite, duration: 200}]
    })
    downIdle.scale = ex.vec(4, 4)
    this.graphics.add('down-idle', downIdle)

    const leftWalk = new ex.Animation({
      frames: [
        {graphic: playerSpriteSheet.getSprite(2, 0) as ex.Sprite, duration: 200},
        {graphic: playerSpriteSheet.getSprite(2, 1) as ex.Sprite, duration: 200},
        {graphic: playerSpriteSheet.getSprite(2, 2) as ex.Sprite, duration: 200},
        {graphic: playerSpriteSheet.getSprite(2, 3) as ex.Sprite, duration: 200}
      ]
    })
    leftWalk.scale = ex.vec(4, 4)
    this.graphics.add('left-walk', leftWalk)

    const rightWalk = new ex.Animation({
      frames: [
        {graphic: playerSpriteSheet.getSprite(3, 0) as ex.Sprite, duration: 200},
        {graphic: playerSpriteSheet.getSprite(3, 1) as ex.Sprite, duration: 200},
        {graphic: playerSpriteSheet.getSprite(3, 2) as ex.Sprite, duration: 200},
        {graphic: playerSpriteSheet.getSprite(3, 3) as ex.Sprite, duration: 200}
      ]
    })
    rightWalk.scale = ex.vec(4, 4)
    this.graphics.add('right-walk', rightWalk)

    const upWalk = new ex.Animation({
      frames: [
        {graphic: playerSpriteSheet.getSprite(1, 0) as ex.Sprite, duration: 200},
        {graphic: playerSpriteSheet.getSprite(1, 1) as ex.Sprite, duration: 200},
        {graphic: playerSpriteSheet.getSprite(1, 2) as ex.Sprite, duration: 200},
        {graphic: playerSpriteSheet.getSprite(1, 3) as ex.Sprite, duration: 200}
      ]
    })
    upWalk.scale = ex.vec(4, 4)
    this.graphics.add('up-walk', upWalk)

    const downWalk = new ex.Animation({
      frames: [
        {graphic: playerSpriteSheet.getSprite(0, 0) as ex.Sprite, duration: 200},
        {graphic: playerSpriteSheet.getSprite(0, 1) as ex.Sprite, duration: 200},
        {graphic: playerSpriteSheet.getSprite(0, 2) as ex.Sprite, duration: 200},
        {graphic: playerSpriteSheet.getSprite(0, 3) as ex.Sprite, duration: 200}
      ]
    })
    downWalk.scale = ex.vec(4, 4)
    this.graphics.add('down-walk', downWalk)
  }

  onPreUpdate(engine: ex.Engine, elapsedMs: number): void {
    this.vel = ex.Vector.Zero

    this.graphics.use('down-idle')

    if (engine.input.keyboard.isHeld(ex.Input.Keys.I)) {
      // this.vel = ex.vec(0, 200)
      //   this.scene?.world.queryManager.getQuery
    }
    const playersQuery = this.scene?.world.queryManager.createTagQuery(['player'])

    const nearbyPlayers = playersQuery?.getEntities((a: any, b: any) => {
      const spaceA = this.pos.sub(a.pos).size
      const spaceB = this.pos.sub(b.pos).size
      return spaceA - spaceB
    })[0] as Actor
    const ad = nearbyPlayers.pos.sub(this.pos)
    if (ad.size < 400) {
      this.vel = ad.normalize().scale(ex.vec(100, 100))
    }
    if (this.hp <= 0) {
      this.kill()
    }
  }

  onCollisionStart(self: ex.Collider, other: ex.Collider, side: ex.Side, contact: ex.CollisionContact): void {
    console.log("🚀 ~ BambooMonter ~ onCollisionStart ~ other:", other,other.owner.hasTag('weapons'))
    if (other.owner.hasTag('weapons')) {
      // this.takeDamage(5)
    }
    if (other.owner.hasTag('player')) {
        // console.log("dadadada",other)
        other.owner.takeDamage(5)
      }
  }

  takeDamage(dame: number) {
    console.log("🚀 ~ BambooMonter ~ takeDamage ~ dame:", dame)
    this.hp -= dame
  }
}
