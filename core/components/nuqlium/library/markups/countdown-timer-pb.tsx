import { useEffect, useState, useRef } from "react";

function TimerPB(props:any){
    let content = props.content.data;
    let usemobileText = "false";
    let dsClass = "";
    const [time, setTime] = useState(0)
    const [desktopMessage, setDesktopMessage] = useState("")
    const [mobileMessage, setMobileMessage] = useState("")
    const timer = useRef<HTMLDivElement>(null)

    //console.log(content)

    if (content.mobile_text_before && content.mobile_text_before != "") {
        usemobileText = "true";
        dsClass ="block lg:hidden"
    }

    let contentFormat = "#d# days #h# hours #m# minutes #s# seconds"
    if (content.date_format == "2") contentFormat = "#d# days #h# hours #m# mins #s# secs"

    useEffect(() => {
        let countdownTimer = content.countdown_date;
        let now = new Date().getTime();
        let distance = countdownTimer - now;
        let days = Math.floor(distance / (1000 * 60 * 60 * 24));
		let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		let seconds = Math.floor((distance % (1000 * 60)) / 1000);
        let desktopHTML = ""
        let mobileHTML = ""
        let container = timer.current
            if(container != null || container != undefined) {
                let textMemory = container.querySelector('[data-nq-countdown-text="memory"]')
                if (textMemory != null || textMemory != undefined) {
                    mobileHTML = textMemory?.firstElementChild?.innerHTML || ""
                    desktopHTML = textMemory?.lastElementChild?.innerHTML || ""
                }
                let dateText = `#d# days #h# hours #m# minutes #s# seconds`
                desktopHTML = desktopHTML.replace("#timestamp#", dateText);
                desktopHTML = desktopHTML.replace("#s#", String(seconds)).replace("#m#", String(minutes)).replace("#h#", String(hours)).replace("#d#", String(days));

                if (textMemory && textMemory.lastElementChild != undefined){
                    mobileHTML = mobileHTML.replace("#timestamp#", dateText);
                    mobileHTML = mobileHTML.replace("#s#", String(seconds)).replace("#m#", String(minutes)).replace("#h#", String(hours)).replace("#d#", String(days));
                }

                let oldSMText = container.querySelector('[data-nq-countdown-text="before"] > span[data-nq-countdown-sm]')
                if (oldSMText != undefined ) {
                    setDesktopMessage(mobileHTML)
                }

                if (textMemory && textMemory.lastElementChild != undefined){
                    let oldMDText = container.querySelector('[data-nq-countdown-text="before"] > span[data-nq-countdown-ms]')
                    if (oldMDText != undefined) {
                        setMobileMessage(desktopHTML)
                    }
                }

                if (distance < 0) {
                    let before = container.querySelector('[data-nq-countdown-text="before"]')
                    let after = container.querySelector('[data-nq-countdown-text="after"]')

                    if (before != undefined) {
                        before.classList.add("hidden")
                    }
                    if (after != undefined) {
                        after.classList.remove("hidden")
                    }

                }

                const interval = setInterval(() => {
                    if (distance > 0) {
                        setTime(time + 1);
                    } else {
                        clearInterval(interval);
                    }
                }, 1000);

                return () => clearInterval(interval);

            }
    }, [time])



    return (
        <div className={`${content.nq_bgcolour} ${content.nq_textcolour} min-h-[40px]`} ref={timer}>
            <div className={`${content.page_width} font-semibold py-2`}>
                <div className="text-center" data-nq-countdown-timer={`${content.countdown_date}`} data-nq-countdown-format={`${contentFormat}`} data-nq-countdown-complete="false" data-nq-countdown-guid={`{content._id}`}>
                    <div data-nq-countdown-text="memory" className="hidden">
                        <span data-nq-countdown-smtxt>{content.text_before}</span>
                        {usemobileText ? <span data-nq-countdown-mstxt>{content.mobile_text_before}</span> : null}
                    </div>
                    <div className={`flex justify-center text-center px-3`} data-nq-countdown-text="before">
                        <span className="hidden lg:block"  data-nq-countdown-sm dangerouslySetInnerHTML={{ __html: desktopMessage }}></span>
                        {usemobileText ? <span className="lg:hidden" data-nq-countdown-ms dangerouslySetInnerHTML={{ __html: mobileMessage }}></span> :null }
                    </div>
                    <div data-nq-countdown-text="after" className="hidden">
                        <span className={`${dsClass}`}  data-nq-countdown-sm>{content.text_after}</span>
                        {usemobileText ? <span className="hidden lg:block" data-nq-countdown-ms>{content.mobile_text_after}</span> : null}
                    </div>
                </div>
            </div>
        </div>

    )
}

export default TimerPB;