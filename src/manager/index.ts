import * as ex from 'excalibur'
import {JoystickManager} from 'nipplejs'
import {BambooMonter} from '../entity/dynamic/monters/okla'

export class GameManager {
  player: ex.Actor
  joystick: JoystickManager
  constructor(palyer: any, nipple: JoystickManager) {
    this.player = palyer
    this.joystick = nipple
  }
  respon(scene: ex.Scene<any>, config: any) {
    
    // const {x,y} = scene.actors.find(actor => actor.name ==="Legend")!.pos

    for (let i = 0; i < config; i++) {
      const ranX = new ex.Random(i).integer(300, 3000)
      const ranY = new ex.Random(ranX).integer(300, 1500)
      const monter = new BambooMonter(ranX, ranY, this)
      monter.z = 100
      scene.add(monter)
    }
  }
}
