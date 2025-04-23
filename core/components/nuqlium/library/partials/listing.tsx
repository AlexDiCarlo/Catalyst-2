
import  Product  from '../partials/product';
import  Content  from "../partials/content";
import { useEffect, useState, useRef } from "react";
let timeout:any = null;

function listing(props:any){
    let core = props.core;
    let products = props.products;
    let count = 0;

    const [breakpoint, setCurrentBreakPoint] = useState(core.BreakPoints()); 
    useEffect(() => {
        window.addEventListener('resize', function(){
            clearTimeout(timeout);
            timeout = setTimeout(
                function() {
                    if (core.BreakPoints() != breakpoint) {
                        setCurrentBreakPoint(core.BreakPoints());
                    }
                }, 200)
        });
    }, [breakpoint])


    let layout = breakpoint;
    let layoutCol = layout?.allowedcolumns
    return (
        <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  data-[nql-col="2"]:grid-cols-2 data-[nql-col="3"]:grid-cols-3 data-[nql-col="3,4"]:grid-cols-4 data-[nql-col="4"]:grid-cols-4 data-[nql-col="4"]:gap-4 data-[nql-col="4"]:pb-4 gap-4 lg:my-4`} data-nql-col={layoutCol}>
             {products.products.map((item:any) => {
                if (item.product != null){
                    count++;
                    return(
                        <div key={count}>
                            <Product item={item} core={core}/>
                        </div>
                    )
                }
                else if (item.content != null && item.id !== "0"){
                    count++;
                    let gridClass = "";
                    switch(item.content.size){
                        case "2x1":
                            gridClass = "col-span-2 row-span-1 opacity-0 fade-in-fast";
                            break;
                            case "2x2":
                                gridClass = "col-span-2 row-span-2 opacity-0 fade-in-fast"; 
                                break;
                                case "4x1":
                                    gridClass = " col-span-2 md:col-span-3 lg:col-span-4 data-[nql-col='2']:col-span-2 data-[nql-col='3']:col-span-3 data-[nql-col='3,4']:col-span-4 data-[nql-col='4']:col-span-4 row-span-1 opacity-0 fade-in-fast"; 
                                    break;
                               default: 
                    }


                    return(
                        <div className={gridClass} key={count} data-nql-col={layoutCol}><Content content={item.content} core={core}/></div>
                    )
                }
            })}
           <Paging core={core} products={products}/>
        </div>
       )
                 
 
}


function Paging(props:any){
    let core = props.core;
    let products = props.products;
    let ref = useRef<HTMLButtonElement | null>(null);

    const [isIntersecting, setIntersecting] = useState(false);
 
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry && entry.isIntersecting) {
                setIntersecting(entry.isIntersecting);
                ref.current?.click()
                setIntersecting(false);
            }
        }, { threshold: 1, rootMargin: "200px" });

        if (ref.current) {  
            observer.observe(ref.current);
        }
    }, [isIntersecting]);

    //console.log("Rendering Paging")
    switch(core.config.properties.paging){
        case "infinite":    
            return(
                <div>
                {products.properties.next != null && products.properties.next <= products.properties.maxpages?
                    <div>
                        <button ref={ref} onClick={(e)=>core.Action("page",e,"page",products.properties.next)}>More</button>
                    </div>:<div></div>}
                </div>
            )
        case "more":
            return(
                <div>
                {products.properties.next != null && products.properties.next <= products.properties.maxpages?
                    <div>
                        <button onClick={(e)=>core.Action("page",e,"page",products.properties.next)}>More</button>
                    </div>:<div></div>}
                </div>
            )
        default:
            return (
            <div>
                    {products.properties.prev != null && products.properties.prev > 0?
                <div>
                    <button onClick={(e)=>core.Action("page",e,"page",products.properties.prev)}>Previous</button>
                </div>:<div></div>}
                    {products.properties.next != null && products.properties.next < products.properties.maxpages?
                <div>
                    <button onClick={(e)=>core.Action("page",e,"page",products.properties.next)}>Next</button>
                </div>:<div></div>}
                
            </div>
            );
    }

  
}

export default listing;