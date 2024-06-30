import {Keys, Input, Vector, Engine, Animation, CollisionType, Collider, Side, CollisionContact, Actor} from 'excalibur'
import * as ex from 'excalibur'
import {Images} from '../../../resources'
import {Sword} from '../weapons'
import {PlayerCollisionGroup} from '../characters'

export class Pet extends Actor {
  isAttack: boolean = false
  hp: number = 1
  cooldown: number = 800
  constructor(x: number, y: number) {
    super({
      x: x + 64,
      y,
      width: 64,
      height: 64,
      collisionType: CollisionType.Active,
      collisionGroup: PlayerCollisionGroup,
      collider: ex.Shape.Box(60, 60)
    })
  }
  onInitialize(engine: Engine) {
    this.addTag('player')
    // this.addChild(this.weapon)
    const playerSpriteSheet = ex.SpriteSheet.fromImageSource({
      image: Images.Monk2,
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

    const attackLeft = playerSpriteSheet.getSprite(3, 4)
    attackLeft.scale = ex.vec(4, 4)
    this.graphics.add('attack-left', attackLeft)
  }

  onPreUpdate(engine: ex.Engine, elapsedMs: number): void {
    this.cooldown -= elapsedMs
    if (this.vel.size === 0 && !this.isAttack) this.graphics.use('down-idle')
    const allMonter = this.scene?.world.queryManager.createTagQuery(['monters']).getEntities((a: any, b: any) => {
      const spaceA = this.pos.sub(a.pos).size
      const spaceB = this.pos.sub(b.pos).size
      return spaceA - spaceB
    })[0] as Actor
    if (!allMonter) return

    const space = allMonter.pos.sub(this.pos)
    if (space.size > 200) {
      const ad = allMonter.pos.sub(this.pos)
      this.vel = ad.normalize().scale(ex.vec(100, 100))
      this.isAttack = false
    } else {
      this.vel = Vector.Zero
      if (this.cooldown <= 0) {
        this.onAttack(engine, allMonter)
        this.cooldown = 800
      }
    }

    if (this.hp <= 0) {
      this.kill()
    }
  }

  onCollisionStart(self: Collider, other: Collider, side: Side, contact: CollisionContact) {}

  onAttack(engine: any, monter: any) {
    const {x, y} = this.pos
    const weapon = new Sword(this, x, y)
    weapon.vel = monter.pos.sub(this.pos)

    engine.add(weapon)
    this.graphics.use('attack-left')
    this.isAttack = true
  }

  takeDamage(dame: number) {
    this.hp -= dame
  }
}
