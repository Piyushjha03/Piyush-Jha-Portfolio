import * as THREE from "three";
import Experience from "../experience";
import room from "./room";
import floor from "./floor";
import enviornment from "./enviornment";
import controls from "./controls";

export default class world{
    constructor(){
        this.Experience=new Experience;
        this.sizes=this.Experience.sizes;
        this.scene=this.Experience.scene;
        this.canvas=this.Experience.canvas;
        this.camera=this.Experience.camera;
        this.resources=this.Experience.resources;
        this.theme=this.Experience.theme;


        this.resources.on('ready',()=>{
            this.enviornment=new enviornment();
            this.room=new room();
            
            this.floor=new floor();
            this.controls=new controls();
           
        })

        this.theme.on("switch",(theme)=>{
            this.enviornment.switchTheme(theme);
        })

     
    }

    resize(){
    }

    update(){
       if(this.room){
        this.room.update();
       }
       if(this.controls){
        this.controls.update();
       }
    }
}