import Product from "~/app/[locale]/(default)/product/[slug]/page";
import NuqliumObservable from "../core/observable";



function ProductScrollerPB(props:any){
    let content = props.content.data;
    //console.log(content)
    return (
    <div className={`${content.panel_bg_color} ${content.page_width} px-2 xl:!px-0 ${content.add_margin_padding.margin_top_bottom_mobile} ${content.add_margin_padding.margin_top_bottom_desktop} group scrollContainer  scrollerColor-{{content.title_color}} overflow-hidden`} data-nqe-widget="nq-w-4">
        <div className={`${content.add_margin_padding.padding_top_bottom_mobile} ${content.add_margin_padding.padding_top_bottom_desktop}`} >
            <div className="min-h-[500px] lg:min-h-[448px]">
                {content.panel_title && content.panel_title.value != "" ?
                    <div className={`pb-4 ${content.panel_title.color} ${content.title_align}`}>
                        <h2 className={`${content.panel_title.color} ${content.panel_title.font_style} ${content.panel_title.font_weight} ${content.panel_title.font_size} brand-font`} dangerouslySetInnerHTML={{__html: content.panel_title.value }}></h2>
                        {content.title_sub_text && content.title_sub_text.value != "" ?
                        <div className={`py-1 text-base text-semibold ${content.title_sub_text.color} ${content.title_sub_text.font_style} ${content.title_sub_text.font_weight} ${content.title_sub_text.font_size} ${content.title_align}`}> {content.title_sub_text.value}</div>	
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

export default ProductScrollerPB;