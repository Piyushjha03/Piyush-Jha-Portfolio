import { EventEmitter } from "events";

export default class theme extends EventEmitter{
    constructor(){
        super();
    

        this.theme="light";
        this.button=document.querySelector(".toggle-button");
        this.circle=document.querySelector(".toggle-circle");

        this.button.addEventListener('click',()=>{
            this.onToggle();
        })
        
 }
onToggle(){
    this.circle.classList.toggle("slide");
    this.theme=this.theme === "light" ? "dark" : "light";
    document.body.classList.toggle("dark-theme");
    document.body.classList.toggle("light-theme");
    this.emit("switch",this.theme);
}

}
