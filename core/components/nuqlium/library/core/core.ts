import { sign } from "crypto";
import { propagateServerField } from "next/dist/server/lib/render-server";
import { useEffect } from "react";

const  NQ_VERSION = process.env.NEXT_PUBLIC_NQ_VERSION??"4";
const  NQ3_CLIENT_ID = process.env.NEXT_PUBLIC_NQ3_CLIENT_ID??"";
const  NQ3_DATAINDEX = process.env.NEXT_PUBLIC_NQ3_DATAINDEX??"";
const  NQ_CLIENT_URL = process.env.NEXT_PUBLIC_NQ_CLIENT_URL??"";
const  NQ_CLIENT_INDEX = process.env.NEXT_PUBLIC_NQ_CLIENT_INDEX??"";
const  NQ3_CLIENT_URL = process.env.NEXT_PUBLIC_NQ3_CLIENT_URL??"";
const  NQ3_REACT_KEY = process.env.NEXT_PUBLIC_NQ3_REACT_KEY??"4";
const  NQ_SITE = process.env.NEXT_PUBLIC_NQ_SITE??"";

let config:any = null;
let userid:any = "";

    // Core class contains the various initial functions required to authorise the user and make a call
    // It also contains the functions to handle the data (such as filter / sort etc)
    class Core{

        _props: any = null;
        settings:any = null;
        presets:any = null;
        config:any = null;
        user:any = "";
        func:any;
        feo:number = Math.floor(Date.now()/1000);
        context:any = {};
        pageInstance:string  = "";
        breakpoint:any = null;

        // Initialises the class and sets various settings
        constructor(props:any, settings:any, configuration:any, func:any) 
        {

            this._props = this.Detach(props);
            this.config = this.Security(configuration, this._props); // Sets up the configuration object (note, this is saved as a global variable and updated)
            if (this.config?.properties?.feo != null) this.feo = this.config.properties.feo;
            this.presets = this._props.presets ?? {};
            this.settings = this.Detach(settings, this._props.settings);
            this.User();
            this.func = func;
            //console.log(this.feo, this.config?.properties?.feo )
            //console.log(this.config)
            this.pageInstance = crypto.randomUUID(); // Gives the page a unique ID - so when paging, we remain in the same variation

             let segments:string | null= null;
             try{
                segments = window.localStorage.getItem("nq.segments");
                if (segments != null){
                    this.context.segments = JSON.parse(segments);
                } 
            }
            catch(err){}

            this.breakpoint = this.BreakPoints();

        }

        Resize = (key:any) => {
            let self = this;
            if (typeof window !== "undefined" && key == "category") {
                window.addEventListener('resize', function(){
                    let previousColumns = self.settings.columns;
                    let current = self.BreakPoints();
                    //console.log(previousColumns, self.settings.columns)
                    if (previousColumns != self.settings.columns){
                        self.breakpoint = current;
                        self.settings.columns = current.defaultcolumns;
                        self.func(self.Detach(self.settings));
                    }

                });
                return false;
            }
            return true;
        }


        BreakPoints = () => {
            if (typeof window !== "undefined") {
                let breakPoints = this.config.properties.breakpoints
                let currentWidth = window.innerWidth;
                   if (breakPoints != null){
                       for (let key in breakPoints){
                           if (currentWidth >= breakPoints[key].minwidth && currentWidth <= breakPoints[key].maxwidth){
                            this.settings.columns = breakPoints[key].defaultcolumns;
                            return breakPoints[key]
                            this.settings.columns = breakPoints[key].defaultcolumns;
                            return breakPoints[key]
                           }
                       }
                   }  
            }
        }

        ProcessURL = (url:string) => {
            let urlParts = url.split("?");
            if (urlParts.length < 2) {
                return url; // No query parameters to strip
            }
            let baseUrl = urlParts[0];
            let queryParams = urlParts[1]?.split("&") || [];
            let filteredParams = queryParams.filter(param => !param.startsWith("nq.params"));
            if (filteredParams.length > 0) {
                return `${baseUrl}?${filteredParams.join("&")}`;
            } else {
                return baseUrl;
            }
           
        }
        



        Config = () => {
            return this.config;
        }
        Security(configuration:any,props:any){

            if (configuration == null) {
                configuration = props.config;
                //configuration.expiry = Math.floor(Date.now()/1000) -1 ; // Testing - invalid signature
            }

            // console.log(configuration.expiry, Math.floor(Date.now()/1000) , configuration.expiry < Math.floor(Date.now()/1000))

            if (configuration != null && configuration.expiry < Math.floor(Date.now()/1000)){//Math.floor(Date.now()/1000) ){
                // console.log("Refresh signature")
                let signatureJS = NQ_CLIENT_URL + NQ_CLIENT_INDEX + "/react.key?v=" + Math.floor(Date.now()/1000);//?id=" + NQ_CLIENT_INDEX;
                if (NQ_VERSION != "4") signatureJS = NQ3_REACT_KEY + NQ_CLIENT_INDEX +  "/react.key?v=" + Math.floor(Date.now()/1000);//?id=" + NQ_CLIENT_INDEX;
                
                fetch(signatureJS).then((res) =>{return res.text();}).then((result) => {
                    try{let o = JSON.parse(window.atob(result));
                        //console.log(o)
                         configuration.signature = this.Signatures(o.signatures);
                         configuration.expiry = o.expiry;
                         // We do not need to overwrite properties as these are now primarily server side only
                         //configuration.properties = o.properties; 
                    }
                    catch(err){ console.log(err)}
                },(error) => {console.log(error);})


            }
            return configuration;
        }
        

        // Clones the object
        Detach = (s:any, alt:any = {}) => {
            if (s != undefined){
                return JSON.parse(JSON.stringify(s));
            }
            else{
                return alt;
            }
        }

        // Gets the user from the cookie, if it doesn't exist, then create a new user
        GetUser = () => {
            if (userid !== "") return userid;
            try{
                let nameEQ = "nquser" + "=";
                if (typeof document !== "undefined") {
                    for (let  c of document.cookie.split(';')) {
                        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
                        if (c.indexOf(nameEQ) === 0) {
                            let  finalCookie = c.substring(nameEQ.length, c.length);
                            finalCookie = window.atob(finalCookie);
                            userid = finalCookie;
                            //console.log("USER",finalCookie)
                            return finalCookie;
                        }
                    }
                }
            }
            catch(err){}
            // Create a new user
            let user  = crypto.randomUUID();
            try{
                if (typeof document !== "undefined") {
                    document.cookie = "nquser=" + window.btoa(user) + ";expires=" + new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toString() + "; path=/;secure;SameSite=Strict";
                } 
            }
            catch(err){console.log(err)}
            userid = user;
            return user;
        }

        // Sets the user if it doesn't exist
        User = () => {
            if (this.user == "") this.user = this.GetUser();
        }

        // Creates the URL based on v3 or v4
        Url = (pagetype:string) => {

            let url = NQ_CLIENT_URL + NQ_CLIENT_INDEX + "/" + this.Directory(pagetype);
            if (NQ_VERSION!="4") url = NQ3_CLIENT_URL + NQ_CLIENT_INDEX + "/" + this.Directory(pagetype)
                return url;

        }

        // Creates the JSON object to be sent to the server
        Json = (type:string, key:string) => {

            let j:any = this.presets;
            j.pagetype = type;
            j.pagekey = key;
            j.output = "json";
            j.signature = this.Signature();
            j.tracking = {};
            j.settings = this.settings;
            j.settings.debug=true; // For debug / peformance mode - also turns off caching
            j.tracking.userid = this.user;
            j.tracking.pageinstance = this.pageInstance;
            j.settings.site = NQ_SITE;

            if (NQ_VERSION != "4"){ 
                j.dataindex = NQ3_DATAINDEX
                j.clientid = NQ3_CLIENT_ID;
            }

            if (this.settings.last == "group"){
                j.pagetype = "group";
                j.pagekey = this.settings.group.productid;
            }

            j.context = this.context;
            
            return j;

        }

        // Creates the params to be sent to the server
        Params = (obj:any) => {

            const params = new URLSearchParams();
            const recursiveEncode = (data:any, prefix:any) => {
            if (Array.isArray(data)) {
            data.forEach((value, index) => {
            recursiveEncode(value, `${prefix}[${index}]`);
            });
            } else if (typeof data === 'object') {
                Object.keys(data || {} ).forEach(function(key) {
                recursiveEncode(data[key], prefix ? `${prefix}[${key}]` : key);
                });
            } else {
            (data != undefined && data != null) ?  params.append(prefix, data) :  params.append(prefix, `&`);
            }
            };
            recursiveEncode(obj, '');
            return params.toString();

        }

        Signatures = (signatures:any) => {
            let signature = "";
            for (var i = 1; i < signatures.length; i++) {
                signature += signatures[i].split("-")[i - 1];
                if (i < signatures.length - 1) signature += "-";
            }
            return signature;
        }


        // This is the code required to create the signature
        Signature =  () => {

            // Bring back for 30 min timeout, get the client version

            let signatureJ:any = {};
            // let signatureAttempt = "";
            // for (var i = 1; i < this.signatures.length; i++) {
            //     signatureAttempt += this.signatures[i].split("-")[i - 1];
            //     if (i < this.signatures.length - 1) signatureAttempt += "-";
            // }
            // signatureJ.s = signatureAttempt;
            //console.log(this.config.signature)
            
            signatureJ.s = this.config.signature;
            try{
            signatureJ.a = navigator.userAgent;
            }
            catch(err){}
            signatureJ.u = this.user;
            var d1 = new Date();
            signatureJ.d = d1.toUTCString();
            var f1 = JSON.stringify(signatureJ);
            return window.btoa(f1);
        
        }

        // Maps directories based on the pagetype
        Directory = (type:any) => {

            switch(type){
                case "category":
                    return "listings";
                case "categoryfeed":
                    return "category";    
                case "feed":
                    return "feeds";
                case "zone":
                    return "zones";
                case "predictive":
                    return "search";
                case "block":
                    return "blocks";
                default:
                    return type;
            }

        }

        // Decides what to do with the data (normal, paging, infinite, swatch click)
        ProcessData= (data:any, result:any, json:any) => {
            let obj = result.data;

            // Social proof - only assign if messages are returned and products exist
            if (result.messages != null && result.messages.length > 0 && obj.products?.products != null && obj.products?.products.length > 0){
                // Create a JSON object with product code as key
                let nMessages:any = {}
                for (let message of result.messages){
                    nMessages[message.product] = message;
                }
                // Loop products and assign messages
                for (let p of obj.products.products){
                    p.messages = nMessages[p.id];
                }

            }

            this.setFeo(json,obj,this.feo);

            let returnObject:any = {};

            // Check for with last action was group "swatch click"
            if (this.settings.last == "group"){
                // Create new data object using the existing data
                let newData  = JSON.parse(JSON.stringify(data)) ; // Create core.Clone();
                // Loop through products and check the position of each product 
                for (let p of newData.products.products){
                    // If the position matches the group position, then assign the product
                    if (p.position == this.settings.group.position){
                        p.product = obj.products.products[0].product;

                    }
                }
            
                returnObject = newData;

            }
            else if (this.settings.last == "page" && this.config.properties.paging != "paging"){
                let newData  = JSON.parse(JSON.stringify(data)) ; // Create core.Clone();
                newData.products.properties = obj.products.properties;
                newData.products.products = newData.products.products.concat(obj.products.products);    
                returnObject = newData;
                        }
            else{returnObject = obj;}
            
            if (result.actions != null) returnObject.actions = result.actions;

            this.settings.last = null;




            return returnObject;
        }

        // Function to handle the exit of the page
        Exit = () => {
            console.log("Exit")
        }
 
        // Function to handle the entry of the page
        IntersectionObserver = (entry:any, inView:any, type:string = "content") => {
            useEffect(() => {
                if (entry !== undefined) {
                    let target = entry.target as HTMLElement;
                    if (entry.target.hasAttribute("data-nqe-widget") && type === "content") {
                        let animation = target.querySelectorAll("[data-nq-animate]");
                        if (animation !== null && animation.length > 0) { 
                            for (let i = 0; i < animation.length; i++) {
                                let animationStyle = animation[i]?.getAttribute("data-nq-animate");
                                if (animation[i] && inView) {
                                    animation[i]?.classList.add(`animate-${animationStyle}`);
                                    //entry.unobserve(entry.target);
                                } else {
                                    //animation[i]?.classList.remove(`animate-${animationStyle}`);
                                }  
                            } 
                        } 
                    }

             }
        }, [inView])
        }

        // Swatch function to handle the swatch click
        Swatch = (productid:any,position:any) => {

            // Set the last action to group 
           this.settings.last = "group";
           // Build a group object with the productid and position this will be used to update the current product card with the new swatch product
           this.settings.group = {}
           this.settings.group.productid = productid;
           this.settings.group.position = position;
           // Update with new date 
           let date = new Date();
           this.func(this.settings);

        }
            
        // Filter / sort / page etc
        Action = async  (option:string,e:any,key:string,value:string,type:string, min:number, max:number) => {

            switch(option){
                case "sort":
                    this.settings.sort = e.target.value;
                    break;
                case "page":
                    this.settings.page = value;
                    break;
                case "filter":
                    this.settings.page  = 1;
                    if (key == "clearall") {
                    this.settings.filters = {};
                    } 
                    if (type == "list") {
                        if (this.settings.filters === undefined) this.settings.filters = {};
                            if (key == "clearall") {
                                this.settings.filters = {};
                            } else {
                                if (this.settings.filters[key] === undefined) this.settings.filters[key] = [];
                                if (this.settings.filters[key].includes(value)){
                                    this.settings.filters[key].splice(this.settings.filters[key].indexOf(value),1);
                                    e.target.classList.remove("selected");
                                }
                                else{
                                    this.settings.filters[key].push(value);
                                    e.target.classList.add("selected");
                                }
                            }
                        break;
                    } else if (type == "slider") {
                        if (this.settings.filters === undefined) this.settings.filters = {};
                            if (this.settings.filters[key] === undefined) this.settings.filters[key] = [];

                            if (this.settings.filters[key].length > 0){
                                this.settings.filters[key] = [] 
                                this.settings.filters[key].push(`${min}-${max}`);                                 
                            }
                            else{

                                if (min != undefined && max != undefined) {
                                    this.settings.filters[key].push(`${min}-${max}`);
                                }
                            }
                    }
            }

            let queries: string[] = [];

            if (this._props.pagetype == "search") {
                queries.push("term=" + this._props.pagekey);
    
            }

            for (let key in this.settings){
                switch(key){
                    case "sort":
                        queries.push("sort=" + this.settings[key]);
                        break;
                    case "filters":
                        for (let filter in this.settings[key]){
                            for (let item in this.settings[key][filter]){
                            queries.push(filter + "=" + this.settings[key][filter][item]);
                        }
                        }
                        break;
                }
            }
            let string = "?" + queries.join("&");
            window.history.pushState({}, "", string);
            this.settings.collection = string;
            this.settings.last = option;  
            this.func(this.Detach(this.settings));

        
        }

        setFeo = (json:any,data:any, feo:number)=>{

            let saveable = JSON.parse(JSON.stringify(json));
            delete saveable["signature"];
            delete saveable["tracking"];

            switch(json.pagetype){
                case "zone":
                    if (data.zone.feo == true){
                        let obj = {key:JSON.stringify(saveable),time:feo,data:data};
                        window.localStorage.setItem("nq.feo." + json.pagetype + "." + json.pagekey,JSON.stringify(obj));
                    }
                    break;
            }

        }

        Feo = (json:any, feo:number)=>{

            // We need to remove the signature and tracking from the object
            // This create a unique FEO key that we can use to check against
            // For example, if the site mode changes or any other factor, it will refresh
            let saveable = JSON.parse(JSON.stringify(json));
            delete saveable["signature"];
            delete saveable["tracking"];

            // Get object from FEO
            let local:string | null = window.localStorage.getItem("nq.feo." + json.pagetype + "." + json.pagekey);
            //console.log(local)
            if (local != null){
                let obj = JSON.parse(local);
                if (obj.key == JSON.stringify(saveable) && obj.time > feo){
                    return obj.data;
                }
            }

            return null;
        }


        






    } 

    export default Core;