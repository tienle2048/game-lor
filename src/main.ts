import * as ex from 'excalibur'
import { GameManager } from './manager'
import { BaseMap, UpdateGame } from './map'
import {loader, Maps} from './resources'
const game = new ex.Engine({
  antialiasing: false,
  displayMode: ex.DisplayMode.FillScreen
})
// game.toggleDebug();
await game.start(loader)

const player = Maps.TiledMap.getEntitiesByClassName('player')[0]
const manager = new GameManager(player)
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

game.goToScene('level1')



level1.camera.strategy.lockToActor(Maps.TiledMap.getEntitiesByClassName('player')[0])
