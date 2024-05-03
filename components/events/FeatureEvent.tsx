import {Event} from "../../lib/types";
import Link from 'next/link';
import Moment from "moment";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { google, outlook, ics } from 'calendar-link';
import { Menu } from '@headlessui/react';
import { useMediaQuery } from "@mui/material";
import { getEventLink } from "../../pages/api/events";

interface EventItemProps {
  event: Event;
  onGoing?: boolean;
}

/**
 * An item that displays event details
 */
export default function FeatureEvent({ event, onGoing }: EventItemProps) {
  //event variables
  const { id, title, description, eventType, startDate, endDate, location, joinLink, rsvpLink, image} = event;
  const eventLink = `/events/${event.id}`;
  const eventTime = Moment(new Date(startDate)).format('hh:mma');
  const eventTimeEnd = Moment(new Date(endDate)).format('hh:mma');
  const eventDay = Moment(new Date(startDate)).format('D');
  const eventMonth = Moment(new Date(startDate)).format('MMM');
  const eventYear = Moment(new Date(startDate)).format('YYYY');
  const mobile = useMediaQuery('(max-width:1023px)');

  //calendar variables
  const calEvent = {
    title: title,
    description: description,
    start: startDate,
    end: endDate,
    location: location === 'In-person' ? joinLink : null
  };


  return (
    <div
      key={id}
      className={
        'font-bold mx-4 h-full p-4 rounded-3xl border-r-8 border-b-8 border-t-2 border-l-2 border-ais-new-light-blue'
      }
    >
      {onGoing && !mobile ? 
      <div className="flex justify-center items-center text-ais-dark-blue text-sm gap-4 font-bold relative">
        <div style={ image ? {backgroundImage: `url(${image})`} : {backgroundImage: "url('/images/Logos/ais_logo_brain_events.png')"} }
          className="w-8/12 h-96 bg-contain bg-center bg-no-repeat rounded-2xl relative z-10 [cursor:pointer]" onClick={() => {window.open("/images/Logos/ais_logo_brain_events.png", "_blank")}} 
        >
          <div className="bg-ais-white w-3/12 h-36 rounded-tl-3xl ml-auto text-center absolute bottom-0 right-0">
            <div className="mt-10 text-4xl text-ais-black">{eventDay}</div>
            <div className="text-xl text-ais-black">{eventMonth.toUpperCase()}</div>
            <div className="text-xl text-ais-white hover:text-ais-black">{eventYear}</div>
          </div>
        </div>
        <div className="h-auto w-1/2 pl-8 pr-16">
          <div className="font-bold text-ais-black text-xs flex flex-wrap justify-between gap-2">
            FEATURED
          </div>
          <div className="flex text-ais-black text-4xl font-bold py-2">{title}</div>
          <div className="mb-2 font-bold text-ais-dark-blue text-xs flex flex-wrap justify-between gap-2">
            <div className="py-2 flex text-ais-new-dark-blue">
              <div className="text-sm">{eventTime} - {eventTimeEnd} @ {location}</div>
            </div>
          </div>
          <div>
            <div className="text-lg text-ais-dark-gray font-normal">{description}</div>
          </div>
          <div className="flex py-2">
            {
              rsvpLink ? (
              <Link href={rsvpLink} className="ml-auto mr-2">
                <button
                  className="h-[2rem] w-20 border-[2px] text-xs text-ais-new-dark-blue border-ais-new-dark-blue rounded-[1rem] whitespace-nowrap px-[1rem] hover:bg-ais-new-dark-blue hover:text-ais-new-beige"
                >
                  RSVP
                </button>
              </Link>
              ) : (
                <div className="h-[2rem] ml-auto"/>
              )
            }
            <Menu as="div" className="relative">
              <Menu.Button className="font-bold"><img src="/images/Icons/rsvp-icon.png" className="mt-1" width="24"></img></Menu.Button>
              <Menu.Items className="origin-top-left absolute left-0 rounded-md w-28 bg-ais-white shadow-xl z-10 text-black">
                <Menu.Item>
                  <a
                    target="_blank"
                    href={ics(calEvent)}
                    className="transition duration-400 group flex gap-2 items-center px-4 py-2 text-sm hover:bg-ais-blue-gray hover:text-black rounded-sm"
                    rel="noreferrer"
                  >
                    <img src="/apple.svg" className="h-5" />
                    Apple
                  </a>
                </Menu.Item>
                <Menu.Item>
                  <a
                    target="_blank"
                    href={google(calEvent)}
                    className="transition duration-400 group flex gap-2 items-center px-4 py-2 text-sm hover:bg-ais-blue-gray hover:text-black rounded-sm"
                    rel="noreferrer"
                  >
                    <img src="/google.svg" className="h-4" />
                    Google
                  </a>
                </Menu.Item>
                <Menu.Item>
                  <a
                    target="_blank"
                    href={outlook(calEvent)}
                    className="transition duration-400 group flex gap-2 items-center px-4 py-2 text-sm hover:bg-ais-blue-gray hover:text-black rounded-sm"
                    rel="noreferrer"
                  >
                    <img src="/outlook.svg" className="h-4" />
                    Outlook
                  </a>
                </Menu.Item>
              </Menu.Items>
            </Menu>
          </div>
        </div>
      </div>
      :
      <div>
{/** events image new window open section */}
        { image ? 
        <div style={{backgroundImage: `url(${image})`}}  onClick={() => {window.open(image, "_blank")}}
          className="bg-contain bg-center bg-no-repeat w-full h-64 rounded-t-2xl mb-4 relative [cursor:pointer]"
        >
          <div className="bg-ais-white w-4/12 h-24 rounded-tl-3xl ml-auto text-center absolute bottom-0 right-0">
            <div className="mt-4 text-2xl">{eventDay}</div>
            <div className="text-sm">{eventMonth.toUpperCase()}</div>
            <div className="text-xl text-ais-white hover:text-ais-black">{eventYear}</div>
          </div>
        </div>
        : 
        <div className="bg-contain bg-center bg-no-repeat w-full h-64 rounded-t-2xl mb-4 relative bg-[url('/images/Logos/ais_logo_brain_events.png')] [cursor:pointer]"
          onClick={() => {window.open("/images/Logos/ais_logo_brain_events.png", "_blank")}}
        >
          <div className="bg-ais-white w-4/12 h-24 rounded-tl-3xl ml-auto text-center absolute bottom-0 right-0">
            <div className="mt-4 text-2xl">{eventDay}</div>
            <div className="text-sm">{eventMonth.toUpperCase()}</div>
            <div className="text-xl text-ais-white hover:text-ais-black">{eventYear}</div>
          </div>
        </div>
        }

        <div className="font-bold text-black text-xs flex flex-wrap justify-between gap-2">
          {eventType.toUpperCase()}
        </div>
        <div className="flex text-2xl font-bold py-2">{title}</div>
        <div>
          <div className="text-sm text-ais-dark-gray font-normal">{description}</div>
        </div>
        <div className="flex text-ais-dark-blue text-sm gap-4 font-bold pt-6">
          <Link href={eventLink}>
            <button
              className="h-[2rem] w-28 border-[2px] text-xs text-ais-new-dark-blue border-ais-new-dark-blue rounded-[1rem] whitespace-nowrap px-[1rem] hover:bg-ais-new-dark-blue hover:text-ais-new-beige"
            >
              Learn more
            </button>
          </Link>
        </div>
      </div>
    }
    </div>
  );
}