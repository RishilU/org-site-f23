import React, { useState } from "react";

const CollapsibleItem = ({ title, sampleText }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleCollapse = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="mb-4">
      <div
        className="cursor-pointer flex justify-center text-3xl font-bold text-[#3e6eff] hover:text-[#361cff]"
        onClick={toggleCollapse}
      >
        <div className="flex justify-between items-center font-placard tracking-wide">
          <div>
            {title}
          </div>
          <div className="ml-2 text-xl">
            {isExpanded ? (
              <img src="/images/AboutUs/about-programs-downarrow.png" alt="Down Arrow" className="h-3"/> // Down arrow
            ) : (
              <img src="/images/AboutUs/about-programs-sidearrow.png" alt="Side Arrow" className="h-6"/> // Side arrow
            )}
          </div>
        </div>
      </div>
      {isExpanded && (
        <p className="font-roboto text-[#293039]">
          {sampleText}
        </p>
      )}
    </div>
  );
};

export default CollapsibleItem;