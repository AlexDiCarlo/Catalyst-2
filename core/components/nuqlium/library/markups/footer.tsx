import { count } from "console";
import { useState } from "react";

function Footer(props:any){


    let dictionary = props.core._props.config.properties.dictionary
    let content = props.content.data;
    let counter = 0;
    const [emailVale, setEmailValue] = useState("");
    //console.log(content)
    function upDateEmail(e:any){
        setEmailValue(e.target.value)
        // console.log(emailVale)
    }
    // console.log(dictionary)
    return (
        <div className="w-full" id={content.contentguid}>
            <div className={`${content.background_color}`}>
                <div className="flex  flex-col md:flex-row justify-center items-center md:gap-[72px] max-w-screen-2xl w-full pt-16 pb-8  mx-auto px-8 lg:px-8">
                    <div className="w-full md:w-[50%]">
                        <p className=" text-[24px] text-[#E8E8F9] font-semibold brand-font"> {dictionary["newsletter_title"]} </p>
                        {/* <p className=" text-base text-[#E8E8F9] brand-font"> Sign up for news, launches & offers </p> */}
                        <iframe name="iframe" className="hidden"></iframe>
                        <div id="mc_embed_shell">
                            <div id="mc_embed_signup">
                                <form action="https://nuqlium.us21.list-manage.com/subscribe/post?u=ec38778a3824070c0cf05a726&amp;id=27478a4ea6&amp;f_id=003fede6f0" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate" target="iframe">
                                    <div id="mc_embed_signup_scroll">
                                        <div id="mce-responses" className="clear foot">
                                            <div className="response" id="mce-error-response" style={{display: "none"}}></div>
                                            <div className="response" id="mce-success-response" style={{display: "none"}}></div>
                                        </div>
                                        <div aria-hidden="true" style={{ position: 'absolute', left: '-5000px' }}>
                                            <input type="text" name="b_ec38778a3824070c0cf05a726_27478a4ea6" tabIndex={-1} value={emailVale} onChange={() => console.log("") }/>
                                        </div>

                                        <div className="flex items-center w-full md:w-[90%] xl:w-[70%] relative py-8" data-nqe-mc-input>
                                            <input className="required email bg-transparent outline-none border-b border-b-[#E8E8F9] text-[#E8E8F9]  h-[52px] flex-1 w-[80%]" type="email" name="EMAIL" id="mce-EMAIL" placeholder={dictionary.email} required autoComplete="email" data-mailchimp-email onChange={upDateEmail}/>
                                            <button title="Submit" type="submit" name="subscribe" id="mc-embedded-subscribe" value="Subscribe" className="right-8 absolute"> <i className="fa-regular fa-paper-plane text-[#E8E8F9] text-[24px]"></i></button>
                                        </div>
                                        
                                        <div className=" items-center w-full md:w-[90%] xl:w-[70%] relative py-8 hidden" data-nqe-mc-input="success">
                                            <div className="flex text-white text-sm md:text-base font-semibold  items-center gap-2">
                                                <p> Your email was successfully added </p>  
                                                <i className="text-red-600 fa-regular fa-circle-check"></i>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            {/* <script type="text/javascript" src="//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js"></script><script type="text/javascript">(function($) {window.fnames = new Array(); window.ftypes = new Array();fnames[0]='EMAIL';ftypes[0]='email';fnames[1]='FNAME';ftypes[1]='text';fnames[2]='LNAME';ftypes[2]='text';fnames[3]='ADDRESS';ftypes[3]='address';fnames[4]='PHONE';ftypes[4]='phone';fnames[5]='BIRTHDAY';ftypes[5]='birthday';}(jQuery));var $mcj = jQuery.noConflict(true);</script> */}
                        </div>
                    </div>
                    <div className="w-full md:w-[50%]">
                    {content.display_image && content.display_image != "" ?
                            <img className="" src={`${content.display_image}`} alt={`{content.title}`}/>
                        :    
                            <img className="" src="https://media.nuqlium.com/web/nav/footer/footerimage.png" data-original-image="" data-nqe-lazy-load="true" alt={`{content.title}`}/>
                        }
                    </div>
                </div>

            <div className="min-h-[200px] flex flex-col md:flex-row items-start lg: max-w-screen-2xl w-full pb-12  mx-auto px-8 lg:px-8">
            <div>
                {content.show_default_logo && content.show_default_logo == "true" ?
                    <div className="w-full md:w-[40%] order-1 md:order-none">
                        <div className="flex flex-col items-start gap-8">
                            <img className="max-w-[190px]"src={`${content.footer_image}`} alt={`${content.title}`} data-nqe-url="/"/> 
                        </div>	
                    </div>

                :null
                }
                    <div className="py-4">
                            <p className="text-white text-base"> {content.email} </p>
                            <p className="text-white text-[10px]"> {content.copyright}</p>
                        </div>	
                </div>

                <div className="w-full md:w-[60%] flex flex-col md:grid md:gap-8  md:grid-rows-1 md:grid-cols-3 max-w-screen-2xl  py-12  md:py-0  mx-auto md:px-4 mb-0 md:mb-[-14px]" >
                {content.columns && content.columns.length > 0 ?
                    content.columns.map((column:any) => {
                        counter++;
                        return (
                            <div key={counter} dangerouslySetInnerHTML={{__html:column._html}}></div>
                        )
                    })
                :null
                }

                </div>
            </div>


            </div>


            <div className="max-w-screen-2xl  mx-auto px-4 lg:px-8 flex flex-row flex-wrap  items-center justify-start gap-2 m-auto py-2 2x1:py-6 text-left lg:justify-start w-full">
                {dictionary.payment_methods && dictionary.payment_methods != "" ? 
                <div className="font-bold text-[15px] lg:mr-4 block w-full lg:w-auto">{dictionary.payment_methods}</div>
                : 
                <div className="font-bold text-[15px] lg:mr-4 block w-full lg:w-auto">Payment methods we accept</div>
                }
                <img width="58" height="35" src="https://media.dripmade.com/nav/visa.svg?v=1" alt="Visa"/>
                <img width="56" height="35" src="https://media.dripmade.com/nav/mastercard.svg?v=1" alt="Matercard"/>
                <img width="57" height="35" src="https://media.dripmade.com/nav/paypal.svg?v=1" alt="Maestro"/>
                <img width="58" height="35" src="https://media.dripmade.com/nav/maestro.svg?v=1" alt="PayPal"/>
            </div>
        </div>
    )
}

export default Footer;