import  Components  from "../core/index.js";
import { forwardRef, useRef, useState, useEffect, memo, useMemo, useLayoutEffect} from "react";
import { Link } from '~/components/link';
import NuqliumObservable from "../core/observable";
import { SiIndigoHex } from "@icons-pack/react-simple-icons";


let currentMobile = "";

// Mega Menu Component - Main component - memo'd means it will not re-render if the props change (unless the component is re-mounted)
const Megamenu = memo(function Megamenu(props:any){
    let content = props.content; // Get the content from the props
    if (content.data != null) content = content.data;

    let linkCount = 0; // Set the link count to 0, used to create unique keys for the panel links
    let panelCount = 0; // Set the panel count to 0, used to create unique keys for the panels
    let panelCountMobile = 0; // Set the panel count to 0, used to create unique keys for the panels
    let menuTimeout:any = null; // All menu actions will need a timeout to prevent flickering and to allow for a delay on hover
    // let display = ""
    // let width =  1024; // Set the width to 1024, this is the default width for the mega menu
    let megaMenu = useRef<HTMLDivElement>(null); // Create a reference to the mega menu
    const [currentMenu, setCurrentMenu] = useState(0); // Use state to track the current menu (0 is the default, all closed, 1 is the first menu open, etc, -1 is th)
    const [mobileOpen, setMobileOpen] = useState(false); 


    // Handle the menu hover, enter / leave etc.
    function handleMenu(e:any,n:number|null = null){
        clearTimeout(menuTimeout);
        let panel = n??parseInt(e.currentTarget != null?e.currentTarget.getAttribute("data-mega-menu-link"):e.target.getAttribute("data-mega-menu-link"));
        menuTimeout = setTimeout(() => {setCurrentMenu(panel)},200);
    } 

    // Handle the menu hover, enter / leave etc.
    function handleMobileToggle(e:any,n:number|null = null){
        try {
            (document.body.style.overflow == "hidden" && window.matchMedia("(max-width: 1024px)").matches == true) ? document.body.style.overflow = "auto" : document.body.style.overflow = "hidden";
            setMobileOpen(!mobileOpen);
        } catch(err) {
            console.log(err)
        }
    }


    useEffect(() => {
        let mobileToggle = document.querySelector('[aria-controls="nav-menu"]') as HTMLElement;
        if (mobileToggle != null) {
            mobileToggle.addEventListener('click', handleMobileToggle,  { once: true })
        }

    }, [mobileOpen]); // Use effect to track the current menu

    return (
        <div ref={megaMenu} className={`group`}>
            <div className={`${ mobileOpen == false ? "translate-x-[-100%]" : "translate-x-0 !flex"  } lg:ml-3 lg:translate-x-[none] duration-200 bg-white overflow-hidden lg:overflow-visible p-4 gap-6 absolute lg:static top-[89px] lg:top-auto left-0 right-0 bottom-0 lg:bottom-auto z-[100] h-[100vh] lg:h-auto lg:flex lg:gap-3 flex-col lg:flex-row lg:px-0`}>
                {content.menu?.map((item:any, index:any) => {
                    linkCount++;   
                    return (
                            <div key={index}>
                                <Link  key={"desktop" + index}  onMouseLeave={(e) => handleMenu(e,-1)} onClick={(e) => handleMenu(e,-1)}  onMouseEnter={(e) => handleMenu(e)} data-mega-menu-link={linkCount} className={`lg:hover:!border-b-yellow-400 hover:text-black hover:border-b border-b whitespace-nowrap border-b-transparent hidden lg:block  ${item.title_color} ${item.title_weight} ${(item.title_caps && item.title_caps == 1?"uppercase":"") }`} href={`${item.url}`} data-nqe-menu-code={`${item.code}`} >{item.title}</Link>
                                <div key={"mobile" + index}  onClick={(e) => handleMenu(e)} data-mega-menu-link={linkCount} className={`lg:hover:!border-b-yellow-400 flex justify-between hover:text-black hover:border-b border-b whitespace-nowrap border-b-transparent text-[20px] lg:hidden  ${item.title_color} ${item.title_weight} ${(item.title_caps && item.title_caps == 1?"uppercase":"") }`} data-nqe-menu-code={`${item.code}`} >
                                    <p>{item.title}</p>
                                    <i className="fa-solid fa-angle-right px-4 text-[20px] lg:hidden"></i>
                                </div>
                            </div>
                        )
                })}
                <div>
                    {content.menu?.map((item:any, index:any) => {
                    panelCount++; 
                    return (
                        <div key={index} className="hidden lg:block">
                            <div onMouseLeave={(e) => handleMenu(e,-1)} onMouseEnter={(e) => handleMenu(e)} data-mega-menu-link={panelCount} className={`absolute w-full left-0 bg-white z-10 top-[89px] ` + (panelCount == currentMenu ? "" : currentMenu !=0 ? "invisible opacity-0":"hidden")}> 
                                {useMemo( () => <BuildMenu content={item} core={props.core}/>, [] )} 
                            </div>
                        </div>
                        )
                    })}

                    {content.menu?.map((item:any, index:any) => {
                    panelCountMobile++;
                    return (
                        <div key={index} className="lg:hidden">
                            <div  data-mega-menu-link={panelCountMobile} className={`fixed top-[0px] py-4 bottom-0 w-full left-0 duration-200  bg-white z-[100] overflow-y-auto ` + (panelCountMobile == currentMenu ? "translate-x-0 z-10" : "translate-x-[100%]")}> 
                                {useMemo( () => <BuildMenu content={item} core={props.core} handleMenu={handleMenu}/>, [] )} 
                            </div>
                        </div>
                    )
                    })}
                </div>
            </div>
            <div className="hidden lg:block">
                <div className={`absolute h-[200vh] top-[92px] lg:bottom-[unset]   opacity-[.7] z-[9]  left-0 right-0 bg-black `+ (currentMenu>0?"":"hidden")}></div>
            </div>
    
        </div>
    )
});

