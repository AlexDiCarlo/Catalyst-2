function Hotspots(props: any) {
    const content = props?.content ?? {};
    let counter = 0;
    let desktopHidden = "";
    let mobileHidden = "";

    if (content?.mobile_hotspot?.image) {
        desktopHidden = "hidden md:!block";
        mobileHidden = "md:hidden";
    }


    console.log(props)


    const renderHotspots = (hotspots: any[], type: string) => {
        return hotspots.map((hs: any) => {
            counter++;
            const product = hs?.item?.product ?? hs?.Item?.Product;
            const bounds = hs?.bounds ?? hs?.Bounds;
            if (!product || !bounds) return null;

            const defaultSku =
                product.options?.length === 1
                    ? product.options[0]?.sku ?? ""
                    : "";

            return (
                <div
                    key={counter}
                    className="absolute flex items-center justify-center group/displayHotspot cursor-pointer"
                    data-nq-social-hotspot={hs.bound ?? hs.Bound}
                    style={{
                        left: `${bounds[0]}%`,
                        top: `${bounds[1]}%`,
                        width: `${bounds[2]}%`,
                        height: `${bounds[3]}%`,
                    }}
                >
                    <div className="w-[25px] h-[25px] bg-black/[.5] rounded-[50%] flex items-center justify-center relative">
                        <div className="w-[7px] h-[7px] bg-white rounded-[50%] group-hover/displayHotspot:w-[9px] group-hover/displayHotspot:h-[9px] transition-all"></div>
                        <div
                            className={`group/img hidden w-max bg-white text-black absolute top-[30px] left-0 z-[2] rounded-[6px] font-semibold group-hover/displayHotspot:!block ${
                                bounds[1] > 50 ? "top-auto bottom-[30px]" : ""
                            } ${bounds[0] > 50 ? "left-auto right-0" : ""}`}
                            data-nqe-element="hotspot"
                        >
                            {hs.key === "content" && hs?.item?.content?.content ? (
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: hs.item.content.content,
                                    }}
                                ></div>
                            ) : (
                                <div className="flex items-center gap-3">
                                    <div className="p-[10px] border-r border-black flex-1">
                                        <div className="w-[200px] overflow-hidden overflow-ellipsis">
                                            <a
                                                className="whitespace-nowrap"
                                                href={product?.url}
                                            >
                                                {product?.name ?? product?.Name}
                                            </a>
                                        </div>
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html:
                                                    product?.option?.price ??
                                                    product?.Option?.Price,
                                            }}
                                        ></div>
                                    </div>
                                    <div className="flex flex-col gap-4">
                                        <i className="fa-solid fa-chevron-right cursor-pointer pr-[10px]"></i>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            );
        });
    };

    return (
        <div className="h-full">
            {/* Desktop Hotspot */}
            <div
                className={`relative h-full ${desktopHidden}`}
                data-nqe-element="hotspot-container"
            >
                {content?.desktop_hotspot?.image && (
                    <img
                        src={content.desktop_hotspot.image}
                        className="w-full h-full object-cover"
                    />
                )}
                {renderHotspots(
                    content.desktop_hotspot?.hotspots ??
                        content.desktop_hotspot?.Hotspots ??
                        [],
                    "desktop"
                )}
            </div>

            {/* Mobile Hotspot */}
            <div
                className={`relative h-full block ${mobileHidden}`}
                data-nqe-element="hotspot-container"
            >
                {content?.mobile_hotspot?.image && (
                    <img
                        src={content.mobile_hotspot.image}
                        className="w-full h-full object-cover"
                    />
                )}
                {renderHotspots(
                    content.mobile_hotspot?.hotspots ??
                        content.mobile_hotspot?.Hotspots ??
                        [],
                    "mobile"
                )}
            </div>
        </div>
    );
}

export default Hotspots;
