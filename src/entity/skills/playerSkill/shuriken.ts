// @ts-nocheck
import {Actor, Engine, Vector} from 'excalibur'
import {BaseDynamic} from '../../dynamic/BaseDynamic'
import {Sword} from '../../dynamic/weapons'
import {BaseSkill, IBaseSkillArgs} from '../BaseSkill'

const configSkill = {
  '1': {
    numBullets: 1
  },
  '2': {
    numBullets: 3
  },
  '3': {
    numBullets: 5
  },
  '4': {
    numBullets: 7
  },
  '5': {
    numBullets: 9
  }
}

const gocban = 0.5

export interface ISkillArgs {
  weapon: typeof Sword
}

export class ShurikenSkill extends BaseSkill {
  weapon: typeof Sword
  constructor(config: ISkillArgs & Omit<IBaseSkillArgs, 'range' | 'cooldownConfig'>) {
    super({...config, range: 600, cooldownConfig: 500})
    this.weapon = config.weapon
  }

  onAttack(engine: Engine, target: BaseDynamic) {
    const {x, y} = this.owner.pos
    const vecCenter = target.pos.sub(this.owner.pos).normalize()
    const numbulet = configSkill[String(this.levelSkill)] ? configSkill[String(this.levelSkill)].numBullets : 9
    const unit = numbulet !== 1 ? gocban*2 / (numbulet - 1) : 1
    const start = numbulet !== 1 ? vecCenter.toAngle() - gocban : vecCenter.toAngle()

    for (let i = 0; i < numbulet; i++) {
      const weapon = new this.weapon(x, y, this.dame)
      const dada = Vector.fromAngle(start + unit * i)
      dada.size = 600
      weapon.vel = dada
      engine.add(weapon)
    }
  }

  update() {
    this.levelSkill += 1
  }
}
