
import  Product  from '../partials/product';
import  Content  from "../partials/content";
import Link from 'next/link';
import { GlideSlide, GlideContainer } from '../markups/glide';
import {memo} from 'react';



function categoryfeed(props:any){
    let core = props.core;
    let products = props.data.products;
    let category = props.data.category;
    let count = 0;
    let id = `${props.data.key}`;//${uniqueId}`
    let customTemplate = props.data.template;

    // console.log(props)
    //console.log("Feed", props.data.key)

    return (

            <div className="group-[.odd]:bg-[#FBFAF6]">
            <div className="flex flex-col items-center lg:flex-row gap-6 max-w-[1536px] mx-auto px-4 group-[.odd]:lg:flex-row-reverse mb-16">
            <div className="lg:w-1/3 relative">

                {category.image && category.image != "" ? 
                    <div>
                        <div className="h-full w-full relative">
                            <img className="h-[650px] w-full object-cover" src={category.image}/>
                            <div className="absolute top-0  left-0 right-0 text-white ">
                                    <div className="p-8 text-[32px] font-medium text-left text-black brand-font">{category.name}</div>
                            </div>		
                        </div>	
                    </div>	
                
                :
                    <div>
                    <div className="px-4 text-[32px] brand-font text-center">{category.name}</div>
                    <div className="text-center p-8">
                        <p className=""> {category.attributes.description[0]} </p>
                    </div>	

                    <div className="py-4 w-full flex justify-center max-w-[200px] mx-auto">
                        <a href="{{category.url}}" className="inline-block px-12 py-3 !text-white bg-black rounded-[8px] text-lg animate-bounce"> <p> Shop Now </p> </a>	
                    </div>
                    </div>
                }
            </div>	
            <div className="w-full {{padding}} lg:max-w-[980px]">
            <a href="{{category.url}}" className="{{button_hide}} flex gap-4 items-center">	
                <p className=" text-[20px] font-bold text-center">Shop {category.name}</p>	
                <i className="text-[20px] fa-regular fa-circle-right"></i>
            </a>
            <div className="">
            <GlideContainer products={products} core={core} type={"feed"} id={id}>
                {products.total > 0 && products.products != null?
                        products.products.map((item: any) => {
                            count++;
                            if (item.product != null){
                                return (
                                    <GlideSlide key={count} customTemplate={customTemplate}>
                                            <Product item={item} core={core}/>
                                    </GlideSlide>
                                )
                                }
                        })
                    :(<div>noproducts</div>)}
            </GlideContainer>
            </div>

		</div>
	</div>
</div>







    

    )
}
export default memo(categoryfeed);