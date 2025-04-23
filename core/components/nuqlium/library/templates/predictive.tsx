
import  Content  from '../partials/content';
import { forwardRef, Suspense } from "react";
import  Product  from '../partials/product';
import NuqliumObservable from "../core/observable";
import { Link } from '~/components/link';

function predictive(props:any){
    let core = props.core;
    let content = props.data.content;
    let unique = 0;
    let count = 0;
    let term = props.data.key;

    let topTenCategories = 0;
    let topTenEntities = 0;

    let columnsOneStyle = ""
    let columnsTwoStyle = ""
    let psContainerStyle = ""

    if (props.data?.categories && props.data?.categories.total || props.data?.entities && props.data?.entities.total) {
      psContainerStyle = "flex flex-col lg:flex-row gap-8";
      columnsOneStyle = "lg:w-1/4";
      columnsTwoStyle = "lg:w-3/4";
    }


    return(
      <div className="pb-60 max-w-[1400px] mx-auto ">    
    
      {props.data?.search && props.data?.search?.searchoption && props.data?.search?.searchoption == 1 ?
        <div className="max-w-full w-[1400px] mx-auto pb-[60px] lg:pb-0">
          <div className="flex flex-col justify-center gap-4 p-4  lg:flex-row border-[2px] m-4 border-[#e7e7e7]">
            <div className={`${props.data?.search.searchimage && props.data?.search.searchimage != "" ? "lg:w-1/2" : "hidden" }`}>
              <img src={`${props.data?.search.searchimage}`} alt="{{search.searchtitle}}"/>
            </div>
            <div className={`flex flex-col justify-center gap-[21px] ${props.data?.search.searchimage && props.data?.search.searchimage != "" ? "lg:w-1/2" : "w-full" }`}>
               <h2 className="font-semibold text-lg"> {props.data?.search.searchtitle} </h2>
               <p className="" dangerouslySetInnerHTML={{__html:props.data?.search.searchdescription}}></p>
               <a className="!underline" href={`${props.data?.search.redirecturl}`}> {props.data?.search.searchlinktext} </a> 
            </div>
          </div>
        </div>
        :

        <div>


        <div>  
          <div className="text-center">You searched for "{props.data.key}" and we found {props.data?.results} results</div>
          <div className={`${psContainerStyle} px-2`}>
          <div className={`${columnsOneStyle}`}>  
              {props.data?.categories && props.data?.categories.total  > 0 ?
                <div className="mt-4">
                  <h4 className="font-bold mb-2"> Categories {`(${props.data?.categories.total})`} </h4>
                    {props.data?.categories.categories.map((category:any) => {
                      topTenCategories++;
                      if (topTenCategories > 10) {} else {
                        let categoryurl = category.url.replace("https://seven2018test.parasparstaging.com/","/");
                        return (
                          <p className="pb-3" key={topTenCategories + category.name}>
                            <a className="text-[14px]" href={`${categoryurl}`}>{category.name}</a>
                          </p>
                        )
                      }
                })}
					  </div>
          :
          null
          }
           {props.data?.entities && props.data?.entities.total  > 0 ?
            <div className="mt-4">
						  <h4 className="font-bold mb-2"> Blogs {`(${props.data?.entities.total})`} </h4>
                {props.data?.entities.entities.map((entity:any) => {
                  topTenEntities++;
                  if (topTenEntities > 10) {} else {
                    let entintyurl = entity.url.replace("https://seven2018test.parasparstaging.com/","/");
                    return (
                      <p className="pb-3" key={topTenEntities + entity.name}>
                        <a className="text-[14px]" href={`${entintyurl}`}>{entity.name}</a>
                      </p>
                    )
                  }
                })}
					  </div>
          :
          null
          }
        </div>

          {props.data?.products?.properties?.grandtotal > 0 ? 
            <div className={`${columnsTwoStyle}`}>
              <div className="flex lg:justify-end mt-4  lg:px-4">
              <Link href={`/search/?term=${term}`} className="text-center"> View More Products </Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-4 gap-2 opacity-0 fade-in-fast ">
                {props.data?.products?.products.map((product:any) => {
                  count++;
                  let item = product;
                  if (count <= 8) {
                    return (
                      <div key={count}> <Product item={item} core={core}/></div>
                    )
                  }
                })
              }
              </div>
              </div>
              :<div className="text-center my-2">
              <p> Sorry No Results Found Checkout our Bestsellers</p>
              <div className="py-4">
                  <NuqliumObservable pagetype="feed" pagekey="nq-feed-bestsellers-default" trigger="1"></NuqliumObservable>
              </div>
            </div>
          }
          </div>
          </div>  
        </div>
      }
      </div>
    )

    
}


export default predictive;