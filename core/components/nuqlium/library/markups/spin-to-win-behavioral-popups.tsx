import React, { useEffect, useState } from "react";
import PopupExitButton from '../partials/popupExit'


function SpinToWin(props: any) {
    const content = props.content;
    const data = content?.data;

    const [prize, setPrize] = useState<string>("");

    useEffect(() => {
        try {
            function wheelOfFortune(selector: string) {
                const node = document.querySelector(selector);
                if (!node) return;

                const spin = document.querySelector('#spin') as HTMLButtonElement;
                const wheel = node.querySelector('ul')!;
                const arrow = document.querySelector('#spinpinpoint') as HTMLElement;
                const optionsNodes = document.querySelectorAll("[data-nq-option]") as NodeListOf<HTMLElement>; // Explicit typing for NodeList

                let animation: Animation | null = null;
                let previousEndDegree = 0;

                spin.addEventListener('click', () => {
                    if (animation) {
                        animation.cancel(); // Reset the animation if it already exists
                    }
                    spin.classList.add("disabled");

                    const randomAdditionalDegrees = Math.random() * 360 + 1800;
                    const newEndDegree = previousEndDegree + randomAdditionalDegrees;

                    animation = wheel.animate([
                        { transform: `rotate(${previousEndDegree}deg)` },
                        { transform: `rotate(${newEndDegree}deg)` }
                    ], {
                        duration: 4000,
                        direction: 'normal',
                        easing: 'cubic-bezier(0.440, -0.205, 0.000, 1.130)',
                        fill: 'forwards',
                        iterations: 1
                    });

                    setTimeout(() => {
                        let buttonPosition = arrow.getBoundingClientRect(); // Get the arrow position    
                        let closestOption: any
                        let minDistance = Infinity;

                        optionsNodes.forEach((option: HTMLElement) => {
                            const optionPosition = option.firstElementChild?.getBoundingClientRect();
                            if (optionPosition) {
                                // Calculate the distance between the arrow and the option
                                const distance = Math.sqrt(
                                    Math.pow(optionPosition.left - buttonPosition.left, 2) + 
                                    Math.pow(optionPosition.top - buttonPosition.top, 2)
                                );

                                // Check if this option is closer than the previously found option
                                if (distance < minDistance) {
                                    minDistance = distance;
                                    closestOption = option;
                                }
                            }
                        });

                        if (closestOption) {
                            let prizeText = closestOption.getAttribute("data-nq-option");
                            if (prizeText !== "No Luck") {
                                setPrize(`Won ${prizeText}!`);
                            } else {
                                setPrize("Sorry, Better Luck Next Time!");
                            }
                      
                        } else {
                            console.log('No options found');
                        }
                    }, 4001);

                    previousEndDegree = newEndDegree;
                });
            }

            wheelOfFortune('.ui-wheel-of-fortune');
        } catch (err) {
            console.log(err);
        }
    }, [content]); // Add `content` dependency to rerun when it changes

    const backgroundColor = data?.background_color || 'bg-[#DA8A31]'; // Default background color
    const options = data?.options || [];

    return (
        <div className="font-serif">
            {/* Containers required to set positioning of popup */}
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto rounded">
                <div className="flex min-h-full justify-center lg:justify-center items-center p-4 text-center lg:text-right md:p-0">
                    {/* Popup container with background image */}
                    <div
                        className={`${backgroundColor} relative transform overflow-hidden text-left shadow-xl transition-all my-8 w-full sm:w-4/5 lg:w-3/4 xl:w-3/5 py-8 lg:pr-8 rounded-[12px] bg-no-repeat bg-right-bottom`}
                        
                    >
                       <PopupExitButton/>

                        <div className="flex flex-col lg:flex-row items-center sm:items-start lg:justify-between">
                            <div
                                id="wheel"
                                className="flex items-center justify-center overflow-hidden m-0 p-0 w-full sm:w-2/1 lg:w-2/5 min-w-[500px] relative ml-0 md:ml-0 lg:-ml-[180px]"
                            >
                                {/* Spin button */}
                                <button
                                    id="spin"
                                    className="absolute -translate-x-2/4 -translate-y-2/4 z-10 bg-[#DA8A31] uppercase font-[bold] text-xl text-[#ffffff] w-20 h-20 cursor-pointer tracking-[1px] rounded-[50%] border-8 border-solid border-[#C97375] left-2/4 top-2/4"
                                >
                                    Spin
                                </button>

                                {/* Arrow */}
                                <span
                                    className="arrow absolute bottom-[-3px] right-[229px] rotate-90 lg:rotate-[unset] lg:top-[47%] lg:bottom-[unset] lg:-right-[35px] text-[#D92525] z-40 lg:-translate-x-[50%]"
                                    id="spinpinpoint"
                                >
                                    <svg
                                        width="61"
                                        height="52"
                                        viewBox="0 0 61 52"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <g filter="url(#filter0_d_187_864)">
                                            <path
                                                d="M13.537 20.7526C8.94192 19.2504 8.9419 12.7499 13.537 11.2477L44.4463 1.14258C47.6786 0.0858591 51 2.49441 51 5.89506L51 26.105C51 29.5056 47.6786 31.9142 44.4463 30.8575L13.537 20.7526Z"
                                                fill="#D92525"
                                            />
                                        </g>
                                    </svg>
                                </span>

                                {/* Wheel container */}
                                <div
                                    className={`container${options.length} [transition:transform_5s_ease-out] w-[400px] h-[400px] lg:w-[500px] lg:h-[500px] bg-[#ccc] relative overflow-hidden rounded-[50%] border-[15px] border-solid border-[#D9D9D9] text-base`}
                                >
                                    <fieldset className="ui-wheel-of-fortune">
                                        <ul>
                                            {options.map((item: any, index: number) => (
                                                <li
                                                    key={index}
                                                    className={`font-semibold text-base ${item.title_color} ${item.background_color}`}
                                                    data-nq-option={item.title}
                                                >
                                                    <p className="pl-[50px] lg:pl-0">{item.title}</p>
                                                </li>
                                            ))}
                                        </ul>
                                    </fieldset>
                                </div>
                            </div>

                            <div className="w-full sm:w-2/3 lg:w-3/5 xl:w-3/5 mx-auto lg:mx-0 text-white text-center px-4 md:px-12 lg:px-8 mt-8 lg:mt-0">
                                <h1
                                    className={`${data?.title_color || ''} font-semibold text-[36px] lg:text-[42px] text-center lg:text-right`}
                                >
                                    {content?.title || 'Spin for Chic Prizes!'}
                                </h1>
                                <div
                                    className={`my-2 lg:my-4 text-[14px] text-center lg:text-right ${data?.text_color || ''}`}
                                >
                                    {content?.description || 'Spin the wheel and discover amazing discounts and special offers on trendy clothing. Enter your email to join the fun!'}
                                </div>

                                {/* Newsletter form */}
                                <div className="mb-8">
                                    <form action="post" className="flex">
                                        <div className="flex-1 mr-2">
                                            <input
                                                id="nqnewsemail"
                                                type="email"
                                                placeholder="Enter your email"
                                                className="bg-[#EEEEEE] w-full p-2 rounded text-[14px]"
                                            />
                                        </div>
                                        <div>
                                            <input
                                                type="submit"
                                                value="Sign Up"
                                                className="rounded bg-black text-white px-8 py-2 text-[14px]"
                                            />
                                        </div>
                                    </form>
                                    <div
                                        className={`${data?.text_color || ''} text-[10px] my-4 text-center lg:text-left`}
                                    >
                                        New subscribers only. One-time use. Cannot be combined. Exclusions may apply.
                                    </div>
                                </div>

                                <div id="myprize" className="relative z-10 text-center lg:text-left text-[24px] text-black font-bold">{prize}</div>

                                {/* Optional Image */}
                                {data?.image && (
                                    <div className="pt-4 lg:absolute bottom-0">
                                        <picture>
                                            {content?.mobile_image && (
                                                <source
                                                    media="(max-width: 767px)"
                                                    srcSet={data.mobile_image}
                                                />
                                            )}
                                            <img
                                                src={data.image}
                                                alt="Newsletter Sign Up"
                                            />
                                        </picture>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SpinToWin;
