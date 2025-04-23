import Components from '../core';
import { Suspense } from "react";
import { useRef } from "react";

function Popups(props: any) {
  console.log(props);
  const content = props.data?.content?.content?.[0];
  const action = props.data?.actions?.[0];

  if (!content) {
    // If content[0] is undefined, don't render the component
    return null;
  }

  const app: string = 'markups/' + content.identifier;
  const ThisApp = Components[app as keyof typeof Components];

  const nqSetPopupsCompletion = (action: any) => {
    if (action?.rule === "oncepersession") {
      let st = window.sessionStorage.getItem("nq.popup." + action?.value);
      if (st != null) {
        let s = JSON.parse(st);
        s.complete = true;
        window.sessionStorage.setItem("nq.popup." + action?.value, JSON.stringify(s));
      }
    } else if (action?.value) {
      let st = window.localStorage.getItem("nq.popup." + action.value);
      if (st != null) {
        let s = JSON.parse(st);
        s.complete = true;
        window.localStorage.setItem("nq.popup." + action.value, JSON.stringify(s));
      }
    }
  };

  nqSetPopupsCompletion(action);

  return (
    <div className="nql-fade-in-fast" data-nq-popup-area>
      <div className="nqw-popup-overlay z-[10] fixed w-full h-full top-0 bottom-0 right-0 left-0 inset-0 bg-gray-500 bg-opacity-75 transition-opacity" data-popup-opacity></div>
      <div>
        <div className="nqw-popup fixed inset-0 z-10 w-screen overflow-y-auto rounded">
          {ThisApp && <ThisApp content={content} core={props.core} />}
        </div>
      </div>
    </div>
  );
}

export default Popups;