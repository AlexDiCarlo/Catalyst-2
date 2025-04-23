"use client";
import { useEffect,useState } from "react";
import { array } from "zod";


export default function NuqliumDemo(this: any, props:any){


  const [isOpen, setOpen] = useState(false);
  const [experience, setExperience] = useState("");

  useEffect(() => {
    try{
      const value = window.localStorage.getItem("nq.segments");
      if (!value){
        setExperience("base");

        return ;
      }
    

      const storage = JSON.parse(value);
      if (storage && storage.length > 0) {
        setExperience(storage[0]);
      }
    }
    catch(e){}
      
  }, []);



  function experienceToggle(){
    if (isOpen) setOpen(false);
    else setOpen(true);
  }

  function experienceSwitch(option:string){
    let segments = [];
    segments.push(option);
    try{
      window.localStorage.setItem("nq.segments", JSON.stringify(segments));
      setExperience(option);
      setOpen(false);
      document.location.reload();
    }
    catch(e){}
  
  }
  
  let text = "";
  switch(experience){
    case "base":
      text = "Default Experience";
      break;
    case "mens":
      text = "Mens Experience";
      break;
    case "womens":
      text = "Womens Experience";
      break;
    case "salemode":
      text = "Sale Experience";
      break;
    case "international-usa":
      text = "International (USA)";
      break;
    case "black-friday":
      text = "Black Friday";
      break;
    case "christmas":
      text = "Christmas";
      break;
  }

// Use GDPR to supress the component
if (text != ""){
    return (
      <div>
        <div className={`fixed left-2 bottom-12 px-3 text-xs p-2 bg-black rounded-md text-white flex  gap-2 flex-col justify-center cursor-pointer ` + (isOpen?"":"hidden")}>
          <div className="flex items-center gap-2" onClick={()=>experienceSwitch("base")}>
            <i className={`fa-solid fa-check text-xs ` + (experience == "base"?"":"text-black")}></i>
            <div>Base</div>
          </div>
          <div className="flex items-center gap-2" onClick={()=>experienceSwitch("mens")}>
            <i className={`fa-solid fa-check text-xs ` + (experience == "mens"?"":"text-black")}></i>
            <div>Mens</div>
          </div>
          <div className="flex items-center gap-2" onClick={()=>experienceSwitch("womens")}>
            <i className={`fa-solid fa-check text-xs ` + (experience == "womens"?"":"text-black")}></i>
            <div>Womens</div>
          </div>
          <div className="flex items-center gap-2" onClick={()=>experienceSwitch("salemode")}>
            <i className={`fa-solid fa-check text-xs ` + (experience == "salemode"?"":"text-black")}></i>
            <div>Sale</div>
          </div>
          <div className="flex items-center gap-2" onClick={()=>experienceSwitch("international-usa")}>
            <i className={`fa-solid fa-check text-xs ` + (experience == "international-usa"?"":"text-black")}></i>
            <div>International (USA)</div>
          </div>
          <div className="flex items-center gap-2" onClick={()=>experienceSwitch("black-friday")}>
            <i className={`fa-solid fa-check text-xs ` + (experience == "black-friday"?"":"text-black")}></i>
            <div>Black Friday</div>
          </div>
          <div className="flex items-center gap-2" onClick={()=>experienceSwitch("christmas")}>
            <i className={`fa-solid fa-check text-xs ` + (experience == "christmas"?"":"text-black")}></i>
            <div>Christmas</div>
          </div>
        </div>
        <div className="hidden lg:flex fixed left-2 bottom-2 px-3 text-xs p-2 bg-black rounded-md text-white items-center gap-2 cursor-pointer" onClick={()=>experienceToggle()}>
          <div>{text}</div>
          <i className="fa-solid fa-angle-down"></i>
        </div>
        <div className="lg:hidden fixed left-2 border border-white bottom-2 px-3 text-xs p-2 bg-black rounded-md text-white gap-2 cursor-pointer" onClick={()=>experienceToggle()}>
        <i className="fa-solid fa-gear"></i>
        </div>
      </div>
    )
  }
}
  