// @ts-nocheck
import * as ex from 'excalibur'
import {GameManager} from '../manager'
import {Images} from '../resources'

const margin = 80
const backSize = {
  width: 100,
  height: 180
}

const screeenSize = {
  width: window.innerWidth,
  height: window.innerHeight
}

const dadad = [
  {
    anchor: ex.vec(0, 0.5),
    offset: ex.vec(margin, 0)
  },
  {
    anchor: ex.vec(0.5, 0.5),
    offset: ex.vec(0, 0)
  },
  {
    anchor: ex.vec(1, 0.5),
    offset: ex.vec(-margin, 0)
  }
]

export class UiSelectSkills extends ex.Actor {
  index: number
  levelSkill: ex.Actor
  manager: GameManager
  constructor(index: number, manager: GameManager) {
    super({
      pos: ex.vec(0, 0),
      width: backSize.width,
      height: backSize.height,
      color: ex.Color.Chartreuse,
      coordPlane: ex.CoordPlane.Screen,
      anchor: dadad[index - 1].anchor,
      offset: dadad[index - 1].offset
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
    }).getSprite(0, 0, {
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
    }).getSprite(0, 0, {
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
    }).getSprite(5, 0, {
      width: backSize.width / 2,
      height: backSize.width / 2
    })

    const quayVong = ex.SpriteSheet.fromImageSource({
      image: Images.Thunder,
      grid: {
        spriteWidth: 20,
        spriteHeight: 28,
        rows: 1,
        columns: 8
      }
    }).getSprite(5, 0, {
      width: backSize.width / 2,
      height: backSize.width / 2
    })

    const groupBigShuriken = new ex.GraphicsGroup({
      members: [
        {graphic: back, offset: ex.vec(0, 0)},
        {graphic: BigShuriken, offset: ex.vec(backSize.width / 4, backSize.height / 6)}
      ]
    })

    const groupBigThunder = new ex.GraphicsGroup({
      members: [
        {graphic: back, offset: ex.vec(0, 0)},
        {graphic: Thunder, offset: ex.vec(backSize.width / 4, backSize.height / 6)}
      ]
    })

    const groupQuayVong = new ex.GraphicsGroup({
      members: [
        {graphic: back, offset: ex.vec(0, 0)},
        {graphic: Thunder, offset: ex.vec(backSize.width / 4, backSize.height / 6)}
      ]
    })

    this.graphics.add('BigShuriken', groupBigShuriken)
    this.graphics.add('Thunder', groupBigThunder)
    this.graphics.add('quayVong', groupQuayVong)
    if (this.index === 1) this.graphics.use('BigShuriken')
    else this.graphics.use('Thunder')
    this.on('pointerup', () => {
      this.manager.updateSkill(this.index)
      engine.goToScene('level1')
    })
  }
}

class Info extends ex.Actor {
  atk: number = new ex.Text({
    text: `atk: 0`,
    font: new ex.Font({
      textAlign: ex.TextAlign.Left,
      size: 10
    })
  })
  def: number = new ex.Text({
    text: `def: 0`,
    font: new ex.Font({
      textAlign: ex.TextAlign.Left
    })
  })
  spe: number = new ex.Text({
    text: `spe: 0`,
    font: new ex.Font({
      textAlign: ex.TextAlign.Left
    })
  })
  bla: number = new ex.Text({
    text: `bla: 0`,
    font: new ex.Font({
      textAlign: ex.TextAlign.Left
    })
  })

  constructor() {
    super({
      pos: ex.vec(screeenSize.width / 2 - 50, 0),
      z: 100,
      height: 40,
      width: 40,
      color: ex.Color.black
    })
  }

  onInitialize(engine: ex.Engine<any>): void {
    const dada1 = new ex.Actor({z: 30, height: 40, width: 40, anchor: ex.vec(0, 0)})
    const dada2 = new ex.Actor({z: 30, height: 40, width: 40, anchor: ex.vec(0, 1)})
    const dada3 = new ex.Actor({z: 30, height: 40, width: 40, anchor: ex.vec(1, 0)})
    const dada4 = new ex.Actor({z: 30, height: 40, width: 40, anchor: ex.vec(1, 1)})
    dada1.graphics.use(this.atk)
    dada2.graphics.use(this.def)
    dada3.graphics.use(this.spe)
    dada4.graphics.use(this.bla)
    this.addChild(dada1)
    this.addChild(dada2)
    this.addChild(dada3)
    this.addChild(dada4)
  }

  onUpdateInfo() {}
}

class InfoSkill extends ex.Actor {
  dadad: any = [
    {
      anchor: ex.vec(0, 0),
      pos: ex.vec(80, 0)
    },
    {
      anchor: ex.vec(0.5, 0),
      pos: ex.vec(0, 0)
    },
    {
      anchor: ex.vec(1, 0),
      pos: ex.vec(-80, 0)
    },
    {
      anchor: ex.vec(0, 1),
      pos: ex.vec(80, 0)
    },
    {
      anchor: ex.vec(0.5, 1),
      pos: ex.vec(0, 0)
    },
    {
      anchor: ex.vec(1, 1),
      pos: ex.vec(-80, 0)
    }
  ]
  skillInfo: {skill: string; level: number} = []
  constructor() {
    super({
      pos: ex.vec(-30, 0),
      z: 100,
      height: 10, //(window.innerWidth * 60) / 316,
      width: 10,
      color: ex.Color.black,
    })
  }
  onInitialize() {
    for (let i of this.dadad) {
      this.addChild(new ex.Actor({height: 30, width: 30, anchor: i.anchor ,pos: i.pos, color: ex.Color.Chartreuse, z: 30}))
    }
  }

  onUpdateInfo() {}
}
export class UiInfoCharacter extends ex.Actor {
  player: GameManager
  info: any
  constructor(player: GameManager) {
    super({
      pos: ex.vec(screeenSize.width / 2, window.innerHeight - (screeenSize.width * 60) / (316 * 2)),
      width: screeenSize.width,
      // height: 20,
      // color: ex.Color.Chartreuse,
      coordPlane: ex.CoordPlane.Screen,
      // collider: ex.Shape.Box(24, 24),
      z: 20
    })
    this.player = player
    // this.info = new Info()
  }

  onInitialize(engine: ex.Engine<any>): void {
    const DialogueBoxSimple = ex.SpriteSheet.fromImageSource({
      image: Images.DialogueBoxSimple,
      grid: {
        spriteWidth: 316,
        spriteHeight: 60,
        rows: 1,
        columns: 1
      }
    }).getSprite(0, 0, {
      width: window.innerWidth,
      height: (window.innerWidth * 60) / 316
    })

    const FacesetBox = ex.SpriteSheet.fromImageSource({
      image: Images.FacesetBox,
      grid: {
        spriteWidth: 48,
        spriteHeight: 48,
        rows: 1,
        columns: 1
      }
    }).getSprite(0, 0, {
      width: (window.innerWidth * 60) / 316,
      height: (window.innerWidth * 60) / 316
    })

    const groupBigThunder = new ex.GraphicsGroup({
      members: [
        {graphic: DialogueBoxSimple, offset: ex.vec(0, 0)},
        {graphic: FacesetBox, offset: ex.vec(0, 0)}
      ]
    })

    this.graphics.use(groupBigThunder)
    this.addChild(new Info())
    this.addChild(new InfoSkill())
  }

  onPreUpdate(engine: ex.Engine<any>, delta: number): void {
    if (engine.input.keyboard.wasPressed(ex.Input.Keys.Space)) {
    }
  }

  onUpdateInfo = () => {}
}
