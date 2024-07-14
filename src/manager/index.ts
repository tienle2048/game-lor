// @ts-nocheck
import * as ex from 'excalibur'
import {JoystickManager} from 'nipplejs'
import {LegendHero} from '../entity'
import {BambooMonter} from '../entity/dynamic/monters/okla'

export class GameManager {
  player: LegendHero
  joystick: JoystickManager
  exp: number
  scene?: ex.Scene<any>
  maxExp: number
  constructor(palyer: any, nipple: JoystickManager) {
    this.player = palyer
    this.joystick = nipple
    this.exp = 0
    this.maxExp = 10
  }
  respon(scene: ex.Scene<any>, config: any) {
    
  }
  setEngine(scene: ex.Scene<any>){
    this.scene = scene
    setInterval(()=>{
      for (let i = 0; i < 1; i++) {
        const ranX = new ex.Random(i).integer(300, 3000)
        const ranY = new ex.Random(ranX).integer(300, 1500)
        const monter = new BambooMonter(ranX, ranY, this)
        monter.z = 100
        scene.add(monter)
      }
    },1000)
  }
  updateSkill(index: number) {
    this.player.onUpdateSkill(index - 1)
  }
  updateExp(numExp: number) {
    this.exp += numExp
    if(this.exp>this.maxExp){
      this.scene!.engine.goToScene('update')
      this.exp = 0
      this.maxExp = this.maxExp * 1.5
    }
  }
}
