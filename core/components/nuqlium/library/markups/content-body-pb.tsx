import  Components  from "../core/index.js";
import { useInView } from "react-intersection-observer";
import { useEffect, useRef, useState } from "react";

function ContentBodyPB(props:any){
    let content = props.content.data;
    if (content.data != null) content = content.data;
    let core = props.core;
    let Button =  Components["markups/button_content_library" as keyof typeof Components];
    let count = 0;

    // New Observer //
    const { ref, inView, entry } = useInView({
        threshold: 0.2,
        triggerOnce: true,
        });

    core.IntersectionObserver(entry, inView)

            const [backgroundHeight, setBackgroundHeight] = useState(0)
            const [blockHeight, setBlockHeight] = useState(0)
            const background = useRef<HTMLDivElement>(null)
            const block = useRef<HTMLDivElement>(null)



            useEffect(() => {
                if (background.current !== null) {
                    setBackgroundHeight(background.current.clientHeight)
                }
                if (block.current !== null) {
                    setBlockHeight(block.current.clientHeight)
                }
        
                if (blockHeight > backgroundHeight) {
                    if (background.current != null) {
                        background.current.classList.remove("relative")
                        background.current.classList.add("absolute")
                    }
                    if (block.current != null) {
                        block.current.classList.remove("absolute")
                        block.current.classList.add("!relative")
                    }
                } else if (window.innerWidth > 1024) {
                    if (background.current != null) {
                        background.current.classList.add("relative")
                        background.current.classList.remove("absolute")
                    }
                    if (block.current != null) {
                        block.current.classList.add("absolute")
                        block.current.classList.remove("!relative")
                    }
                }
            })





    // console.log(content)
    return (
        <div className={`${content.page_width} ${content.text_block_background} ${content.add_margin_padding.margin_top_bottom_mobile} ${content.add_margin_padding.margin_top_bottom_desktop} group ${content.image_position} overflow-hidden`} ref={ref}  data-nqe-widget="nq-w-5">
            <div className={`relative flex items-center ${content.image_position} ${content.add_margin_padding.padding_top_bottom_mobile} ${content.add_margin_padding.padding_top_bottom_desktop}`} data-nq-animate={`${content.animation_direction}`} data-nq-animate-delay="100" >
            {content.image &&  content.image.value != "" ?
				<div className="relative h-full w-full overflow-hidden" data-nqe-element="background" ref={background}>
					    <div className={`${content.image_overlay_color} ${content.image_overlay_opacity}`} ></div>
						<picture>
							{content.image.mobile_image && content.image.mobile_image != "" ?
                                <source srcSet={`${content.image.mobile_image}`} media="(max-width: 767px)"></source>
                            :null}
							<img className="w-full h-full object-cover" src={`${content.image.value}`} data-original-image={`${content.image.value}`} data-nqe-lazy-load="true" alt={`${content.heading.value}`}/>
						</picture>
				</div>
            :null            
            }
            <div className={`min-h-[300px] w-full flex justify-center flex-col p-6 group ${content.heading_align} group-[.On-top]:absolute group-[.On-top]:h-full md:group-[.On-top]:px-[80px]`} data-nqe-element="block" ref={block}>
                {content.icons && content.icons != "" ?
                    <div className={`py-4 ${content.heading.color} ${content.heading.font_size} ${content.heading.font_weight} ${content.heading.font_style}`}>
                    <i className={`${content.icons}`}></i>
                    </div>
                :null
                }
                {content.heading && content.heading.value != "" ?
                    <h2 className={`${content.heading.color} ${content.heading.font_size} ${content.heading.font_weight} ${content.heading.font_style} ${content.heading_align} brand-font`}>{content.heading.value}</h2>
                :null
                }
                {content.blog_text && content.blog_text.value != "" ? 
                    <div className={`nqc-WYSIWYG py-4 ${content.heading_align} ${content.blog_text.color} ${content.blog_text.font_size} ${content.blog_text.font_weight} ${content.blog_text.font_style}`} dangerouslySetInnerHTML={{__html: content.blog_text.value}}></div>
                :null
                }
                {content.button_container && content.button_container.length > 0 ?
				<div className={`py-3 gap-2 flex flex-wrap group-[.text-left]:justify-start group-[.text-center]:justify-center group-[.text-right]:justify-end`}>
                        {content.button_container.map((button:any, index:any) => {
                            count++;
                            return <Button key={index} content={button} />
                        })}
                    </div>
                :null}
             
            </div>
            </div>
        </div>
        
    )
}

export default ContentBodyPB;