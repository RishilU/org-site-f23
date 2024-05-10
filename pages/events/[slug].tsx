import ArrowBack from '@mui/icons-material/ArrowBack';
import Head from 'next/head';
import ScheduleIcon from '@mui/icons-material/Schedule';
import RoomIcon from '@mui/icons-material/Room';
import DuoIcon from '@mui/icons-material/Duo';
import YouTubeIcon from '@mui/icons-material/YouTube';
import VideocamIcon from '@mui/icons-material/Videocam';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { GetServerSideProps, GetStaticPaths, InferGetServerSidePropsType } from 'next';
import Link from 'next/link';
import Moment from 'moment';
import { Event, Officer } from '../../lib/types';
import { getAllEvents, getEventInfo, getEventLink } from '../api/events';
import { getOfficer } from '../api/officer';
import { google, outlook, ics } from 'calendar-link';
import OfficerItem from '../../components/team/OfficerItem';
import { Menu } from '@headlessui/react';

function shareEvent(eventUrl: string) {
  if (navigator.share) {
    navigator
      .share({
        url: eventUrl,
      })
      .then(() => console.log('Successful share'))
      .catch((error) => console.log('Error sharing', error));
  } else if (navigator.clipboard) {
    navigator.clipboard
      .writeText(eventUrl)
      .then(() => console.log('Event URL copied to clipboard'))
      .catch((error) => console.error('Could not copy event URL to clipboard', error));
  }
}

const ONLINE_MAPPINGS = {
  youtube: 'YouTube',
  google_meet: 'Google Meet',
  ms_teams: 'Microsoft Teams',
  virtual: 'Virtual',
};
/**
 * A page showing event details and other information.
 */
