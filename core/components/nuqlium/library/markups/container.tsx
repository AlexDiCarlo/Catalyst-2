import Image from 'next/image';
import  Components  from "../core/index.js";
import { Suspense } from "react";
import { GlideSlide, GlideContainer } from './glide';
import { useInView } from "react-intersection-observer";
 
function Container(props:any){

//console.log("Container", props)
    let core = props.core
    let content = props.content;
    if (content.data != null) content = content.data
    let count = 0;
    let id = content.contentguid

    // New Observer //
    const { ref, inView, entry } = useInView({
        threshold: 0.2,      
        triggerOnce: true,

        });

    core.IntersectionObserver(entry, inView)

    let grid_layout = "grid-cols-2 md:grid-cols-3 md:gap-3 lg:grid-cols-4"

    if (content.grid_layout && content.grid_layout != "" ) {
         grid_layout = content.grid_layout 
    }

    //console.log(id)

    switch(content.container_type){
        case "0": 

        let title_padding = "py-5"
        let flow = "overflow-hidden"
        if (content.description && content.description != "") {title_padding = "pt-5"}    
        if (content.animation_direction && content.animation_direction == "") {flow = "" }

        return (

            <div data-nqe-widget="container"  className={`${content.page_width} ${content.panel_bg_color} ${content.margin_top_bottom_mobile} ${content.margin_top_bottom_desktop} group twcontainer nql-fade-in  `} ref={ref} >
              <div className={`${flow} relative lg:!px-0 ${content.padding_top_bottom_mobile} ${content.padding_top_bottom_desktop} group ${content.layout_mobile} ${content.layout_tablet} ${content.inner_container_width} ${content.inner_container_padding_mobile}`}>
              
                <div className="relative"  data-nq-animate={`${content.animation_direction}`} data-nq-animate-delay="">
                {content.panel_title && content.panel_title != "" ?
                    <div className={`${content.title_font_weight} ${content.title_color} brand-font`}>
                        <p className={`hover:text-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/20 cursor-pointer text-base md:text-[19px] font-bold ${content.heading_font_size}} ${content.title_align}`}>{content.panel_title}</p>
                        {content.redirect && content.redirect != "?nq.params" && content.redirect != "" ? 
                        <a href={`${content.redirect}`} className={`${content.title_align} px-3 text-xs md:text-base`} title="View All"> View All <i className="fa-solid fa-arrow-right"></i> </a>
                        : null 
                        }               
                    </div>	
                : null
                }
                {content.description && content.description != "" ?
                      <p className={`pt-3 pb-6 px-2 text-base ${content.title_align} ${content.title_color}`}> {content.description} </p>
                : null
                }
   { inView ?
                <div className="py-2 lg:py-4">
                    <GlideContainer content={content} core={core} type={"content"} id={id}>
                        {content.reference !== undefined?
                                    content.reference.map((item: any) => {
                                        count++;
                                        let app:string = 'markups/' +  item._identifier;
                                        let ThisApp = Components[app as keyof typeof Components];
                                        if (ThisApp != null){
                                            return (
                                                <GlideSlide key={count}>
                                                            <ThisApp content={item} core={core}/>
                                                </GlideSlide>
                                            )
                                        }
                                        else{
                                            return(
                                                <div className="p-6 bg-gray-100 my-1 flex items-center justify-center" key={count}>
                                                    <div>Markup <strong>{item._identifier}</strong> component to be created</div>
                                                </div>
                                            )
                                        }
                                    })
                                :<div></div>} 
                    </GlideContainer>
                </div>
                  :(null)}
            </div>
        </div>  
        </div>  
        )
    break;
    default:
    return (
        <div data-nqe-widget="container"  className={`${content.page_width} ${content.panel_bg_color} ${content.margin_top_bottom_mobile} ${content.margin_top_bottom_desktop} group twcontainer nql-fade-in  `} ref={ref} >
            <div className={`grid ${grid_layout} gap-2 ${content.panel_bg_color} ${content.padding_top_bottom_mobile} ${content.padding_top_bottom_desktop} ${content.inner_container_width} lg:gap-4 px-3 2xl:px-0`}>
                {content.reference !== undefined?
                    content.reference.map((item: any) => {
                        count++;
                        let app:string = 'markups/' +  item._identifier;
                        let ThisApp = Components[app as keyof typeof Components];
                        if (ThisApp != null){
                            return (
                                <div  key={count}>
                                    <Suspense>
                                        <ThisApp content={item} core={core}/>
                                    </Suspense>
                                </div>
                            )
                        }
                        else{
                            return(
                                <div className="p-6 bg-gray-100 my-1 flex items-center justify-center" key={count}>
                                    <div>Markup <strong>{item._identifier}</strong> component to be created</div>
                                </div>
                            )
                        }
                    })
                :<div></div>}    
            </div> 
        </div>        
        )    
    } 
}

export default Container;
