// This are constants from the env.local (or VERCEL)
const  NQ_SERVER_URL = process.env.NQ_SERVER_URL??"";
const  NQ_SERVER_SECRET = process.env.NQ_SERVER_SECRET??"";
const  NQ_CLIENT_INDEX = process.env.NEXT_PUBLIC_NQ_CLIENT_INDEX??"";

const  NQ_VERSION = process.env.NEXT_PUBLIC_NQ_VERSION??"4";
const  NQ_SITE = process.env.NEXT_PUBLIC_NQ_SITE??"";
const  NQ3_CLIENT_ID = process.env.NEXT_PUBLIC_NQ3_CLIENT_ID??"";
const  NQ3_DATAINDEX = process.env.NEXT_PUBLIC_NQ3_DATAINDEX??"";
const  NQ3_SERVER_URL = process.env.NQ3_SERVER_URL??"";
const  NQ3_REACT_KEY = process.env.NEXT_PUBLIC_NQ3_REACT_KEY??"4";

let config:any = null;

// Configuration is a function that calls the server to get the configuration data
async function Configuration(){

    if (config == null || config.expiry < Math.floor(Date.now()/1000) ){
        let url =  NQ3_REACT_KEY + NQ_CLIENT_INDEX +  "/react.key?s=true&v=" + Math.floor(Date.now()/1000);
        console.log(url)
        console.log("Testing React Key")
        const res = await fetch(url, { next: { revalidate: 1 }, headers:{"User-Agent":"Vercel-Next-React-Nuqlium","Nuqlium-Key":NQ_SERVER_SECRET}});
        //console.log(await res.text())
        config =  await res.json();
        console.log("Server Call For React Key")
      }
      else{
        console.log("Cached React Key (No Call To Server)")  
      }
      return config;

}

// loadNuqlium is the main function, which calls the server to get the initial data
// This funciton also reads the params from the URL and sets the settings JSON object which is passed to the server
async function Load(props:any, settings:any, j:any = {}){ 
    let queries:any= [];
    let params = props.params;
      if (params !== undefined){  
        for (let key in params){
            switch(key){
                case "slug":
                case "locale":
                    // Do nothing
                    break;
                case "sort":
                case "page":
                    settings[key] = params[key];
                    queries.push(key + "=" + settings[key]);
  
                    break;
                default:
                  if (settings.filters === undefined) settings.filters = {};
                  if (Array.isArray(params[key])){
                    for (let item of params[key]){
                      queries.push(key + "=" + item);
                    }
                    settings.filters[key] = params[key];
                  }
                  else{
                    queries.push(key + "=" + params[key]);
                    settings.filters[key] = [ params[key] ];
                  }
                    //if (!settings.hasOwnProperty(key)) settings[key] = [];
                    //settings.push(params[key]);
                    break;
            }
  
        }
      }
    settings.collection = "?" + queries.join("&");
    settings.columns = 4;
    settings.instance = 100;
    if (props.main == true) settings.instance = 1;
    settings.site = NQ_SITE;
    j.pagetype = props.pagetype;
    j.pagekey = props.pagekey;
    j.output = "json";
    j.signatures = true;
    j.settings = settings;
  
    let url = NQ_SERVER_URL + NQ_CLIENT_INDEX + "/server/";
    if (NQ_VERSION != "4"){
      j.clientid = NQ3_CLIENT_ID;
      j.dataindex = NQ3_DATAINDEX;
      url = NQ3_SERVER_URL + "server/";
    }
  
    //console.log(url);
    //console.log(j);
  
    const res = await fetch(url, { next: { revalidate: 3600 }, method:"post", headers:{"Content-Type":"application/json","User-Agent":"Vercel-Next-React-Nuqlium","Nuqlium-Key":NQ_SERVER_SECRET}, body:JSON.stringify(j)});
    return res.json();
  
  }

export { Configuration, Load};

