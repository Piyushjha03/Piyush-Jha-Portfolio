import * as THREE from "three";
import Experience from "./experience";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"


export default class camera{
    constructor(){
        this.Experience=new Experience;
        this.sizes=this.Experience.sizes;
        this.scene=this.Experience.scene;
        this.canvas=this.Experience.canvas;


        this.createPerspectiveCamera();
        this.createOrthographicCamera();
        this.setOrbitControls();

    }

    

    createPerspectiveCamera(){
        this.PerspectiveCamera=new THREE.PerspectiveCamera(
            35,
            this.sizes.aspect,
            0.1,
            1000);
        this.scene.add(this.PerspectiveCamera);
        this.PerspectiveCamera.position.z=24;
        this.PerspectiveCamera.position.x=18;
        this.PerspectiveCamera.position.y=22;
    }



    createOrthographicCamera(){
        
        this.OrthographicCamera=new THREE.OrthographicCamera(
            (-this.sizes.aspect*this.sizes.frustrum)/2,
            (this.sizes.aspect*this.sizes.frustrum)/2,
            this.sizes.frustrum/2,        
            -this.sizes.frustrum/2,
            -50,50        
            );

            this.OrthographicCamera.position.y=12;
             this.OrthographicCamera.position.z=20;
             this.OrthographicCamera.rotation.x=-Math.PI/6.25;
            this.scene.add(this.OrthographicCamera);

//this is camera helper----------------------

        // this.helper=new THREE.CameraHelper(this.OrthographicCamera);
        // this.scene.add(this.helper)

//----------------------------------------------
//this is grid helper----------------------
//  const size = 10;
// const divisions = 10;
// const gridHelper = new THREE.GridHelper( size, divisions );
// this.scene.add( gridHelper );
//----------------------------------------------

//axes helper code-------------------
// const axesHelper = new THREE.AxesHelper( 10 );
// this.scene.add( axesHelper );
//-----------------------------------------

this.scene.add(this.OrthographicCamera);


    }

    setOrbitControls(){
        this.controls=new OrbitControls(this.PerspectiveCamera,this.canvas)
        this.controls.enableDamping=true;
        this.controls.enableZoom=false;
    }
    
    resize(){

        this.PerspectiveCamera.aspect=this.sizes.aspect;
        this.PerspectiveCamera.updateProjectionMatrix();


        this.OrthographicCamera.left= (-this.sizes.aspect*this.sizes.frustrum)/2,
        this.OrthographicCamera.right= (this.sizes.aspect*this.sizes.frustrum)/2,
        this.OrthographicCamera.top= this.sizes.frustrum/2,        
        this.OrthographicCamera.bottom= -this.sizes.frustrum/2,
        this.OrthographicCamera.updateProjectionMatrix();   
    }

    update(){
        this.controls.update();
        // this.helper.matrixWorldNeedsUpdate=true;
        // this.helper.update();
        // this.helper.position.copy(this.OrthographicCamera.position);
        // this.helper.rotation.copy(this.OrthographicCamera.rotation);
    }
}