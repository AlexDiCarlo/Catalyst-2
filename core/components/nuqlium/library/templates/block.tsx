
import  Entity  from '../partials/entity';
import  Content  from "../partials/content";
import { GlideSlide, GlideContainer } from '../markups/glide';

function Block(props:any){
    let core = props.core;
    let entities = props.data.entities
    let metadata = props.data.metadata
    let count = 0;
    let uniqueId = Math.random().toString(36).substr(2, 9);
    let id = `${props.data.key}`;//${uniqueId}`
    let customTemplate = props.data.template;

    return (
        <div className="max-w-[1536px] mx-auto px-1 md:px-2 min-[1537px]:px-0">

        <div className="mx-auto nql-fade-in-fast">
        <div className="flex items-center justify-between">
            <p className=" hover:text-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/20 cursor-pointer group-[.mobile]:text-[20px] group-[.mobile]:pb-4 font-bold text-base md:text-[24px]" dangerouslySetInnerHTML={{__html:metadata.title}}></p>
        </div>
        <div className="pt-4">
        <GlideContainer products={entities} core={core} type={"feed"} customTemplate={customTemplate} id={id}>
        {entities.total > 0 && entities.items != null?
                entities.items.map((item: any) => {
                    count++;
                    if (item.entity != null){
                        return (
                            <GlideSlide key={count} customTemplate={customTemplate}>
                                        <Entity item={item}/>
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
        </div>
    </div>

    )
}
export default Block;