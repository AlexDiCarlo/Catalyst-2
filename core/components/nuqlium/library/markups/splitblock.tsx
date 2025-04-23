import { count } from "console";
import  Components  from "../core/index.js";
import { useInView } from "react-intersection-observer";

function Splitblock(props:any){


    //console.log(props)
    let core = props.core
    let content = props.content
    if (content.data != null) content = content.data;
    let Button =  Components["markups/button" as keyof typeof Components];
    let count = 0;

    // New Observer //
    const { ref, inView, entry } = useInView({
        threshold: 0.2,        triggerOnce: true,

        });

    core.IntersectionObserver(entry, inView)



    //console.log(content)
    return (
        <div className={`px-2 2xl:!px-0 ${content.panel_bakcground_color}`}>
            <div className={`h-full relative ${content.page_width} ${content.margin_top_bottom_mobile} ${content.margin_top_bottom_desktop}`}>
                <div className={`h-full flex w-full overflow-hidden group ${content.block_placement_mobile} ${content.block_placement_desktop == "flex-row-reverse" ? "md:flex-row-reverse" : "md:flex-row" } ${content.padding_top_bottom_mobile} ${content.padding_top_bottom_desktop} lg:min-h-[500px]`}  ref={ref}   data-nqe-widget="nq-w-2">

                <div className={`md:w-[50%] {{x_pad}`}  data-nq-animate={`${content.animate_media}`} data-nq-animate-delay="">
                    <div className="relative h-full w-full overflow-hidden" data-nqe-element="background">
                        <Background content={content}/>
                    </div>
                </div>
                <div className={`md:w-[50%] group-[.On-top]:absolute group-[.On-top]:h-full md:group-[.On-top]:relative md:group-[.On-top]:h-auto`} data-nq-animate={`${content.animate_block}`} data-nq-animate-delay="">
                    <div className={`relative flex flex-col justify-center py-4 h-full {% if r_min == 1 %} {% else %} min-h-[350px] {% endif %} group ${content.text_align}`}>
                        <div className={`absolute w-full h-full left-0 ${content.block_bg_color} ${content.block_bg_opacity}`}></div>
                        <div className="p-0 z-[1] lg:p-12" data-nqe-element="block">
                            <div> {content.html_editor} </div>


                        {content.html_editor && content.html_editor != "" ? 
                                <div> <p> Testing</p> </div>    
                            : 
                            <div>
                                {content.block_label && content.block_label != "" ? 
                                    <div className="inline-block pb-4">
                                        <p className={`${content.label_font_size} ${content.label_color} bg-black rounded-[4px] px-4 py-2`} dangerouslySetInnerHTML={{__html: content.block_label}}></p>
                                    </div> 
                                    :null
                                }
                                {content.heading_as_image && content.heading_as_image != "" ?
                                    <img src={`${content.heading_as_image}`} alt={`${content.block_heading}`} className="mb-5 max-w-full !w-auto"></img>
                                :
                                    <div className={`${content.heading_font_size} ${content.text_color} ${content.heading_font_weight} ${content.heading_font_style} pb-4 lg:pb-8 brand-font`} dangerouslySetInnerHTML={{__html:content.block_heading}}></div>
                                }
                                {content.block_text_layout == "1" ?
                                    <div className="{{content.description_font_size}} {{content.description_color}}">{content.wiziwig_text}</div>
                                :
                                    <div>
                                        {content.block_description && content.block_description != "" ?
                                            <div  className="pb-8 {{content.description_font_size}} {{content.description_color}}">{content.block_description}</div>
                                        :
                                            null
                                        }
                                    </div>
                                }  
                                {content.button_container && content.button_container.length > 0 ?
                                    <div className={`pb-4 gap-2 flex flex-wrap group-[.text-left]:justify-start group-[.text-center]:justify-center group-[.text-right]:justify-end ${content.text_align}`}>
                                        {content.button_container.map((button:any) => {
                                            count++;
                                            return <Button key={count} content={button} />
                                        })}
                                    </div>
                                :
                                    null
                                }
                            </div>    
                                }
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>

    )
}


function Background(props:any){
    let content = props.content;
    let img_rad = "";
    if (content.image_border_radius && content.image_border_radius == "1") {
        img_rad = "rounded-[8px]";
    }


    //console.log(content)
    switch(content.choose_content){
        case "1":        
            return(
                <div className={`h-full w-full ${content.bg_color} ${content.bg_image_overlay_color} ${content.bg_image_overlay_opacity}`}>
                    <video width="1260" height="550" className="w-full ml-0 block h-full object-cover min-w-full" data-video-id={`video_${content.contentguid}`} data-nqe-widget-video muted loop playsInline autoPlay preload="metadata">
                    <source src={`${content.video_desktop}`}  type="video/mp4" />
				</video>
                     
                </div>
            )
        break
        default:
            return(
                <div className="h-full w-full">
                <div className={`absolute h-full w-full ${content.content_image_overlay_color} ${content.content_image_overlay_opacity}`} data-nqe-url={`${content.image_url}`}></div>
                    <picture>
                        {content.image_mobile && content.image_mobile != "" ?
                            <source srcSet={`${content.image_mobile}`} media="(max-width: 767px)"/>
                        :null
                        }
                        <img className={`${img_rad} h-full w-full object-cover`} src={`${content.image_desktop}`} alt={`${content.block_label}`} data-original-image={`{content.image_desktop}`} data-nqe-lazy-load="true" data-nqe-image-loaded-type="half" width="400" height="400" />
                    </picture>
                </div>
            )
    }
}




export default Splitblock;