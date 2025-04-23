import Link from 'next/link';
function Button(props:any){
    let content = props.content;
    
    let rounded = ""
    if (content.button_corners && content.button_corners == "1") rounded = "rounded-[5px]"
    let hoverColor = `hover:${content.button_hover_bg_color}`

    return (
        <div id={content.contentguid}>
            <div className={`inline-flex relative ${rounded}  group/btn ${content.button_color} ${content.button_opacity} duration-200 ${hoverColor}`}>
                <div className="h-full w-full overflow-hidden absolute "></div>
                <Link href={`${content.button_link}`} className={`z-[1] ${content.button_size} flex items-center justify-center group-[.bg-none]:!px-0 px-2 duration-200  group-hover/btn:${content.button_hover_text_color} ${content.font_size} ${content.button_text_color} ${content.font_weight} ${content.style}`} title={`${content.button_text}`}>
                    {content.button_text}
                </Link>
            </div>	
        </div>
    )
}

export default Button;