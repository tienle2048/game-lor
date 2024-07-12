import {Actor, Engine, RotationType, vec} from 'excalibur'
import {BaseDynamic} from '../../dynamic/BaseDynamic'
import {Sword} from '../../dynamic/weapons'
import {BaseSkill, IBaseSkillArgs} from '../BaseSkill'

export class HypnosisSkill extends BaseSkill {
  //   weapon: Sword
  constructor(config: Omit<IBaseSkillArgs, 'range' | 'cooldownConfig'>) {
    super({...config, range: 200, cooldownConfig: 5000})
    // this.weapon = config.weapon
  }

  onAttack(engine: Engine, target: BaseDynamic) {
    // target.removeTag('monters')
    // target.addTag('player')
    // target.enemy = 'monters'
    

    // setTimeout(() => {
    //   target.removeTag('player')
    //   target.addTag('monters')
    //   target.enemy = 'player'
    // }, 3000)
  }
}
