import Link from 'next/link';
function ButtonPB(props:any){
    let content = props.content;
    if (content.data != null) content = content.data;   
    let rounded = ""
    if (content.button_corners && content.button_corners == "1") rounded = "rounded-[5px]"
    let hoverColor = `hover:${content.button_hover_bg_color}`
    return (
        <div id={content.contentguid}>
            <div className={`inline-flex relative ${rounded}  group/btn ${content.button_color} ${content.button_opacity} duration-200 ${hoverColor}`}>
                <div className="h-full w-full overflow-hidden absolute "></div>
                <Link href={`${content?.button_link ?? ""}`} className={`z-[1] ${content.button_size} flex items-center justify-center group-[.bg-none]:!px-0 px-2 duration-200  group-hover/btn:${content.button_hover_text_color} ${content.button_text.font_size} ${content.button_text.color} ${content.button_text.font_weight} ${content.button_text.font_style}`} title={`${content.button_text.value}`}>
                    {content.button_text.value}
                </Link>
            </div>	
        </div>
    )
}

export default ButtonPB;