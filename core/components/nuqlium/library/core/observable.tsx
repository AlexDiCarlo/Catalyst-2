import { useEffect, useState, useRef } from "react";
import  NuqliumCall  from "./call";

// This component will observe the intersection of the component with the viewport
// Once in view, will call the NuqliumCall component

function NuqliumObservable(props:any){
    let core = props.core
    let customTemplate = props.customTemplate
    let ref = useRef(null);
    const [isIntersecting, setIntersecting] = useState(false)

    //console.log(props)
    
//console.log("NuqliumObservable",props)

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry && entry.isIntersecting) {
                setIntersecting(entry.isIntersecting);
                observer.disconnect();
            }
        }, { threshold: 0.1 });

        if (ref.current) {  
            observer.observe(ref.current);
        }
    }, [isIntersecting]);

        return(
        <div ref={ref} className="lg:min-h-96 group-[.megamenu]:min-h-[unset]">
            { isIntersecting ?
                (<NuqliumCall pagetype={props.pagetype} pagekey={props.pagekey} core={core} customTemplate={customTemplate} />)
            :(null)}
        </div>
        )    
    }

  

export default NuqliumObservable;

