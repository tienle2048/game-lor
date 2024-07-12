import {GameManager} from './../manager/index'
import * as ex from 'excalibur'
import { Images } from '../resources'
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

  constructor(manager: GameManager) {
    super()
    this.manager = manager
  }

  onInitialize(engine: ex.Engine<any>): void {
    console.log("🚀 ~ BaseMap ~ onInitialize ~ engine:")
    this.manager.respon(this, this.wave)
  }

  onPostUpdate(engine: ex.Engine<any>, delta: number): void {
    if (this.timeOfWave > 0) {
      this.timeOfWave -= delta
      for (let okla of this.entities) {
        if (okla.hasTag('monters')) return
      }
    
    }
    
    engine.goToScene('update')
  }
  onActivate(context: ex.SceneActivationContext<any>): void {
      console.log("🚀 ~ BaseMap ~ onActivate ~ this.wave:", this.wave)
    this.manager.respon(this, this.wave)
  }

  onDeactivate(context: ex.SceneActivationContext<any>): void {
    this.wave +=1
  }
}

export class UpdateGame extends ex.Scene {
  manager: GameManager

  constructor(manager: GameManager) {
    super()
    this.manager = manager
  }
  onInitialize(engine: ex.Engine<any>): void {
    for (let i = 1; i < 5; i++) {
      const optionsUpdate = new ex.Actor({
        pos: ex.vec(300 * i, 300),
        width: 200,
        height: 300,
        color: ex.Color.Chartreuse
      })
      const playerSpriteSheet = ex.SpriteSheet.fromImageSource({
        image: Images.BigShuriken,
        grid: {
          spriteWidth: 23,
          spriteHeight: 23,
          rows: 2,
          columns: 1
        }
      })
      const adad = playerSpriteSheet.getSprite(0, 0)
      const playerSpriteSheet1 = ex.SpriteSheet.fromImageSource({
        image: Images.theme,
        grid: {
          spriteWidth: 100,
          spriteHeight: 150,
          rows: 1,
          columns: 1
        }
      })
      const adad1 = playerSpriteSheet1.getSprite(0, 0,{
        width:200,
        height:300
      })

      

      const group = new ex.GraphicsGroup({
        members: [
          { graphic: adad1, offset: ex.vec(0, 0)},
          { graphic: adad, offset: ex.vec(50, 30)},
        ]
      });
      
      
      adad.height = 23 * 4
      adad.width = 23 * 4
      optionsUpdate.addComponent
      optionsUpdate.graphics.use(group)
      optionsUpdate.on('pointerup', () => {
        this.manager.player.onUpdateSkill()
        optionsUpdate.kill()
      })
      this.add(optionsUpdate)
    }

    const exit = new ex.Actor({
      pos: ex.vec(0, 0),
      width: 64,
      height: 64,
      color: ex.Color.Chartreuse
    })
    exit.on('pointerup', () => {
        engine.goToScene('level1')
    })

    this.add(exit)
  }
}
