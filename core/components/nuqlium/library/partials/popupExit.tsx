import { useEffect } from "react";


export default function PopupExitButton() {


        // Add the close event handler
        useEffect(() => {
            const closeButtons = document.querySelectorAll('[data-nq-popup-close]');
            
            const handleClose = (event: Event) => {
                const popupArea = (event.target as HTMLElement)?.closest('[data-nq-popup-area]');
                if (popupArea) {
                    popupArea.remove(); // Remove the popup from the DOM
                }
            };
    
            closeButtons.forEach((button) => button.addEventListener('click', handleClose));
    
            // Cleanup event listeners on unmount
            return () => {
                closeButtons.forEach((button) => button.removeEventListener('click', handleClose));
            };
        }, []);
    
    
        return (

                            <div className="absolute top-4 right-4 cursor-pointer" data-nq-popup-close>
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M2.32422 2L22.0025 22" stroke="black" strokeWidth="3"></path>
                                <path d="M21.6797 2L2.00144 22" stroke="black" strokeWidth="3"></path>
                            </svg>
                        </div>


        )


}