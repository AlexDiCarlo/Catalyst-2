import  Components  from "../core/index.js";
import { useInView } from "react-intersection-observer";

function ContentBody(props:any){
    let content = props.content.data;
    let core = props.core;
    let Button =  Components["markups/button" as keyof typeof Components];
    let count = 0;

    // New Observer //
    const { ref, inView, entry } = useInView({
        threshold: 0.2,
        triggerOnce: true,
        });

    core.IntersectionObserver(entry, inView)

    //console.log(content)
    return (
        <div className={`${content.page_width} ${content.text_block_background} ${content.margin_top_bottom_mobile} ${content.margin_top_bottom_desktop} group ${content.image_position} overflow-hidden`} ref={ref}  data-nqe-widget="nq-w-5">
            <div className={`relative flex items-center ${content.image_position} ${content.padding_top_bottom_mobile} ${content.padding_top_bottom_desktop}`} data-nq-animate={`${content.animation_direction}`} data-nq-animate-delay="100" >
            {content.blog_image_desktop != "" &&  content.blog_image_desktop != "" ?
				<div className="relative h-full w-full overflow-hidden">
					    <div className={`${content.image_overlay_color} ${content.image_overlay_opacity}`} ></div>
						<picture>
							{content.blog_image_mobile && content.blog_image_mobile != "" ?
                                <source srcSet={`{content.blog_image_mobile}`} media="(max-width: 767px)"></source>
                            :null}
							<img className="w-full h-full object-cover" src="https://media.dripmade.com/assets/homepage/grey_content_block.png" data-original-image={`{content.blog_image_desktop}`} data-nqe-lazy-load="true" alt={`{content.heading}`}/>
						</picture>
				</div>
            :null            
            }
            <div className={`min-h-[300px] w-full flex justify-center flex-col p-6 group ${content.heading_align} group-[.On-top]:absolute group-[.On-top]:h-full md:group-[.On-top]:px-[80px]`}>
                {content.icons && content.icons != "" ?
                    <div className={`py-4 ${content.text_color} ${content.heading_font_size} ${content.heading_align}`}>
                    <i className={`${content.icons}`}></i>
                    </div>
                :null
                }
                {content.heading && content.heading != "" ?
                    <div className={`${content.text_color} ${content.heading_font_size} ${content.heading_align} brand-font`}>{content.heading}</div>
                :null
                }
                {content.blog_text && content.blog_text != "" ? 
                    <div className={`nqc-WYSIWYG py-4 ${content.heading_align} ${content.body_color} ${content.body_font_size}`} dangerouslySetInnerHTML={{__html: content.blog_text}}></div>
                :null
                }
                {content.button_container && content.button_container.length > 0 ?
				<div className={`py-3 gap-2 flex flex-wrap group-[.text-left]:justify-start group-[.text-center]:justify-center group-[.text-right]:justify-end`}>
                        {content.button_container.map((button:any) => {
                            count++;
                            return <Button key={count} content={button} />
                        })}
                    </div>
                :null}
             
            </div>
            </div>
        </div>
        
    )
}

export default ContentBody;