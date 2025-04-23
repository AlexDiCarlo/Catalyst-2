import { BadgeCent } from 'lucide-react';
import { Link } from '~/components/link';
import {useState, useRef, use } from 'react';
import Badge from '../partials/badge';
import SocialProof from '../partials/social-proof';
import quickbuy from '../partials/quickbuy';
import AddToBasketPopup from '../partials/quickbuy';
 

function Product(props:any){
    let item = props.item;
    let count = 0;
    let _image = item.product.image.replace("/medium/", "/small/");
    let swatchCount = 0; let swatchMax = 4; let badgeCount = 0;
    let messages = item?.messages
    let core = props.core;


    let nql_add_to_basket = true
    const [currentSwatch, setCurrentSwatch] = useState();
    let swatchClick = (e:any, position:any) => {
        let productid = e.currentTarget.getAttribute("data-nq-group-productid");
        // Call new core swatch function passing, the product ID and the current position of the product on the page //
        core.Swatch(productid,position)
    }
    
    let consoleCheck = (e:any) => {
        console.log(e.currentTarget)
    }
    let mobileAddToBasket = useRef<HTMLDivElement | null>(null);
    let updateMobileCard = (e:any) => {
        if (mobileAddToBasket.current) {
            mobileAddToBasket.current.classList.toggle("addMobile")
        }
    }

    return (
        <div className="!text-left relative  group-[.feed]:mt-0 leading-6 flex flex-col {{hide}} nql-fade-in-fast " data-product-animate="true" data-nq-product={`${item.product.productid}`} data-nq-listing-position={`${item.position}`} data-nq-product-name={`${item.product.name}`}
        data-nq-product-price={`${item.product.option.price}`} data-nq-product-brand="Nuqlium"  data-nq-product-variant={`${item.product.option.sku}`}>
           <div className="relative bg-red overflow-hidden group/img" data-nqe-image-container>
               <div className=" relative z-[1] transition-all lg:translate-x-[200%] lg:group-hover/img:translate-x-0" data-nqe-element="favorite-container">
                   <div className="flex flex-col gap-1 lg:gap-3 items-center justify-center absolute top-2 right-2 lg:top-4 lg:right-4">
                       <div className="text-[18px] lg:text-[24px]  cursor-pointer " data-nqe-wishlist>
                           <p className="block text-[18px] lg:text-[24px]"><i className="fa-regular fa-heart"></i></p>
                           <p className="hidden text-[18px] lg:text-[24px]"><i className="fa-solid fa-heart"></i></p>
                       </div>
                   </div>	
               </div>
               
               {item.badges && item.badges.length > 0 ?
                    item.badges.map((badge:any, index:any) => {
                            let uniqueId = Math.random().toString(36).substr(2, 9);
                            if (badge.meta?.position != "inline")  badgeCount++;
                            if (badgeCount <= 2) {
                                return (
                                    <Badge key={`${count}-${badge.badgeid}-${uniqueId}`} badge={badge} item={item} badgeCount={index} />
                                )
                            }
                            
                    })
                 : ""   
               }
               {messages && messages != "" ? 
                    <SocialProof messages={messages} item={item} />
                : null
                }
            {item.product.image && item.product.image !== "" ? 
                <Link href={core.ProcessURL(`${item.product.url}?nq.params`)}>
                        <div className="group/altImage">
                        <img className="w-full h-full rounded transition-all duration-500  group-hover/img:scale-[1.05]" src={`${_image}`} data-original-image data-nqe-url={`${item.product.url}?nq.params`} alt={`${item.product.name}`}  width="232" height="278" />
                        <img className="w-full h-full rounded hidden" data-nqe-grey-image src={`${_image}`} width="232" height="278" alt={`${item.product.name}`}/>
                        {item.product.attributes.auto_images && item.product.attributes.auto_images.length > 1 ?
                            <img className="w-full h-full rounded absolute left-0 top-0 transition-all duration-500 opacity-0 group-hover/altImage:opacity-100" src={`${item.product.attributes.auto_images[1]}`} data-nqe-url="{{item.product.url}}?nq.params" alt="{{item.product.name}}" width="232" height="278" data-nqe-alt-image={`${item.product.attributes.auto_images[1].replace('/medium/', '/small/' )}`} />
                            :""
                        }
                        </div>
                    </Link>	
               :
               <Link href={core.ProcessURL(`${item.product.url}?nq.params`)}>
                     <img className="w-full rounded" src="https://d30clxcz7we0m7.cloudfront.net/demo/newdemo/greyblockproductcard.png?v={{meta.image_version}}" width="232" height="278" alt=""/>
                </Link> 
            }
                       
               {nql_add_to_basket == true ? 
               <div className="group" ref={mobileAddToBasket}>
                   <div className="absolute bottom-[0px] right-0 w-fit block -rotate-90  text-center lg:hidden group-[.addMobile]:bottom-[81px]" onClick={updateMobileCard}>
                       <div className="bg-black bg-opacity-60 w-[40px] h-[40px] flex items-center justify-center cursor-pointer text-xs">
                           <i className="rotate-90  text-white fa-solid fa-basket-shopping"></i>
                       </div>	
                    </div>
                    <div>
                        <AddToBasketPopup product={item}/>
                    </div>
                </div>
                :null
                }  
           </div>
       

           <div className="pt-[10px] group-[.scrollerColor-text-white]:text-white group-[.scrollerColor-text-black]:text-black flex-1 flex flex-col ">	
               
               
               {item.product.productgroups && item.product.productgroups.length > 0 ?
               
                    <div className="flex flex-wrap my-2  items-center" data-listing="swatches" data-pfid={`${item.product.productid}`}>
                        {item.product.productgroups.map((swatch:any) => {
                                let swatchImage = swatch.image.replace("/medium/", "/small/");
                                if (swatch.attributes && swatch.attributes.swatch_image && swatch.attributes.swatch_image[0] != "") {
                                    swatchImage = swatch.attributes.swatch_image[0];
                                }
                                swatchCount++;
                                count++;
                                let swatch_color = swatch.attributes.colour[0]
                                return (
                                
                                        <span key={count} className={`${swatchCount > swatchMax ? "invisible" : ""} mr-2 mb-[2px] cursor-pointer`} data-nq-group-productid={`${swatch.productid}`} onClick={(e) => swatchClick(e, item.position)} >
                                         
                                        <img className={`cursor-pointer rounded-[50%] w-[25px] h-[25px] object-cover  ${item.product.productid == swatch.productid ? "border-[2px] border-black" : ""}`} src={`${swatchImage}`} width="15" height="15" alt={`${swatch.name}-${swatch_color}`}/>
                                        </span>
                                  
                                )
                        })}

                        {item.product.productgroups.size > swatchMax ? 
                            <div className="flex justify-center	items-center mb-[2px]">
                                <span className="block text-xs" data-nqe-swatch-toggle="+"> + {item.product.productgroups.size - swatchMax} </span>
                                <span className="hidden text-xs" data-nqe-swatch-toggle="-"> - {item.product.productgroups.size - swatchMax } </span>
                            </div>
                        
                            : ""
                            }
                
                    </div>
            
                : 
                    <span className=" my-2 mb-[8px] cursor-pointer" data-nq-group={`${item.product.group}`}>
                        <img className="cursor-pointer rounded-[50%] w-[25px] h-[25px] object-cover  border-[2px] border-black " src={`${_image}`} width="15" height="15" alt="" />
                    </span>
                }
   
               {item.product.attributes.auto_brand?.length > 0 ? 
                <p className="text-[11px] lg:text-sm text-left flex-1"> {item.product.attributes.auto_brand[0]} </p> 
                : ""
                } 

                <Link href={`${item.product.url}`} className='font-semibold my-1'>{item.product.name}</Link>


               <div className="flex flex-wrap font-bold items-center gap-1 pt-2">
                
                   {item.product.minprice != item.product.maxprice ? 
                        <span className="text-[11px] lg:text-base pl-2  {% if item.product.option.onsale%}text-red{%endif%}">From {item.product.minprice} to {item.product.maxprice}</span>
                    : 
                        item.product.option.onsale == true ? 
                            <span className="text-[11px] lg:text-base"><s dangerouslySetInnerHTML={{__html: item.product.option.price}}></s></span>
                        :
                            <span className="text-[11px] lg:text-base" dangerouslySetInnerHTML={{__html: item.product.option.price}}></span>
                    
                    }            
             
                   {item.product.option.onsale == true ? 
                    <div className="flex items-center">
                        <span className="text-[11px] lg:text-base !text-red-700 " dangerouslySetInnerHTML={{__html: item.product.option.promotionprice}}></span>
                        <span className="text-red-700 text-[9px] lg:text-xs font-thin pl-2"> YOU SAVE {`${item.product.option.saving.toFixed(0)}`}% </span> 
                    </div>
                    : ""
                    }
                
                   
               </div>
       </div>	
   </div> 
    )
}




export default Product;