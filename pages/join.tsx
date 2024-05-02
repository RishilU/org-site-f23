import Head from 'next/head';
import Link from 'next/link';
import DescriptionIcon from '@mui/icons-material/Description';
import * as React from 'react';
import { useState } from 'react';

export const JoinPage = () => {
  const [currentTestimony, setCurrentTestimony] = useState(0);
  
  const testimonies = [
    {
      text: "Joining AIS has been an incredible journey for me. The organization provides a supportive community and valuable opportunities to learn and grow in the field of artificial intelligence. (1)",
      author: "First Last",
      position: "AI Engineer, Date",
      image: "/images/icons/avatarimage.png"
    },
    {
      text: "Joining AIS has been an incredible journey for me. The organization provides a supportive community and valuable opportunities to learn and grow in the field of artificial intelligence. (2)",
      author: "First Last",
      position: "AI Engineer, Date",
      image: "/images/icons/avatarimage.png"
    },
    {
      text: "Joining AIS has been an incredible journey for me. The organization provides a supportive community and valuable opportunities to learn and grow in the field of artificial intelligence. (3)",
      author: "First Last",
      position: "AI Engineer, Date",
      image: "/images/icons/avatarimage.png"
    },
  ];

  const handleNextTestimony = () => {
    setCurrentTestimony((prevIndex) => (prevIndex + 1) % testimonies.length);
  };

  const handlePrevTestimony = () => {
    setCurrentTestimony((prevIndex) => (prevIndex - 1 + testimonies.length) % testimonies.length);
  };

  const handleSignUpClick = (secName) => {
    document.getElementById(secName).scrollIntoView();
  };

  return (
    <>
      <Head>
        <title>Join &ndash; AIS</title>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <meta
          name="description"
          content="How you can be involved!"
        />
      </Head>
      <div className="inline-flex flex-col items-start relative bg-beige w-[100%] font-roboto">
        <div className="flex bg-[#fff8f3] items-center justify-center gap-[5%] pt-[10rem] pb-[6rem] relative w-[100%] z-0">
          <div className="flex-col items-center gap-[24px] flex relative w-[80%] md:w-[45%]">
            <p className="font-placard-bold tracking-wide text-5xl text-center md:text-start">
              UNLOCK THE BENEFITS OF JOINING AIS
            </p>
            <p className="relative self-stretch font-text-2 font-[number:var(--text-2-font-weight)] text-[#4f4f4f] text-[length:var(--text-2-font-size)] tracking-[var(--text-2-letter-spacing)] leading-[var(--text-2-line-height)] [font-style:var(--text-2-font-style)]">
              By joining AIS, you gain access to valuable resources, including mentorship opportunities, networking events, engaging workshops, and an amazing community of like-minded people with an interest and passion for artificial intelligence.
            </p>
            <div className="flex items-start gap-[24px] px-0 py-[8px] relative self-stretch w-full flex-[0_0_auto]">
              <div className="flex flex-col items-start gap-[8px] relative flex-1 grow">
                <div className="relative self-stretch mt-[-1.00px] font-bold">
                  Access
                </div>
                <p className="relative self-stretch font-text-2 font-[number:var(--text-2-font-weight)] text-[#4f4f4f] text-[length:var(--text-2-font-size)] tracking-[var(--text-2-letter-spacing)] leading-[var(--text-2-line-height)] [font-style:var(--text-2-font-style)]">
                  Tap into a wealth of resources, including AI projects, research papers, and industry insights.
                </p>
              </div>
              <div className="flex flex-col items-start gap-[8px] relative flex-1 grow">
                <div className="relative self-stretch mt-[-1.00px] font-bold">
                  Mentorship
                </div>
                <p className="relative self-stretch font-text-2 font-[number:var(--text-2-font-weight)] text-[#4f4f4f] text-[length:var(--text-2-font-size)] tracking-[var(--text-2-letter-spacing)] leading-[var(--text-2-line-height)] [font-style:var(--text-2-font-style)]">
                  Get guidance and support from experienced AI professionals through our mentorship program.
                </p>
              </div>
            </div>
          </div>
          <div className="
            mb-10 max-h-[40rem] h-[29vw] w-[40%]
            bg-[url('/images/Join/Pills.png')] bg-no-repeat bg-contain bg-center z-10
            hidden md:block
          "/>
        </div>
        <div id="apps" className="bg-[#fff8f3] flex flex-col items-center justify-center gap-[10px] pb-[12rem] relative self-stretch w-full flex-[0_0_auto]">
          <div className=" flex flex-col items-center justify-center gap-[56px] relative self-stretch w-full flex-[0_0_auto]">
            <div className=" inline-flex items-center gap-[5px] relative flex-[0_0_auto]">
              <img className="relative w-[50px] h-[50px]" alt="Application" src="/images/Icons/applications.svg" />
              <div className="relative w-fit mt-[-1.00px] font-placard-bold tracking-wide text-4xl text-center">
                APPLICATIONS
              </div>
            </div>
            <div className="w-full justify-items-center grid grid-cols-1 gap-[2rem] px-[calc(50%-10rem)]
              md:px-[calc(30%-12rem)] md:grid-rows-2 md:grid-cols-2 xl:grid-rows-1 xl:grid-cols-4 xl:px-[calc(25%-12rem)] text-center">
              <AppBox title="AIS Member"
              desc="Apply to our membership program to gain access to exclusive perks and a member-only community of fellow AI enthusiasts."
              appLink="https://www.aisutd.org/member/apply"
              learnLink="https://www.aisutd.org/member/info"/>
              <AppBox title="AI Mentee"
              desc="Apply as a mentee and get a chance to learn foundational concepts in ML and work on AI projects of your interest, guided by experienced mentors."
              appLink="https://www.aisutd.org/aim/apply"
              learnLink="https://www.aisutd.org/aim/info"/>
              <AppBox title="AI Mentor"
              desc="Apply as a mentor and get a chance to guide a team through a semester-long project in foundational AI and ML concepts."
              appLink="https://www.aisutd.org/aim/mentor/apply"
              learnLink="https://www.aisutd.org/aim/mentor/info"/>
              <AppBox title="AIS Officer"
              desc="Apply to the team and get an opportunity to organize events, be a part of our officer community, and more."
              appLink="https://www.aisutd.org/officer/apply"
              learnLink="https://www.aisutd.org/officer/info"/>
            </div>
          </div>
        </div>
                                                  




        <div className="bg-[#fff8f3] flex flex-col w-[1440px] items-center gap-[80px] px-[120px] py-[112px] hidden">
          <div className="flex flex-col items-center gap-[48px] relative self-stretch w-full flex-[0_0_auto]">
            <div className="justify-between self-stretch w-full flex-[0_0_auto] flex items-center relative">
              <img onClick={handlePrevTestimony} className="ml-[-4.00px] relative flex-[0_0_auto]" alt="Button" src="/images/shapes/leftbutton.png" />
              <div className="flex-col w-[768px] gap-[32px] flex items-center relative">
                <div className="inline-flex items-center gap-[10px] p-[30px] relative flex-[0_0_auto]">
                  <div className="relative w-fit mt-[-0.50px] text-center whitespace-nowrap">
                  </div>
                </div>
                <p className="relative self-stretch text-center">
                  {testimonies[currentTestimony].text}
                </p>
                <div className="flex flex-col w-[300px] items-center gap-[16px] relative flex-[0_0_auto]">
                  <img className="relative w-[56px] h-[56px] object-cover" alt="Avatar image" src={testimonies[currentTestimony].image} />
                  <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
                    <div className="mt-[-1.00px] font-semibold relative self-stretch text-[16px] text-center">
                      {testimonies[currentTestimony].author}
                    </div>
                    <div className="font-text relative self-stretch text-center">
                      {testimonies[currentTestimony].position}
                    </div>
                  </div>
                </div>
              </div>
              <img onClick={handleNextTestimony} className="mr-[-4.00px] relative flex-[0_0_auto]" alt="Button" src="/images/shapes/rightbutton.png" />
            </div>
            <div className="inline-flex items-start gap-[9px] p-[10px] relative flex-[0_0_auto]">
              <div className="relative w-[8px]flex items-center h-[8px] rounded-[4px]" />
              <div className="relative w-[8px] h-[8px] bg-[#d9d9d9] rounded-[4px]" />
              <div className="relative w-[8px] h-[8px] bg-[#d9d9d9] rounded-[4px]" />
              <div className="relative w-[8px] h-[8px] bg-[#d9d9d9] rounded-[4px]" />
              <div className="relative w-[8px] h-[8px] bg-[#d9d9d9] rounded-[4px]" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JoinPage;








function AppBox( { title, desc, appLink, learnLink } )
{
  return(
    <div className="relative font-bold p-[1rem] rounded-3xl border-r-8 border-b-8 border-t-2 border-l-2 border-ais-new-light-blue flex flex-col gap-[20px] h-[100%] w-[100%] md:w-[100%]">
      <div className="text-center font-bold text-xl">{title}</div>
      <div className="font-normal text-ais-dark-gray text-md md:pb-[5rem] xl:pb-[8rem]">{desc}</div>
      <div className="w-full gap-[10px] justify-center flex
        xl:flex-col xl:items-center md:absolute md:bottom-[2rem] md:-ml-[1rem]"
      >
        <div onClick={() => {window.open(`${appLink}`, "_blank")}}
          className="relative w-[8rem] h-[2.5rem] bg-[#3E6EFF] rounded-[20px] flex justify-center items-center [cursor:pointer]"
        >
          <div className="bg-[#3E6EFF] text-[white] relative w-[7.5rem] h-[2rem] rounded-[16px] border-[3px] border-solid border-white flex justify-center items-center">
            <div className="top-[3px] font-bold text-sm">
              Apply
            </div>
          </div>
        </div>
        <div onClick={() => {window.open(`${learnLink}`, "_blank")}}
          className="w-[8rem] h-[2.5rem] border-[2px] border-[#3E6EFF] rounded-[20px] 
          flex justify-center items-center [cursor:pointer]
          font-bold text-sm text-[#3E6EFF]
        ">
          Learn More
        </div>
      </div>
    </div>

  );
}