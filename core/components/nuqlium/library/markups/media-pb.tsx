import  Components  from "../core/index.js";

function MediaPB(props:any){
    let content = props.content;
    let count = 0;
    if (content.data != null) content = content.data;
   


    let animate = "";
    if (content.animation_direction && content.animation_direction !== "") {
    animate = "1";
    }

    return (
        <div className={`${content.page_width} h-full ${content?.add_margin_padding.margin_top_bottom_mobile || ""} ${content?.add_margin_padding.margin_top_bottom_desktop || ""}`} data-nqe-widget="nq-w-8">
            <div className={`relative h-full flex flex-col items-center  ${content?.add_margin_padding.padding_top_bottom_mobile || ""} ${content?.add_margin_padding.padding_top_bottom_desktop || ""}`}>
            <div className={`h-full w-full ${animate === "1" ? "overflow-hidden" : ""}`}>
                    <Background content={content}/>
                </div>
            </div>
        </div>       


    )
}


function Background(props:any){
    let content = props.content;
    let counter = 0;
    let Hotspots = Components["markups/hotspots" as keyof typeof Components];

    switch(content.choose_bg){
        case "0":        
                return (
                    <div className="h-full w-full">
                    <div className={`absolute h-full w-full ${content?.content_image_overlay_color || ""} ${content?.content_image_overlay_opacity || ""}`} data-nqe-url={`${content.image_url}`}></div>
                        <picture>
                            {content.image.mobile_image && content.image.mobile_image.value != "" ?
                                <source srcSet={`${content.image.mobile_image}`} media="(max-width: 767px)"/>
                            :null
                            }
                            <img className={`w-full h-full object-cover group-[.nql-content-container]:rounded`} src={`${content.image.value}`} alt={""} data-original-image={`${content.image.value}`} data-nqe-lazy-load="true" data-nqe-image-loaded-type="half" width="400" height="400" />
                        </picture>
                    </div>
                )
        break
        case "1":        
        return (
            <div className={`h-full w-full ${content?.bg_color || ""} ${content?.content_image_overlay_color || ""} ${content?.content_image_overlay_opacity || ""}`}>
                <video width="1260" height="550" className="w-full ml-0 block h-full object-cover min-w-full" data-video-id={`video_${content.contentguid}`} data-nqe-widget-video muted loop playsInline autoPlay preload="metadata">
                <source src={`${content.video.value}`}  type="video/mp4" />
            </video>
            </div>
        )
        break
        case "2":    
        return (
            <Hotspots content={content} />
        )
    } 
}

export default MediaPB;