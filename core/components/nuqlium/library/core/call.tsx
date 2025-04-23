// The main Nuqlium component was run at server to pull data from the server so that the data can be embellished for SEO purposes.
// The director is a client side component that renders at server, but can also be rendered at client side.
"use client";

// A list of valid components, used for lazy loading
import  Components  from "./index.js";
import  Core  from "../core/core";
import {Suspense, useEffect, useState}  from "react";
import Badge from "../partials/badge";
import SocialProof from "../partials/social-proof";

// To allow for content to be displayed around the main output, we pull in this component
import  Content  from "../partials/content";
import Actions from "./actions";

 let config:any = null;
 let resize:boolean = true;

function NuqliumCall(this: any, props:any){

    const [settings, setSettings] = useState(props.settings);
    const [data, setData] = useState(props.data);

    // Initiate the core class (with functions and settings)
    let core = new Core(props, settings, config,(trigger:any)=>{setSettings(trigger)});
    config = core.Config(); // Sets the global client side variable to the config within core (this is reset whenever it expires)

    // This is the main useEffect function, which is called when the query  / pagekey changes
    useEffect(() => {
    //   console.log("NuqliumCall - UseEffect",props.pagetype)
        if (resize) { resize = core.Resize(props.pagetype);        }

        // Creates the JSON object with relevant settings
        let json = core.Json(props.pagetype,props.pagekey)
        //console.log("NuqliumCall - UseEffect",json)

        // creates the URL
        let url = core.Url(props.pagetype);
        let cached = core.Feo(json,core.feo)
        if (cached != null){
            setData(cached);
        }
        else{

            console.log(props.pagetype)

            if (props.pagetype != "margin" ) {
                 fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },body: core.Params(json)}).then((res) =>{return res.json()}).then((result) => { setData(core.ProcessData(data,result,json));},(error) => {console.log(error); })
            }


    }
    },[settings,props.pagekey])

    // Renders the component
    if (data != null && data != undefined && props.track != "1"){

        // Temp solution check if Nuqlium call has a custom template//
        if (props.customTemplate != undefined || props.customTemplate != null ) data.template = props.customTemplate;

        // Count is used to create a new key
        let count = 0;

            // We look for the component to load based on pagetype [feed, category, etc]
            let ThisApp = Components[props.pagetype as keyof typeof Components];
            // Check if data has a main section, loop content + main section otherwise load the main section
            let main = false;
            let content = true;
            if (props.content === false) content = false;
            if (data?.content?.content != null){
                for(var item of data.content.content){
                    if (item.key === "main" && content == true) main = true;
                }
            }

            // Return the component (if main exists then loop through the content and show main where apprioriate)
            // Otherwise show the main component
            
            return(
                main?(
                    data.content.content.map((content:any) =>{
                        count++;
                        if (content.key === "main"){
                            return(
                                <Suspense key={count} >
                                    <ThisApp data={data} core={core}/>
                                    <Actions data={data}  core={core}/>
                                </Suspense>
                                )
                            }
                        else{
                            // Returns the content component (which sub-component is decided within the content object)
                            return(
                                <Content key={count} content={content} core={core}/>
                                )  
                            }
                        }
                    )
                ):(
                <Suspense>
                    <ThisApp data={data}  core={core}/>
                    {props.pagetype == "pages" || props.pagetype == "category" ? <Actions data={data} core={core} pageType={props.pagetype} /> : null}
                   
                </Suspense>)
            )


    } else if (props.pagetype == "product" && props.track == "1")  {

     }     
}



export default NuqliumCall;

