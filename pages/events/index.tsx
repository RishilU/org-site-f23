import Head from 'next/head';
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Event } from '../../lib/types';
import { useTransition, animated } from '@react-spring/web';
import FeatureEvent from '../../components/events/FeatureEvent';
import { getAllEvents } from '../api/events';
import { useMediaQuery } from '@mui/material';

interface EventsPageProps {
  events: Event[];
}

export default function EventsPage({ events }: EventsPageProps) {
  const futureEvents: Event[] = [];
  const onGoingEvents: Event[] = [];
  const pastEvents: Event[] = [];
  const pastEventsCols = [[], [], [], [], [], []];
  const [viewAllPastEvents, setViewAllPastEvents] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [buttonStyles, setButtonStyles] = useState({
    ViewAll: true,
    Workshops: false,
    Socials: false,
    Others: false,
  });
  const notNarrow = useMediaQuery('(min-width:768px)');
  const notWide = useMediaQuery('(max-width:1279px)');
  const tablet = notNarrow && notWide;

  events.forEach(function (eachEvent) {
    const startTime = new Date(eachEvent.startDate);
    const endTime = new Date(eachEvent.endDate);
    const timeNow = new Date();
    if (endTime < timeNow) pastEvents.push(eachEvent);
    else if (timeNow < startTime) futureEvents.push(eachEvent);
    else futureEvents.push(eachEvent); {/*this could be "onGoingEvents" also in a future, more developed version of this page*/}
  });

  futureEvents.sort(function(a:Event,b:Event){
    const dif = new Date(a.startDate).valueOf() - new Date(b.startDate).valueOf();
    return dif;
  });

  const pastEventCards = pastEvents.map((event) => {
    if (activeCategory !== 'All') {
      if (!viewAllPastEvents) {
        setViewAllPastEvents(true);
      }
    }

    if (activeCategory == "Other") {
      if (event.eventType !== 'Workshop' && event.eventType !== 'Social') {
        return (
          <div key={event.id} className="my-4">
            <FeatureEvent key={event.id} event={event} onGoing={false}/>
          </div>
        );
        }
    } else if (event.eventType === activeCategory || activeCategory == 'All') {
      return (
        <div key={event.id} className="my-4">
          <FeatureEvent key={event.id} event={event} onGoing={false}/>
        </div>
      );
      }
  });

  const futureEventCards = futureEvents.map((event) => {
    return <FeatureEvent key={event.id} event={event} onGoing={true}/>;
  });
  
  const onGoingEventCards = onGoingEvents.map((event) => {
    return <FeatureEvent key={event.id} event={event} onGoing={true} />;
  });

  for (let i = 0; i < pastEventCards.length; i++) {
    pastEventsCols[i % 6].push(pastEventCards[i]);
  }

  let pastEventsDiv;
  if (pastEvents.length == 0) {
    pastEventsDiv = <div>There are no past events</div>
  } else if (!viewAllPastEvents){
    pastEventsDiv = (
      <div className="flex flex-row flex-wrap">
        <div className="flex flex-col md:w-1/2 xl:w-1/3 min-w-full md:min-w-0">{pastEventsCols[0][0]}</div>
        <div className="flex flex-col md:w-1/2 xl:w-1/3 min-w-full md:min-w-0">{pastEventsCols[1][0]}</div>
        <div className="flex flex-col md:w-1/2 xl:w-1/3 min-w-full md:min-w-0">{pastEventsCols[2][0]}</div>
      </div>
    );
  } else {
    if(!tablet) {
      pastEventsDiv = (
        <div className="flex flex-row flex-wrap">
          <div className="flex flex-col md:w-1/2 xl:w-1/3 min-w-full md:min-w-0">{pastEventsCols[0]}{pastEventsCols[3]}</div>
          <div className="flex flex-col md:w-1/2 xl:w-1/3 min-w-full md:min-w-0">{pastEventsCols[1]}{pastEventsCols[4]}</div>
          <div className="flex flex-col md:w-1/2 xl:w-1/3 min-w-full md:min-w-0">{pastEventsCols[2]}{pastEventsCols[5]}</div>
        </div>
      );
    } else {
      pastEventsDiv = (
        <div className="flex flex-row flex-wrap">
          <div className="flex flex-col md:w-1/2 xl:w-1/3 min-w-full md:min-w-0">{pastEventsCols[0]}{pastEventsCols[2]}{pastEventsCols[4]}</div>
          <div className="flex flex-col md:w-1/2 xl:w-1/3 min-w-full md:min-w-0">{pastEventsCols[1]}{pastEventsCols[3]}{pastEventsCols[5]}</div>
        </div>
      );
    }
  }

  const upComingEventDiv = (
      <div>
        {futureEventCards.length > 0
          ? 
        <>
          <div className="text-ais-new-soft-black py-[1rem] pl-[3rem] sm:pl-[2rem]">Stay up to date with our upcoming events here and on our socials!</div>
          {futureEventCards[0]}
        </>
          :
        <div className="text-ais-new-soft-black py-[1rem] pl-[3rem] sm:pl-[2rem]">Coming soon!</div>}
      </div>
    );

  let onGoingEventDiv; //currently not used
  if (onGoingEvents.length > 0) {
    onGoingEventDiv = (
      <section className="bg-ais-light-gray py-8">
        <div className="mx-auto max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-4xl 2xl:max-w-6xl py-2">
          <div className="text-3xl font-bold mb-4">Ongoing Events</div>
          {onGoingEventCards[0]}
        </div>
      </section>
    );
  }

  const eventTypeButtonStyles = (category: string) => {
    setViewAllPastEvents(false);
    setActiveCategory(category);
    setButtonStyles({
      ViewAll: category === 'All',
      Workshops: category === 'Workshop',
      Socials: category === 'Social',
      Others: category === 'Other',
    });
  };

  /*const ref = useRef<ReturnType<typeof setTimeout>[]>([]);
  const [items, set] = useState<string[]>([]);

  const reset = useCallback(() => {
    ref.current.forEach(clearTimeout);
    ref.current = [];
    set([]);
    ref.current.push(setTimeout(() => set(['Coming']), 1000));
    ref.current.push(setTimeout(() => set(['Soon']), 2000));
    ref.current.push(setTimeout(() => set(['Coming', 'Soon']), 3000));
  }, []);

  useEffect(() => {
    reset();
    return () => ref.current.forEach(clearTimeout);
  }, []);*/

  return (
    <div>
      <Head>
        <title>Events &ndash; AIS</title>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <meta
          name="description"
          content="An overview of all our AI/ML projects, including explanations and interactive demos."
        />
      </Head>
      <main className="flex flex-col items-center justify-center min-h-screen bg-ais-new-beige">
        <section className="py-8 px-2 mt-10 max-w-[1400px] mx-[10%]">
          <div className="relative py-2">
          <img
              src="/images/Events/decoration2.png"
              className="max-w-[min(30rem,100%)]"
            />
            {upComingEventDiv}
            <img
              src="/images/Shapes/decoration1.png"
              className="absolute right-0 w-30 translate-x-20 -translate-y-20 hidden lg:block"
            />
          </div>
        </section>
        <section className="py-8 px-2 max-w-[1400px] mx-[10%]">
          <div className="py-2">
            <img
              src="/images/Events/decoration3.png"
              className="max-w-[min(30rem,100%)] sm:-translate-x-[2rem]"
            />
            <div className="text-ais-new-soft-black py-[1rem] pr-[2rem] pl-[3rem] sm:pl-[2rem]">Explore our past events and learn about their impact.</div>
            <div className="my-5 ml-4 hidden sm:flex">
              <div onClick={() => eventTypeButtonStyles('All')}>
                <EventsButton title="View All" active={buttonStyles.ViewAll} />
              </div>
              <div onClick={() => eventTypeButtonStyles('Workshop')}>
                <EventsButton title="Workshops" active={buttonStyles.Workshops} />
              </div>
              <div onClick={() => eventTypeButtonStyles('Social')}>
                <EventsButton title="Socials" active={buttonStyles.Socials} />
              </div>
              <div onClick={() => eventTypeButtonStyles('Other')}>
                <EventsButton title="Others" active={buttonStyles.Others} />
              </div>
            </div>
            {pastEventsDiv}
            <div className="py-4 w-full flex justify-center md:justify-end" onClick={() => (viewAllPastEvents ? setViewAllPastEvents(false) : setViewAllPastEvents(true))} >
              <img src="/images/Events/viewall-btn.png" className='[cursor:pointer]'></img>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export async function getServerSideProps() {
  const allEvents = await getAllEvents();

  return {
    props: {
      events: allEvents,
    },
  };
}

function EventsButton(props) {
  return (
    <button
      className={`py-1 px-4 border-[2px] text-sm text-ais-new-dark-blue border-ais-new-dark-blue rounded-[1rem] whitespace-nowrap hover:bg-ais-new-dark-blue hover:text-ais-new-beige ml-2 ${
        props.active ? 'bg-ais-new-dark-blue text-ais-new-beige' : ''
      }`}
    >
      {props.title}
    </button>
  );
}
