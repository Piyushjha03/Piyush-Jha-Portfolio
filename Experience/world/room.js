import * as THREE from "three";
import Experience from "../experience";
import GSAP from "gsap";
import {RectAreaLightHelper} from "three/examples/jsm/helpers/RectAreaLightHelper.js"

export default class room{
    constructor(){
        this.Experience=new Experience;
        this.scene=this.Experience.scene;
        this.time=this.Experience.time;
        this.resources=this.Experience.resources;
        this.room=this.resources.items.Room;
        this.actualRoom=this.room.scene;

        this.lerp={
            current:0,
            target:0,
            ease:0.1,
        }

        this.setModel();
        this.setAnimation();
        this.onMouseMove();
    }

    setModel(){
        
        this.actualRoom.children.forEach((child) => {
            child.castShadow = true;
            child.receiveShadow=true;
           
            if(child instanceof THREE.Group){
                
                child.children.forEach((groupChild)=>{
                    
                    groupChild.castShadow=true;
                    groupChild.receiveShadow=true;
                })
            }
            
            if(child.name==="mini_floor"){
                child.position.x=0;
                child.position.z=0;
            }
            if(child.name==="mailbox"||child.name==="floor_first"||child.name==="floor_second"||child.name==="floor_third"||child.name==="lamp"||child.name==="rock1"||child.name==="rock2"||child.name==="rock3"||child.name==="rock4"){
                child.scale.set(0,0,0)
            }

            if(child.name==="aquarium"){
                child.children[0].material=new THREE.MeshPhysicalMaterial();
                child.children[0].material.roughness=0;
                child.children[0].material.color.set(0x549dd2);
                child.children[0].material.ior=3;
                child.children[0].material.opacity=1;
                child.children[0].material.transmission=1;
            }
            if(child.name==="computer"){
                child.children[0].material=new THREE.MeshBasicMaterial({
                    map:this.resources.items.screen,
                });
            }
        });
        const width = 1;
        const height = 1;
        const intensity = 1;
        const rectLight = new THREE.RectAreaLight( 0xffffff, intensity,  width, height );
        rectLight.position.set(9 ,11,-4 );
        rectLight.rotation.x=-Math.PI/2;
        rectLight.rotation.z=Math.PI/4;
        this.actualRoom.add( rectLight )

        // const rectLightHelper = new RectAreaLightHelper( rectLight );
        // rectLight.add( rectLightHelper );

        this.scene.add(this.actualRoom);
        this.actualRoom.scale.set(0.08,0.08,0.08);
    }

    setAnimation(){
  
        this.mixer=new THREE.AnimationMixer(this.actualRoom);
        this.swim=this.mixer.clipAction(this.room.animations[4])
        this.swim.play();
    }

    onMouseMove(){
        window.addEventListener('mousemove',(e)=>{
            this.rotation=(e.clientX-window.innerWidth/2)*2/window.innerWidth;//(x-(w/2))%(w/2)
            this.lerp.target=this.rotation*0.1;
        })
    }

    resize(){
    }

    update(){
       this.mixer.update(this.time.delta * 0.0007);
       this.lerp.current=GSAP.utils.interpolate(
        this.lerp.current,
        this.lerp.target,
        this.lerp.ease,
    );

    this.actualRoom.rotation.y=this.lerp.current;
   
    }
}