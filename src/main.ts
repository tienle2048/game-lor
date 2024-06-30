import {Actor, CollisionType, Color, Engine, Loader, vec, range, ImageSource, SpriteSheet, Animation, DisplayMode, Input} from 'excalibur'
import {GameMap, LegendHero} from './entity'
import {Images, loader, Maps} from './resources'
const game = new Engine({
  antialiasing: false,
  displayMode: DisplayMode.FillScreen
})
game.toggleDebug();


// const map1 = new GameMap(0,0,Images.map1)
// game.add(map1)

const allResources = {...Images}

let i = 1
// for (const res in allResources) {
const heroSpriteSheet = SpriteSheet.fromImageSource({
  image: Images.Monk2,
  grid: {
    columns: 4,
    rows: 7,
    spriteWidth: 16,
    spriteHeight: 16
  }
})
console.log('🚀 ~ heroSpriteSheet:', heroSpriteSheet)
 
const run1 = Animation.fromSpriteSheet(heroSpriteSheet, range(0, 10), 1000)
run1.scale = vec(4, 4)

// class Player extends LegendHero {
//   onInitialize() {
//     // Set as the default drawing
//     this.graphics.use(run1)
//   }
// }

// game.add(paddle)
// i++
// }

// game.currentScene.camera.strategy.lockToActor(paddle)

// game.input.keyboard.on('press', (evt: ex.Input.KeyEvent) => {
//   console.log("🚀 ~ game.input.keyboard.on ~ evt:", evt)
//   if (evt.key === Input.Keys.D) {
//     game.toggleDebug();
//   }
// });
// // game.input.pointers.primary.on("move", (evt) => {
// //   paddle.pos.x = evt.worldPos.x;
// //   paddle.pos.y = evt.worldPos.y;
// // });
await game.start(loader)

Maps.TiledMap.addToScene(game.currentScene)
