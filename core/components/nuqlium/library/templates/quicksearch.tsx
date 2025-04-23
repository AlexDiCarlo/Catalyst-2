"use client"

import React, { useState, useRef, forwardRef, useImperativeHandle } from "react";
import NuqliumObservable from "../core/observable";
import NuqliumCall from "../core/call";
import  Link from "next/link"; 

const NuqliumQuickSearch = forwardRef((props: any, ref) => {
  const [term, setTerm] = useState(props.term);

  // Define the input ref which will be passed to the parent
  const inputRef = useRef<HTMLInputElement | null>(null);
  const enterRef = useRef<HTMLAnchorElement | null>(null);

  // This is used to focus the input when the search is opened
  // UseImperativeHandle is used to expose the focusInput method to the parent
  useImperativeHandle(ref, () => ({
    focusInput: () => {
      inputRef.current?.focus();
    },
  }));

  const predictiveSearch = (e:any) => {
    setTerm(e.target.value);
  };

  const searchRedirect = (e:any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      enterRef.current?.click();
      setTimeout(() => {
        props.openSearch();
      }, 400);
    }
  };

  return (
    <div className="bg-white fixed top-0 left-0 right-0 bottom-0 z-[100] duration-500 translate-y-[-200%] group-[.search-open]:translate-y-0">
      <i
        className="cursor-pointer absolute fa-solid fa-x top-[18px] right-[22px] z-[1] lg:right-[64px] lg:top-[32px] text-2xl"
        onClick={props.openSearch}
      ></i>
      <div className="relative pt-14 pb-4 px-4 m-auto flex items-center gap-5 max-w-[1400px] lg:gap-10 lg:py-14 lg:px-0">
        <i
          className="absolute px-3 fa-solid fa-microphone"
          data-nq-microphone-icon
        ></i>
        <input
          ref={inputRef}
          defaultValue={term}
          onInput={predictiveSearch}
          onKeyDown={searchRedirect}
          className="bg-neutral-100 font-normal rounded-sm w-full h-[50px] text-base px-9 placeholder-black flex-1 group-[.search-open]:focus-within:ring-2 group-[.search-open]:focus-within:ring-blue-500"
          type="text"
          autoComplete="off"
          placeholder="Search..."
          id="base-search"
          name="base-search"
        />
      </div>
      {term?.length ? (
        <div className="h-[100vh] overflow-y-auto scrollbar px-4 mb-4 lg:px-0">
          <Link ref={enterRef} href={`/search/?term=${term}`} className="invisible">
            Click
          </Link>
          <NuqliumCall pagetype="predictive" pagekey={term} trigger="1" />
        </div>
      ) : (
        <div className="pb-60 pt-4 max-w-[1400px] h-[100vh] overflow-y-auto no-scrollbar mx-auto px-4 lg:pt-0 lg:px-2 bg-zinc-100 lg:bg-transparent">
          <NuqliumObservable pagetype="zone" pagekey="predictive-search-zone" />
        </div>
      )}
    </div>
  );
});

export default NuqliumQuickSearch;
