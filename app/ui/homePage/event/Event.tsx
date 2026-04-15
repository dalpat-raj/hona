import React from "react";
import { getEventRunning } from "@/lib/data";
import EventCarousel from "@/app/ui/homePage/event/EventCarousel";
import { caveat } from "@/app/ui/Fonts";
import CountDown from "@/app/ui/homePage/event/CountDown";

const Event = async () => {
  const result = await getEventRunning();

  // error UI (user friendly)
  if (result?.error) {
    return (
      <div className="w-full text-center py-10 text-gray-500">
        Special offers are not available right now.
      </div>
    );
  }

  const event = result?.data;

  // no event running
  if (!event) {
    return null;
  }

  return (
    <div className="relative">
      <div className="w-full py-2 px-12 max-md:px-4 max-sm:px-2 mt-12 mb-8 max-md:my-4">
        <div className="flex flex-col justify-center gap-2 items-center">
          <div className="text-center">
            <h2
              className={`${caveat.className} text-[37px] max-sm:text-[24px] font-bold flex text-green-900`}
            >
              {event.title}
              <span className="mixerColor ml-2">
                {event.discount.toFixed(0)}% OFF
              </span>
            </h2>

            <p className="text-[14px] text-green-900">{event.description}</p>
          </div>

          <div className="flex items-center gap-2">
            <h4 className="text-[16px] mixerColor font-bold">End In</h4>
            <CountDown endDates={event.endDate} />
          </div>
        </div>

        <EventCarousel event={event} />
      </div>
    </div>
  );
};

export default Event;
