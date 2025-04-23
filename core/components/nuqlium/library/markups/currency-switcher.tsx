import { useState, useEffect } from "react";

function CurrencySwitcher(props: any) {
    return (<div></div>)
    const { content } = props;
    const data = content.data;

    const [isOpen, setIsOpen] = useState(false);
    const [selectedCurrency, setSelectedCurrency] = useState(data.currencies[0]);
        // Retrieve from localStorage or default to the first currency


    useEffect(() => {
        if (typeof window !== "undefined") {
            const savedCurrency = localStorage.getItem("currentCurrency");
            return savedCurrency
                ? JSON.parse(savedCurrency)
                : data.currencies[0];
            }   
    }, []);





    // Toggle dropdown visibility
    function toggleDropdown() {
        setIsOpen((prev) => !prev);
    }

    // Update selected currency and localStorage
    function selectCurrency(item: any) {
        const value = item.code;
        const currency = item.name;

        // Check if `currentCurrency` exists in localStorage
        const savedCurrency = localStorage.getItem("currentCurrency");

        if (savedCurrency) {
            const currentCurrency = JSON.parse(savedCurrency);
            currentCurrency.value = value;
            currentCurrency.currency = currency;
            localStorage.setItem("currentCurrency", JSON.stringify(currentCurrency));
        } else {
            const currentCurrency = {
                value: value,
                currency: currency,
            };
            localStorage.setItem("currentCurrency", JSON.stringify(currentCurrency));
        }

        // Update state with the selected currency
        setSelectedCurrency(item);
        setIsOpen(false); // Close dropdown
    }

    useEffect(() => {
        // Update `selectedCurrency` if `currentCurrency` changes in localStorage
        if (typeof window !== "undefined") {
        const savedCurrency = localStorage.getItem("currentCurrency");
        if (savedCurrency) {
            const currentCurrency = JSON.parse(savedCurrency);
            const matchingCurrency = data.currencies.find(
                (item: any) => item.code === currentCurrency.value
            );
            if (matchingCurrency) {
                setSelectedCurrency(matchingCurrency);
            }
        }
    }
    }, [data.currencies]);

    return (
        <div className="fixed z-10 top-0 right-0 flex flex-col max-w-[200px] mt-[6px] mr-[10px]">
            {/* Dropdown Toggle */}
            <div
                className="flex items-center justify-between gap-1 cursor-pointer bg-white bg-opacity-50 border border-black p-2 rounded-md shadow-md"
                onClick={toggleDropdown}
            >
                <div className="flex items-center gap-1">
                    <img
                        className="w-[25px] h-[25px] rounded-[50%]"
                        src="https://media.nuqlium.com/demo/global.png"
                        alt="Currency"
                    />
                    <span className="text-sm font-medium">{selectedCurrency.name}</span>
                </div>
                <div>
                    <i
                        className={`fa-solid fa-chevron-down w-5 h-5 transform transition-transform duration-200 ${
                            isOpen ? "hidden" : "block"
                        }`}
                    ></i>                
                </div>
            </div>

            {/* Dropdown List */}
            {isOpen && (
                <ul className="bg-white shadow-md rounded-md mt-2  bg-opacity-50">
                    {data.currencies.map((item: any) => (
                        <li
                            key={item.code}
                            className="p-2 hover:bg-gray-100 cursor-pointer flex items-center space-x-2"
                            onClick={() => selectCurrency(item)}
                        >
                            <span className="text-sm font-medium">{item.name}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default CurrencySwitcher;
