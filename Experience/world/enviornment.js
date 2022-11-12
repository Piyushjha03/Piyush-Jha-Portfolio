import * as THREE from "three";
import GSAP from "gsap";
import Experience from "../experience";


export default class enviornment{
    constructor(){
        this.Experience=new Experience;
        this.scene=this.Experience.scene;
        this.resources=this.Experience.resources;
       
        this.setLight();

    }

    setLight(){
        this.sunLight=new THREE.DirectionalLight('#ffffff',1);
        this.sunLight.castShadow=true;
        this.sunLight.shadow.camera.far=20;
        this.sunLight.shadow.mapSize.set(2048,2048);
        this.sunLight.shadow.normalBias=0.05;
        // const helper=new THREE.CameraHelper(this.sunLight.shadow.camera);
        // this.scene.add(helper)
        this.sunLight.position.set(-1.5,8,5);

        this.scene.add(this.sunLight);

        this.ambientLight=new THREE.AmbientLight('#fff',1.2)
        this.scene.add(this.ambientLight);

    }

    switchTheme(theme){
        if(theme==="dark"){
            GSAP.to(this.sunLight.color,{
                b:0.6862,
                g:0.2313,
                r:0.1725,
            })
            GSAP.to(this.ambientLight.color,{
                b:0.6862,
                g:0.2313,
                r:0.1725,
            });

            GSAP.to(this.sunLight,{
                intensity:0.78,
            });
            GSAP.to(this.ambientLight,{
                intensity:0.78,
            });
            
        }
        else{
            GSAP.to(this.sunLight.color,{
                r:1,
                g:1,
                b:1,
            })
            GSAP.to(this.ambientLight.color,{
                r:1,
                g:1,
                b:1,
            });

            GSAP.to(this.sunLight,{
                intensity:1,
            });
            GSAP.to(this.ambientLight,{
                intensity:1.2,
            });
           

        }
    }

    resize(){
    }

    update(){
       
    }
}