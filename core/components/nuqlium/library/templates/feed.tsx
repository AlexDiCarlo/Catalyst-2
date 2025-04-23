
import  Product  from '../partials/product';
import  Content  from "../partials/content";
import { GlideSlide, GlideContainer } from '../markups/glide';
import {memo} from 'react';



function feed(props:any){
    let core = props.core;
    let products = props.data.products;


    //console.log(props)

    let count = 0;
    let uniqueId = Math.random().toString(36).substr(2, 9);
    let id = `${props.data.key}`;//${uniqueId}`
    let customTemplate = props.data.template;

    //console.log("Feed", props.data.key)

    return (
        <div className="max-w-[1536px] mx-auto px-1 md:px-2 min-[1537px]:px-0">
        <GlideContainer products={products} core={core} type={"feed"} customTemplate={customTemplate} id={id}>
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
                       else if (item.content != null && item.id !== "0"){
                        count++;
                        let gridClass = "";
                        switch(item.content.size){
                            case "2x1":
                                gridClass = "col-span-2";
                        }
                        return(
                            <div className={gridClass} key={count}><Content content={item.content} core={core}/></div>
                        )
                    }
                   })
               :(<div>noproducts</div>)}
   </GlideContainer>
    </div>

    )
}
export default memo(feed);