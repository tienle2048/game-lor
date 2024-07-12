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
  BigShuriken: new ImageSource('./assets/FX/Projectile/BigShuriken.png'),


  // fx 
  Thunder: new ImageSource('./assets/FX/Elemental/Thunder/SpriteSheet.png'),

  // tile
  TilesetNature: new ImageSource('./assets/Backgrounds/Tilesets/TilesetNature.png'),

  // map
  map1: new ImageSource('./assets/map/map1.png'),
  theme: new ImageSource('./assets/maptest/theme.png'),
  
}

const Sounds: Record<string, Sound> = {}

const Maps: Record<string, TiledResource> = {
  TiledMap: new TiledResource('./assets/maptest/mapokla.tmx', {
    entityClassNameFactories: {
      player: props => {
        const player = new LegendHero(props.worldPos.x,props.worldPos.y)
        player.z = 100
        return player
      },
      dadada: props => {
        const player = new BambooMonter(props.worldPos.x,props.worldPos.y)
        player.z = 100
        return player
      }
    }
  })
}

const loader = new Loader()
loader.suppressPlayButton = true
const allResources = {...Images, ...Sounds, ...Maps}
for (const res in allResources) {
  loader.addResource(allResources[res])
}

export {loader, Images, Sounds, Maps}
