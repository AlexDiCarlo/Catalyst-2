

import Components from "../core/index.js";
import { useState, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import NuqliumObservable from "../core/observable";




function BannerPB(props: any) {
    let core = props.core;
    let Button = Components["markups/button_content_library" as keyof typeof Components];
    let content = props.content;
    if (content.data != null) content = content.data;

    // console.log(content)

    let count = 0, verticalAlign = "justify-center", horizontalAlign = "md:justify-center", buttonAlign = "justify-center", postionSwitch = "", b_min = "", blockType = "", align = "";

    // New Observer
    const { ref, inView, entry } = useInView({ threshold: 0.2, triggerOnce: true });
    core.IntersectionObserver(entry, inView);

    // Set vertical alignment and position switch based on block placement
    if (content.block_placement_vertical) {
        verticalAlign = `group-[.On-top]:${content.block_placement_vertical === "items-start" ? "justify-start" : "justify-end"}`;
        postionSwitch = `group-[.On-top]:${content.block_placement_vertical === "items-start" ? "top-0" : "bottom-0"}`;
    }

    // Set horizontal alignment based on block placement
    if (content.block_placement) {
        horizontalAlign = {
            "md:justify-start": "md:left-0",
            "md:justify-end": "md:right-0",
            "md:justify-center": ""
        }[content.block_placement as string] || "md:justify-center";
    }

    // Set button alignment based on text alignment
    if (content.text_align) {
        buttonAlign = {
            "text-left": "justify-start",
            "text-right": "justify-end",
            "text-center": "justify-center"
        }[content.text_align as "text-left" | "text-right" | "text-center"] || "justify-center";
    }

    // Configure block type and alignment for feed message
    if (content.block_type === "1") {
        blockType = "Feed-On-Top";
        if (content.feed_title || content.feed_description) {
            align = {
                "1": "top-0 right-0 text-right",
                "2": "bottom-0 left-0 text-left",
                "3": "bottom-0 right-0 text-right"
            }[content.feed_message_alignment as string] || "top-0 left-0 text-left";
        }
    }

    if (content.block_min_height_mobile && content.block_min_height_mobile == "1") b_min = "min-h-[300px] flex items-center justify-center lg:min-h-0 lg:block"

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


    return (

        <div id={content.contentguid} className={`h-full ${content.page_width}  ${content.add_margin_padding.margin_top_bottom_mobile} ${content.add_margin_padding.margin_top_bottom_desktop} group ${content.block_placement_mobile} ${content.text_align} `} ref={ref} data-nqe-widget="nq-w-1">
            {/* <p>{`Header inside viewport ${inView}.`}</p> */}
            <div className={`h-full relative flex justify-center ${content.block_placement_vertical} group-[.On-top]:flex-col ${content.block_placement_mobile} ${content.add_margin_padding.padding_top_bottom_mobile} ${content.add_margin_padding.padding_top_bottom_desktop} md:flex-row md:group-[.On-top]:flex-row ${content.block_placement}`}>
                <div className="relative h-full w-full" data-nqe-element="background" ref={background}>
                    <Background content={content} />
                </div>

                {content.block_type && content.block_type == "1" ?
                    <div>
                        {content.feed_title && content.feed_title.value != "" || content.feed_description && content.feed_description.value != "" ?
                            <div className={`hidden lg:block absolute ${align} p-8`}>
                                <div className={`${content.feed_title.font_size} ${content.feed_title.color} ${content.feed_title.font_style} ${content.feed_title.font_weight} font-brand`}>{content.feed_title.value}</div>
                                <div className={`${content.feed_description.font_size} ${content.feed_description.color} ${content.feed_description.font_style} ${content.feed_description.font_weight}`}> {content.feed_description.value} </div>
                            </div>
                            : null}
                    </div>
                    :
                    null
                }


                {content.block_type && content.block_type == "0" ?
                    <div className={`w-full flex flex-col ${postionSwitch} group-[.On-top]:absolute md:m-4 md:absolute md:w-[60%] md:min-h-fit group ${content.text_align} ${horizontalAlign} `} data-nqe-element="block" ref={block}>
                        <div className={`overflow-hidden relative h-full ${b_min}`} id={content._id} >
                            <div className={`h-full w-full absolute left-0 ${content.mobile_bg_color} md:${content.block_bg_color} ${content.block_bg_opacity}`}></div>
                            <div className="relative z-0 p-9 gap-2 flex flex-col  lg:p-12" data-nq-animate={`${content.animation_direction}`} data-nq-animate-delay="300" >
                                {content.block_label.value != "" ? <p className={`${content.block_label.font_size} ${content.block_label.color} ${content.block_label.font_style} ${content.block_label.font_weight} `}> {content.block_label.value} </p> : null}
                                {content.block_heading.value != "" ? <h2 className={`${content.block_heading.font_size} ${content.block_heading.color} ${content.block_heading.font_style} ${content.block_heading.font_weight} pb-4 font-brand `}> {content.block_heading.value} </h2> : null}
                                {content.block_description != "" ? <p className={`${content.block_description.font_size} ${content.block_description.color} ${content.block_description.font_style} ${content.block_description.font_weight} pb-8 `} dangerouslySetInnerHTML={{ __html: content.block_description.value }}></p> : null}
                                {content.buttons && content.buttons.length > 0 ?
                                    <div className={`flex flex-col lg:flex-row gap-2 ${buttonAlign}`}>
                                        {content.buttons.map((button: any) => {
                                            count++;
                                            return <Button key={count} content={button} />
                                        })}
                                    </div>
                                    : null}
                            </div>
                        </div>
                    </div>
                    :
                    null
                }
                {content.block_type && content.block_type == "1" ?
                    <div className={`w-full flex flex-col ${verticalAlign} ${postionSwitch} group-[.On-top]:absolute md:m-4 md:absolute md:w-[60%] md:min-h-fit group ${content.text_align}`} data-nqe-element="block">
                        <div className="overflow-hidden relative h-full">
                            <div className={`h-full w-full absolute left-0 ${content.mobile_bg_color} md:bg-transparent ${content.block_bg_opacity}`}></div>
                            <div className="relative z-0 p-9 gap-4 flex flex-col  lg:p-12 justify-center "  >
                                <NuqliumObservable pagetype={"feed"} pagekey={content.feed} customTemplate={"1x1"} core={core} />
                            </div>
                        </div>
                    </div>
                    :
                    null
                }

            </div>
        </div>
    )
}


// This component will be used to display what time of background is being used

function Background(props: any) {
    let content = props.content;
    let Hotspots = Components["markups/hotspots" as keyof typeof Components];
    //console.log(content)
    switch (content.background) {
        case "0":
            return (
                <div className="w-full h-full">
                    <div className={`h-full absolute w-full ${content.bg_image_overlay_color} ${content.bg_image_overlay_opacity}`}></div>
                    <picture>
                        {content.bg_image.mobile_image != "" ? <source srcSet={content.bg_image.mobile_image} media="(max-width: 767px)" /> : ""}
                        <img className="w-full h-full object-cover" src={content.bg_image.value} />
                    </picture>
                </div>
            )
            break
        case "1":
            return (
                <div className="h-full w-full ">
                    <div className={`h-full w-full absolute ${content.bg_color} ${content.bg_image_overlay_color} ${content.bg_image_overlay_opacity}`}></div>
                    <video width="1260" height="550" className="w-full ml-0 block h-full object-cover min-w-full" data-video-id={`video_${content.contentguid}`} data-nqe-widget-video muted loop playsInline autoPlay preload="metadata">
                        <source src={`${content.video.value}`} type="video/mp4" />
                    </video>
                </div>
            )
            break
        case "2":
            return (
                <Hotspots content={content} />
            )
            break
    }
}

export default BannerPB;