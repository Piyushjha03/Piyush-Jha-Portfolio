import { EventEmitter } from "events";

export default class time extends EventEmitter{
    constructor(){
        super();
        this.start=Date.now();
        this.current=this.start;
        this.elapsed=0;
        this.delta=16;

        this.update();
    }


    update(){
        const currentTime=Date.now();
        this.delta=currentTime-this.current;
        this.current=currentTime;
        this.elapsed=this.current-this.start;
        this.emit("update");//from node js
        window.requestAnimationFrame(()=>this.update())
    }
}