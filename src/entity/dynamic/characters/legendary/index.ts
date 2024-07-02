import {Pet} from './../../pets/index'
import {Keys, Input, Vector, Engine, Animation, CollisionType, Collider, Side, CollisionContact, Actor} from 'excalibur'
import * as ex from 'excalibur'
import {BaseHero} from '../baseHero'
import {Images} from '../../../../resources'
import {Sword} from '../../weapons'
import {QuayVongSkill} from '../../../skills'
import {BaseSkill} from '../../../skills/BaseSkill'

export const PlayerCollisionGroup = ex.CollisionGroupManager.create('player')

export class LegendHero extends BaseHero {
  isAttack: boolean = false
  skillaa: BaseSkill
  constructor(x: number, y: number) {
    super({
      x,
      y,
      width: 64,
      height: 64,
      collisionType: CollisionType.Active,
      collisionGroup: PlayerCollisionGroup,
      collider: ex.Shape.Box(60, 60),
      hp: 20
    })
    this.skillaa = new QuayVongSkill({
      levelSkill: 0,
      owner: this,
      dame: 3
    })
  }
  onInitialize(engine: Engine) {
    this.addTag('player')
    // this.addChild(this.weapon)
    const playerSpriteSheet = ex.SpriteSheet.fromImageSource({
      image: Images.Cavegirl2,
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
    this.vel = ex.Vector.Zero

    if (engine.input.keyboard.isHeld(ex.Input.Keys.D)) {
      this.vel = ex.vec(200, 0)
      this.graphics.use('right-walk')
    }
    if (engine.input.keyboard.isHeld(ex.Input.Keys.A)) {
      this.vel = ex.vec(-200, 0)
      this.graphics.use('left-walk')
    }
    if (engine.input.keyboard.isHeld(ex.Input.Keys.W)) {
      this.vel = ex.vec(0, -200)
      this.graphics.use('up-walk')
    }
    if (engine.input.keyboard.isHeld(ex.Input.Keys.S)) {
      this.vel = ex.vec(0, 200)
      this.graphics.use('down-walk')
    }
    // if (engine.input.keyboard.isHeld(ex.Input.Keys.O)) {
    //   this.weapon.vel = ex.vec(0,400)
    // }
    if (engine.input.keyboard.wasPressed(ex.Input.Keys.Space)) {
      // this.vel = ex.vec(0, 200)
      this.onAttack(engine)
    }

    if (engine.input.keyboard.wasReleased(ex.Input.Keys.Space)) {
      this.isAttack = false
    }

    if (engine.input.keyboard.wasPressed(ex.Input.Keys.M)) {
      // this.vel = ex.vec(0, 200)
      this.onSummon(engine)
    }

    if (engine.input.keyboard.wasPressed(ex.Input.Keys.K)) {
      // this.vel = ex.vec(0, 200)
      this.removeTag('player')
      this.addTag('monters')
    }
    if (this.vel.size === 0 && !this.isAttack) this.graphics.use('down-idle')
  }

  onCollisionStart(self: Collider, other: Collider, side: Side, contact: CollisionContact) {}

  onAttack(engine: any) {
    const allMonter = this.scene?.world.queryManager.createTagQuery(['monters']).getEntities((a: any, b: any) => {
      const spaceA = this.pos.sub(a.pos).size
      const spaceB = this.pos.sub(b.pos).size
      return spaceA - spaceB
    })[0] as Actor
    if (!allMonter) return
    this.skillaa.onAttack(engine, allMonter)
    // const {x, y} = this.pos
    // const weapon = new Sword(x, y,5)
    // const ddd = allMonter.pos.sub(this.pos).normalize()
    // ddd.size = 300
    // weapon.vel =ddd

    // engine.add(weapon)
    this.graphics.use('attack-left')
    this.isAttack = true
  }

  onSummon(engine: any) {
    const {x, y} = this.pos
    const weapon = new Pet(x, y)
    engine.add(weapon)
  }
}
