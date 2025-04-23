import { useEffect, useState, useRef } from "react";
import  NuqliumCall  from "./call";

// This component will observe the intersection of the component with the viewport
// Once in view, will call the NuqliumCall component
let actionsRun:boolean = false;
function Actions(props:any){

    let pageType = props.pageType;
    // console.log(props)

    // Only run actions once
    const [runActionsOnce, setRunActions] = useState(false);
    useEffect(() => {   
            if (props.data.actions != null && actionsRun == false){    
                setRunActions(true);       
                    actionsRun = true;     
                    }  
    let pageType = props.pageType;
}, []); // Runs once on mount (client-side only)

    let nqCheckIfPopupObject = (storageString:string) => {
        let storage = JSON.parse(storageString);
        // If storage.complete = true then we don't need to run the popup as it's already been shown
        if (storage.complete == false) {
            // if (storage.segments != nq.nqLastSegments || storage.experiences != nq.nqLastExperiences) {
            if (storage) {
                return true;
            }
        }
        return false;
    }



    let nqCheckPermissionsForLocalStorage = () => {
		var test = 'test';
		try {
			window.localStorage.setItem(test, test);
			window.localStorage.removeItem(test);
			return true;
		} catch (e) {
			return false;
		}
	}


    let nqCheckIfPopup = (action:any) => {
        let popupAllowed = false;
        if (nqCheckPermissionsForLocalStorage()){
            let local = window.localStorage.getItem("nq.popup." + action.value);
            let session = window.sessionStorage.getItem("nq.popup." + action.value);
            let date = new Date();


            switch (action.rule) {
                case "onceperhour":
                case "oncepeday":
                    if (local == null) {
                        popupAllowed = true
                    }
                    else if (nqCheckIfPopupObject(local)) {
                        popupAllowed = true
                    }
                    else {
                        const saved = new Date(JSON.parse(local).date);
                        if (Math.floor(Math.abs(date.getTime() - saved.getTime()) / (1000 * 60 * 60)) >= (action.rule == "onceperday" ? 24 : 1)) popupAllowed = true
                    }
                    break
                case "oncepersession":
                    if (session == null || nqCheckIfPopupObject(session)) popupAllowed = true
                    break;
                case "always":
                    popupAllowed = true
                    break;
                default: //once
                    if (local == null || nqCheckIfPopupObject(local)) popupAllowed = true
                    break;

            }

            return popupAllowed

        }

    }



    let nqRunActionPopup = (action:any) => {
        let json: { date: string; segments: any; experiences: any; complete: boolean } = { date: "", segments: null, experiences: null, complete: false };
        json.date = Date();
        // json.segments = nq.nqLastSegments;
        // json.experiences = nq.nqLastExperiences;
        json.complete = false;
        if (action.rule == "oncepersession") {
            window.sessionStorage.setItem("nq.popup." + action.value, JSON.stringify(json));
        }
        else {
            window.localStorage.setItem("nq.popup." + action.value, JSON.stringify(json));
        }

        return true;
    }

    if (!runActionsOnce) return null;

    // If actions run once then run actions
    if (runActionsOnce){
    // Loops    actions
    // Test various scenarios for run once / session / local etc.

    // Call the component we want based on the action
        return (
            props.data.actions.map((action:any, index:any) => { 

                    // console.log(action)

                    nqRunActionPopup(action);




                    if (action.key == "popup" && nqCheckIfPopup(action)) {


                       switch(action.action) {

                        case "time":
                            // nq.nqSettings.popupTime = JSON.parse(JSON.stringify(action));
                            // setTimeout(function () { self.nqRunActionPopup(nq.nqSettings.popupTime); nq.nqSettings.popupTime = null }, (action.delay ?? 10) * 1000)
                            break;


                        case "idle" :









                            // return(
                            //     <div className="" key={index}>
                            //         <NuqliumCall pagetype={"popups"} pagekey={action.value} />
                            //     </div>
                            // )

                        break;
                        default: 

                        if (nqRunActionPopup(action)) {
                            return(
                                <div className="" key={index}>
                                    <NuqliumCall pagetype={"popups"} pagekey={action.value} />
                                </div>
                            )
                         }
                       }         
                    }

            })
        )
    }
}
export default Actions;



