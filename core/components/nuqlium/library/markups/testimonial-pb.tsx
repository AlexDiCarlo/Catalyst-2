


function TestimonialPB(props:any){
    let content = props.content;
    if (props.content.data) content = props.content.data;
    let minHeight = "";
    let absolute = "";
    if (content.bg_color && content.bg_color != "" ) minHeight = "min-h-[300px] md:min-h-[600px]"
    return (
        <div className={`{content.bg_color}} ${content.page_width} ${content.margin_top_bottom_mobile} ${content.margin_top_bottom_desktop}`} data-nqe-widget="nq-w-7">
            <div className={`relative flex justify-center items-center ${minHeight} ${content.padding_top_bottom_mobile}} ${content.padding_top_bottom_desktop}`}>
                {content.bg_image_desktop && content.bg_image_desktop != "" ?
                        <div className="relative h-full w-full overflow-hidden ">
                                {absolute = "absolute" }
                                <div className={`absolute w-full h-full ${content.bg_image_overlay_color}  ${content.bg_image_overlay_opacity}`}></div>
                                <picture>
                                    {content.bg_image_mobile && content.bg_image_mobile != "" ?
                                        <source srcSet={`${content.bg_image_mobile}`} media="(max-width: 767px)"></source>
                                    :null        
                                    }
                                    <img className={`w-full h-full object-cover`} src={`{content.bg_image_desktop}`} alt={`${content.block_label}`}/>
                                </picture>
                        </div>
                    :null
                }
                    <div className={`min-h-[300px] w-[80%] flex flex-col justify-center ${absolute}`}>
                        {content.bg_image_desktop && content.bg_image_desktop == "" ? 
                            <div className={`absolute h-full w-full left-0  ${content.bg_image_overlay_color}  ${content.bg_image_overlay_opacity}`}></div>
                        :null
                        }
                        <div className={`z-0 p-5 md:p-[50px] ${content.text_align}`}>
                            {content.heading_as_image && content.heading_as_image != "" ?
                                <div className="">
                                    <img src={`{content.heading_as_image}`} alt={`${content.block_heading}`} className="mb-5 max-w-full !w-auto"/>
                                </div>
                            :null
                
                            }
                            <div className={`${content.text_color} ${content.text_size}`}>
                                {content.quote_size && content.quote_size != "" ?
                                    <span className={`{content.text_color} ${content.quote_size}`}>&ldquo;</span>
                                    :null
                                }
                                {content.description}
                                {content.quote_size && content.quote_size != "" ?
                                    <span className={`${content.text_color} ${content.quote_size}`}>&rdquo;</span>
                                    :null
                                }
                            </div>
                            {content.author && content.author != "" ?
                                <div className={`py-2 italic ${content.author_font_size} ${content.author_text_color}`}> - {content.author}</div>
                                :null
                            }
                        </div>
                    </div>
		
            </div>
      </div>  
    )
}

export default TestimonialPB;