import * as THREE from "three";
import Experience from "../experience";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js"
import { EventEmitter } from "events";


export default class resources extends EventEmitter{
    constructor(assets){
        super();
        this.Experience=new Experience();
        this.renderer=this.Experience.renderer;
        this.assets=assets;
        this.items={};
        this.queue=this.assets.length;
        this.loaded=0;

        this.setLoader();
        this.startLoading();
    
    }

    setLoader(){
        this.loader={};
        this.loader.gltfLoader=new GLTFLoader();
        this.loader.dracoLoader=new DRACOLoader();
        this.loader.dracoLoader.setDecoderPath("/draco/");
        this.loader.gltfLoader.setDRACOLoader(this.loader.dracoLoader);
    }
    startLoading(){
        for(const asset of this.assets){
            if(asset.type==="glbModel"){
                this.loader.gltfLoader.load(asset.path,(file)=>{
                    this.singleAssetLoaded(asset,file);
                })
            }
            else if(asset.type==="videoTexture"){
                this.video={}
                this.videoTextures={}


                this.video[asset.name]=document.createElement("video");
                this.video[asset.name].src=asset.path;
                this.video[asset.name].playInline=true;
                this.video[asset.name].autoplay=true;
                this.video[asset.name].loop=true;
                this.video[asset.name].muted=true;  
                this.video[asset.name].play();  

                this.videoTextures[asset.name]=new THREE.VideoTexture(this.video[asset.name]);
                this.videoTextures[asset.name].flipY=false;
                this.videoTextures[asset.name].muted=true;
                this.videoTextures[asset.name].minFilter=THREE.NearestFilter;
                this.videoTextures[asset.name].magFilter=THREE.NearestFilter;
                this.videoTextures[asset.name].generateMipmaps=false;
                this.videoTextures[asset.name].encoding=THREE.sRGBEncoding;

                this.singleAssetLoaded(asset,this.videoTextures[asset.name]);

            }
        }
    }
    singleAssetLoaded(asset,file){
        this.items[asset.name]=file;
        this.loaded++;
   
        if(this.loaded===this.queue){
            
            this.emit("ready");
        }
    }
    
}