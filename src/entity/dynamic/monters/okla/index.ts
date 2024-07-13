// @ts-nocheck

import { GameManager } from './../../../../manager/index';

import {Vector, Engine, CollisionType, Actor} from 'excalibur'
import * as ex from 'excalibur'
import {Images} from '../../../../resources'
import {BaseMonter} from '../baseMonter'
// import { ShurikenSkill, ThunderSkill } from '../../../skills'
// import { Sword, SwordOkla } from '../../weapons'

export const MonterCollisionGroup = ex.CollisionGroupManager.create('monter')
export class BambooMonter extends BaseMonter {
  enemy: string
  manager: GameManager
  constructor(x: number, y: number, manager: GameManager) {
    super({
      x,
      y,
      width: 64,
      height: 64,
      collisionType: CollisionType.Active,
      collisionGroup: MonterCollisionGroup,
      collider: ex.Shape.Box(60, 60),
      hp: 20
    })
    this.enemy = 'player'
    this.manager = manager
    this.skill = [
      // new ThunderSkill({
      //   levelSkill: 0,
      //   owner: this,
      //   dame: 3
      // }),
    ]

  }
  onInitialize(engine: Engine) {
    
    this.addTag('monters')
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
    leftIdle.scale = ex.vec(2, 2)
    this.graphics.add('left-idle', leftIdle)

    const rightIdle = new ex.Animation({
      frames: [{graphic: playerSpriteSheet.getSprite(0, 2) as ex.Sprite, duration: 200}]
    })
    rightIdle.scale = ex.vec(2, 2)
    this.graphics.add('right-idle', rightIdle)

    const upIdle = new ex.Animation({
      frames: [{graphic: playerSpriteSheet.getSprite(0, 3) as ex.Sprite, duration: 200}]
    })
    upIdle.scale = ex.vec(2, 2)
    this.graphics.add('up-idle', upIdle)

    const downIdle = new ex.Animation({
      frames: [{graphic: playerSpriteSheet.getSprite(0, 0) as ex.Sprite, duration: 200}]
    })
    downIdle.scale = ex.vec(2, 2)
    this.graphics.add('down-idle', downIdle)

    const leftWalk = new ex.Animation({
      frames: [
        {graphic: playerSpriteSheet.getSprite(2, 0) as ex.Sprite, duration: 200},
        {graphic: playerSpriteSheet.getSprite(2, 1) as ex.Sprite, duration: 200},
        {graphic: playerSpriteSheet.getSprite(2, 2) as ex.Sprite, duration: 200},
        {graphic: playerSpriteSheet.getSprite(2, 3) as ex.Sprite, duration: 200}
      ]
    })
    leftWalk.scale = ex.vec(2, 2)
    this.graphics.add('left-walk', leftWalk)

    const rightWalk = new ex.Animation({
      frames: [
        {graphic: playerSpriteSheet.getSprite(3, 0) as ex.Sprite, duration: 200},
        {graphic: playerSpriteSheet.getSprite(3, 1) as ex.Sprite, duration: 200},
        {graphic: playerSpriteSheet.getSprite(3, 2) as ex.Sprite, duration: 200},
        {graphic: playerSpriteSheet.getSprite(3, 3) as ex.Sprite, duration: 200}
      ]
    })
    rightWalk.scale = ex.vec(2, 2)
    this.graphics.add('right-walk', rightWalk)

    const upWalk = new ex.Animation({
      frames: [
        {graphic: playerSpriteSheet.getSprite(1, 0) as ex.Sprite, duration: 200},
        {graphic: playerSpriteSheet.getSprite(1, 1) as ex.Sprite, duration: 200},
        {graphic: playerSpriteSheet.getSprite(1, 2) as ex.Sprite, duration: 200},
        {graphic: playerSpriteSheet.getSprite(1, 3) as ex.Sprite, duration: 200}
      ]
    })
    upWalk.scale = ex.vec(2, 2)
    this.graphics.add('up-walk', upWalk)

    const downWalk = new ex.Animation({
      frames: [
        {graphic: playerSpriteSheet.getSprite(0, 0) as ex.Sprite, duration: 200},
        {graphic: playerSpriteSheet.getSprite(0, 1) as ex.Sprite, duration: 200},
        {graphic: playerSpriteSheet.getSprite(0, 2) as ex.Sprite, duration: 200},
        {graphic: playerSpriteSheet.getSprite(0, 3) as ex.Sprite, duration: 200}
      ]
    })
    downWalk.scale = ex.vec(2, 2)
    this.graphics.add('down-walk', downWalk)
  }

  onPreUpdate(engine: ex.Engine, elapsedMs: number): void {
    this.graphics.use('down-idle')

    if (engine.input.keyboard.isHeld(ex.Input.Keys.I)) {
      // this.vel = ex.vec(0, 200)
      //   this.scene?.world.queryManager.getQuery
    }
    const nearbyPlayers = this.manager.player

    // const nearbyPlayers = playersQuery?.getEntities((a: any, b: any) => {
    //   const spaceA = this.pos.sub(a.pos).size
    //   const spaceB = this.pos.sub(b.pos).size
    //   return spaceA - spaceB
    // })[0] as Actor
    const ad = nearbyPlayers.pos.sub(this.pos)
    // if (ad.size < 400) {
    this.vel = ad.normalize().scale(ex.vec(200, 200))
    // }

    // const allMonter = this.scene?.world.queryManager.createTagQuery(['player']).getEntities((a: any, b: any) => {
    //   const spaceA = this.pos.sub(a.pos).size
    //   const spaceB = this.pos.sub(b.pos).size
    //   return spaceA - spaceB
    // })[0] as Actor
    // if (!allMonter) return

    // const space = allMonter.pos.sub(this.pos)
    // for (let skill of this.skill) {
    //   skill.updateCooldown(skill.cooldown - elapsedMs)
    //   if (space.size > skill.range) {
    //     const ad = allMonter.pos.sub(this.pos)
    //     this.vel = ad.normalize().scale(ex.vec(100, 100))
    //   } else {
    //     this.vel = Vector.Zero
    //     if (skill.cooldown <= 0) {
    //       skill.onAttack(engine, allMonter)
    //       skill.updateCooldown(skill.cooldownConfig)
    //     }
    //   }
    // }
  }

  onCollisionStart(self: ex.Collider, other: ex.Collider, side: ex.Side, contact: ex.CollisionContact): void {
    if (other.owner.hasTag('weapons')) {
    }
    if (other.owner.hasTag('player')) {
      
      other.owner.takeDamage(1)
    }
  }

  setVector(okla: Vector) {
    this.vel = ex.vec(0, 200)
  }
}
