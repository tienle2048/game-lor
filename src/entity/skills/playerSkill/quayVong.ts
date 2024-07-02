import {Actor, Engine, RotationType, vec} from 'excalibur'
import {BaseDynamic} from '../../dynamic/BaseDynamic'
import {Sword} from '../../dynamic/weapons'
import {BaseSkill, IBaseSkillArgs} from '../BaseSkill'

export class QuayVongSkill extends BaseSkill {
  //   weapon: Sword
  constructor(config: Omit<IBaseSkillArgs, 'range' | 'cooldownConfig'>) {
    super({...config, range: 200, cooldownConfig: 800})
    // this.weapon = config.weapon
  }

  onAttack(engine: Engine, target: BaseDynamic) {
    const center = new Actor({pos: vec(0, 0),anchor: vec(0, 0.5), width: 0, height: 0, z: 101})
    center.actions.repeatForever((repeatCtx: any) => {
      repeatCtx.rotateTo(Math.PI + this.rotation, Math.PI, RotationType.CounterClockwise)
    })
    const weapon = new Sword(100, 0, 10)
    center.addChild(weapon)
    this.owner.addChild(center)
    // engine.add(weapon)
  }
}
