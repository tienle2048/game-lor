import * as ex from 'excalibur'
import { BambooMonter } from '../entity/dynamic/monters/okla'

export class GameManager {
    player: any
    constructor(palyer:any){
        this.player = palyer
    }
    respon(scene: ex.Scene<any>, config: any){
        console.log("🚀 ~ GameManager ~ respon ~ config:", config)
        // const {x,y} = scene.actors.find(actor => actor.name ==="Legend")!.pos

        for(let i = 0; i < config;i++){
            const ranX = new ex.Random(i).integer(300, 3000)
            const ranY = new ex.Random(ranX).integer(300, 1500)
            const monter = new BambooMonter(ranX,ranY)
            monter.z = 100
            scene.add(monter)
        }
    }
}