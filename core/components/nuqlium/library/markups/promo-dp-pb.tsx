import { GlideSlide, GlideContainer } from './glide';

function PromoDPPB(props :any) {
    let content = props.content;
    if (content?.data) content = content.data;
    let count = 0;
    let Icon1 = content?.icon_column_1 ? content.icon_column_1.split(",") : [];
    let Icon2 = content?.icon_column_2 ? content.icon_column_2.split(",") : [];
    let Icon3 = content?.icon_column_3 ? content.icon_column_3.split(",") : [];
    let id = content?.contentguid || "default-id";

    return (
        <div className={`${content?.page_width || ''} ${content?.add_margin_padding?.margin_top_bottom_mobile || ''} ${content?.add_margin_padding?.margin_top_bottom_desktop || ''} ${content?.padding_left_right_mobile || ''} ${content?.padding_left_right_desktop || ''}`} data-nqe-widget="nq-w-6">
            <div className={`max-w-full ${content?.bg_color || ''}`}>
                <div className="max-w-[300px] lg:max-w-[500px] m-auto">
                    <GlideContainer content={content?.data || {}} type="promo-dp" id={id}>
                        {[1, 2, 3].map((col) => {
                            const promoText = content?.[`promo_text_column_${col}`]?.value || "";
                            const promoColor = content?.[`promo_text_column_${col}`]?.color || "";
                            const promoFontStyle = content?.[`promo_text_column_${col}`]?.font_style || "";
                            const promoFontWeight = content?.[`promo_text_column_${col}`]?.font_weight || "";
                            const promoFontSize = content?.[`promo_text_column_${col}`]?.font_size || "";
                            const promoIcons = col === 1 ? Icon1 : col === 2 ? Icon2 : Icon3;
                            const url = content?.[`url_column_${col}`] || "";
                            const subText = content?.[`promo_${col}_sub_text`]?.value || "";
                            const subTextStyles = content?.[`promo_${col}_sub_text`] || {};

                            if (!promoText) return null;

                            count++;
                            return (
                                <GlideSlide key={id + count}>
                                    <div className={`flex justify-center items-center p-[10px] gap-2 ${promoColor} ${promoFontStyle} ${promoFontWeight} ${promoFontSize}`}>
                                        {promoIcons.map((icon :any, index: any) => (
                                            <i key={index} className={`${content?.[`promo_${col}_text_color`] || ''} ${icon}`}></i>
                                        ))}
                                        <div className="flex flex-col items-center">
                                            {url ? (
                                                <a href={url} className="text-center">
                                                    <p className={`${promoColor} ${promoFontStyle} ${promoFontWeight} ${promoFontSize}`} dangerouslySetInnerHTML={{ __html: promoText }}></p>
                                                    {subText && (
                                                        <p className={`${subTextStyles.color || ''} ${subTextStyles.font_style || ''} ${subTextStyles.font_weight || ''} ${subTextStyles.font_size || ''}`} dangerouslySetInnerHTML={{ __html: subText }}></p>
                                                    )}
                                                </a>
                                            ) : (
                                                <div className="text-center">
                                                    <p className={`${promoColor} ${promoFontStyle} ${promoFontWeight} ${promoFontSize}`} dangerouslySetInnerHTML={{ __html: promoText }}></p>
                                                    {subText && (
                                                        <p className={`${subTextStyles.color || ''} ${subTextStyles.font_style || ''} ${subTextStyles.font_weight || ''} ${subTextStyles.font_size || ''}`} dangerouslySetInnerHTML={{ __html: subText }}></p>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </GlideSlide>
                            );
                        })}
                    </GlideContainer>
                </div>
            </div>
        </div>
    );
}

export default PromoDPPB;






























// import { GlideSlide, GlideContainer } from './glide';

// function PromoDPPB(props:any){
//     let content = props.content;
//     if (content.data != null) content = content.data;
//     let count = 0;
//     let Icon1 = content.icon_column_1.split(",");
//     let Icon2 = content.icon_column_2.split(",");
//     let Icon3 = content.icon_column_3.split(",");
//     let id = content.contentguid


//     //console.log(props)

//     return (
//         <div className={`${content.page_width}  ${content.add_margin_padding.margin_top_bottom_mobile} ${content.add_margin_padding.margin_top_bottom_desktop}  ${content.padding_left_right_mobile} ${content.padding_left_right_desktop}  `} data-nqe-widget="nq-w-6" >
//             <div className={`max-w-full ${content.bg_color}`}>
//             <div className="max-w-[300px] lg:max-w-[500px] m-auto">
//             <GlideContainer content={content.data} type={"promo-dp"} id={id}>

//                 {content.promo_text_column_1 && content.promo_text_column_1.value != "" ?
//                       <GlideSlide key={id + count}>
//                         <div className={`flex justify-center items-center p-[10px] gap-2 ${content.promo_text_column_1.color} ${content.promo_text_column_1.font_style} ${content.promo_text_column_1.font_weight} ${content.promo_text_column_1.font_size} `}>
//                                 {Icon1.map((icon:any, index:any) => {
//                                     count ++;
//                                     return (
//                                         <i  key={index} className={`${content.promo_1_text_color} ${icon}`}></i>
//                                     )
//                                 })}
//                                 <div className="flex flex-col items-center">
//                                     {content.url_column_1 != "" ?
//                                         <a href={content.url_column_1}  className="text-center">
//                                             <p className={`${content.promo_text_column_1.color} ${content.promo_text_column_1.font_style} ${content.promo_text_column_1.font_weight} ${content.promo_text_column_1.font_size} `} dangerouslySetInnerHTML={{__html:content.promo_text_column_1.value}}></p>
//                                             {content.promo_1_sub_text && content.promo_1_sub_text.value != "" ? 
//                                                 <p className={`${content.promo_1_sub_text.color} ${content.promo_1_sub_text.font_style} ${content.promo_1_sub_text.font_weight} ${content.promo_1_sub_text.font_size}`} dangerouslySetInnerHTML={{__html:content.promo_1_sub_text.value}}></p>    
//                                             :null}
//                                         </a>
                                        
//                                         : 
//                                         <div className="text-center">
//                                             <p className={`${content.promo_text_column_1.color} ${content.promo_text_column_1.font_style} ${content.promo_text_column_1.font_weight} ${content.promo_text_column_1.font_size}`}>{content.promo_text_column_1}</p>
//                                             {content.promo_1_sub_text && content.promo_1_sub_text.value != "" ? 
//                                                 <p className={`${content.promo_1_sub_text.color} ${content.promo_1_sub_text.font_style} ${content.promo_1_sub_text.font_weight} ${content.promo_1_sub_text.font_size}`} dangerouslySetInnerHTML={{__html:content.promo_1_sub_text.value}}></p>    
//                                             :null}
//                                         </div>
//                                     }
                                
//                                 </div>
                        
//                         </div>
//                       </GlideSlide>
//                 :null
//                 }

        
//                 {content.promo_text_column_2 && content.promo_text_column_2.value != "" ?
//                         <GlideSlide key={id + count}>
//                         <div className={`flex justify-center items-center p-[10px] gap-2 ${content.promo_text_column_2.color} ${content.promo_text_column_2.font_style} ${content.promo_text_column_2.font_weight} ${content.promo_text_column_2.font_size} `}>
//                                 {Icon1.map((icon:any, index:any) => {
//                                     count ++;
//                                     return (
//                                         <i  key={index} className={`${content.promo_2_text_color} ${icon}`}></i>
//                                     )
//                                 })}
//                                 <div className="flex flex-col items-center">
//                                     {content.url_column_2 != "" ?
//                                         <a href={content.url_column_2}  className="text-center">
//                                             <p className={`${content.promo_text_column_2.color} ${content.promo_text_column_2.font_style} ${content.promo_text_column_2.font_weight} ${content.promo_text_column_2.font_size} `} dangerouslySetInnerHTML={{__html:content.promo_text_column_2.value}}></p>
//                                             {content.promo_2_sub_text && content.promo_2_sub_text.value != "" ? 
//                                                 <p className={`${content.promo_2_sub_text.color} ${content.promo_2_sub_text.font_style} ${content.promo_2_sub_text.font_weight} ${content.promo_2_sub_text.font_size}`} dangerouslySetInnerHTML={{__html:content.promo_2_sub_text.value}}></p>    
//                                             :null}
//                                         </a>
                                        
//                                         : 
//                                         <div className="text-center">
//                                             <p className={`${content.promo_text_column_2.color} ${content.promo_text_column_2.font_style} ${content.promo_text_column_2.font_weight} ${content.promo_text_column_2.font_size}`}>{content.promo_text_column_2.value}</p>
//                                             {content.promo_2_sub_text && content.promo_2_sub_text.value != "" ? 
//                                                 <p className={`${content.promo_2_sub_text.color} ${content.promo_2_sub_text.font_style} ${content.promo_2_sub_text.font_weight} ${content.promo_2_sub_text.font_size}`} dangerouslySetInnerHTML={{__html:content.promo_2_sub_text.value}}></p>    
//                                             :null}
//                                         </div>
//                                     }
                                
//                                 </div>
                        
//                         </div>
//                         </GlideSlide>
//                 :null
//                 }
                    
          
         
//                     {content.promo_text_column_3 && content.promo_text_column_3.value != "" ?
//                         <GlideSlide key={id + count}>
//                         <div className={`flex justify-center items-center p-[10px] gap-2 ${content.promo_text_column_3.color} ${content.promo_text_column_3.font_style} ${content.promo_text_column_3.font_weight} ${content.promo_text_column_3.font_size} `}>
//                                 {Icon1.map((icon:any, index:any) => {
//                                     count ++;
//                                     return (
//                                         <i  key={index} className={`${content.promo_3_text_color} ${icon}`}></i>
//                                     )
//                                 })}
//                                 <div className="flex flex-col items-center">
//                                     {content.url_column_3 != "" ?
//                                         <a href={content.url_column_3}  className="text-center">
//                                             <p className={`${content.promo_text_column_3.color} ${content.promo_text_column_3.font_style} ${content.promo_text_column_3.font_weight} ${content.promo_text_column_3.font_size} `} dangerouslySetInnerHTML={{__html:content.promo_text_column_3.value}}></p>
//                                             {content.promo_3_sub_text && content.promo_3_sub_text.value != "" ? 
//                                                 <p className={`${content.promo_3_sub_text.color} ${content.promo_3_sub_text.font_style} ${content.promo_3_sub_text.font_weight} ${content.promo_3_sub_text.font_size}`} dangerouslySetInnerHTML={{__html:content.promo_3_sub_text.value}}></p>    
//                                             :null}
//                                         </a>
                                        
//                                         : 
//                                         <div className="text-center">
//                                             <p className={`${content.promo_text_column_3.color} ${content.promo_text_column_3.font_style} ${content.promo_text_column_3.font_weight} ${content.promo_text_column_3.font_size}`}>{content.promo_text_column_3.value}</p>
//                                             {content.promo_2_sub_text && content.promo_3_sub_text.value != "" ? 
//                                                 <p className={`${content.promo_3_sub_text.color} ${content.promo_3_sub_text.font_style} ${content.promo_3_sub_text.font_weight} ${content.promo_3_sub_text.font_size}`} dangerouslySetInnerHTML={{__html:content.promo_3_sub_text.value}}></p>    
//                                             :null}
//                                         </div>
//                                     }
                                
//                                 </div>
                        
//                         </div>
//                         </GlideSlide>
//                 :null
//                 }


                
//                 </GlideContainer>
//             </div>
//             </div>
//         </div>
//     )
// }

// export default PromoDPPB;