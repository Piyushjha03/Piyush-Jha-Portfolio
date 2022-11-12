import * as THREE from "three";
import Experience from "../experience";


export default class floor{
    constructor(){
        this.Experience=new Experience;
        this.scene=this.Experience.scene;
       
        this.setFloor();
        this.setCircles();
        }

        setCircles(){
    const geometry = new THREE.CircleGeometry( 5, 32 );
    const material = new THREE.MeshStandardMaterial( { color: 0xe5a1aa } );
    const material2 = new THREE.MeshStandardMaterial( { color: 0x8395cd } );
    const material3 = new THREE.MeshStandardMaterial( { color: 0x7ad0ac } );
    this.circle1 = new THREE.Mesh( geometry, material );
    this.circle2 = new THREE.Mesh( geometry, material2 );
    this.circle3 = new THREE.Mesh( geometry, material3 );
    this.circle1.position.y=-0.29;

    this.circle2.position.y=-0.28;
    this.circle2.position.x=2;

    this.circle3.position.y=-0.27;
    this.circle1.scale.set(0,0,0);
    this.circle2.scale.set(0,0,0);
    this.circle3.scale.set(0,0,0);
    this.circle1.rotation.x=this.circle2.rotation.x=this.circle3.rotation.x=-Math.PI/2;
    this.circle1.receiveShadow=this.circle2.receiveShadow=this.circle3.receiveShadow=true;
    this.scene.add(this.circle1);
    this.scene.add(this.circle2);
    this.scene.add(this.circle3);
        }

    setFloor(){
        this.geometry=new THREE.PlaneGeometry(100,100);
        this.material=new THREE.MeshStandardMaterial({
            color: 0xffff84,
        })
        this.plane=new THREE.Mesh(this.geometry,this.material);
        this.plane.rotation.x=-Math.PI/2;
        this.plane.position.y=-0.3;
        this.plane.receiveShadow=true;
        this.scene.add(this.plane);

    }

    resize(){
    }

    update(){
       
   
    }
}