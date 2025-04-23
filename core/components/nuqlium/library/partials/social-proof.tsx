
import React, { useEffect, useState } from 'react';

function SocialProof(props: any) {
    const [parsedMessages, setParsedMessages] = useState<any[]>([]);

    useEffect(() => {
        const parseMessages = () => {
            return props.messages.items.map((message: any) => {
                let div = document.createElement("div");
                div.innerHTML = message.html;
                let text = div.innerText;
                let icon = div.querySelector("i");
                let backgroundDiv = div.querySelector('div[style]');
                let background = backgroundDiv?.getAttribute('style');
                let regex = /background:\s*(#[0-9A-Fa-f]{6});\s*color:\s*(#[0-9A-Fa-f]{6})/;
                let match = background?.match(regex);
                return {
                    text,
                    iconClassName: icon?.className,
                    background: match ? match[1] : "",
                    color: match ? match[2] : ""
                };
            });
        };

        setParsedMessages(parseMessages());
    }, [props.messages]);

    return (
        <>
            {parsedMessages.map((message, index) => (
                <div key={index} className="nq-nudge absolute leading-4 w-[140px] lg:w-[200px] overflow-hidden group-[.nudge-2]:bottom-[95px] group-[.basket-nudge-1]:bottom-[10px] bottom-[8px] z-[2] transition-all lg:group-hover/img:translate-x-[-102%]">
                    <div className="flex gap-2 text-[12px] lg:text-[13px] py-2 pr-2 pl-[10px] rounded-tr-[22px] rounded-br-[22px]" style={{ background: message.background, color: message.color }}>
                        <div className="animate-pulse nq-nudge-icon flex items-center"><i className={`${message.iconClassName}`}></i></div>
                        <div className="relative nq-nudge-text w-full overflow-hidden flex flex-wrap gap-1 whitespace-nowrap">
                            <p className="pl-1 absolute top-[-2px] scroll-proof">{message.text}</p>
                            <p className="pl-1 absolute top-[-2px] scroll-proof-2">{message.text}</p>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}


export default SocialProof;