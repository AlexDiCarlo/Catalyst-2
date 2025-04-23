

import Listing from '../partials/listing';
import Filters from "../partials/filters";
import { Suspense, useState, useEffect, useRef } from "react";
import { set } from 'zod';
import NuqliumCall from '~/components/nuqlium/library/core/call';
import Link from 'next/link';
import search from './search';


function category(props: any) {
    let core = props.core;
    let products = props.data.products;
    let category = props.data.category;
    let sort = products.sorting
    let count = 0;
    let filterType = "default"
    let headerImage = ""

    console.log(props)

    // This is used to check if the products object has the key "brand" in the aggregations array which will allow us to render the brands page
    let hasBrandsKey = products.aggregations?.some((obj: any) => Object.values(obj).includes("brand"));


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

    let dynamic = false;
    if (props.data.metadata?.dynamic == "true") {
        dynamic = true;
    }

    let pageType = ""
    if (props.data.metadata?.page_type != null) {
        pageType = props.data.metadata.page_type;
    }

    console.log(category)

    if (dynamic) {
        return (
            <>
                <div className="h-full relative w-full  mx-auto  pb-4  px-3 lg:pb-8 lg:px-0 " data-nqe-widget="nq-w-2" data-observed="true">
                    <div className="h-full flex w-full overflow-hidden  flex-col md:flex-row-reverse   lg:min-h-[500px]">
                        <div className="md:w-[50%] animate-" data-nq-animate="" data-nq-animate-delay="500">
                            <div className="relative h-full w-full overflow-hidden" data-nqe-element="background">
                                <div className="relative h-full block  ">
                                    <img src={`${category.image}`} className="w-full h-full max-h-[600px] object-cover" width="400" height="400" data-nqe-image-loaded="true" />
                                </div>
                            </div>
                        </div>
                        <div className="relative md:w-[50%] group-[.On-top]:absolute group-[.On-top]:h-full md:group-[.On-top]:relative md:group-[.On-top]:h-auto animate- " data-nq-animate="" data-nq-animate-delay="500">
                            <div className="flex items-center mb-4 absolute top-0 left-0 lg:top-[32px] lg:left-[32px] p-5 z-[1] lg:p-12">
                                <span className="mr-2"> <Link className="!text-gray-400 text-[10px] lg:text-sm" href="/?nq.params"> Home </Link> </span>
                                {category.breadcrumb.map((item: any, index: any) => {
                                    let itemName = item.name
                                    return (
                                        <span key={index} className="mx-2"> / <Link className="!text-gray-400 text-[10px] lg:text-sm " href="{{item.url}}?nq.params">  {itemName} </Link> </span>
                                    )
                                })}
                                <span className="mx-2 font-bold capitalize"> / <Link className="text-[10px] lg:text-sm" href="{{category.url}}?nq.params">  {category.name} </Link> </span>
                            </div>
                            <div className="relative flex flex-col justify-center px-0 lg:p-8 h-full min-h-[350px] text-left">
                                <div className="absolute w-full h-full left-0 bg-transparent "></div>
                                <div className="p-5 z-[1] lg:p-12" data-nqe-element="block" data-nqe-block-equalize="">
                                    <div className=" "></div>
                                    <div className="text-4xl md:text-5xl brand-font pt-3 lg:pt-0 ">{category.name}</div>
                                    <div className="py-3" dangerouslySetInnerHTML={{ __html: category.attributes.description[0] }}></div>
                                    <div className="py-3 gap-2 flex flex-wrap group-[.text-left]:justify-start group-[.text-center]:justify-center group-[.text-right]:justify-end text-center">
                                    </div>
                                    {category.children && category.children.length > 0 ?
                                        <div className="pb-3 md:pb-0 flex flex-wrap justify-start h-fit gap-2  ">
                                            {category.children.map((child: any, index: any) => {
                                                return (
                                                    <Link key={index} href={`${child.url}`} className=" px-3 py-1 border border-zinc-300 flex justify-center items-center w-[130px] h-[46px] rounded-[5px] group hover:bg-black">
                                                        <p className="group-hover:text-white"> {child.name} </p>
                                                    </Link>
                                                )
                                            })}
                                        </div>
                                        : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    {category.children && category.children.length > 0 ?
                        <div className="pb-3 md:pb-0 h-fit gap-2  ">
                            {category.children.map((child: any, index: any) => {
                                let OddEven = index % 2 == 0 ? "even" : "odd";
                                return (
                                    <div key={index} className={`mb-3 group ${OddEven} `}>
                                        <NuqliumCall pagetype="categoryfeed" pagekey={child.categoryid} content={false} />
                                    </div>
                                )
                            })}
                        </div>
                        : null}
                </div>
            </>
        )

    } else if (pageType == "brands" && hasBrandsKey == true) {
        let headerImage = category.image;
        if (headerImage == null || headerImage == "") {
            headerImage = "https://media.nuqlium.com/catalyst/searchbackgroundimage.png";
        }
        if (props.data.metadata?.header_image != null) {
            headerImage = props.data.metadata.header_image;
        }
        

        // Alphabets for the brand page

        let alphabetUppercase = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
        let brands = (products.aggregations?.find((obj: any) => obj.id === "brand").data);
        const [currentLetter, setCurrentLetter] = useState("All");
        const [searchResults, setSearchResults] = useState("");

        let updateSearchResults = (e: any) => {
            setSearchResults(e.target.value.trim())
        }

        const matchesSearchTerm = (key: string, searchTerm: string): boolean => {
            return key.toLowerCase().startsWith(searchTerm.toLowerCase());
        };

        return (


            // Header // 
            <div>
                <section className="relative bg-center bg-cover" style={{ backgroundImage: `url(${headerImage})` }}>
                    <div className=" overflow-visible">
                        <div className="flex flex-col items-center justify-center px-0 md:px-2.5 py-24 md:py-36 lg:py-44">
                            <div className="relative">
                                <label htmlFor="search-bar" className="relative  flex items-center justify-between w-full bg-white py-4 px-8 md:px-10 m-0 z-10">
                                    <input onKeyUp={(e) => updateSearchResults(e)} id="search-bar" type="text" name="search" placeholder="Search for a brand" autoComplete="off" className="outline-none border-0 m-0 p-0 h-auto font-base min-w-[225px] md:min-w-[290px] lg:min-w-[420px]" />
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17 17" className="w-6 h-6">
                                        <g fill="none" stroke="#000" strokeMiterlimit="10" strokeWidth="2" transform="translate(1 1.068)">
                                            <circle cx="7" cy="7" r="7" transform="translate(0 -.068)" strokeLinecap="round"></circle>
                                            <path d="m16 16-4.4-4.4"></path>
                                        </g>
                                    </svg>
                                </label>
                                {searchResults != "" ?
                                <>
                                    <div onClick={() => setSearchResults("")} className="fixed h-[200vh] top-[0] lg:bottom-[unset] opacity-[.7] z-[9] left-0 right-0 bg-black "></div>
                                    <div className="absolute bg-white w-full h-[400px] overflow-y-auto shadow-md px-10 z-10">
                                        {brands.filter((brand: any) => matchesSearchTerm(brand.key, searchResults))
                                            .map((brand: any) => (
                                                <div key={brand.key} className="flex items-center justify-start w-full border-gray-200">
                                                    <Link href={`/search/?term=${brand.displayname}`} className="text-base hover:underline">
                                                        {brand.key}
                                                    </Link>
                                                </div>
                                            ))}


                                    </div>
                                
                                </>
                                    : null
                                }
                            </div>
                        </div>
                    </div>
                </section>

                <div className={`max-w-[1536px] mx-auto px-4  group `}>


                    <div className="flex 2xl:justify-center py-4 overflow-x-auto justify-start scrollbar">
                        {alphabetUppercase.map((letter: any, index: any) => {
                            return (
                                <div onClick={() => setCurrentLetter(letter)} key={index} className={`group ${currentLetter == letter ? "selected" : ""}`}>
                                    <div className="hover:bg-black hover:text-white group-[.selected]:bg-black group-[.selected]:text-white flex items-center justify-center w-10 h-10 bg-white border border-gray-200 rounded-full mx-1 cursor-pointer">
                                        <p className={`text-sm group-[.selected]:font-bold font-semibold`}>{letter}</p>
                                    </div>
                                </div>
                            )
                        })}
                        <div onClick={() => setCurrentLetter("All")} className={`group ${currentLetter == "All" ? "selected" : ""}`}>
                            <div className=" flex items-center justify-center w-10 h-10 mx-1 cursor-pointer">
                                <p className={`text-sm group-[.selected]:font-bold group-[.selected]:underline font-semibold`}>ALL</p>
                            </div>
                        </div>
                    </div>

                    {currentLetter == "All" ?


                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-[1200px] mx-auto py-4 min-h-[600px]">
                            {alphabetUppercase.map((letter: string) => {
                                const filteredBrands = brands.filter((brand: any) => brand.key.charAt(0) === letter);
                                if (filteredBrands.length > 0) {
                                    return (
                                        <div key={letter}>
                                            <h2 className="text-lg font-bold">{letter}</h2>
                                            {filteredBrands.map((brand: any) => (
                                                <div key={brand.key} className="flex items-center justify-start w-full border-gray-200">
                                                    <Link href={`/search/?term=${brand.displayname}`} className="text-base hover:underline">
                                                        {brand.key}
                                                    </Link>
                                                </div>
                                            ))}
                                        </div>
                                    );
                                }
                                return null; // Don't render anything if no brands match the letter
                            })}


                        </div>

                        :
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-[1200px] mx-auto py-4 min-h-[600px]">

                            <div>
                                <div className="flex items-center justify-start w-full py-4">
                                    <p className="text-lg font-bold">{currentLetter}</p>
                                </div>
                                <div className="flex flex-col gap-1">
                                    {brands.map((brand: any, index: any) => {
                                        if (brand.key.charAt(0) == currentLetter) {
                                            return (
                                                <div key={index} className="flex items-center justify-start w-full border-gray-200">
                                                     <Link href={`/search/?term=${brand.displayname}`} className="text-base hover:underline">{brand.key}</Link>
                                                </div>
                                            )
                                        } else {
                                        }
                                    })}
                                </div>
                            </div>

                        </div>

                    }





                </div>
            </div>


        )


    } else {
        return (
            <div className={`group ${filterType} pt-8`}>
                <div className="hidden lg:block">
                    <div ref={opactiyLayer} onClick={openFilter} className={`absolute h-[10000vh] top-0 lg:bottom-[unset]  opacity-[.7] z-[9]  left-0 right-0 bg-black hidden `}></div>
                </div>
                <div className={`max-w-[1536px] mx-auto px-4 flex flex-col md:flex-row justify-between group `}>

                    <div className="flex flex-col">
                        <div className="text-sm">
                            <div className="flex items-center mb-4"><span className="mr-2"> <Link className="!text-gray-400 text-[10px] lg:text-sm" href="/"> Home </Link> </span>/ <span className="mx-2 font-bold capitalize"> <Link className="text-[10px] lg:text-sm" href="/black-friday-offers/"> black friday offers </Link> </span></div>
                        </div>
                        <div className="text-sm">
                            <div className="flex flex-col items-start justify-between lg:items-end lg:flex-row">
                                <div className="flex items-end lg:h-[36px]">
                                    <h1 className="text-xl lg:text-[28px] font-bold">{category.name}</h1>
                                    <p className="pb-[1px] text-[10px] lg:text-xs !mx-2">{products.total} items</p>
                                </div>
                            </div>
                        </div>
                        <div className="py-8 max-w-[1000px]">
                            {category.attributes.description != null && category.attributes.description.length > 0 ?
                                <p className="text-sm lg:text-base" dangerouslySetInnerHTML={{ __html: category.attributes.description[0] }}></p>
                                : null}
                        </div>
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
                                    <select value={products.sort} onChange={(e) => core.Action("sort", e)} className="bg-white h-[50px] w-full outline-none" name="options" id="option" data-nq-action="sort" data-nq-value="">
                                        <option value=""> Sort By </option>
                                        {sort.map((item: any, index: any) => {
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

                {products.total > 0 && products.products != null ? (
                    <div className="flex justify-center gap-4 max-w-[1536px] mx-auto px-4 lg:mt-4">

                        {filterType == "horizontal" ? null :
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
                                <Filters core={core} products={products} filterType={filterType} />
                                <div className="z-[1000] p-[18px] gap-2 fixed bg-white bottom-0 w-full flex justify-center md:w-[400px] lg:hidden group-[.slide]:lg:flex">
                                    <div className="bg-black text-white flex justify-center items-center h-fit text-center text-[12px] p-4 min-w-[150px] w-1/2 font-semibold  rounded-sm tracking-wide transition-all duration-500 hover:bg-slate-700 cursor-pointer" onClick={(e) => { core.Action("filter", e, "clearall", "", "list") }} > Clear Filters </div>
                                    <div className="bg-black text-white flex justify-center items-center h-fit text-center text-[12px] p-4 min-w-[150px] w-1/2 font-semibold  rounded-sm tracking-wide transition-all duration-500 hover:bg-slate-700 cursor-pointer" onClick={openFilter} > Apply </div>
                                </div>
                            </div>
                        }

                        <div className={`w-full ${filterType == "horizontal" || filterType == "slide" ? "lg:w-full" : "lg:w-4/5"}`}>
                            <div className="grid grid-cols-2">
                                <div>
                                    {products.selected && products.selected.length > 0 ?
                                        <div className={`flex items-center flex-wrap gap-2 ${filterType == "horizontal" ? "pb-8 lg:pb-0" : "pb-0"} text-sm  `}>
                                            <div data-nq-filter-clear data-nqc-event="filter.clearall" data-nqe-filter-type="{{nql_filters}}" className="flex items-center realtive rounded bg-black text-white text-[15px] px-4 py-2 cursor-pointer" onClick={(e) => { core.Action("filter", e, "clearall", "", "list") }}> Clear Filter </div>
                                            {products.selected.map((filter: any, index: any) => {
                                                if (filter.type == "slider") {
                                                    let defaultMin = 0
                                                    if (filter.range._filteredmin && filter.range._filteredmin != "") {
                                                        defaultMin = filter.range._filteredmin
                                                    }
                                                    return (
                                                        <div key={index} className="flex items-center realtive rounded bg-gray-100 [&>p]:text-[15px] px-4 py-2  nql-slider-container cursor-pointer" data-nq-action="{{filter.id}}" data-nq-filter-mimic="true" data-nq-key="{{filter.id}}" data-nq-value="" data-nqc-event="filter.clear" onClick={(e) => { core.Action("filter", e, filter.id, "clearall", "slider") }}>
                                                            <p nq-slider-text="{{filter.id | downcase}}">£{defaultMin}</p>
                                                            <p> - </p>
                                                            <p nq-slider-text="{{filter.id | downcase}}">£{filter.range._filteredmax}</p>
                                                            <p></p>
                                                            <i className="fa-solid fa-x text-xs ml-2"></i>
                                                        </div>
                                                    )
                                                } else {
                                                    return (
                                                        <div key={index} className="flex gap-2">
                                                            {filter.data.map((item: any, index: any) => {
                                                                return (
                                                                    <div key={index} className="nql-mimic-tagsx flex items-center capitalize realtive rounded bg-gray-100 text-[15px] px-4 py-2  cursor-pointer" onClick={(e) => { core.Action("filter", e, filter.id, item.key, "list") }} data-nqc-event="filter.clear">
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
                                                : null
                                            }

                                        </div>
                                    </div>
                                    {filterType != "horizontal" ?
                                        <div className="justify-self-end hidden lg:flex gap-2 relative h-fit w-fit">
                                            <select value={products.sort} onChange={(e) => core.Action("sort", e)} className="border border-neutral-100 bg-white h-10 cursor-pointer pl-5 pr-9 text-sm appearance-none max-w-[209px] overflow-hidden text-ellipsis whitespace-nowrap" name="options" id="option" data-nq-action="sort" data-nq-value="">
                                                <option value=""> Sort By </option>
                                                {sort.map((item: any, index: any) => {
                                                    return (
                                                        <option key={index} value={item.value}> {item.text} </option>
                                                    )
                                                })}
                                            </select>
                                            <i className="absolute top-[10px] right-[14px] pointer-events-none fa-solid fa-chevron-down" aria-hidden="true"></i>
                                        </div>
                                        : null}
                                </div>
                            </div>

                            <div className="block group-[.horizontal]:!items-center group-[.horizontal]:justify-between !items-end  pt-2 lg:!flex lg:flex-wrap lg:justify-end  lg:gap-4">
                                {filterType == "horizontal" ?
                                    <div className={`${filterStatus == "open" ? "fixed top-0 right-0 left-0 h-[100vh] pb-[100px] overflow-scroll bg-white z-10 !block" : ""} hidden ${filterType == "horizontal" ? "lg:block" : ""}`}>
                                        <div className={`${filterStatus == "open" ? "flex w-full p-6 mb-4 border-b border-b-black" : "hidden"}`}>
                                            <p className="text-lg font-semibold"> Filters </p>
                                            <button onClick={() => updateFilterStatus()} className="ml-auto text-lg font-semibold"> <i className="fa-solid fa-x"></i> </button>
                                        </div>
                                        <Filters core={core} products={products} filterType={filterType} />
                                        <div className="z-[1000] pb-[18px] fixed bg-white bottom-0 w-full flex justify-center md:w-[400px] lg:hidden">
                                            <div className="bg-black text-white flex justify-center items-center h-fit text-center text-[12px] p-4 min-w-[150px] font-semibold m-2 rounded-sm tracking-wide transition-all duration-500 hover:bg-slate-700 cursor-pointer" onClick={(e) => { core.Action("filter", e, "clearall", "", "list") }} > Clear Filters </div>
                                            <div className="bg-black text-white flex justify-center items-center h-fit text-center text-[12px] p-4 min-w-[150px] font-semibold m-2 rounded-sm tracking-wide transition-all duration-500 hover:bg-slate-700 cursor-pointer" onClick={() => updateFilterStatus()} > Apply </div>
                                        </div>
                                    </div>

                                    :
                                    null
                                }
                                {filterType == "horizontal" ?
                                    <div className="justify-self-end hidden lg:flex gap-2 relative h-fit w-fit">
                                        <select value={products.sort} onChange={(e) => core.Action("sort", e)} className="border border-neutral-100 bg-white h-10 cursor-pointer pl-5 pr-9 text-sm appearance-none max-w-[209px] overflow-hidden text-ellipsis whitespace-nowrap" name="options" id="option" data-nq-action="sort" data-nq-value="">
                                            <option value=""> Sort By </option>
                                            {sort.map((item: any) => {
                                                return (
                                                    <option key={item.id} value={item.value}> {item.text} </option>
                                                )
                                            })}
                                        </select>
                                        <i className="absolute top-[10px] right-[14px] pointer-events-none fa-solid fa-chevron-down" aria-hidden="true"></i>
                                    </div>
                                    : null}
                            </div>
                            <Listing core={core} products={products} />
                        </div>
                    </div>
                ) : (<div className="max-w-[1536px] mx-auto px-4 flex flex-col">
                    <div className="flex justify-center items-center h-[400px]">
                        <p className="text-lg"> No products found </p>
                    </div>
                </div>)}
            </div>
        )
    }
}


export default category;