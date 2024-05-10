import { Event } from '../../lib/types';
import { Coda } from 'coda-js';
import { Description } from '@mui/icons-material';
import * as fs from 'fs';

/**
 * List of events
 */
let EVENTS_MAP: { [key: string]: Event } = {};




/**
 * Fetch event information.
 *
 * @param eventId The unique identifier for the event
 */
export const getEventInfo = async (eventId: string, fields?: string[]): Promise<Event> => {
  // TODO: Return actual event info
  await getAllEvents();
  return EVENTS_MAP[eventId];
};

/**
 * Return all past and upcoming events.
 */
export const getAllEvents = async (fields?: string[]): Promise<Event[]> => {
  // If events were updated <1 min ago, return events without updating
  const lastEvents = Object.keys(EVENTS_MAP);
  if (lastEvents.length != 0) {
    const lastUpdate = new Date(EVENTS_MAP[lastEvents[0]]['lastUpdated']);
    const timeNow = new Date();
    if (lastUpdate.getHours == timeNow.getHours) return Object.values(EVENTS_MAP);
  }
  // If events were updated >1 min ago, get new events from Coda API
  // Real Event Tracking Doc: luD4Jth4qA
  // Test Event Tracking Doc: W46Lee3b8Q
  try {
    /**
     * Coda API
     * How to get an API KEY:
     * 1. Go to https://coda.io/account and scroll down to "Coda API Tokens"
     * 2. Generate a new API key WITH RESTRICTIONS of read only access to this doc: https://coda.io/d/_dluD4Jth4qA/Events_suqfB#_luipI
     * 3. Create a file ".env.local" in your project directory
     * 4. Add the following entry: "CODA_API_KEY='{Your API key}'"
     */

    const CodaAPI = new Coda(process.env.NEXT_PUBLIC_CODA_EVENTS_API_KEY);
    const doc = await CodaAPI.getDoc('luD4Jth4qA'); // Grab Event Tracking Doc from Coda API using the Doc ID at https://coda.io/developers/apis/v1
    const table = await doc.getTable('All Events'); // Grab the actual table from the doc
    const rows = await table.listRows({ useColumnNames: true, valueFormat: 'rich' }); // Grab all the event entries in the doc

    // Assuming 'rows' is an array of objects with properties including 'values' containing an object with a property 'Presenter(s)' and 'Do not show'
// For each event in the table, get the variables
for (let i = 0; i < rows.length; i++) {
  // Check if the event should be shown based on the 'Do not show' field
  if (rows[i].values['Do not show'] === 'Yes') {
    // Skip this event if 'Do not show' is set to 'Yes'
    continue;
  }


 // Parse presenters for the event
 const eventPresenters: { name: string; link: string }[] = [];
 for (const presenterName of rows[i].values['Presenter(s)']
   .replace(/```/gi, '')
   .split(', ')) {
   eventPresenters.push({
     name: presenterName,
     link: '',
   });
 }

 // Send event data to backend
 fetch('https://coda.io/d/Event-Tracking_dluD4Jth4qA/Events_suqfB#_lu2As', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    eventName: rows[i].values['Event Name'],
    presenters: eventPresenters,
    // Add any additional data you want to send to the backend
  }),
})
  .then((response) => {
    if (response.ok) {
      console.log('Event data sent successfully');
    } else {
      console.error('Failed to send event data:', response.statusText);
    }
  })
  .catch((error) => {
    console.error('Error sending event data:', error);
  });

   // Update frontend UI (for example, add event to a list)
  const eventListItem = document.createElement('li');
  eventListItem.textContent = rows[i].values['Event Name'];
  // Add event list item to the frontend UI
  document.getElementById('eventList').appendChild(eventListItem);



  let watchLink: string;
  if (typeof rows[i].values['Watch Link'] == 'string')
    watchLink = rows[i].values['Watch Link'].replace(/```/gi, '');
  else watchLink = rows[i].values['Watch Link']['url'];

  let rsvp: string;
  if (typeof rows[i].values['RSVP Link'] == 'string')
    rsvp = rows[i].values['RSVP Link'].replace(/```/gi, '');
  else rsvp = rows[i].values['RSVP Link']['url'];

  let imageUrl = rows[i].values['Flyer'];
  if (typeof imageUrl == 'string')
    imageUrl = imageUrl.length != 0 ? imageUrl.replace(/```/gi, '') : null;
  else if (Array.isArray(imageUrl)) {
    if (imageUrl.length != 0) imageUrl = imageUrl[0]['url'];
    else imageUrl = null;
  } else imageUrl = imageUrl['url'];

  let slideLink: string;
  if (typeof rows[i].values['Slides Link'] == 'string') {
    slideLink = rows[i].values['Slides Link'].replace(/```/gi, '');
    slideLink = slideLink.substring(slideLink.indexOf('(') + 1, slideLink.indexOf(')'));
  } else {
    slideLink = rows[i].values['Slides Link']['url'];
  }

  

  const eventToAdd: Event = {
    id: rows[i].values['URL Extension'].replace(/```/gi, ''),
    title: rows[i].values['Event Title'].replace(/```/gi, ''),
    description: rows[i].values['Description'].replace(/```/gi, ''),
    presenters: eventPresenters,
    location: rows[i].values['Location'].replace(/```/gi, ''),
    eventType: rows[i].values['Event Type'].replace(/```/gi, ''),
    joinLink: watchLink,
    rsvpLink: rsvp,
    startDate: rows[i].values['Event Date'].length > 0 ? rows[i].values['Event Date'] : null,
    endDate: rows[i].values['Event End Date'].length > 0 ? rows[i].values['Event End Date'] : null,
    image: imageUrl,
    slides: slideLink,
    lastUpdated: new Date().toISOString(),
  };
  //console.log(rows[i].values);
  if (eventToAdd['id'] === '') continue;
  EVENTS_MAP[eventToAdd['id']] = eventToAdd;
}
// Create an offline backup if necessary
storeEvents();
  } catch (error) {
    console.log(error);
    console.log('Error No: ' + error.errno);
    console.log('Error Code: ' + error.code);
    // Restore from an offline backup if necessary
    retrieveEvents();
  }
  return Object.values(EVENTS_MAP);
};

/**
 * Get a shareable URL for an event.
 *
 * @param hostname The domain name for the website
 * @param slug The ID of the event
 */
export function getEventLink(hostname: string, slug: string): string {
  return `https://${hostname}/events/${slug}`;
}

function storeEvents(): void {
  fs.writeFile('./pages/api/eventsBackup.json', JSON.stringify(EVENTS_MAP), function (err) {
    if (err) {
      console.log(err);
    }
  });
}

function retrieveEvents(): void {
  const events = fs.readFileSync('./pages/api/eventsBackup.json');
  EVENTS_MAP = JSON.parse(events.toString());
}

// async function retrieveEvents(): Promise<void> {
//   fs.readFile('./pages/api/eventsBackup.json', (err, events) => {
//     if (err) throw err;
//     EVENTS_MAP = JSON.parse(events);
//   });
// }

// console.log(process.env.CODA_API_KEY)
// getAllEvents()
