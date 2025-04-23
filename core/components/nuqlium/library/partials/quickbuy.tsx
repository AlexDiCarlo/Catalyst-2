
import { useEffect, useState, useRef } from 'react';
import {addToCartNQ} from '../_actions/nq-add-to-cart';

let entity = ""
function AddToBasketPopup(props:any) {
    const [altentity, setEntity] = useState("");
    let item = props.product;
    let button = useRef<HTMLButtonElement | null>(null);

    if (item.product.option?.attributes["_auto_entity_id"] != undefined) {item.product.option?.attributes["_auto_entity_id"][0]}
    let updateEntity = (value:any) => {
        entity = value;
        setEntity(value);
    }

    let basketAdd = async () => {
        let data = new FormData();
            data.append('product_id', item.id);
            data.append('variant_id', entity);
            if (button.current) {
                button.current.innerHTML = `<i class="fa-solid fa-spinner animate-spin"></i>`
                button.current.style.backgroundColor = "#000";
            }

        let response = await addToCartNQ(data);
        if(response.status === 'success'){
            if (button.current) {
                button.current.innerHTML = "Added to Cart";
                button.current.style.backgroundColor = "#4CAF50";

                setTimeout(() => {
                    if (button.current) {
                        button.current.innerHTML = "Add to Cart";
                        button.current.style.backgroundColor = "#000";
                        setEntity("");
                    }
                }, 2500);

            }
        }else{
            if (button.current) {
                button.current.innerHTML = "Select a Size";
                button.current.style.backgroundColor = "#F44336";

                setTimeout(() => {
                    if (button.current) {
                        button.current.innerHTML = "Add to Cart";
                        button.current.style.backgroundColor = "#000";
                    }
                }, 2000);
            }
        }
    }
    return (
        <div className="bottom-0 bg-white bg-opacity-80 transition-all translate-y-[100%] group-[.addMobile]:translate-y-0  lg:group-hover/img:translate-y-0 z-10 absolute w-full text-center px-3" data-nqe-element="add-to-basket-popup">
            <div className="">  
            {item.product.options.length > 1 && item.product.options[0].attributes["size"][0] ? 
                <div className='flex justify-start items-center pt-2 gap-3 max-w-[80%] mx-auto overflow-x-auto scrollbar pr-4 '>
                    {item.product.options.map((option:any, index:number) => (
                        option.attributes["_auto_entity_id"] ? 
                            <p className={`cursor-pointer ${option.attributes["_auto_entity_id"][0] == altentity ? "font-bold text-[red]" : ""}  `} key={index} data-entity-id={option.attributes["_auto_entity_id"][0]} onClick={() => {updateEntity(option.attributes["_auto_entity_id"][0])}}> {option.attributes["size"][0]}</p>
                        :null
                    ))}
                 </div>                
            :null} 
                <div id="add-to-cart-wrapper" className="add-to-cart-wrapper">
                    <div className=" add-to-cart-buttons">
                        <div className="py-2 lg:py-0">
                            <button ref={button} id="form-action-addToCart" data-wait-message="Adding to cart…" onClick={basketAdd} className="cursor-pointer bg-black text-white rounded-[4px] text-center py-[4px] px-[16px] lg:py-[8px] lg:px-[32px] lg:my-[8px]  w-full text-sm lg:text-base  " type="button" data-nqe-form-post data-nqe-setsku="{{default_sku}}"> Add to Cart </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>	
    )
}
export default AddToBasketPopup;