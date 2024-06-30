import {TiledResource} from '@excaliburjs/plugin-tiled'
import {Animation, ImageSource, Loader, range, Sound, SpriteSheet, vec} from 'excalibur'
import { LegendHero } from '../entity'
import { BambooMonter } from '../entity/dynamic/monters/okla'

const Images: Record<string, ImageSource> = {
  // hero
  Monk2: new ImageSource('./assets/Actor/Characters/Monk2/SpriteSheet.png'),
  Boy: new ImageSource('./assets/Actor/Characters/Boy/SpriteSheet.png'),
  CamouflageGreen: new ImageSource('./assets/Actor/Characters/CamouflageGreen/SpriteSheet.png'),
  CamouflageRed: new ImageSource('./assets/Actor/Characters/CamouflageRed/SpriteSheet.png'),
  Cavegirl: new ImageSource('./assets/Actor/Characters/Cavegirl/SpriteSheet.png'),
  Cavegirl2: new ImageSource('./assets/Actor/Characters/Cavegirl2/SpriteSheet.png'),

  // Monsters
  Bamboo: new ImageSource('./assets/Actor/Monsters/Bamboo/SpriteSheet.png'),
  Beast: new ImageSource('./assets/Actor/Monsters/Beast/SpriteSheet.png'),
  Axolot: new ImageSource('./assets/Actor/Monsters/Axolot/SpriteSheet.png'),


  // Weapons 
  Axe: new ImageSource('./assets/Items/Weapons/Axe/SpriteInHand.png'),
  Shuriken: new ImageSource('./assets/Ui/Shuriken.png'),

  // tile
  TilesetNature: new ImageSource('./assets/Backgrounds/Tilesets/TilesetNature.png'),

  // map
  map1: new ImageSource('./assets/map/map1.png')
}

const Sounds: Record<string, Sound> = {}

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



const Maps: Record<string, TiledResource> = {
  TiledMap: new TiledResource('./assets/mapokla/untitled.tmx', {
    entityClassNameFactories: {
      player: props => {
        const player = new LegendHero(props.worldPos.x,props.worldPos.y)
        console.log("🚀 ~ player:", player)
        player.z = 100
        return player
      },
      dadada: props => {
        const player = new BambooMonter(props.worldPos.x,props.worldPos.y)
        console.log("🚀 ~ player:", player)
        player.z = 100
        return player
      }
    },
    // // Path map intercepts and redirects to work around vite's static bundling
    // pathMap: [
    // ]
  })
}
console.log('🚀 ~ Maps:', Maps.TiledMap)

const loader = new Loader()
loader.suppressPlayButton = true
const allResources = {...Images, ...Sounds, ...Maps}
for (const res in allResources) {
  loader.addResource(allResources[res])
}

export {loader, Images, Sounds, Maps}
