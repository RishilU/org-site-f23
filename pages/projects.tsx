import { GetStaticProps } from 'next';
import Head from 'next/head';
import React from 'react';
import { getDemos } from './api/projects';
import { ProjectDemo } from '../lib/types';
import toroid from '../public/images/SuperToroid-2.png';

interface DemoPageProps {
  demos: ProjectDemo[];
}

/**
 * A list of demoable projects.
 */
export default function ProjectsPage({ demos }: DemoPageProps) {
  return (
    <div>
      <Head>
        <title>Projects &ndash; AIS</title>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />s
        <meta
          name="description"
          content="An overview of all our AI/ML projects, including explanations and interactive demos."
        />
      </Head>
      {/* 1.add background gradient color 
          2. create coming soon box/div and add shadow
          3. insert cube and rectangle images*/}
      <main className="flex flex-col justify-center min-h-screen bg-gradient-to-r from-blue-300 to-blue-200">
        <div className="text-center font-bold w-9/12 h-5/6 p-10 rounded-3xl shadow-lg shadow-slate-500 m-auto mt-auto">
          <p className="text-center pt-10 h-9/12">Comming Soon</p>
          {/* <img src="images/SuperToroid-2.png" className="w-20" />
          <img src="images/RoundCube-Blue-Glossy.png" className="w-20" /> */}
        </div>
      </main>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const demos = getDemos();

  return {
    props: {
      demos,
    },
  };
};
