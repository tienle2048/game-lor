// @ts-nocheck
import * as ex from 'excalibur'
import nipplejs, {JoystickManager} from 'nipplejs'
import {GameManager} from './manager'
import {BaseMap, UpdateGame} from './map'
import {loader, Maps} from './resources'
window.Telegram.WebApp.disableVerticalSwipes()

const game = new ex.Engine({
  antialiasing: false,
  displayMode: ex.DisplayMode.FillScreen,
  pointerScope: ex.Input.PointerScope.Document
})
game.toggleDebug();
game.start(loader).then(() => {
  const joystickManager = nipplejs.create({
    zone: document.getElementById('joystick')!,
    mode: 'static',
    position: {left: '50%', top: '75%'}
  }) as JoystickManager

  const player = Maps.TiledMap.getEntitiesByClassName('player')[0]

  const manager = new GameManager(player, joystickManager)
  const level1 = new BaseMap(manager)
  const update = new UpdateGame(manager)
  Maps.TiledMap.addToScene(level1)
  game.add('level1', {
    scene: level1,
    transitions: {
      in: new ex.FadeInOut({duration: 500, direction: 'in', color: ex.Color.Black}),
      out: new ex.FadeInOut({duration: 500, direction: 'out', color: ex.Color.Black})
    }
  })

  game.add('update', {
    scene: update,
    transitions: {
      in: new ex.FadeInOut({duration: 500, direction: 'in', color: ex.Color.Black}),
      out: new ex.FadeInOut({duration: 500, direction: 'out', color: ex.Color.Black})
    }
  })

  game.goToScene('update')

  level1.camera.strategy.lockToActor(Maps.TiledMap.getEntitiesByClassName('player')[0])
})
