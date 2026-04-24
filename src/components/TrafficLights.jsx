import React from "react";

const TrafficLights = () => {
  return (
    <div className="flex gap-2">
      <div className="h-3 w-3 rounded-full bg-[#FF5F56] border border-[#E0443E] shadow-[inset_0_1px_1px_rgba(0,0,0,0.1)] transition-transform hover:scale-110 active:scale-95 cursor-default" />
      <div className="h-3 w-3 rounded-full bg-[#FFBD2E] border border-[#DEA123] shadow-[inset_0_1px_1px_rgba(0,0,0,0.1)] transition-transform hover:scale-110 active:scale-95 cursor-default" />
      <div className="h-3 w-3 rounded-full bg-[#27C93F] border border-[#1AAB29] shadow-[inset_0_1px_1px_rgba(0,0,0,0.1)] transition-transform hover:scale-110 active:scale-95 cursor-default" />
    </div>
  );
};

export default TrafficLights;
