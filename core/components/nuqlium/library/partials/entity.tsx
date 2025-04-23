import { Link } from '~/components/link';


function Entity(props:any){
    let item = props.item;
    let id = item.entity.attributes._entityid;
    let image = "https://media.nuqlium.com/demo/blogdefault.png";
    if (item.entity.image != "") image = `https://nuqlium.mybigcommerce.com${item.entity.image}`;
    return(
        <div className="flex flex-col bg-white rounded-lg border border-[#ededed] overflow-hidden mb-2 h-full">
        <div className="">
        <Link  href={`/blog/${id}`} className="w-full">
            <img className="h-96 group-[.megamenu]:h-[200px]  w-full object-cover" src={image} alt={`${item.entity.name}`}/>
        </Link>
        </div>
        <div className="flex-1 bg-white p-6 flex flex-col justify-between">
        <div className="flex-1">
            <Link href={`/blog/${id}`} className="block mt-2">
                <p className="text-xl group-[.megamenu]:text-sm font-semibold text-gray-900 line-clamp-1">
                    {item.entity.name}
                </p>
                <p className="mt-3 text-base group-[.megamenu]:text-sm text-gray-500 line-clamp-3	">
                    {item.entity.attributes.auto_summary[0]}
                </p>
            </Link>
        </div>
        <div className="mt-6 flex group-[.megamenu]:flex-col group-[.megamenu]:items-start items-center">
            <div className="">
                <div className="flex space-x-1 text-sm text-gray-500">
                    <div className="flex flex-wrap items-center my-2">
                        {/* <div className="text-xs mr-2">Author: {item.entity.attributes.author[0]} &nbsp; |</div> */}
                        <div className="text-xs mr-2">Date: {item.entity.dateintroduced}</div>
                        <div className="flex flex-wrap">
                            {/* {% for tag in item.entity.attributes.tags %}
                            {/* <span className="text-xs px-2 py-1 mr-1 my-1 rounded-sm bg-gray-200">{ tag | remove:'"'}</span> */}
                            {/* {% endfor %} */}
                        </div>
                    </div>
                </div>
            </div>
            <div className="ml-auto flex items-center group-[.megamenu]:justify-start group-[.megamenu]:ml-[unset]">
                <a href="{{item.entity.url}}" className="px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-black hover:bg-[#DADAE2] focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
                    Read More
                </a>
            </div>
        </div>
        </div>
        </div>
    )
}


export default Entity;