export default function EventPage({
  event,
  presenterOfficers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const {
    id,
    title,
    description,
    presenters,
    eventType,
    location,
    detailedLocation,
    joinLink,
    roomNo,
    tags,
    startDate,
    endDate,
    lastUpdated,
    supplements,
    image,
    slides,
    signup,
  } = event;
  // console.log(event)
  const calEvent = {
    title: title,
    description: description,
    start: startDate,
    end: endDate,
    location: roomNo != '' ? roomNo : null,
    url: joinLink != '' ? joinLink : null,
  };
  const eventStart = new Date(startDate);
  const eventEnd = new Date(endDate);
  const timeNow = new Date();
  const inFuture = timeNow < eventStart;
  const inPast = timeNow > eventEnd;

  let linkText = inPast ? 'Watch Recording' : inFuture ? 'Stream Link' : 'Join event';

  const supplementItems = supplements ? supplements.map((supplement) => {
    const { title, caption, link, image, type } = supplement;
    return (
      <aside key={link} className="pb-4 rounded-md shadow-md bg-white">
        <img src={image} alt={title} />
        <div className="mx-4">
          <div className="text-lg my-2">{title}</div>
          <div className="text-sm mb-2">{caption}</div>
        </div>
      </aside>
    );
  }) : [];

  const eventTime = Moment(eventStart).format('MMM D, YYYY @ h:mm a') + ' CST';

  let eventLink = joinLink;
  let locationText = location;
  const utdMap = 'https://map.concept3d.com/?id=1772#!s/';

  let presenterCards;
  if (eventType !== 'Social') {
    presenterCards = presenterOfficers.map((officer) => {
      return <OfficerItem officer={officer} key={officer.name} />;
    });
  }

  let presenterDiv;
  if (presenterCards) {
    presenterDiv = (
      <div className="">
        <div className="py-4 text-2xl font-semibold">Presented by:</div>
        <div className="flex flex-wrap gap-4 transform scale-85 origin-left -mt-6 -mb-4">
          {presenterCards}
        </div>
      </div>
    );
  }

  let imageBox;
  if (image) {
    imageBox = (
      <div className="">
        <div className="py-4 text-2xl font-semibold">Flyer:</div>
        <img
          src={image}
          className="transition duration-200 ease-in-out transform hover:-translate-y-16  hover:scale-300 rounded-xl h-48 "
        />
      </div>
    );
  }

  let slidesButton;
  if (slides) {
    slidesButton = (
      <button className="transition duration-400 ease-in-out bg-blue-400 hover:bg-ais-dark-blue  p-2 rounded-md text-white font-semibold">
        <a target="_blank" href={slides} rel="noreferrer">
          View Slides
        </a>
      </button>
    );
  }

  let signUpButton;
  if (signup != '' && !inPast) {
    signUpButton = (
      <button className="transition duration-400 ease-in-out bg-blue-400 hover:bg-ais-dark-blue  p-2 rounded-md text-white font-semibold">
        <a target="_blank" href={signup} rel="noreferrer">
          RSVP
        </a>
      </button>
    );
  }
  let hybridButton;
  if (location === 'Hybrid') {
    if (!inFuture && !inPast) {
      hybridButton = (
        <button className="transition duration-400 ease-in-out bg-blue-400 hover:bg-ais-dark-blue  p-2 rounded-md text-white font-semibold relative">
          <a target="_blank" href={eventLink} rel="noreferrer">
            {linkText}
            <div className="absolute top-0 right-0 -my-1 -mx-1">
              <span className="flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
              </span>
            </div>
          </a>
        </button>
      );
    } else {
      hybridButton = (
        <button className="transition duration-400 ease-in-out bg-blue-400 hover:bg-ais-dark-blue  p-2 rounded-md text-white font-semibold">
          <a target="_blank" href={eventLink} rel="noreferrer">
            {linkText}
          </a>
        </button>
      );
    }
  }

  let locIcon;
  if (location == 'In-person' || location == 'Hybrid') {
    locIcon = <RoomIcon />;
    eventLink = utdMap + roomNo;
    locationText = roomNo;
    linkText = 'Get Directions';
  } else if (location === 'Google Meet') locIcon = <DuoIcon />;
  else if (location === 'Zoom') locIcon = <VideocamIcon />;
  else if (location === 'Discord')
    locIcon = <img src="/discord.svg" className="transform scale-90" />;
  else locIcon = <YouTubeIcon />;

  let buttons;
  if (!inFuture && !inPast) {
    buttons = (
      <div className="flex flex-wrap gap-4 my-4">
        {signUpButton}
        <button className="transition duration-400 ease-in-out bg-blue-400 hover:bg-ais-dark-blue  p-2 rounded-md text-white font-semibold relative">
          <a target="_blank" href={eventLink} rel="noreferrer">
            {linkText}
            <div className="absolute top-0 right-0 -my-1 -mx-1">
              <span className="flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
              </span>
            </div>
          </a>
        </button>
        {hybridButton}
        {slidesButton}
      </div>
    );
  } else if (inFuture) {
    buttons = (
      <div className="flex flex-wrap gap-4 my-4">
        {signUpButton}
        <button className="transition duration-400 ease-in-out bg-blue-400 hover:bg-ais-dark-blue  p-2 rounded-md text-white font-semibold">
          <a target="_blank" href={eventLink} rel="noreferrer">
            {linkText}
          </a>
        </button>
        {hybridButton}
        {slidesButton}
        <Menu as="div" className="relative">
          <Menu.Button className="inline-flex w-full transition duration-400 ease-in-out bg-blue-400 hover:bg-ais-dark-blue  p-2 rounded-md text-white font-semibold">
            Add To Calendar
            <KeyboardArrowDownIcon />
          </Menu.Button>
          <Menu.Items className="origin-top-right absolute right-0 rounded-sm w-full bg-ais-white shadow-xl -mt-3 text-black">
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
    );
  } else if (inPast && (location === 'YouTube' || location === 'Hybrid')) {
    buttons = (
      <div className="flex flex-wrap gap-4 my-4">
        {signUpButton}
        <button className="transition duration-400 ease-in-out bg-blue-400 hover:bg-ais-dark-blue  p-2 rounded-md text-white font-semibold">
          <a target="_blank" href={eventLink} rel="noreferrer">
            {linkText}
          </a>
        </button>
        {hybridButton}
        {slidesButton}
      </div>
    );
  } else {
    {
      /**Empty Div */
    }
    buttons = <div className="my-4" />;
  }

  return (
    <div>
      <Head>
        <title>{title} &ndash; AIS</title>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </Head>
        <main className="min-h-screen">
          <section className="p-4 mx-auto max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-4xl">
            <header className="">
              <div className="flex items-center pb-16 mt-20 -mx-2 md:pb-0 md:-mx-36">
                <div
                  tabIndex={0}
                  className="p-2 hover:bg-gray-300 rounded-full focus:bg-gray-400 cursor-pointer"
                >
                  <Link href="/events">
                    <ArrowBack />
                  </Link>
                </div>
                <div className="text-lg font-bold">Back</div>
              </div>
              <div className="font-bold text-ais-dark-blue text-2xl pb-8 -my-10">
                {eventType.toUpperCase()}
              </div>
            </header>
            <div className="text-4xl font-bold my-4">{title}</div>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center">
                {locIcon}
                <div className="mx-2 text-xl">{locationText}</div>
              </div>
              <div className="flex items-center">
                <ScheduleIcon />
                <div className="mx-2 text-xl">{eventTime}</div>
              </div>
            </div>
            <div>{buttons}</div>
            <div className="text-xl text-justify">{description}</div>
            {presenterDiv}
            {imageBox}
          </section>
          {/* <section className="p-4 my-4 mx-auto max-w-4xl">
        <div className="text-3xl font-bold">Supplementary Materials &amp; Resources</div>
        <div className="md:grid md:grid-cols-3">{supplementItems}</div>
      </section> */}
        </main>
      </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  let { slug } = context.params;
  if (slug === undefined) {
    return {
      props: {
        event: null,
      },
      redirect: {
        destination: '/events',
        permanent: false,
      },
    };
  } else if (Array.isArray(slug)) slug = slug[0]; // Type Coercion of Array of Strings to String

  const event = await getEventInfo(slug, []);

  const presenterOfficers: Officer[] = [];
  for (const presenter of event.presenters) {
    let officer: Officer = await getOfficer(presenter.name);
    if (!officer) {
      officer = { name: presenter.name, title: 'Presenter' };
    }
    presenterOfficers.push(officer);
  }

  return {
    props: {
      event,
      presenterOfficers,
    },
  };
};

// export const getStaticPaths: GetStaticPaths = async () => {
//   const events = await getAllEvents(['id']);

//   const paths = events.map((event) => {
//     return {
//       params: {
//         slug: event.id,
//       },
//     };
//   });

//   return {
//     paths,
//     fallback: false,
//   };
// };
