import Head from 'next/head';
import * as React from 'react';
import OfficerItem from '../components/team/OfficerItem';
import { Officer } from '../lib/types';
import TeamItem from '../components/team/TeamItem';
import { getAllOfficers, getOfficer } from './api/officer';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import { hexToRgb, Typography } from '@mui/material';


interface TeamPageProps {
  officers: Officer[];
}

const spacing = 0;
/**
 * A page that displays all officers in the organization.
 */
export default function TeamPage({ officers }: TeamPageProps) {
  const techTeam: Officer[] = [];
  const financeTeam: Officer[] = [];
  const industryTeam: Officer[] = [];
  const marketingTeam: Officer[] = [];
  const operationsTeam: Officer[] = [];
  const aimTeam: Officer[] = [];
  const execTeam: Officer[] = [];
  const hrTeam: Officer[] = [];
  const [value, setValue] = React.useState('All Members');
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const [isSmallScreen, setIsSmallScreen] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 520); // Adjust the breakpoint as needed
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize); // Add event listener for window resize

    return () => {
      window.removeEventListener('resize', handleResize); // Cleanup function
    };
  }, []);

  // Sorting logic for officers remains unchanged

  for (const off of officers) {
    // Team categorization remains unchanged
  };


  //this sorting logic sorts the whole list of officers, but imagine it is only for a specific team when you are tracing it/thinking about it
  officers.sort((a,b) => {
    //sorting just for the executives
    if(a.team === "Executive Board")
    {
      if(a.title === "President")
      {
        return -1;
      }
      else if(a.title === "Secretary")
      {
        return 1;
      }
      else if(b.title === "President") //if 'a' is VP
      {
        return 1;
      }
      return -1; //if 'a' is VP and 'b' is secretary
    }
    //outside of the executive team, it puts the director as first and the rest of the team in alphabetical order by name
    else if(a.title.includes("Director"))
    {
      if(b.title.includes("Director")) //both are directors
      {
        if(a.name < b.name)
          return -1;
        else if(a.name > b.name)
          return 1;
      }
      else
      {
        return -1;
      }
    }
    else
    {
      if(b.title.includes("Director"))
      {
        return 1;
      }
      else //neither are directors
      {
        if(a.name < b.name)
          return -1;
        else if(a.name > b.name)
          return 1;
      }
    }
    
    return 0;
  });

  for (const off of officers) {
    if (off['team'] == 'Executive Board') execTeam.push(off);
    else if (off['team'] == 'Industry') industryTeam.push(off);
    else if (off['team'] == 'Marketing') marketingTeam.push(off);
    else if (off['team'] == 'Operations') operationsTeam.push(off);
    else if (off['team'] == 'Finance') financeTeam.push(off);
    else if (off['team'] == 'Membership') hrTeam.push(off);
    else if (off['team'] == 'Technology') techTeam.push(off);
    else if (off['team'] == 'AIM') aimTeam.push(off);
  };

  return (
    <div>
      {/* Head section for defining page metadata */}
      <Head>
        <title>Team &ndash; AIS</title> {/* Page title */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" /> {/* Favicon */}
        <meta
          name="description"
          content="The officers of the Artificial Intelligence Society - the people who make this all possible."
        /> 
      </Head>
      {/* Main content section */}
      <main className="min-h-screen bg-ais-new-beige font-roboto subpixel-antialiased overflow-x-hidden">
        {/* Container for content */}
        <div className="mx-auto max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-4xl 2xl:max-w-6xl py-10 md:py-20 ">
        </div>
        {/* Section for displaying team officers */}
        <section id="officers">
          {/* Title */}
          <div className="text-7xl font-placard-bold tracking-wide text-ais-new-med-blue mb-4 p-4 text-center">
            MEET THE TEAM
          </div>
          {/* Container for displaying team members */}
          <div className="flex flex-grow flex-wrap -mt-10 pt-10 pb-8 gap-8 justify-around relative">
            {/* Absolute positioned images */}
            {/* Blue star positioned at the bottom right */}
            { !isSmallScreen && (
              <img
                src="/images/Shapes/team_blue_star.png"
                alt="Blue star"
                className="absolute bottom-10 -right-20 h-80 w-80"
              />
            )}
            {/* Yellow star positioned at the top left */}
            <img
              src="/images/Shapes/team_yellow_star.png"
              alt="Yellow star"
              className="absolute top-40 -left-20 h-60 w-60"
            />
            <TabContext value={value}>
              <Tabs value={value} onChange={handleChange} defaultValue={"All Members"} aria-label="teams" variant="scrollable" scrollButtons allowScrollButtonsMobile centered className="w-full bg-ais-new-orange h-[3rem] lg:pl-[calc(50%-551px)]">
                <Tab value="All Members" label="All" /> // State for managing currently selected tab
                <Tab value="Executive Members" label="Executive" />
                <Tab value="Membership Members" label="Membership" />
                <Tab value="Operation Members" label="Operations" />
                <Tab value="Finance Members" label="Finance" />
                <Tab value="Technology Members" label="Technology" />
                <Tab value="Marketing Members" label="Marketing" />
                <Tab value="Industry Members" label="Industry" />
                <Tab value="AIM Members" label="AIM" />
              </Tabs>
              <TabPanel value="All Members">
                 {/* Display members of Executive Team */}
                <div className="text-center text-2xl font-roboto-bold text-ais-new-med-blue">Executive Team</div>
                <TeamItem officers={execTeam} team={'Executive'} />

                  {/* Display members of Membership Team */}
                <div className="text-center text-2xl font-roboto-bold text-ais-new-med-blue mt-40">Membership Team</div>
                <TeamItem officers={hrTeam} team={'Membership'} />

                 {/* Display members of Operations Team */}
                <div className="text-center text-2xl font-roboto-bold text-ais-new-med-blue mt-40">Operations Team</div>
                <TeamItem officers={operationsTeam} team={'Operations'} />

                   {/* Display members of Finance Team */}
                <div className="text-center text-2xl font-roboto-bold text-ais-new-med-blue mt-40">Finance Team</div>
                <TeamItem officers={financeTeam} team={'Finance'} />

                   {/* Display members of a Super Cool Hot Sexy Smart Team */}
                <div className="text-center text-2xl font-roboto-bold text-ais-new-med-blue mt-40">Technology Team</div>
                <TeamItem officers={techTeam} team={'Technology'} />

                   {/* Display members of Marketing Team */}
                <div className="text-center text-2xl font-roboto-bold text-ais-new-med-blue mt-40">Marketing Team</div>
                <TeamItem officers={marketingTeam} team={'Marketing'} />

                  {/* Display members of Industry Team */}
                <div className="text-center text-2xl font-roboto-bold text-ais-new-med-blue mt-40">Industry Team</div>
                <TeamItem officers={industryTeam} team={'Industry'} />

                           {/* Display members of AIM Team */}
                <div className="text-center text-2xl font-roboto-bold text-ais-new-med-blue mt-40">AIM Team</div>
                <TeamItem officers={aimTeam} team={'AIM'} />

                {/* TabPanels for each specific team */}
               {/* Each TabPanel displays members of the corresponding team */}
              </TabPanel>
              <TabPanel value="Executive Members">
                <TeamItem officers={execTeam} team={'Executive'} />
              </TabPanel>
              <TabPanel value="Membership Members">
                <TeamItem officers={hrTeam} team={'Membership'} />
              </TabPanel>
              <TabPanel value="Operation Members">
                <TeamItem officers={operationsTeam} team={'Operations'} />
              </TabPanel>
              <TabPanel value="Finance Members">
                <TeamItem officers={financeTeam} team={'Finance'} />
              </TabPanel>
              <TabPanel value="Technology Members">
                <TeamItem officers={techTeam} team={'Technology'} />
              </TabPanel>
              <TabPanel value="Marketing Members">
                <TeamItem officers={marketingTeam} team={'Marketing'} />
              </TabPanel>
              <TabPanel value="Industry Members">
                <TeamItem officers={industryTeam} team={'Industry'} />
              </TabPanel>
              <TabPanel value="AIM Members">
                <TeamItem officers={aimTeam} team={'AIM'} />
              </TabPanel>
            </TabContext>
          </div>
        </section>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const allOfficers = await getAllOfficers();
  //   [
  //   'title',
  //   'date',
  //   'slug',
  //   'author',
  //   'coverImage',
  //   'excerpt',
  // ]

  return {
    props: {
      officers: allOfficers,
    },
  };
}
