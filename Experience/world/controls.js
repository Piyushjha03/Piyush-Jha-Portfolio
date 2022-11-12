import * as THREE from "three";
import Experience from "../experience";
import GSAP from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default class controls{
    constructor(){
        this.Experience=new Experience;
        this.scene=this.Experience.scene;
        this.time=this.Experience.time;
        this.sizes=this.Experience.sizes;
        this.camera=this.Experience.camera;
        this.resources=this.Experience.resources;
        this.room=this.Experience.world.room.actualRoom;

        this.room.children.forEach(child => {
            if(child.type==="RectAreaLight"){
                this.rectLight=child;
            }
        });

        this.circle1=this.Experience.world.floor.circle1;
        this.circle2=this.Experience.world.floor.circle2;
        this.circle3=this.Experience.world.floor.circle3;

        GSAP.registerPlugin(ScrollTrigger);
       this.setScrollTrigger();

    }




    setScrollTrigger(){
        ScrollTrigger.matchMedia({
        // for desktop
        "(min-width: 968px)": ()=>{

            this.rectLight.height=1;
            this.rectLight.width=1;
            this.room.scale.set(0.08,0.08,0.08);
            this.firstMoveTimeline=new GSAP.timeline({
                scrollTrigger:{
                    trigger:".first-move",
                    start:"top top",
                    end:"bottom bottom",
                    scrub:0.7,
                    invalidateOnRefresh:true,
                }
            });
            this.firstMoveTimeline.to(this.room.position,{
                x:()=>{
                    return this.sizes.width * 0.0015;
                }
            });

            // section section
            this.secondMoveTimeline=new GSAP.timeline({
                scrollTrigger:{
                    trigger:".second-move",
   
                    start:"top top",
                    end:"bottom bottom",
                    scrub:0.7,
                    invalidateOnRefresh:true,
                }
            })
            .to(this.room.position,{
                x:()=>{
                    return 1;
                },
                z:()=>{
                    return this.sizes.height*0.003;
                }
            },"same")
            .to(this.room.scale,{
                    x: 0.3,
                    y: 0.3,
                    z: 0.3,

                },"same")
            .to(this.rectLight,{
                    width:this.rectLight.width*3,
                    height:this.rectLight.height*3,

                },"same");    

                // third-section

                this.thirdMoveTimeline=new GSAP.timeline({
                    scrollTrigger:{
                        trigger:".third-move",
                        start:"top top",
                        end:"bottom bottom",
                        scrub:0.7,
                        invalidateOnRefresh:true,
                    }
                });
                this.thirdMoveTimeline.to(this.camera.OrthographicCamera.position,{

                    y:8,
                    x:-3.4,

                },"same")
                .to(this.room.scale,{
                    x:0.2,
                    y:0.2,
                    z:0.2,

                },"same")

        },

        // for mobile
        "(max-width: 968px)": ()=>{
            this.room.position.set(0,0,0);
            this.room.scale.set(0.06,0.06,0.06,);
            this.rectLight.width=0.5;
            this.rectLight.height=0.6;
            this.firstMoveTimeline=new GSAP.timeline({
                scrollTrigger:{
                    trigger:".first-move",
                    start:"top top",
                    end:"bottom bottom",
                    scrub:0.7,
                    invalidateOnRefresh:true,
                }
            }).to(this.room.scale,{
                x:0.075,
                y:0.075,
                z:0.075,
            })

            // section section
            this.secondMoveTimeline=new GSAP.timeline({
                scrollTrigger:{
                    trigger:".second-move",
                    start:"top top",
                    end:"bottom bottom",
                    scrub:0.7,
                    invalidateOnRefresh:true,
                }
            }).to(this.room.scale,{
                x:0.2,
                y:0.2,
                z:0.2,
            },"same")
            .to(this.rectLight,{
                height:0.5*4,
                width:0.6*4,
            },"same")
            .to(this.room.position,{
                x:2.5,
            },"same")

                // third-section

                this.thirdMoveTimeline=new GSAP.timeline({
                    scrollTrigger:{
                        trigger:".third-move",
                        start:"top top",
                        end:"bottom bottom",
                        scrub:0.7,
                        invalidateOnRefresh:true,
                    }
                }).to(this.room.position,{
                    z:-4.5,
                })

        },
     
       //MINI FLOOR ANIMATION----------------------
       
       all:()=>{
        this.section=document.querySelectorAll('.section');
        this.section.forEach(section => {
            this.progressWrapper=section.querySelector('.progress-wrapper')
            this.progressBar=section.querySelector('.progress-bar')

            if(section.classList.contains("right")){
                GSAP.to(section,{
                    borderTopLeftRadius:10,
                    scrollTrigger:{
                        trigger:section,
                        start:"top bottom",
                        end:"top top",
                        scrub:0.6,
                    },
                }),

                GSAP.to(section,{
                    borderBottomLeftRadius:700,
                    scrollTrigger:{
                        trigger:section,
                        start:"top bottom",
                        end:"top top",
                        scrub:0.6,
                    },
                })

                
            }
            else{
                GSAP.to(section,{
                    borderTopRightRadius:10,
                    scrollTrigger:{
                        trigger:section,
                        start:"top bottom",
                        end:"top top",
                        scrub:0.6,
                    },
                }),

                GSAP.to(section,{
                    borderBottomRightRadius:700,
                    scrollTrigger:{
                        trigger:section,
                        start:"top bottom",
                        end:"top top",
                        scrub:0.6,
                    },
                });
            }

            GSAP.from(this.progressBar,{
                scaleY:0,
                scrollTrigger:{
                    trigger:section,
                start:"top top",
                end:"bottom bottom",
                scrub:0.4,
                pin:this.progressWrapper,
                pinSpacing:false,
                }
                
            });

        });

        //circle-animation------------------------------
        this.firstMoveTimeline=new GSAP.timeline({
            scrollTrigger:{
                trigger:".first-move",
                start:"top top",
                end:"bottom bottom",
                scrub:0.7,
                invalidateOnRefresh:true,
            }
        }).to(this.circle1.scale,{
            x:3,
            y:3,
            z:3.
        })

        // section section
        this.secondMoveTimeline=new GSAP.timeline({
            scrollTrigger:{
                trigger:".second-move",

                start:"top top",
                end:"bottom bottom",
                scrub:0.7,
                invalidateOnRefresh:true,
            }
        }).to(this.circle2.scale,{
            x:3,
            y:3,
            z:3.
        })

            // third-section

            this.thirdMoveTimeline=new GSAP.timeline({
                scrollTrigger:{
                    trigger:".third-move",
                    start:"top top",
                    end:"bottom bottom",
                    scrub:0.7,
                    invalidateOnRefresh:true,
                }
            }).to(this.circle3.scale,{
                x:3,
                y:3,
                z:3.
            },"same").to(this.room.position,{
                y:-0.2
            },"same")

// ----------------------------------------------
  
        this.secondPartTimeline=new GSAP.timeline({
            scrollTrigger:{
                trigger:".third-move",
                start:"center center",
                scrub:1,
                
            }
        });

        this.room.children.forEach(child =>{
            
            if (child.name==="mini_floor") {
         
                this.first=GSAP.to(child.position,{
                    x:-12.4783 ,
                    z:14.4371 ,
                    duration:0.3,
                    ease: "back.out(2)",
                })
            }

            if (child.name==="mailbox") {
         
                this.second=GSAP.to(child.scale,{
                    x:1,
                    y:1.96776,
                    z:1,
                    duration:0.3,
                    ease:"back.out(2)",
                })
            }
            if (child.name==="floor_first") {
                this.third=GSAP.to(child.scale,{
                    x:1.64861,
                    y:0.040112,
                    z:1.10332,
                    duration:0.3,
                    ease: "back.out(2)",
                })
            }  if (child.name==="floor_second") {
         
                this.fourth=GSAP.to(child.scale,{
                    x:1.64861,
                    y:0.040112,
                    z:1.10332,
                    duration:0.3,
                    ease:"back.out(2)",
                })
            }
            if (child.name==="floor_third") {

                this.fifth=GSAP.to(child.scale,{
                    x:1.64861,
                    y:0.040112,
                    z:1.10332,
                    duration:0.3,
                    ease: "back.out(2)",
                })
            } 
            if (child.name==="lamp") {
         
                this.sixth=GSAP.to(child.scale,{
                    x:0.779,
                    y:0.779,
                    z:0.779,
                    duration:0.3,
                    ease: "back.out(2)",
                })
            } if (child.name==="rock1") {
                    
                this.seventh=GSAP.to(child.scale,{
                    x:0.471,
                    y:0.769,
                    z:0.58,
                    duration:0.3,
                    ease: "back.out(2)",
                })
            }
            if (child.name==="rock2") {
         
                this.eighth=GSAP.to(child.scale,{
                    
                    x:1.269,
                    y:1.269,
                    z:1.269,
                    duration:0.3,
                    ease: "back.out(2)",
                })
            }
            if (child.name==="rock3") {
         
                this.ninth=GSAP.to(child.scale,{
                    x:0.787,
                    y:0.969,
                    z:1.285,
                    duration:0.3,
                    ease: "back.out(2)",
                })
            }
            if (child.name==="rock4") {
         
                this.tenth=GSAP.to(child.scale,{
                    x:1.4,
                    y:1.655,
                    z:3.222,
                    duration:0.3,
                    ease: "back.out(2)",
                })
            }
            
        });

        this.secondPartTimeline.add(this.first);
        this.secondPartTimeline.add(this.second);
        this.secondPartTimeline.add(this.third);
        this.secondPartTimeline.add(this.fourth,"-=0.2");
        this.secondPartTimeline.add(this.fifth,"-=0.2");
        this.secondPartTimeline.add(this.sixth,"-=0.2");
        this.secondPartTimeline.add(this.seventh,"-=0.2");
        this.secondPartTimeline.add(this.eighth);
        this.secondPartTimeline.add(this.ninth);
        this.secondPartTimeline.add(this.tenth,"-=0.1");
        
       },

});
}


    resize(){
    }

    update(){
       
    }
}
  