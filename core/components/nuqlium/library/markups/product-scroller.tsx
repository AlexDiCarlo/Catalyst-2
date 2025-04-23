import Product from "~/app/[locale]/(default)/product/[slug]/page";
import NuqliumObservable from "../core/observable";



function ProductScroller(props:any){
    let content = props.content.data;
    //console.log(content)
    return (
    <div className={`${content.panel_bg_color} ${content.page_width} px-2 xl:!px-0 ${content.margin_top_bottom_mobile} ${content.margin_top_bottom_desktop} group scrollContainer  scrollerColor-{{content.title_color}} overflow-hidden`} data-nqe-widget="nq-w-4">
        <div className={`${content.padding_top_bottom_mobile} ${content.padding_top_bottom_desktop}`} >
            <div className="min-h-[500px] lg:min-h-[448px]">
                {content.panel_title && content.panel_title != "" ?
                    <div className={`pb-4 ${content.title_color} ${content.title_align}`}>
                        <p className={`${content.heading_font_size} ${content.title_style} ${content.title_font_weight} brand-font`} dangerouslySetInnerHTML={{__html: content.panel_title }}></p>
                        {content.title_sub_text && content.title_sub_text != "" ?
                        <div className={`py-1 text-base text-semibold ${content.title_color} ${content.title_align}`}> {content.title_sub_text}</div>	
                            :null
                        }
                    </div>	
                :null
                }
                {content.reference && content.reference != "" ? 
                <div>	
                    <NuqliumObservable pagetype="feed" pagekey={content.reference}/>
                </div>	
                :
                content.recommendation && content.recommendation != "" ?
                <div>	
                    <NuqliumObservable pagetype="recommendations" pagekey={content.recommendation}/>
                </div>
                    :null
                    
                }
            </div>	
        </div>
    </div>
    )
}

export default ProductScroller;