const BuildMenu = function(props:any){
    let columns = props.content.columns;
    let content = props.content;
    let handleMenu = props.handleMenu;
    //console.log("MegaMenuPanel " + content.title)
    let count = 0;
    return(
        <div className="lg:py-8 lg:px-4 max-w-screen-2xl h-full bg-white  mx-auto lg:h-auto overflow-y-auto overflow-x-hidden lg:!overflow-y-hidden  flex flex-col lg:flex-row justify-between max-h-[80vh] overflow-scroll lg:overflow-visible lg:max-h-[unset]  group megamenu">
        <p onClick={(e) => handleMenu(e, -1)} className="text-[15px] font-bold  px-4 pb-4 lg:hidden" >Back</p>
        {content.items.map((item:any, index:any) => {
            count++;
            return (
                <BuildMenuItem  key={index} content={item} columns={columns} handleMenu={handleMenu} />
            )
        })}
    </div>
    )
};




const BuildMenuItem = function(props:any) {
    let item = props.content;
    let columns = props.columns;
    let handleMenu = props.updateMenu;
    let columnsStyle = "";
    let count = 0;

    // Update the out column style 
   if (item.width && item.width != "") {
      columnsStyle = `w-full lg:${item.width} px-4 mb-4 lg:mb-0 lg:px-4`;
    } else {
      switch(columns){
        case 1:
        case "1":
          columnsStyle = `w-full  px-4 mb-4 lg:mb-0 lg:px-4 ${item.mobile_background_color} lg:bg-transparent`;
          break;

        case 2:
        case "2":
          columnsStyle = `w-full lg:w-1/2 px-4 mb-4 lg:mb-0 lg:px-4  ${item.mobile_background_color} lg:bg-transparent`;
          break;

        case 3:
        case "3":
          columnsStyle = `w-full lg:w-1/3 px-4 mb-4 lg:mb-0 lg:px-4 ${item.mobile_background_color} lg:bg-transparent`;
          break;

        case 4:
        case "4":
          columnsStyle = `w-full lg:w-1/4 px-4 mb-4 lg:mb-0 lg:px-4 ${item.mobile_background_color} lg:bg-transparent`;
          break;

        case 5:
        case "5":
          columnsStyle = `w-full lg:w-1/5 px-4 mb-4 lg:mb-0 lg:px-4 ${item.mobile_background_color} lg:bg-transparent`;
          break;

        case 6:
        case "6":
          columnsStyle = `w-full lg:w-1/6 px-4 mb-4 lg:mb-0 lg:px-4  ${item.mobile_background_color} lg:bg-transparent`;
          break;

        case "5one":
          count++;
          {columns == 0 ?
            columnsStyle = "w-full lg:w-1/5 px-4 mb-4 lg:mb-8"
              :
            columnsStyle ="w-full lg:w-4/5 px-4 mb-4 lg:mb-8"
          }
          break;

        default:
          break;
      }
    }


    // Check what type of column will be rendered 
    switch(item.type){
        case "grid":
            
        break;

        case "image":
           
        case "feed":

            return (
                <div className={columnsStyle}>
                    <div className="w-full mb-4 lg:mb-0 md:px-2 2xl:px-0" data-nqc-navfeed>
                             <NuqliumObservable pagetype="feed" data-nq-identifier="feed_mega_menu_native_scroll" pagekey={item.feed}/>
                 </div>
                </div>
            )
        break;

        case "block":
           
            return (
                <div className={columnsStyle}>
                    <div className="w-full mb-4 lg:mb-0 px-0 ">
                        <NuqliumObservable pagetype="block" pagekey={item.block}/>
                    </div>
                </div>
                )
           
        break;

        case "zone":

            return (
            <div className={columnsStyle}>
                <div className="w-full  mb-4 lg:mb-0 px-0 ">
                 <NuqliumObservable pagetype="zone" pagekey={item.zone_id}/>
                </div>
            </div>
            )
        break;
        
        case "content":
            return (
                <div className={columnsStyle}>
                   {item.content_element.map((element:any, index:any) => {
                        count++;
                        let app:string = 'markups/' +  element._identifier;
                        let ThisApp = Components[app as keyof typeof Components];
                        if (ThisApp) {
                            return (
                                <div key={index} className="[&>div]:w-full [&>div>div]:w-full">
                                    <ThisApp key={index} content={element} />
                                </div>
                            )
                        }
                   })}
                </div>
            )
        break;
        case "list":


            function closeMenu(e:any){
                let mobileToggle = document.querySelector('[aria-controls="nav-menu"]') as HTMLElement;
                if (mobileToggle != null && window.matchMedia("(max-width: 1024px)").matches == true) {
                    setTimeout(() => {
                    mobileToggle.click()
                    }, 100);
                }
            }

            return (
                <div className={columnsStyle}>
                    <div className="flex flex-col lg:gap-4">
                     <Link href={item.url ?? ""} onClick={closeMenu}  className={`cursor-pointer group-[.mobile]:text-[20px] group-[.mobile]:pb-4 font-bold ${item.title_font_size}`}> {item.title}</Link>
                     {item.links.map((link:any, index:any) => {
                        count++;
                        return (
                            <Link key={index} onClick={closeMenu} className="min-h-[50.5px] lg:min-h-0 flex items-center justify-between" href={link.url}>
                                {link.title}
                            </Link>
                        )
                     })}
                    </div>
                </div>
             )
        break;
        case "az":
        return (
            <div className={columnsStyle}>
                <div className="w-full mb-4 lg:mb-0 px-0 " data-nqc-event-value={`${item.title}`}  data-nqc-menulink={`${item.title}`}>
                <div className="lg:px-0 text-sm flex flex-col gap-4 w-full lg:w-auto">
                    <div className="lg:hidden flex justify-end cursor-pointer absolute right-8 top-8"> </div>
                    <div className="w-full font-bold lg:w-auto lg:col-span-2">
                
                <div><Link href={item.url ?? ""} className="cursor-pointer text-base md:text-[19px] "> Shop by Brand </Link> </div>
                    <div className="grid gap-2 grid-cols-8 xl:grid-cols-12 my-4   w-full lg:w-auto [&>*]:text-center [&>*]:text-base">
                        <span data-nqe-menu-az="#" className="cursor-pointer bg-neutral-200 text-black p-2">#</span>
                        <span data-nqe-menu-az="a" className="cursor-pointer bg-black text-white p-2">A</span>
                        <span data-nqe-menu-az="b" className="cursor-pointer bg-neutral-200 text-black p-2">B</span>
                        <span data-nqe-menu-az="c" className="cursor-pointer bg-neutral-200 text-black p-2">C</span>
                        <span data-nqe-menu-az="d" className="cursor-pointer bg-neutral-200 text-black p-2">D</span>
                        <span data-nqe-menu-az="e" className="cursor-pointer bg-neutral-200 text-black p-2">E</span>
                        <span data-nqe-menu-az="f" className="cursor-pointer bg-neutral-200 text-black p-2">F</span>
                        <span data-nqe-menu-az="g" className="cursor-pointer bg-neutral-200 text-black p-2">G</span>
                        <span data-nqe-menu-az="h" className="cursor-pointer bg-neutral-200 text-black p-2">H</span>
                        <span data-nqe-menu-az="i" className="cursor-pointer bg-neutral-200 text-black p-2">I</span>
                        <span data-nqe-menu-az="j" className="cursor-pointer bg-neutral-200 text-black p-2">J</span>
                        <span data-nqe-menu-az="k" className="cursor-pointer bg-neutral-200 text-black p-2">K</span>
                        <span data-nqe-menu-az="l" className="cursor-pointer bg-neutral-200 text-black p-2">L</span>
                        <span data-nqe-menu-az="m" className="cursor-pointer bg-neutral-200 text-black p-2">M</span>
                        <span data-nqe-menu-az="n" className="cursor-pointer bg-neutral-200 text-black p-2">N</span>
                        <span data-nqe-menu-az="o" className="cursor-pointer bg-neutral-200 text-black p-2">O</span>
                        <span data-nqe-menu-az="p" className="cursor-pointer bg-neutral-200 text-black p-2">P</span>
                        <span data-nqe-menu-az="q" className="cursor-pointer bg-neutral-200 text-black p-2">Q</span>
                        <span data-nqe-menu-az="r" className="cursor-pointer bg-neutral-200 text-black p-2">R</span>
                        <span data-nqe-menu-az="s" className="cursor-pointer bg-neutral-200 text-black p-2">S</span>
                        <span data-nqe-menu-az="t" className="cursor-pointer bg-neutral-200 text-black p-2">T</span>
                        <span data-nqe-menu-az="u" className="cursor-pointer bg-neutral-200 text-black p-2">U</span>
                        <span data-nqe-menu-az="v" className="cursor-pointer bg-neutral-200 text-black p-2">V</span>
                        <span data-nqe-menu-az="w" className="cursor-pointer bg-neutral-200 text-black p-2">W</span>
                        <span data-nqe-menu-az="x" className="cursor-pointer bg-neutral-200 text-black p-2">X</span>
                        <span data-nqe-menu-az="y" className="cursor-pointer bg-neutral-200 text-black p-2">Y</span>
                        <span data-nqe-menu-az="z" className="cursor-pointer bg-neutral-200 text-black p-2">Z</span>

                    </div>
            </div>


                    
                    {item.category && item.category.children  ?
                        <div className="hidden">

                
                        </div>
                    :

                    <div data-nqe-menu-letter="">
                    {item.items.map((listitem:any, index:any) => {
                        return (
                        <a key={index} title={`${listitem.title}`} data-nqc-event="menu.three" data-nqc-event-value={`${listitem.title}`}  href={`{listitem.url}`} className="flex items-center justify-between"> 
                            <span>{listitem.title}</span> 
                            <span className="block lg:hidden">
                                <img src="https://media.dripmade.com/nav/right-arrow.svg"/>
                            </span>
                        </a>
                        )
                    })}
                    </div>
                    } 
                </div> 
            </div>
        </div>
         )
    break;

    }
}

export default Megamenu;