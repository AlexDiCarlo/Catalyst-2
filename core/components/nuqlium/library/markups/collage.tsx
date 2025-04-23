import  Components  from "../core/index.js";
import { Suspense } from "react";
import Hotspots from "../markups/hotspots";

function Collage(props:any){
    let content = props.content
    if (content.data != null) content = content.data;
    let count = 0;
    let core = props.core;


    console.log(content)


    return (
        <div className={`relative ${content.panel_bg_color} ${content.panel_bg_color} ${content.margin_top_bottom_mobile} ${content.margin_top_bottom_desktop} {{hmb_p}`} data-nqe-widget="collage">
            <div className={`relative ${content.padding_top_bottom_mobile} ${content.padding_top_bottom_desktop}`}>
                <div className={`${content.page_width}`}>
                    {content.panel_title && content.panel_title != "" ? 
                        <div className={`px-2 py-4  ${content.title_font_size} ${content.title_color} ${content.title_align} brand-font`}>{content.panel_title}</div>    
                    :null}
                    <div className={`flex ${content.layout_mobile} md:${content.layout_desktop} ${content.margins} ${content.text_align ? content.text_align : "" }`}>
                        <div className="md:w-[50%]">
                            <div className="relative h-full w-full">
                                <Background content={content}/>
                            </div>
                        </div>

                        <div className="md:w-[50%]">
                            <div className={`h-full grid grid-cols-2 ${content.margins}`}>
                             {content.reference && content.reference.length > 0 ?
                                content.reference.map((item:any) => {
                                    count++;
                                    let app:string = 'markups/' +  item._identifier;
                                    let ThisApp = Components[app as keyof typeof Components];
                                    if (ThisApp != null){
                                        return (
                                            <div key={count}>
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
                            :null}   
                  
                            </div>
                        </div>



                    </div>        


                </div> 
            </div>
        </div>
    )
}



function Background(props:any){
    let content = props.content

    console.log(content)
    switch(content.choose_bg){
        case "0":        
        return(
            <div className="h-full w-full">
            <div className={`absolute h-full w-full ${content.content_image_overlay_color} ${content.content_image_overlay_opacity}`} data-nqe-url={`${content.image_url}`}></div>
                <picture>
                    {content.image_mobile && content.image_mobile != "" ?
                        <source srcSet={`${content.image_mobile}`} media="(max-width: 767px)"/>
                    :null
                    }
                    <img className={`{img_rad} h-full w-full object-cover`} src={content.image_desktop} alt={content.block_label} data-original-image={content.image_desktop} data-nqe-lazy-load="true" data-nqe-image-loaded-type="half" width="400" height="400" />
                </picture>
            </div>
        )
        break
        case "1":
            return(
                <Hotspots content={content} />
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
                        <img className={`{img_rad}} h-full w-full object-cover`} src={content.image_desktop} alt={content.block_label} data-original-image={content.image_desktop} data-nqe-lazy-load="true" data-nqe-image-loaded-type="half" width="400" height="400" />
                    </picture>
                </div>
            )
    }
}





export default Collage;