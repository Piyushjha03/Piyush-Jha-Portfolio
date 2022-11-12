import * as THREE from "three";
import sizes from "./Util/sizes"
import time from "./Util/time";
import resources from "./Util/resources";
import assets from "./Util/assets";
import camera from "./camera";
import theme from "./theme";
import renderer from "./renderer";
import world from "./world/world";




export default class Experience{
    static instance
    constructor(canvas){
        if(Experience.instance)
        {
            return Experience.instance
        }

        Experience.instance=this;
        this.canvas=canvas;
        this.scene=new THREE.Scene();
        this.time=new time();
        this.sizes=new sizes();
        this.camera=new camera();
        this.renderer=new renderer();
        this.resources=new resources(assets);
        this.theme= new theme();
        this.world= new world();
   

        this.time.on("update",() =>{
            this.update();
        })

        this.sizes.on("resize",()=>{
            this.resize();
        })

    }

    resize(){
        this.camera.resize();
        this.world.resize();
        this.renderer.resize();
        
    }

    update(){
        this.camera.update();
        this.world.update();
        this.renderer.update();

    }
}

