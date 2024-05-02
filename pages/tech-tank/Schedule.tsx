import * as React from 'react';

function Schedule() {
  return (
    <>
      <div className="pt-[5rem] justify-center font-roboto bg-[linear-gradient(#DCE7ED_-50%,#3E69B9_50%)]">
        <div className="flex flex-col text-center">
          <p className="mb-[4px] font-bold font-placard tracking-wider text-5xl">
            SCHEDULE
          </p>
          <p className="text-lg font-roboto under_line tracking-wide pb-[1rem]">
            <a
              target="_blank"
              rel="noreferrer"
              href="https://aisutd.notion.site/aisutd/HackAI-Hacker-Guide-1a42a12a713341dd9e9c7200054fee47"
              className="hidden"
            >
              Click for Prompts (needs updating)
            </a>
            April 13, 2024 @Sciences Building
          </p>
        </div>
        <div className="flex justify-center items-center">
          <img
            className="object-contain pl-[0%] w-[30%] hidden md:block lg:pl-[10%] lg:w-[50%]"
            src="/tech-tank/skis.png"
          />
          <div className="text-wrap break-words px-[10%] w-[100%] md:px-[0%] md:w-[70%] md:pr-[5%] lg:w-[50%]">
            <div className="pt-[10px]">9:00am:<pre className="inline">{'\t\t'}</pre>Officer Check In<br /></div>
            <div className="pt-[10px]">10:00am:<pre className="inline">{'\t'}</pre>Attendee Check In<br /></div>
            <div className="pt-[10px]">10:30am:<pre className="inline">{'\t'}</pre>Opening Ceremony<br /></div>
            <div className="pt-[10px]">11:15am:<pre className="inline">{'\t'}</pre>Workshop Session 1<br /></div>
            <div className="pt-[10px]">11:50pm:<pre className="inline">{'\t'}</pre>Workshop Session 2<br /></div>
            <div className="pt-[10px]">12:25pm:<pre className="inline">{'\t'}</pre>Workshop Session 3<br /></div>
            <div className="pt-[10px]">1:00pm:<pre className="inline">{'\t\t'}</pre>Lunch<br /></div>
            <div className="pt-[10px]">2:00pm:<pre className="inline">{'\t\t'}</pre>Prompt Announcement/Build + Pitch Working Hours<br /></div>
            <div className="pt-[10px]">3:30pm:<pre className="inline">{'\t\t'}</pre>Judging<br /></div>
            <div className="pt-[10px]">5:00pm:<pre className="inline">{'\t\t'}</pre>Intermission<br /></div>
            <div className="pt-[10px]">5:30pm:<pre className="inline">{'\t\t'}</pre>Closing Ceremony/Winners Announced<br /></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Schedule;
