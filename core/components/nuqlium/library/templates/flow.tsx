import  Content  from '../partials/content';
import Entity from '../partials/entity';
import { useState, useEffect, useRef } from 'react';

function Flows(props:any) {
  let core = props.core;
  let entities = props.data.entities;
  let count = 0;
  let metadata = props.data.metadata;

  return (
    <div className="max-w-screen-2xl m-auto p-4">
    <div className="flex items-center justify-between">
    <h2 className="text-lg font-bold my-2"> {metadata.title} </h2>
    {metadata.redirect && metadata.redirect == "true" ? 
        <a className="font-bold text-red-600" href="{{metadata.url}}"> View All </a>
      : null}
    </div>

      <div className=" grid grid-cols-2 lg:grid-cols-3 gap-4 lg:my-4">
           {entities.items.map((item:any) => {
              if (item.entity != null){
                  count++;
                  return(
                      <div key={count}>
                          <Entity item={item} core={core}/>
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
                                  gridClass = "col-span-4 row-span-1 opacity-0 fade-in-fast"; 
                                  break;
                             default: 
                  }


                  return(
                      <div className={gridClass} key={count}><Content content={item.content} core={core}/></div>
                  )
              }
          })}
         {/* <Paging core={core} entities={entities}/> */}
      </div>
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

export default Flows;