// The Nuqlium call is a component used to make a client side call (where required) and to choose the correct  the data to the appropriate component
import  NuqliumCall  from "./library/core/call";
import  {Configuration, Load}  from "./library/core/config";


// This is the main Nuqlium component
// This component is used to load the data from the server and pass it to the Director
const Nuqlium = async (props:any) => {
    let settings:any = {};
    let presets:any ={};

    // Gets the config from server - gets once includes meta data, dictionary data etc.
    let config:any = await Configuration();
    //console.log("config", config)
    // Loads the data from the server
    const nq = await Load(props, settings);

     //console.log(props)
     //console.log(nq)

    // Returns JSON if required
    if (props.output=="json") return nq;

    // If the track is set to 1, then call the tracking code but do not render the component
    if (props.track == "1"){
    }

    // Renders the component serve side and repopulates client side
    else{
      return (
        <div className="nuqlium-container"><NuqliumCall pagetype={props.pagetype} pagekey={props.pagekey} data={nq.data} settings={settings}  presets={presets} config={config}/></div>
      );
    }
  };

export { Nuqlium};

// Test Comment