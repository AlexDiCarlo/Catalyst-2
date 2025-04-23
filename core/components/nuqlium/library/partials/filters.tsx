import  Components  from "../core/index.js";
import { clear } from "console";
import { useState } from "react";
import { set } from "zod";

function FilterList(props:any){
    let aggregation = props.aggregation;
    let core = props.core;

    if (aggregation.data !== null){
        switch (aggregation.type) {
        case "list":
            return(
                <div className="filters">
                    {aggregation.data.map((item:any) => {
                        let classes = "cursor-pointer";
                        if (item.selected) classes += " selected";
                        return(
                            <div key={aggregation.id + item.key} className={classes} onClick={(e) => {core.Action("filter",e,aggregation.id, item.key, "list")}}>
                                <a className="capitalize">{item.displayname}</a>
                            </div>
                        )
                    })}
                </div>
            )
        case "slider":
            let Slider =  Components["markups/slider" as keyof typeof Components];
            let min = aggregation.range.min
            let max = aggregation.range.max
            return (
                <Slider min={min} max={max} aggregation={aggregation} core={core}/>
            ) 
        }
        
    }
}

function Filters(props:any){
    let core = props.core;
    let products = props.products;
    let type = props.filterType;    
    const [currentFilter, setcurrentFilter] = useState("");

    let openFilter = (e:any) => {
        if (e.target !== undefined){
            let filter = e.target.getAttribute("data-nqe-aggregationid");
            if (filter !== null){
                if (currentFilter === filter){
                    setcurrentFilter("");
                }
                else{
                    setcurrentFilter(filter);
                }
            }
        }
    }


    switch(type){
        case "default":
        return(
            <div className="flex flex-col gap-4 px-6 my-1 lg:px-0">
                {products.aggregations.map((aggregation:any) => {
                return(
                    <div key={aggregation.id} className="relative" onClick={(e) => openFilter(e)}>
                        <div className="font-semibold text-[20px]">{aggregation.name}</div>
                        <FilterList aggregation={aggregation} core={core}/>
                    </div>
                    )
                })}
            </div>
        )
        break;
        case "horizontal":  
        let count = 0;
        return(
            <div className="flex flex-col px-6 lg:flex-row lg:px-0 gap-4 my-1">
                {products.aggregations.map((aggregation:any) => {
                count++;    
                return(
                    <div key={aggregation.id} className="relative" onClick={(e) => openFilter(e)}>
                        <div className="font-semibold lg:text-sm lg:whitespace-nowrap lg:border-[2px] lg:border-neutral-200 lg:px-4 lg:py-2 lg:min-w-[120px] lg:text-center lg:rounded-[4px] lg:cursor-pointer lg:duration-200 lg:hover:border-yellow-300" data-nqe-aggregationid={`${aggregation.id}`}>{aggregation.name}</div>
                        <div className={`lg:absolute lg:top-[47px] lg:opacity-[.97] lg:z-[4] lg:px-4 lg:py-4 lg:bg-white lg:rounded-[6px] lg:w-[242px] lg:border lg:border-zinc-200 lg:transition-all duration-500 block ${aggregation.id == currentFilter ? "lg:block" : "lg:hidden"} `}>
                            <FilterList aggregation={aggregation} core={core}/>
                        </div>    
                    </div>
                    )
                })}
            </div>
        )
        break;
        case "slide":
            return (
                <div className="flex flex-col gap-4 px-6 my-1">
                    {products.aggregations.map((aggregation:any) => {
                        return (
                            <div key={aggregation.id} className="" onClick={(e) => openFilter(e)}>
                                <div className="font-semibold text-[20px]">{aggregation.name}</div>
                                <FilterList aggregation={aggregation} core={core}/>
                            </div>
                        )
                    })}
                </div>
            );


            default:
    }
 
 
}



export default Filters;