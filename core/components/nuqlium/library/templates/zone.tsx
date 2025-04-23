
import  Product  from '../partials/product';
import  Content  from "../partials/content";
import  Filters  from "../partials/filters";
import { Suspense } from "react";

function zone(props:any){
    let core = props.core;
    let content = props.data.content;

    let unique = 0;

    return(
    content?.content.map((content:any) =>{
        unique++;
        return(
            <div key={unique}>
                <Content content={content} core={core}/>
            </div>
            )  
        }
    )
)
}


export default zone;