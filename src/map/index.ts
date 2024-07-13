// @ts-nocheck
import {GameManager} from './../manager/index'
import * as ex from 'excalibur'
import {Images} from '../resources'
import {UiSelectSkills} from '../ui'
const waveConfig = {
  '1': {
    monter: ['BambooMonter'],
    number: 10
  },
  '2': {
    monter: ['BambooMonter'],
    number: 30
  },
  '3': {
    monter: ['BambooMonter'],
    number: 50
  },
  '4': {
    monter: ['BambooMonter'],
    number: 100
  }
}

export class BaseMap extends ex.Scene {
  wave: number = 1
  timeOfWave: number = 60000000
  manager: GameManager
  joystickEle: HTMLElement

  constructor(manager: GameManager) {
    super()
    this.manager = manager
    this.joystickEle = document.getElementById('joystick')!
  }

  onInitialize(engine: ex.Engine<any>): void {
    this.manager.respon(this, this.wave)
    this.manager.joystick.on('move', (event, data) => {
      const {vector, direction, position} = data
      if (direction?.x && direction?.y) {
        const {x, y} = vector
        const vec = ex.vec(x, -y).normalize()
        vec.size = 200

        this.manager.player.vel = vec
      }
    })
    this.manager.joystick.on('end', (event, data) => {
      this.manager.player.vel = ex.Vector.Zero
    })
    this.manager.setEngine(this)
  }

  onActivate(context: ex.SceneActivationContext<any>): void {
    this.joystickEle.classList.remove('hideOkla')
  }

  onDeactivate(context: ex.SceneActivationContext<any>): void {
    this.joystickEle.classList.add('hideOkla')
  }
}

export class UpdateGame extends ex.Scene {
  manager: GameManager
  optionSkills: UiSelectSkills[]

  constructor(manager: GameManager) {
    super()
    this.manager = manager
    this.optionSkills = [new UiSelectSkills(1,manager), new UiSelectSkills(2,manager)]
  }
  onInitialize(engine: ex.Engine<any>): void {
    const center = new ex.Actor({pos: ex.vec(screen.width / 2, (screen.height / 3))})
    for (let i of this.optionSkills) {
      center.addChild(i)
    }
    this.add(center)
  }

}
