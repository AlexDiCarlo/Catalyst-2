
import NuqliumCall from "../core/call";
import Components from "../core/index.js";
import { Suspense } from "react";

function content(props: any) {
    let core = props.core;
    let content = props.content;


    let app: string = 'markups/' + content.identifier;
    let ThisApp = Components[app as keyof typeof Components];
    if (content.key) {

        if (content.key == "margin") {

            switch (content.value) {
                case "small":   return (
                    <div className="nq-margin-small"></div>
                ) 
                break;
                case "medium":   return (
                    <div className="nq-margin-medium"></div>
                )
                break;
                case "large":   return (    
                    <div className="nq-margin-large"></div>
                ) 
                break;
                case "xlarge":   return (
                    <div className="nq-margin-extra-large"></div>
                ) 
            }  
        } else {
           
            return (
                <NuqliumCall pagetype={content.key} pagekey={content.value} />
            )
        }
    } else {
        if (ThisApp != null) {
            return (
                <Suspense>
                    <ThisApp content={content} core={core} />
                </Suspense>

            )
        } else {
            return (
                <div className="p-6 bg-gray-100 my-1 flex items-center justify-center">
                    <div>Markup <strong>{content.identifier}</strong> component to be created</div>
                </div>
            )
        }
    }
}


export default content;