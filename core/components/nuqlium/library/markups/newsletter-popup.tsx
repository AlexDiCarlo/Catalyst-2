import PopupExitButton from '../partials/popupExit'


function NewsLetterPopup(props: any) {
    const content = props.content;
    const data = content?.data;

    return (
        <div className="item flex min-h-full justify-center md:justify-center p-4 text-center items-center md:p-0">
            <div className="relative transform overflow-hidden rounded-[12px] bg-white text-left shadow-xl transition-all my-8 w-full md:w-2/3 max-w-[400px] lg:max-w-[800px] p-0">
                <PopupExitButton/>
                <div className="flex flex-col lg:flex-row items-center">
                    <div id="wheel" className="flex items-center justify-center overflow-hidden m-0 p-0 w-full lg:w-1/2">
                        <picture>
                            <source media="(max-width: 767px)" srcSet={data?.mobile_image} />
                            <img src={data?.image} alt="Newsletter Sign Up" />
                        </picture>
                    </div>

                    <div className="w-full lg:w-1/2 text-black text-center p-6 relative">
                        <h1 className="text-[36px] lg:text-[42px]">{data?.title}</h1>
                        <div className="text-[18px] lg:text-[24px]">{data?.sub_text}</div>

                        <div className="my-8 lg:my-12 text-[14px]">{data?.description}</div>

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
                            <div className="text-[#999999] text-[10px] my-4 text-left">
                                New subscribers only. One-time use. Cannot be combined. Exclusions may apply.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewsLetterPopup;
