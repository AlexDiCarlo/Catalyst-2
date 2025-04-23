import { Link } from "lucide-react";
import { GlideSlide, GlideContainer } from './glide';

function PromoDP(props:any){
    let content = props.content;
    if (content.data != null) content = content.data;
    let count = 0;
    let Icon1 = content.icon_column_1.split(",");
    let Icon2 = content.icon_column_2.split(",");
    let Icon3 = content.icon_column_3.split(",");
    let id = content.contentguid

    return (
        <div className={`${content.page_width}  ${content.margin_top_bottom_mobile} ${content.margin_top_bottom_desktop}  ${content.padding_left_right_mobile} ${content.padding_left_right_desktop} min-h-[44px] `} data-nqe-widget="nq-w-6" >
            <div className={`max-w-full ${content.bg_color}`}>
            <div className="max-w-[300px] lg:max-w-[650px] m-auto">
            <GlideContainer content={content.data} type={"promo-dp"} id={id}>

                {content.promo_text_column_1 != "" ?
                      <GlideSlide key={id + count}>
                        <div className={`flex justify-center items-center p-[10px] gap-2 ${content.promo_1_text_color} ${content.promo_1_font_size} `}>
                                {Icon1.map((icon:any, index:any) => {
                                    count ++;
                                    return (
                                        <i  key={index} className={`${content.promo_1_text_color} ${icon}`}></i>
                                    )
                                })}
                                <div className="flex flex-col items-center">
                                    {content.url_column_1 != "" ?
                                        <a href={content.url_column_1}  className="text-center">
                                            <p className={`${content.font_weight} ${content.style}`} dangerouslySetInnerHTML={{__html:content.promo_text_column_1}}></p>
                                            {content.promo_1_sub_text && content.promo_1_sub_text != "" ? 
                                                <p className="text-xs" dangerouslySetInnerHTML={{__html:content.promo_1_sub_text}}></p>    
                                            :null}
                                        </a>
                                        
                                        : 
                                        <div className="text-center">
                                            <p className={`${content.font_weight} ${content.style}`}>{content.promo_text_column_1}</p>
                                            {content.promo_1_sub_text && content.promo_1_sub_text != "" ? 
                                                <p className="text-xs" dangerouslySetInnerHTML={{__html:content.promo_1_sub_text}}></p>    
                                            :null}
                                        </div>
                                    }
                                
                                </div>
                        
                        </div>
                      </GlideSlide>
                :null
                }

                {content.promo_text_column_2 != "" ?
                      <GlideSlide key={id + count}>
                            <div className={`flex justify-center items-center p-[10px] gap-2 ${content.promo_2_text_color} ${content.promo_2_font_size} `}>
                            {Icon2.map((icon:any, index:any) => {
                                count++;
                                return (
                                    <i key={index} className={`${content.promo_2_text_color} ${icon}`}></i>
                                )
                            })}
                            <div className="flex flex-col items-center">
                                {content.url_column_2 != "" ?
                                    <a href={content.url_column_2}  className="text-center">
                                        <p className={`${content.font_weight} ${content.style}`} dangerouslySetInnerHTML={{__html:content.promo_text_column_2}}></p>
                                        {content.promo_2_sub_text && content.promo_2_sub_text != "" ? 
                                            <p className="text-xs"dangerouslySetInnerHTML={{__html:content.promo_2_sub_text}}></p>    
                                        :null}
                                    </a>
                                    
                                    : 
                                    <div className="text-center">
                                        <p className={`${content.font_weight} ${content.style}`}>{content.promo_text_column_2}</p>
                                        {content.promo_2_sub_text && content.promo_2_sub_text != "" ? 
                                            <p className="text-xs"dangerouslySetInnerHTML={{__html:content.promo_2_sub_text}}></p>    
                                        :null}
                                    </div>
                                }
                               
                            </div>
                     
                    </div>
                      </GlideSlide>
                    :null
                }
                    
                    {content.promo_text_column_3 != "" ?
                        <GlideSlide key={id + count}>
                            <div className={`flex justify-center items-center p-[10px] gap-2 ${content.promo_3_text_color} ${content.promo_3_font_size} `}>
                                {Icon3.map((icon:any, index:any) => {
                                    count++;
                                    return (
                                        <i key={index} className={`${content.promo_3_text_color} ${icon}`}></i>
                                    )
                                })}
                                <div className="flex flex-col items-center">
                                {content.url_column_3 != "" ?
                                        <a href={content.url_column_3}  className="text-center">
                                            <p className={`${content.font_weight} ${content.style}`} dangerouslySetInnerHTML={{__html:content.promo_text_column_3}}></p>
                                            {content.promo_3_sub_text && content.promo_3_sub_text != "" ? 
                                                <p className="text-xs" dangerouslySetInnerHTML={{__html:content.promo_3_sub_text}}></p>    
                                            :null}
                                        </a>
                                        
                                        : 
                                        <div className="text-center">
                                            <p className={`${content.font_weight} ${content.style}`} dangerouslySetInnerHTML={{__html:content.promo_text_column_3}}></p>
                                            {content.promo_3_sub_text && content.promo_3_sub_text != "" ? 
                                                <p className="text-xs" dangerouslySetInnerHTML={{__html:content.promo_3_sub_text}}></p>    
                                            :null}
                                        </div>
                                    }
                                </div>
                            </div>       
                        </GlideSlide>                
                    :null
                    }


                
                </GlideContainer>
            </div>
            </div>
        </div>
    )
}

export default PromoDP;