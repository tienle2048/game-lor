// @ts-nocheck
import {Actor, Engine, RotationType, vec} from 'excalibur'
import {BaseDynamic} from '../../dynamic/BaseDynamic'
import {Sword, SwordOkla} from '../../dynamic/weapons'
import {BaseSkill, IBaseSkillArgs} from '../BaseSkill'

export class QuayVongSkill extends BaseSkill {
  //   weapon: Sword
  constructor(config: Omit<IBaseSkillArgs, 'range' | 'cooldownConfig'>) {
    super({...config, range: 200, cooldownConfig: 800})
    this.center = new Actor({pos: vec(0, 0),anchor: vec(0, 0.5), width: 0, height: 0, z: 101})
    this.center.actions.repeatForever((repeatCtx: any) => {
      repeatCtx.rotateTo(Math.PI + this.rotation, Math.PI, RotationType.CounterClockwise)
    })
  }

  onInit(){
    this.owner.addChild(this.center)
  }
  
  onAttack(engine: Engine, target: BaseDynamic) {
    const weapon = new SwordOkla(100, 0, 10)
    this.center.addChild(weapon)
  }
}
