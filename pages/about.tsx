import Head from 'next/head';
import { Container, Typography, Box } from '@mui/material';
import { maxWidth } from '@mui/system';
import React, { useState } from "react";
import CollapsibleItem from "../components/about/CollapsibleItem.js";

/**
 * A page showing off the history of the organization and how far we've come.
 */
const spacing = 0;

export const AboutPage = () => {
  return (
  <div className = "bg-ais-new-beige font-roboto">
    <div className="w-[100%] flex flex-col gap-[4rem] pt-[7rem] pb-[5rem] max-w-[1400px] px-[4rem] 2xl:px-[0px] mx-auto">
      <div className="relative w-[100%] pt-[4rem] z-0">
        <div className="w-[100%] [text-shadow:0px_4px_4px_#00000040] font-placard tracking-wide text-[#361cff] font-bold text-[96px] text-center">
          WHO WE ARE
        </div>
        <img
          className="absolute w-[134px] h-[136px] top-[54px] right-[3%] object-cover
            hidden lg:block"
          alt="img 1"
          src="/images/Logos/uplogo.png"
        />
        <img
          className="absolute w-[86px] h-[87px] top-[180px] right-[13%] object-cover
            hidden lg:block"
          alt="img 2"
          src="/images/Logos/firstlogo.png"
        />
        <img
          className="absolute w-[232px] h-[237px] top-0 xl:left-[3%] object-cover -z-10
            hidden lg:block"
          alt="first LOGO"
          src="/images/Logos/firstlogo.png"
        />
      </div>
      <div className="flex items-center justify-between w-full gap-[20px]">
        <div className="flex flex-col items-start gap-[20px]">
          <div className="relative font-placard tracking-wide font-bold text-[#3e6eff] text-[48px] text-center self-center sm:text-left sm:self-start">
            OUR MISSION
          </div>
          <p className="text-[#293039]">
            Make artificial intelligence understandable and accessible to everyone. We want to demystify AI for all. 
          </p>
        </div>
        <img className="w-[258px] min-w-[258px] h-[265.2px] object-cover rounded-[10px] opacity-0 hidden sm:block" alt="Placeholder image" src="/images/placeholder.png" />
      </div>
      <div className="flex items-center justify-between relative w-full gap-[20px] xl:gap-[5rem] ">
        <div className="text-center text-lg w-[258px] min-w-[258px] hidden sm:block">
          <img
            className="w-[258px] h-[265.97px] object-cover rounded-[10px]"
            alt="Founder"
            src="/images/Photos/founder.jpeg"
          />
          <p className="font-bold pt-[5px]">Brian Hoang</p>
          <p className="text-[#777777]">Founder (SE {'\''}19)</p>
        </div>
        <div className="flex flex-col items-end gap-[20px]">
          <div className="font-placard tracking-wide text-[#3e6eff] text-[48px] font-bold self-center text-center sm:text-right sm:self-end">
            HOW WE STARTED
          </div>
          <p className="text-justify">
            Jeff Bezos, the founder of Amazon, stated in May of 2016 that society is on the cusp of entering the golden age of artificial intelligence and over the next two decades, human society and AI will become intertwined in a way that would seem like science fiction today. That the modern applications of AI, such as self-driving cars, Midjourney, and ChatGPT, only scratch the surface of what{'\''}s possible.
            <br /><br />
            A month after Bezos{'\''} statement, the Artificial Intelligence Society (AIS) was born. Our organization began under the general fascination of the impact that AI has already made on the world. Whether that be through Netflix{'\''}s movie recommendations or Meta{'\''}s facial recognition software, it is incredible how ubiquitous AI has become in our daily lives. But as of today, many of the fascinating aspects of AI are largely unknown to the general public.
            <br /><br />
            <b>We want to change that.</b>
          </p>
        </div>
      </div>
      <div className="font-placard tracking-wide text-[#361cff] text-black text-center font-bold uppercase text-5xl sm:text-8xl">
        Our Programs
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 items-start pt-7 pb-5 px-4 max-w-[1400px] mx-auto">
        <div className="text-center">
          <CollapsibleItem
            title="AI Mentorship"
            sampleText="Every semester, students with zero experience have the opportunity to participate in the AIM program to build a semester-long AI project with a team of fellow peers and guidance from an experienced mentor. If you are interested in diving head-first into the field of AI through a structured, fast-paced, hands-on learning program, then AIM is the place for you!"
          />
        </div>
        <div className="text-center">
          <CollapsibleItem
            title="Socials"
            sampleText="We host various social events for UTD students to get together and connect throughout the year."
          />
        </div>
        <div className="text-center">
          <CollapsibleItem
            title="AI51"
            sampleText="AI51 is our official program where experienced students involved with AIS can work on club-sponsored projects as a next step for refining their technical expertise in the field."
          />
        </div>
        <div className="text-center">
          <CollapsibleItem
            title="HackAI"
            sampleText="AIS hosts a 24-hour hackathon in which students can come together as a community of AI enthusiasts, network with industry professionals, utilize modern AI tools to create powerful and impressive projects to showcase. HackAI comes with food, swag, prizes and fun!"
          />
        </div>
        <div className="text-center">
          <CollapsibleItem
            title="Workshops"
            sampleText="Learn about AI through engaging workshops hosted by the AI team at AIS."
          />
        </div>
        <div className="text-center">
          <CollapsibleItem
            title="Industry Events"
            sampleText="Learn about the role of AI in the real world straight from the companies leveraging it to innovate and push the boundaries of what's possible. Listen and network with company representatives and tap into rich industry insights."
          />
        </div>
      </div>
    </div>
  </div>
  );
};

export default AboutPage;

