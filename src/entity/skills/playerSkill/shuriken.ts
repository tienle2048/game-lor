import {Actor, Engine} from 'excalibur'
import {BaseDynamic} from '../../dynamic/BaseDynamic'
import {Sword} from '../../dynamic/weapons'
import {BaseSkill, IBaseSkillArgs} from '../BaseSkill'

export interface ISkillArgs {
  weapon: typeof Sword
}

export class ShurikenSkill extends BaseSkill {
  weapon: typeof Sword
  constructor(config: ISkillArgs & Omit<IBaseSkillArgs, 'range' | 'cooldownConfig'>) {
    super({...config, range: 200, cooldownConfig: 800})
    this.weapon = config.weapon
  }

  onAttack(engine: Engine, target: BaseDynamic) {
    const {x, y} = this.owner.pos
    const weapon = new this.weapon(x, y, this.dame)
    weapon.vel = target.pos.sub(this.owner.pos)
    engine.add(weapon)
  }
}
