import React from 'react';

function Summary() {
  return (
    <div className="flex flex-col items-center justify-center py-40 max-w-[1400px] px-[4rem] 2xl:px-[0px] mx-auto">
      {/* title */}
      <h2 className="font-placard font-bold tracking-wider text-ais-new-white mb-12 text-center text-4xl sm:text-5xl">
        UNLOCKING THE POWER OF{' '}
        {/* Colored background*/}
        <span className="inline-block bg-ais-new-orange text-ais-new-soft-black rounded-full px-8 py-2">ARTIFICIAL INTELLIGENCE</span>
      </h2>
      
      {/* icons */}
      <div className="gap-[1rem] justify-center flex flex-col md:flex-row">
        <div className="text-center">
          <img src="/images/Logos/topic1.png" alt="Icon 1" className="w-16 h-16 mb-4 mx-auto" />
          <h4 className="text-xl font-bold text-ais-new-white mb-4">AI Literacy</h4>
          <p className='text-ais-white'>Simplifying AI concepts through workshops and seminars, making AI more accessible to everyone</p>
        </div>

        {/* Second icon and description */}
        <div className="text-center">
          <img src="/images/Logos/topic2.png" alt="Icon 2" className="w-16 h-16 mb-4 mx-auto" />
          <h4 className="text-xl font-bold text-ais-new-white mb-4">Networking</h4>
          <p className='text-ais-white'>Connecting with industry leaders and other professionals to expand the horizons of artificial intelligence</p>
        </div>

        {/* Third icon and description */}
        <div className="text-center">
          <img src="/images/Logos/topic3.png" alt="Icon 3" className="w-16 h-16 mb-4 mx-auto" />
          <h4 className="text-xl font-bold text-ais-new-white mb-4">Collaborative Projects</h4>
          <p className='text-ais-white'>Programs for students to work on real-world AI projects, fostering practical experience and innovation</p>
        </div>
      </div>
    </div>
  );
}

export default Summary;