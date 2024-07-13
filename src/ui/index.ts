// @ts-nocheck
import * as ex from 'excalibur'
import {GameManager} from '../manager'
import {Images} from '../resources'

const margin = 20
const backSize = {
  width: 160,
  height: 240
}

const Shuriken = ex.SpriteSheet.fromImageSource({
  image: Images.Shuriken,
  grid: {
    spriteWidth: 16,
    spriteHeight: 16,
    rows: 1,
    columns: 1
  }
})
const spriteShuriken = Shuriken.getSprite(0, 0)
export class UiSelectSkills extends ex.Actor {
  index: number
  levelSkill: ex.Actor
  manager: GameManager
  constructor(index: number, manager: GameManager) {
    console.log('index === 1', index === 1)
    super({
      pos: ex.vec(0, 0),
      width: backSize.width,
      height: backSize.height,
      color: ex.Color.Chartreuse,
      coordPlane: ex.CoordPlane.Screen,
      anchor: index === 1 ? ex.vec(0, 0.5) : ex.vec(1, 0.5),
      offset: index === 1 ? ex.vec(margin, 0) : ex.vec(-margin, 0)
    })
    this.index = index
    this.levelSkill = new ex.Actor()
    this.manager = manager
  }

  onInitialize(engine: ex.Engine<any>): void {
    const back = ex.SpriteSheet.fromImageSource({
      image: Images.theme,
      grid: {
        spriteWidth: 100,
        spriteHeight: 150,
        rows: 1,
        columns: 1
      }
    })
    const spriteBack = back.getSprite(0, 0, {
      width: backSize.width,
      height: backSize.height
    })

    const BigShuriken = ex.SpriteSheet.fromImageSource({
      image: Images.BigShuriken,
      grid: {
        spriteWidth: 23,
        spriteHeight: 23,
        rows: 2,
        columns: 1
      }
    })
    const spriteBigShuriken = BigShuriken.getSprite(0, 0, {
      width: backSize.width / 2,
      height: backSize.width / 2
    })

    const Thunder = ex.SpriteSheet.fromImageSource({
      image: Images.Thunder,
      grid: {
        spriteWidth: 20,
        spriteHeight: 28,
        rows: 1,
        columns: 8
      }
    })

    const spriteThunder = Thunder.getSprite(5, 0, {
      width: backSize.width / 2,
      height: backSize.width / 2
    })

    const spriteThunder2 = Thunder.getSprite(4, 0, {
      width: backSize.width / 2,
      height: backSize.width / 2
    })

    const groupBigShuriken = new ex.GraphicsGroup({
      members: [
        {graphic: spriteBack, offset: ex.vec(0, 0)},
        {graphic: spriteBigShuriken, offset: ex.vec(backSize.width / 4, backSize.height / 6)}
      ]
    })

    const groupBigThunder = new ex.GraphicsGroup({
      members: [
        {graphic: spriteBack, offset: ex.vec(0, 0)},
        {graphic: spriteThunder, offset: ex.vec(backSize.width / 4, backSize.height / 6)},
        {graphic: spriteThunder2, offset: ex.vec(backSize.width / 4, backSize.height / 6)}
      ]
    })

    this.graphics.add('BigShuriken', groupBigShuriken)
    this.graphics.add('Thunder', groupBigThunder)
    if (this.index === 1) this.graphics.use('BigShuriken')
    else this.graphics.use('Thunder')
    this.on('pointerup', () => {
      this.manager.updateSkill(this.index)
      engine.goToScene('level1')
    })
  }

}
