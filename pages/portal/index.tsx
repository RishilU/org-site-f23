import Head from 'next/head';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Coda } from 'coda-js';

export default function Profile() {
  {/*for the appbar*/}
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();

  //authentication variables
  const [inputtedUsername, setUsername] = useState('');
  const [inputtedPassword, setPassword] = useState('');
  const [auth, setAuth] = useState(false);

  //profile variables
  const [userID, setUserID] = useState('');
  const [userFirstName, setUserFirstName] = useState('');
  const [userLastName, setUserLastName] = useState('');
  const [userYear, setUserYear] = useState('');
  const [userMajor, setUserMajor] = useState('');
  const [userAppAccept, setUserAppAccept] = useState(false);
  const [userAppReject, setUserAppReject] = useState(false);
  const [userQRCode, setUserQRCode] = useState('');
  const [userAppStatus, setUserAppStatus] = useState('');

  //for hamburger on appbar
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  //for closing hamburger on appbar
  const handleClose = () => {
    setAnchorEl(null);
  };

  //for profile/login button on appbar
  const handleProfileClick = (path) => {
    setAnchorEl(null);
    router.push(path);
  };

  //for other appbar buttons
  const handleItemClick = (secName) => {
    setAnchorEl(null);
    document.getElementById(secName).scrollIntoView()
  };

  const waitForLogin = async (e) => {
    await handleLogin(e);
  };

  //authentication login credentials
  const handleLogin = async (e) => {
    //check for empty fields
    if (inputtedPassword == '' || inputtedUsername == '') {
      alert('Login failed');
    } else {
      try {
        //get coda table data
        const CodaAPI = new Coda(process.env.NEXT_PUBLIC_CODA_AUTH_API_KEY); 
        const doc = await CodaAPI.getDoc('Z3QHtncLew'); // Grab Tech Tank Application Doc from Coda API using the Doc ID at https://coda.io/developers/apis/v1
        const table = await doc.getTable('Submissions'); // Grab the actual table from the doc
        const rows = await table.listRows({ useColumnNames: true, valueFormat: 'rich' }); // Grab all the event entries in the doc
        
        //check whether username and password are valid
        //note for future years: this code is not secure since it stores the rows in the browser, so please change it
        if (rows && rows.length > 0) {
          for (let i = 0; i < rows.length; i++) {
            if (rows[i].values['Net ID'].replace(/```/gi, '') === inputtedUsername) {
              if (rows[i].values['PW'].replace(/```/gi, '') === inputtedPassword) {
                setAuth(true);
                getUserInfo(i, rows);
              } else {
                alert('Invalid credentials');
              }
            }
          }
        }
      } catch (error) {
        console.error('Login error', error);
        alert('Login failed');
      }
    }
  };
  
  function getUserInfo(index, allRows) {
    //set all profile variables
    //remove extra characterws form them
    setUserID(allRows[index].values['Net ID'].replace(/```/gi, ''));
    setUserFirstName(allRows[index].values['First Name'].replace(/```/gi, ''));
    setUserLastName(allRows[index].values['Last Name'].replace(/```/gi, ''));
    setUserYear(allRows[index].values['Year'].replace(/```/gi, ''));
    setUserMajor(allRows[index].values['Major'][0].name);
    //setUserAppAccept(allRows[index].values['Accept']);
    //setUserAppReject(allRows[index].values['Reject']);
    setUserQRCode(allRows[index].values['QR Code URL'].url);
  
    //set whether applicant was accepted or rejected
    if (allRows[index].values['Accept']) {
      setUserAppStatus("Accepted");
    } else if (allRows[index].values['Reject']) {
      setUserAppStatus("Rejected");
    } else {
      setUserAppStatus("Pending");
    }
  }

  function login()
  {
    return (
      <div className='m-8'>
        <br/>
          <input
            className='text-black'
            type="text"
            placeholder="Net ID"
            onChange={(e) => setUsername(e.target.value)}
          />
          <br/>
          <br/>
          <input
            className='text-black'
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <br/>
          <br/>

          <button onClick={waitForLogin} className="text-white bg-black rounded-xl px-4 mb-8" type="submit">Login</button>

          <br/>

          <button onClick={() => window.open('https://coda.io/form/Tech-Tank-Application_dQjHEJqhY-P')} className="text-white bg-black rounded-xl px-4">Sign Up</button>

      </div>
    );
  }

  //reset all auth and profile vars to default state when logged out
  function signout()
  {
    setAuth(false);
    setUsername('');
    setPassword('');
    setAuth(false);
    setUserID('');
    setUserFirstName('');
    setUserLastName('');
    setUserYear('');
    setUserMajor('');
    setUserAppAccept(false);
    setUserAppReject(false);
    setUserQRCode('');
    setUserAppStatus('');
  }

  function profile()
  {
    return (
      <div className='m-8'>
        <div className="text-black mb-2">
          <span className='font-bold'>First Name: </span> {userFirstName}
        </div>
        <div className="text-black mb-2">
          <span className='font-bold'>Last Name: </span> {userLastName}
        </div>
        <div className="text-black mb-2">
         <span className='font-bold'>Net ID: </span> {userID}
        </div>
        <div className="text-black mb-2">
          <span className='font-bold'> Year: </span> {userYear}
        </div>
        <div className="text-black mb-2">
          <span className='font-bold'> Major: </span> {userMajor}
        </div>
        <div className="text-black mb-2">
          <span className='font-bold'>Application Status: </span> {userAppStatus}
        </div>
        <div className="text-black mb-2">
          <span className='font-bold'>QR Code: </span> {userQRCode ? <img src={userQRCode} alt="QR Code"/> : 'coming soon'}
        </div>
        <button onClick={() => signout()}  className="text-white bg-black rounded-xl px-4" type="submit">Log Out</button>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Tech Tank</title>
        <link rel="icon" type="image/png" href="/tech-tank-logo.png" />
        <meta
          name="description"
          content="Welcome to Tech Tank!"
        />
      </Head>
      <main className="min-h-screen bg-hai-beige font-oriya text-ais-white subpixel-antialiased overflow-x-hidden">
        <section id="profile" className="relative w-[100vw] h-[100vh] pt-[5rem] z-0">
          {auth ? profile() : login()}
        </section>
      </main>
    </>
  );
}
