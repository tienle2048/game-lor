import {ImageSource, Vector} from 'excalibur'
import {BaseEntity} from '../../BaseEntity'

export class GameMap extends BaseEntity {
  constructor(x: number, y: number, image: ImageSource) {

    super({
      pos: new Vector(x, y)
    })

    const mapSprite = image.toSprite()
    this.graphics.use(mapSprite)
  }
}
