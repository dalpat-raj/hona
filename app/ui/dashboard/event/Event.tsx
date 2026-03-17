import { getEvents } from "@/lib/data";
import React from "react";
import EventCard from "./EventCard";

const Event = async () => {
  const events = await getEvents();

  return (
    <div className="p-4">
      <div className="">
        <div className="grid grid-cols-7 max-sm:grid-cols-4 gap-2 border-b border-gray-300 mb-4 pb-1">
          <h4 className="text-[14px] font-semibold text-green-900 ">Id</h4>
          <h4 className="col-span-2 text-[14px] font-semibold text-green-900">
            Name
          </h4>
          <h4 className="text-[14px] font-semibold max-sm:hidden text-green-900">
            Product Count
          </h4>
          <h4 className="text-[14px] font-semibold max-sm:hidden text-green-900">
            Start
          </h4>
          <h4 className="text-[14px] font-semibold max-sm:hidden text-green-900">
            End
          </h4>
          <h4 className="text-[14px] font-semibold text-green-900 ">Action</h4>
        </div>
        {events?.map((item, i) => (
          <EventCard AllEvents={item} key={i} />
        ))}
      </div>
    </div>
  );
};

export default Event;
