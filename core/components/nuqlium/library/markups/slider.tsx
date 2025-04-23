import React, { useState, useRef, useEffect, useCallback } from "react";

const Slider = ({
  min,
  max,
  core,
  aggregation,
  onClear,
  onChange,
}: any) => {
  // Extract default values from aggregation
  const defaultMin = aggregation.range._filteredmin ?? aggregation.range._min ?? min;
  const defaultMax = aggregation.range._filteredmax ?? aggregation.range._max ?? max;

  // State for temp and committed values
  const [tempMinVal, setTempMinVal] = useState(defaultMin);
  const [tempMaxVal, setTempMaxVal] = useState(defaultMax);
  const [minVal, setMinVal] = useState(defaultMin);
  const [maxVal, setMaxVal] = useState(defaultMax);

  const rangeRef = useRef<HTMLDivElement>(null);

  // Sync state with aggregation and props
  useEffect(() => {
    const filteredMin = aggregation.range._filteredmin ?? aggregation.range._min ?? min;
    const filteredMax = aggregation.range._filteredmax ?? aggregation.range._max ?? max;

    setTempMinVal(filteredMin);
    setTempMaxVal(filteredMax);
    setMinVal(filteredMin);
    setMaxVal(filteredMax);
  }, [aggregation, min, max]);

  // Handle temporary changes
  const handleTempMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), tempMaxVal - 1);
    setTempMinVal(value);
  };

  const handleTempMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), tempMinVal + 1);
    setTempMaxVal(value);
  };

  // Commit changes and call core.Action
  const commitMinChange = (e: React.MouseEvent | React.TouchEvent) => {
    setMinVal(tempMinVal);
    core.Action("filter", e, aggregation.id, "", "slider", tempMinVal, tempMaxVal);
  };

  const commitMaxChange = (e: React.MouseEvent | React.TouchEvent) => {
    setMaxVal(tempMaxVal);
    core.Action("filter", e, aggregation.id, "", "slider", tempMinVal, tempMaxVal);
  };

  // Update active range styles
  const getPercent = useCallback(
    (value: number) => ((value - min) / (max - min)) * 100,
    [min, max]
  );

  useEffect(() => {
    if (rangeRef.current) {
      const minPercent = getPercent(tempMinVal);
      const maxPercent = getPercent(tempMaxVal);
      rangeRef.current.style.left = `${minPercent}%`;
      rangeRef.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [tempMinVal, tempMaxVal, getPercent]);

  // Notify external onChange listeners
  useEffect(() => {
    if (onChange) onChange({ min: minVal, max: maxVal });
  }, [minVal, maxVal, onChange]);

  return (
    <div className="w-full max-w-lg mx-auto py-4">
      <div className="relative">
        {/* Slider Track */}
        <div className="absolute w-full h-1 bg-gray-300 rounded"></div>

        {/* Active Range */}
        <div
          ref={rangeRef}
          className="absolute h-1 bg-black rounded"
        ></div>

        {/* Min Slider */}
        <input
          type="range"
          min={min}
          max={max}
          value={tempMinVal}
          onChange={handleTempMinChange}
          onMouseUp={(e) => commitMinChange(e)}
          onTouchEnd={(e) => commitMinChange(e)}
          className="absolute w-full h-1 appearance-none pointer-events-auto bg-transparent thumb"
        />

        {/* Max Slider */}
        <input
          type="range"
          min={min}
          max={max}
          value={tempMaxVal}
          onChange={handleTempMaxChange}
          onMouseUp={(e) => commitMaxChange(e)}
          onTouchEnd={(e) => commitMaxChange(e)}
          className="absolute w-full h-1 appearance-none pointer-events-auto bg-transparent thumb"
        />
      </div>

      <div className="flex justify-between items-center mt-4">
        {/* Displayed Values */}
        <span className="text-gray-600">£{tempMinVal}</span>
        <span className="text-gray-600">£{tempMaxVal}</span>
      </div>
    </div>
  );
};

export default Slider;
