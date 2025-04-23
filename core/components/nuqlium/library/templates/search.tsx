
import  Listing  from '../partials/listing';
import  Filters  from "../partials/filters";
import NuqliumCall from '../core/call';
import { Suspense, useState, useEffect, useRef } from "react";

function search(props:any){

    const core = props.core;
    const products = props.data.products;
    let sort = products.sorting

    let filterType = "slide"

    if (props.data.metadata?.filter_style != null) {
        switch (props.data.metadata.filter_style) {
            case "horizontal":
                filterType = "horizontal";
            break;
            case "slide":
                filterType = "slide";
            break;
            case "default":
        }
    }

    const [filterStatus, setFilterStatus] = useState("");

    // Used for handling the filter status of mobile view
    let updateFilterStatus = () => {
        setFilterStatus(filterStatus == "open" ? "closed" : "open");
    }
    useEffect(() => {

    }, [filterStatus]);    


    let slidePanel = useRef<HTMLDivElement | null>(null);
    let opactiyLayer = useRef<HTMLDivElement | null>(null);
    const openFilter = () => {
        if (slidePanel.current != null) {
        slidePanel.current.classList.toggle("group-[.slide]:lg:!right-0");
        opactiyLayer.current?.classList.toggle("hidden");
        }
      };
    return (

        <div className={`group ${filterType} pt-8`}>
        <div className="hidden lg:block">
            <div ref={opactiyLayer} onClick={openFilter} className={`absolute h-[10000vh] top-0 lg:bottom-[unset]  opacity-[.7] z-[9]  left-0 right-0 bg-black hidden `}></div>
        </div>
                <div className={`max-w-[1536px] mx-auto px-4 flex flex-col md:flex-row justify-between group `}>

                    <div className="py-8">
                        <h1 className="text-2xl">Search</h1>
                        <p>Showing {products.total} results for &quot;{props.data.key}&quot;</p>
                    </div>

                    <div className="flex flex-col">
                 
                            {/* Mobile Sort By */}

               
                            <div className="flex lg:hidden py-4 w-full sticky top-0 bg-white z-[1]">
                                <div className="flex w-1/2 h-[50px] gap-2 text-center bg-white text-base mr-4 items-center justify-center border border-neutral-100" onClick={() => updateFilterStatus()}>
                                    <p className="text-sm"> Filters </p>
                                    <i className="text-[18px] fa-solid fa-ellipsis"></i>
                                </div>
                                <div className="w-1/2 h-[50px]" data-nq-property="sort" data-nq-property-value="{{products.sort}}">
                                    <div className="h-full relative">
                                        <label className="pointer-events-none text-base flex h-[50px] absolute bg-white w-full justify-center border border-neutral-100 items-center gap-2">
                                            <p className="text-sm">Sort By</p>
                                            <i className="pointer-events-none fa-solid fa-chevron-down pb-[2px]"></i>
                                        </label>
                                        <select value={products.sort} onChange={(e)=>core.Action("sort",e)} className="bg-white h-[50px] w-full outline-none" name="options" id="option" data-nq-action="sort" data-nq-value="">
                                            <option value=""> Sort By </option>
                                            {sort.map((item:any, index:any) => {
                                                return (
                                                    <option key={index} value={item.value}> {item.text} </option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                </div>
                            </div>





                    </div>
                </div>

                {products.total > 0 && products.products != null?(
                    <div className="flex justify-center gap-4 max-w-[1536px] mx-auto px-4 lg:mt-4">
    
                    {filterType == "horizontal" ? null:
                    <div ref={slidePanel} className={`${filterStatus == "open" ? "fixed top-0 right-0 left-0 h-[100vh] pb-[100px] overflow-scroll bg-white z-10 !block" : ""} scrollbar transition-all duration-300 hidden group-[.horizontal]:lg:hidden group-[.default]:lg:block group-[.default]:lg:w-1/5 group-[.slide]:lg:block group-[.slide]:lg:fixed group-[.slide]:lg:top-0 group-[.slide]:lg:right-[-120%] group-[.slide]:lg:w-[400px] group-[.slide]:overflow-y-scroll group-[.slide]:lg:pb-[120px] group-[.slide]:lg:bg-white group-[.slide]:lg:z-10 group-[.slide]:lg:h-full `}>
                        <div className={`${filterStatus == "open" ? "flex w-full p-6 mb-4 border-b border-b-black" : "hidden"}`}>
                            <p className="text-lg font-semibold"> Filters </p>
                            <button onClick={() => updateFilterStatus()} className="ml-auto text-lg font-semibold"> <i className="fa-solid fa-x"></i> </button>
                        </div>
                        {filterType == "slide" ? 
                        <div className="text-[22px] hidden lg:flex font-bold p-3 justify-between m-3 cursor-pointer gap-2">
                             <p>Filters</p>
                             <i onClick={openFilter} className="fa-solid fa-xmark"></i>
                              </div> : 
                        null}
                        <Filters core={core} products={products} filterType={filterType}/>
                        <div className="z-[1000] p-[18px] gap-2 fixed bg-white bottom-0 w-full flex justify-center md:w-[400px] lg:hidden group-[.slide]:lg:flex">
                            <a className="bg-black text-white flex justify-center items-center h-fit text-center text-[12px] p-4 min-w-[150px] w-1/2 font-semibold  rounded-sm tracking-wide transition-all duration-500 hover:bg-slate-700 cursor-pointer" onClick={(e) => {core.Action("filter",e, "clearall", "", "list")} } > Clear Filters </a>
                            <a className="bg-black text-white flex justify-center items-center h-fit text-center text-[12px] p-4 min-w-[150px] w-1/2 font-semibold  rounded-sm tracking-wide transition-all duration-500 hover:bg-slate-700 cursor-pointer" onClick={openFilter} > Apply </a>
                        </div>
                    </div>
                    }
    
                        <div className={`w-full ${filterType == "horizontal" || filterType == "slide" ? "lg:w-full" : "lg:w-4/5"}`}>
                        <div className="grid grid-cols-2">
                        <div>    
                        {products.selected && products.selected.length > 0 ?
                            <div className={`flex items-center flex-wrap gap-2 ${filterType == "horizontal" ? "pb-8 lg:pb-0" : "pb-0" } text-sm  `}>
                                    <div data-nq-filter-clear data-nqc-event="filter.clearall" data-nqe-filter-type="{{nql_filters}}" className="flex items-center realtive rounded bg-black text-white text-[15px] px-4 py-2 cursor-pointer" onClick={(e) => {core.Action("filter",e, "clearall", "", "list")}}> Clear Filter </div>
                                    {products.selected.map((filter:any, index:any) => {
                                        if (filter.type == "slider") {
                                            let defaultMin = 0
                                            if (filter.range._filteredmin && filter.range._filteredmin != "") {
                                                defaultMin = filter.range._filteredmin
                                            }
                                            return (
                                                <div key={index} className="flex items-center realtive rounded bg-gray-100 [&>p]:text-[15px] px-4 py-2  nql-slider-container cursor-pointer" data-nq-action="{{filter.id}}" data-nq-filter-mimic="true" data-nq-key="{{filter.id}}" data-nq-value="" data-nqc-event="filter.clear" onClick={(e) => {core.Action("filter",e, filter.id, "clearall", "slider")}}>
                                                    <p nq-slider-text="{{filter.id | downcase}}">£{defaultMin}</p>
                                                    <p> - </p>
                                                    <p nq-slider-text="{{filter.id | downcase}}">£{filter.range._filteredmax}</p>
                                                    <p></p>
                                                    <i className="fa-solid fa-x text-xs ml-2"></i>
                                                </div>
                                            )
                                        } else {
                                            return (
                                                <div className="flex gap-4" key={index}>
                                                    {filter.data.map((item:any, index:any) => {
                                                        return (
                                                        <div key={index} className="nql-mimic-tagsx flex items-center capitalize realtive rounded bg-gray-100 text-[15px] px-4 py-2  cursor-pointer" onClick={(e) => {core.Action("filter",e, filter.id, item.key, "list")}}  data-nqc-event="filter.clear">
                                                            <p>{item.displayname}</p>
                                                        <i className="fa-solid fa-x text-xs ml-2"></i>
                                                    </div>
                                                        )
                                                    })}
                                                </div>
                                            )
                                        }
                                    })}
                                </div>
                                : null
                            }
                        </div>   
                        <div className="flex justify-end gap-2 justify-self-end"> 
                        <div className="">
                                    <div className="relative flex items-center gap-4 ">
                                    {filterType == "slide" ?    
                                        <div onClick={openFilter} className="hidden py-[7px] h-[40px] px-9 border border-neutral-100 cursor-pointer text-sm  lg:flex justify-center items-center gap-2"> <p>Filter</p> <i className=" text-[18px] fa-solid fa-ellipsis"></i> </div>
                                    :null
                                    }
                                   
                                    </div>
                                </div>
                                {filterType != "horizontal" ?   
                                <div className="justify-self-end hidden lg:flex gap-2 relative h-fit w-fit">
                                    <select value={products.sort} onChange={(e)=>core.Action("sort",e)} className="border border-neutral-100 bg-white h-10 cursor-pointer pl-5 pr-9 text-sm appearance-none max-w-[209px] overflow-hidden text-ellipsis whitespace-nowrap" name="options" id="option" data-nq-action="sort" data-nq-value="">
                                        <option value=""> Sort By </option>
                                        {sort.map((item:any, index:any) => {
                                            return (
                                                <option key={index} value={item.value}> {item.text} </option>
                                            )
                                        })}
                                    </select>
                                    <i className="absolute top-[10px] right-[14px] pointer-events-none fa-solid fa-chevron-down" aria-hidden="true"></i>
                                 </div>
                                 :null}
                            </div>             
                        </div>
    
                            <div className="block group-[.horizontal]:!items-center group-[.horizontal]:justify-between !items-end  pt-2 lg:!flex lg:flex-wrap lg:justify-end  lg:gap-4">
                                {filterType == "horizontal" ?
                                <div className={`${filterStatus == "open" ? "fixed top-0 right-0 left-0 h-[100vh] pb-[100px] overflow-scroll bg-white z-10 !block" : ""} hidden ${filterType == "horizontal" ? "lg:block" : ""}`}>
                                    <div className={`${filterStatus == "open" ? "flex w-full p-6 mb-4 border-b border-b-black" : "hidden"}`}>
                                        <p className="text-lg font-semibold"> Filters </p>
                                        <button onClick={() => updateFilterStatus()} className="ml-auto text-lg font-semibold"> <i className="fa-solid fa-x"></i> </button>
                                    </div>
                                    <Filters core={core} products={products} filterType={filterType}/>
                                    <div className="z-[1000] pb-[18px] fixed bg-white bottom-0 w-full flex justify-center md:w-[400px] lg:hidden">
                                        <a className="bg-black text-white flex justify-center items-center h-fit text-center text-[12px] p-4 min-w-[150px] font-semibold m-2 rounded-sm tracking-wide transition-all duration-500 hover:bg-slate-700 cursor-pointer" onClick={(e) => {core.Action("filter",e, "clearall", "", "list")}} > Clear Filters </a>
                                        <a className="bg-black text-white flex justify-center items-center h-fit text-center text-[12px] p-4 min-w-[150px] font-semibold m-2 rounded-sm tracking-wide transition-all duration-500 hover:bg-slate-700 cursor-pointer" onClick={() => updateFilterStatus()} > Apply </a>
                                    </div>
                                </div>
                                 
                            :
                                null
                            }
                                {filterType == "horizontal" ?   
                                    <div className="justify-self-end hidden lg:flex gap-2 relative h-fit w-fit">
                                        <select value={products.sort} onChange={(e)=>core.Action("sort",e)} className="border border-neutral-100 bg-white h-10 cursor-pointer pl-5 pr-9 text-sm appearance-none max-w-[209px] overflow-hidden text-ellipsis whitespace-nowrap" name="options" id="option" data-nq-action="sort" data-nq-value="">
                                            <option value=""> Sort By </option>
                                              {sort.map((item:any, index:any) => {
                                            return (
                                                <option key={index} value={item.value}> {item.text} </option>
                                            )
                                        })}
                                        </select>
                                        <i className="absolute top-[10px] right-[14px] pointer-events-none fa-solid fa-chevron-down" aria-hidden="true"></i>
                                        </div>
                                        :null}
                              
                            </div>
                     
                               <Listing core={core} products={products}/>
                        </div>
                    </div>
                ):(<div className="max-w-[1536px] mx-auto flex flex-col mb-8">
                <div className="flex flex-col justify-center items-center">
                    <p className="text-lg"> No products found </p>
                    <p className="text-lg pb-4"> Please View Our Other Products </p>
                    <NuqliumCall pagetype="feed" pagekey="nq-feed-no-search-results-bestsellers"/>  
                </div>
            </div>)}
        </div>
    
    )
}


export default search;