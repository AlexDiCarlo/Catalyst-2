function Badge (props:any) {
    let badge = props.badge;
    let badgeCount = props.badgeCount;
    let item = props.item;
    let render = props.render || "plp";
    let badgePosition = props.badgePosition
    let position = "top-0 left-0";
    if (badgeCount == 1) position = "top-0 right-0";

    
    if (badge.meta?.position == "inline" && render != "plp" && badgePosition == "description") {
        return (            
            <div className={`z-[1] flex items-center h-[28px] w-fit my-4 lg:h-[32px] relative py-1 px-2 rounded-sm font-semibold text-[12px] lg:group-hover/img:hidden`} style={{"background": badge.meta.background}} data-nqe-badge> 
                <div>
                    {badge.badgeid == "sale" && badge.meta.sale_percentage == 1 ?
                        <p className="text-[10px] lg:text-[16px]" style={{"color":badge.meta.colour}}>{`${item.product.option.saving}`}% OFF</p> 
                    : <p className="text-[10px] lg:text-[16px]"style={{"color":badge.meta.colour}}>{badge.name}</p> 
                    } 
                </div>
            </div>
        )
    } else if (badge.meta?.position != "inline" && badgePosition != "description") {
        return (
            <div  className={`z-[1] flex items-center h-[28px]  lg:h-[32px] absolute py-1 px-2 rounded-sm font-semibold text-[12px] ${position} lg:group-hover/img:hidden`} style={{"background": badge.meta.background}} data-nqe-badge> 
               {badge.url && badge.url != "" ? 
                    <div>
                         {badge.badgeid == "sale" && badge.meta.sale_percentage == 1 ?
                           <p className="text-[10px] lg:text-[16px]" style={{"color":badge.meta.colour}}>{`${item.product.option.saving}`}% OFF</p> 
                         : <p className="text-[10px] lg:text-[16px]"style={{"color":badge.meta.colour}}>{badge.name}</p> 
                         } 
                    </div>
                    :   
                    badge.badgeid == "sale" && badge.meta.sale_percentage == 1 ?
                        <p className="text-[10px] lg:text-[16px]" style={{"color":badge.meta.colour}}>{`${item.product.option.saving}`}% OFF</p> 
                      : <p className="text-[10px] lg:text-[16px]"style={{"color":badge.meta.colour}}>{badge.name}</p>    
                }
            </div>
        )
    }
}

export default Badge;