import  Components  from "../core/index.js";
import { useInView } from "react-intersection-observer";


function ContentBlock(props:any){
    let content = props.content
    let core = props.core
    let Button =  Components["markups/button" as keyof typeof Components];
    let minHeight = ""
    let iR = ""
    let bcPadding = "group-[.On-top]:py-10 lg:group-[.On-top]:py-20"




    if (content.image_min_height_mobile && content.image_min_height_mobile == "1") {
        minHeight = "min-h-[300px] md:min-h-[unset]";
    }

    if (content.image_radius && content.image_radius == "1") {
        iR = "rounded-[10px]";   
    }

    if (content.button_container_padding && content.button_container_padding != "") {

        switch(content.button_container_padding){
            case "1":        
                bcPadding = "group-[.On-top]:py-2 lg:group-[.On-top]:py-4"
            break
            case "2":        
                bcPadding = "group-[.On-top]:py-8 lg:group-[.On-top]:py-16"
            break
            case "3":        
                bcPadding = "group-[.On-top]:py-10 lg:group-[.On-top]:py-20"
            break
            default:
        }
    }







    //console.log(content)
    return (
        <div className={`${content.page_width} group-[.twcontainer]:max-w-none group-[.twcontainer]:w-auto w-fit m-auto group-[.product-listings]:m-0 group-[.megamenu]:m-0 group-[.product-listings]:w-full group-[.product-listings]:relative  h-full ${content.margin_top_bottom_mobile} ${content.margin_top_bottom_desktop} group ${content.block_position} ${content.text_align}`} data-nqe-widget="nq-w-3">
            <div className={`relative h-full w-fit items-center flex group-[.twcontainer]:w-auto group-[.product-listings]:absolute group-[.product-listings]:top-0 group-[.product-listings]:w-full group-[.product-listings]:bottom-0 group-[.product-listings]:right-0 group-[.product-listings]:left-0   ${content.block_position} ${content.background_color} ${content.padding_top_bottom_mobile} ${content.padding_top_bottom_desktop}`}>
                <div className={`relative w-full h-fit overflow-hidden ${iR} ${minHeight} ${content.content_border}`} data-nqe-element="background">
                    <Background content={content}/>
                </div>        

                <div className={`min-h-auto w-full flex justify-center flex-col p-6 group-[.megamenu]:px-0 group-[.On-top]:${content.on_image_alignment} group-[.text-left]:items-start group-[.text-center]:items-center group-[.text-right]:items-end group-[.On-top]:absolute group-[.On-top]:h-[-webkit-fill-available] group ${content.text_align}`}>
                    <div data-nqe-element="block">
                        {content.heading && content.heading != "" ? <div className={`${content.heading_font_size} ${content.text_color} ${content.heading_font_weight} ${content.heading_style} brand-font`}>{content.heading}</div> :null }
                        {content.content_description && content.content_description != "" ? <div className={`${content.description_font_size} ${content.description_color} py-3`} dangerouslySetInnerHTML={{__html: content.content_description }}></div> :null}
                        {content.buttons && content.buttons.length > 0 ?
                        <div className={`py-3 ${bcPadding} group-[.mega-menu]:py-10 lg:group-[.mega-menu]:py-2 xl:group-[.mega-menu]:py-2  gap-2 flex flex-wrap group-[.text-left]:justify-start group-[.text-center]:justify-center group-[.text-right]:justify-end`}>
                            {content.buttons.map((button:any) => {
                                return <Button key={button._id} content={button} />
                            })}
                        </div>
                        :null}
                    </div>
                </div>
            </div>    
        </div>    
    )
}


function Background(props:any){
    let content = props.content;
    let Hotspots = Components["markups/hotspots" as keyof typeof Components];
    //console.log(content)
    switch(content.choose_content){
        case "0":        
            return(
                <div className="w-full h-full">
                    <div className={`h-full absolute w-full ${content.bg_image_overlay_color} ${content.bg_image_overlay_opacity}`}></div>
                    <picture>
                        {content.image_mobile != ""?<source srcSet={content.image_mobile} media="(max-width: 767px)"/>:""}
                        <img className={`w-full h-full object-cover max-h-[500px]`} src={`${content.image_desktop}`} alt={`${content.block_label}`} width="444" height="444" />
                    </picture>
                </div>
            )
        break
        case "1":        
        return (
            <Hotspots content={content} />
            )
        break
    }
}



export default ContentBlock;



