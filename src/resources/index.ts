// @ts-nocheck
import {TiledResource} from '@excaliburjs/plugin-tiled'
import {Animation, ImageSource, Loader, range, Sound, SpriteSheet, vec} from 'excalibur'
import { LegendHero } from '../entity'
import { BambooMonter } from '../entity/dynamic/monters/okla'


import Mon2path from '../../assets/Actor/Characters/Monk2/SpriteSheet.png?url'
import Boypath from '../../assets/Actor/Characters/Boy/SpriteSheet.png?url'
import CamouflageGreenpath from '../../assets/Actor/Characters/CamouflageGreen/SpriteSheet.png?url'
import CamouflageRedpath from '../../assets/Actor/Characters/CamouflageRed/SpriteSheet.png?url'
import Cavegirlpath from '../../assets/Actor/Characters/Cavegirl/SpriteSheet.png?url'
import Cavegirl2path from '../../assets/Actor/Characters/Cavegirl2/SpriteSheet.png?url'
import Bamboopath from '../../assets/Actor/Monsters/Bamboo/SpriteSheet.png?url'
import Beastpath from '../../assets/Actor/Monsters/Beast/SpriteSheet.png?url'
import Axolotpath from '../../assets/Actor/Monsters/Axolot/SpriteSheet.png?url'
import Axepath from '../../assets/Items/Weapons/Axe/SpriteInHand.png?url'
import Shurikenpath from '../../assets/Ui/Shuriken.png?url'
import BigShurikenpath from '../../assets/FX/Projectile/BigShuriken.png?url'
import Thunderpath from '../../assets/FX/Elemental/Thunder/SpriteSheet.png?url'
import TilesetNaturepath from '../../assets/Backgrounds/Tilesets/TilesetNature.png?url'
import map1path from '../../assets/map/map1.png?url'
import themepath from '../../assets/maptest/theme.png?url'
import WaterPot from '../../assets/Items/Potion/WaterPot.png?url'


import TiledMapPath from '../../assets/maptest/mapokla.tmx?url'
import TilesetFloor from '../../assets/maptest/TilesetFloor.tsx?url'
import TilesetWater from '../../assets/maptest/TilesetWater.tsx?url'

import TilesetFloorImage from '../../assets/Backgrounds//Tilesets/TilesetFloor.png?url'
import TilesetWaterImage from '../../assets/Backgrounds//Tilesets/TilesetWater.png?url'





const Images: Record<string, ImageSource> = {
  // hero
  Monk2: new ImageSource(Mon2path),
  Boy: new ImageSource(Boypath),
  CamouflageGreen: new ImageSource(CamouflageGreenpath),
  CamouflageRed: new ImageSource(CamouflageRedpath),
  Cavegirl: new ImageSource(Cavegirlpath),
  Cavegirl2: new ImageSource(Cavegirl2path),

  // Monsters
  Bamboo: new ImageSource(Bamboopath),
  Beast: new ImageSource(Beastpath),
  Axolot: new ImageSource(Axolotpath),


  // Weapons 
  Axe: new ImageSource(Axepath),
  Shuriken: new ImageSource(Shurikenpath),
  BigShuriken: new ImageSource(BigShurikenpath),


  // fx 
  Thunder: new ImageSource(Thunderpath),

  // tile
  TilesetNature: new ImageSource(TilesetNaturepath),

  // map
  map1: new ImageSource(map1path),
  theme: new ImageSource(themepath),
  WaterPot: new ImageSource(WaterPot)
  
}

const Sounds: Record<string, Sound> = {}

const Maps: Record<string, TiledResource> = {
  TiledMap: new TiledResource(TiledMapPath, {
    entityClassNameFactories: {
      player: props => {
        const player = new LegendHero(props.worldPos.x,props.worldPos.y)
        player.z = 100
        return player
      }
    },
    pathMap: [
      { path: 'mapokla.tmx', output: TiledMapPath },
      { path: 'TilesetFloor.tsx', output: TilesetFloor },
      { path: 'TilesetWater.tsx', output: TilesetWater },
      { path: 'TilesetFloor.png', output: TilesetFloorImage },
      { path: 'TilesetWater.png', output: TilesetWaterImage }
    ]
  })
}

const loader = new Loader()
loader.suppressPlayButton = true
const allResources = {...Images, ...Sounds, ...Maps}
for (const res in allResources) {
  loader.addResource(allResources[res])
}

export {loader, Images, Sounds, Maps}
