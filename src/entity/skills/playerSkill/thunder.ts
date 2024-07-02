import {Actor, Animation, Engine, SpriteSheet, vec, AnimationStrategy} from 'excalibur'
import {Images} from '../../../resources'
import {BaseDynamic} from '../../dynamic/BaseDynamic'
// import {Sword} from '../../dynamic/weapons'
import {BaseSkill, IBaseSkillArgs} from '../BaseSkill'

export class ThunderSkill extends BaseSkill {
  fx?: Animation
  constructor(config: Omit<IBaseSkillArgs, 'range' | 'cooldownConfig'>) {
    super({...config, range: 400, cooldownConfig: 2000})
    this.init()
  }

  init() {
    const thunderSpriteSheet = SpriteSheet.fromImageSource({
      image: Images.Thunder,
      grid: {
        spriteWidth: 20,
        spriteHeight: 28,
        rows: 1,
        columns: 8
      }
    })
    const thunder = new Animation({
      frames: [
        {graphic: thunderSpriteSheet.getSprite(0, 0) as ex.Sprite, duration: 50},
        {graphic: thunderSpriteSheet.getSprite(1, 0) as ex.Sprite, duration: 50},
        {graphic: thunderSpriteSheet.getSprite(2, 0) as ex.Sprite, duration: 50},
        {graphic: thunderSpriteSheet.getSprite(3, 0) as ex.Sprite, duration: 50},
        {graphic: thunderSpriteSheet.getSprite(4, 0) as ex.Sprite, duration: 50},
        {graphic: thunderSpriteSheet.getSprite(5, 0) as ex.Sprite, duration: 50},
        {graphic: thunderSpriteSheet.getSprite(6, 0) as ex.Sprite, duration: 50},
        {graphic: thunderSpriteSheet.getSprite(7, 0) as ex.Sprite, duration: 50},
      ]
    })
    thunder.scale = vec(4, 4)

    this.fx = thunder
  }

  onAttack(engine: Engine, target: BaseDynamic) {
    const okla = new Actor({pos: vec(0, -30), width: 60, height: 10, z: 101})
    this.fx!.events.on('loop', a => {
      target.takeDamage(this.dame)
      target.removeChild(okla)
    })
    okla.graphics.use(this.fx!)
    target.addChild(okla)
  }
}
