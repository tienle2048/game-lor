import { BaseDynamic } from '../dynamic/BaseDynamic'

export interface IBaseSkillArgs {
  levelSkill: number
  owner: BaseDynamic
  dame: number
  range: number
  cooldownConfig: number
}

export class BaseSkill {
  [x: string]: any
  levelSkill: number
  owner: BaseDynamic
  dame: number
  range: number
  cooldown: number
  cooldownConfig: number
  constructor(config: IBaseSkillArgs) {
    this.levelSkill = config.levelSkill
    this.owner = config.owner
    this.dame = config.dame
    this.range = config.range
    this.cooldown = 0
    this.cooldownConfig = config.cooldownConfig
  }

  updateDame(newDame: number) {
    this.dame = newDame
  }
  
  updateCooldown(cooldown: number) {
    this.cooldown = cooldown
  }
}
