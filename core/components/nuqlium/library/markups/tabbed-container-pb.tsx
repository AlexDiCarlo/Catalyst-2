import { act, useState } from "react";
import  NuqliumCall  from "../core/call";
import { useInView } from "react-intersection-observer";
import NuqliumObservable from "../core/observable";


function TabContainerPB(props:any){
    let content = props.content.data;
    if (content.data != null) content = content.data;
    let core = props.core;

    let defaultValue = ""
    content.grid_feed_items[0].feed != "" ? defaultValue = content.grid_feed_items[0].feed : defaultValue = content.grid_feed_items[0].recommendation;
    const [activeButton, setActiveButton] = useState(defaultValue);

    function handleActiveButton(button:any){
        let gridFeed = button.closest("[data-grid-feed]").getAttribute("data-grid-feed");
        setActiveButton(gridFeed);
    }


    
    return (
        <div className={`${content.page_width} ${content.panel_bg_color} ${content.add_margin_padding.margin_top_bottom_mobile} ${content.add_margin_padding.margin_top_bottom_desktop} px-1 md:px-2 min-[1537px]:px-0`}  data-nqe-widget="grid-container">
            <div className={`relative ${content.add_margin_padding.padding_top_bottom_mobile} ${content.add_margin_padding.padding_top_bottom_desktop}`}>
                <div className="relative">
                    {content.panel_title && content.panel_title.value != "" ?
                        <div className={`py-2 px-2 ${content.title_align}`}>
                            <h2 className={`${content.panel_title.color} ${content.panel_title.font_size} ${content.panel_title.font_weight} ${content.panel_title.font_style} brand-font`}>{content.panel_title.value}</h2>
                            {content.description && content.description.value != "" ?
                            <p className={`pt-3 text-base ${content.description.color} ${content.description.font_size} ${content.description.font_weight} ${content.description.font_style}`}> {content.description.value} </p>
                                :null
                            }
                        </div>	
                    :null}
                    <div className="">
                        <div className="min-h-[575px] lg:min-h-[448px] 2xl:min-h-[750px]">
                            <BuildButtons content={content} handleActive={handleActiveButton} activeState={activeButton} />
                            <BuildContainer content={content} activeState={activeButton} />
                        </div>
                    </div>
                </div>
            </div>
         </div>                    
    )
}


function BuildButtons (props:any){
    let content = props.content;
    let counter = 0;

    return (
        <div className="flex gap-1 justify-center flex-wrap">
        {content.grid_feed_items.map((item:any, index:any) => {
                counter++;
                return (
                    item.zone_or_feed && item.zone_or_feed == "feed" ?
                        <div key={index} onClick={(e) => props.handleActive(e.target)} className={`h-full py-2 group ${props.activeState == item.feed ? "activeGrid" : "nonActiveGrid" }`} data-nqe-grid="button" data-grid-feed={`${item.feed}`}>
                            <div className="flex justify-center"> 
                                <button  className={`text-sm rounded-[4px] w-[128px] px-[30px] py-[16px] text-black font-medium border border-neutral-200 bg-neutral-200 group-[.activeGrid]:border group-[.activeGrid]:text-white group-[.activeGrid]:border-black group-[.activeGrid]:bg-black md:w-[200px] md:px-[40px] md:py-[16px]`} title={`${item.button_name}`}> {item.button_name} </button>
                            </div>

                        </div>

                        :
                        <div key={index} onClick={(e) => props.handleActive(e.target)} className={`h-full py-2 group ${props.activeState == item.recommendation ? "activeGrid" : "nonActiveGrid" }`} data-nqe-grid="button" data-grid-feed={`${item.recommendation}`}>
                            <div className="flex justify-center"> 
                                <button className={`text-sm rounded-[4px] w-[128px] px-[30px] py-[16px] text-black font-medium border border-neutral-200 bg-neutral-200 group-[.activeGrid]:border group-[.activeGrid]:text-white group-[.activeGrid]:border-black group-[.activeGrid]:bg-black md:w-[200px] md:px-[40px] md:py-[16px]`} title={`${item.button_name}`}> {item.button_name} </button>
                            </div>
                        </div>
                )    
        })}
    </div>
    )
}

function BuildContainer (props:any){
    let content = props.content;
    let counter = 0
    return (
        <div>
            {content.grid_feed_items.map((item:any, index:any) => {
                counter++;
                let fakeImage = ""
                let feedType = item.feed
                let postLoad = "scroll"
                if (counter > 1) postLoad = "true"    
                if (item.zone_or_feed && item.zone_or_feed == "rex") feedType = item.recommendation
                counter == 1 ? fakeImage = "https://media.nuqlium.com/catalyst/fakewomenscontainer2.png" : fakeImage = "https://media.nuqlium.com/catalyst/fakemenscontainer2.png"
                
                return (
                        <div key={index} className={`h-full group ${props.activeState == feedType ? "activeGrid" : "nonActiveGrid" }`}  data-grid-feed-container={`${feedType}`}>
                            <div className={`py-2 group-[.nonActiveGrid]:absolute group-[.nonActiveGrid]:w-full group-[.nonActiveGrid]:h-full ${props.activeState == feedType ? "opacity-1" : "opacity-0" }`} data-nqe-widget="">
                                {item.zone_or_feed && item.zone_or_feed == "feed" ?
                                    /*<div data-nq-call-type={`${item.zone_or_feed}`} data-nq-call-value={`${item.feed}`}></div>*/
                                    <NuqliumObservable pagetype="feed" pagekey={item.feed}/>
                                    : 
                                    <div>
                                         <div className="text-center"> {feedType} </div>
                                         <div> <img src="" alt="" /></div>
                                        {/* <div className="opacity-0" data-nq-recommendations={`${item.recommendation}`} data-nq-postload={`${postLoad}`} data-nqe-stop-observer="true"></div> */}
                                    </div>
                                }

                                {item.url_redirect != "" && item.url_redirect_raw != "" ?
                                    <div className="py-4 hidden lg:!flex justify-center" data-nqe-url="{{item.url_redirect}}"> 
                                        <button className="w-[200px] px-[25px] py-[16px] text-black font-bold border border-black bg-white" title="View All"> View All </button>
                                    </div>
                                    : null      
                                }
                            </div>
                        </div>
                )
            })}
        </div> 








    )











}





export default TabContainerPB;