"use client";

import { useRef } from "react";
import NuqliumQuickSearch from "../templates/quicksearch";

export default function QuickSearchInput(props: any) {
  const searchContainer = useRef<HTMLDivElement>(null);

  // Expose methods to the parent via ref 
  // This is used to focus the input when the search is opened
  const quickSearchRef = useRef<{ focusInput: () => void }>(null);

  const openSearch = () => {
    if (searchContainer.current) {
      searchContainer.current.classList.toggle("search-open");
      // Focus the input when the search is opened it will call the method focusInput from the ref
      quickSearchRef.current?.focusInput();
    }
  };

  return (
    <div className="relative">
      <i
        onClick={openSearch}
        className="cursor-pointer fa-solid fa-magnifying-glass p-2 text-black group-[.inverse-header]:text-white"
        data-mobile-search="true"
      ></i>
      <div className="group" ref={searchContainer}>

        {/* this will pull the forward ref from NuqliumQuickSearch*/}

        <NuqliumQuickSearch ref={quickSearchRef} openSearch={openSearch} />
      </div>
    </div>
  );
}