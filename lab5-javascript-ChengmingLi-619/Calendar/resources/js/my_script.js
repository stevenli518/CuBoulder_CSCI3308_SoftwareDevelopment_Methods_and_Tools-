// Fill out the values for each field correctly.
// Location and url are intentionally mutually exclusive fields in this scenario.
// If you are adding value for one, you needn't for the other.
const CALENDAR_EVENTS = [
  {
    name: "Running",
    day: 'monday',
    time: '08:00',
    modality: 'In-Person',
    location: 'Park',
    url: '',
    attendees: 'Steven, Doria',
  },
  {
    name: 'Meeting with Doria',
    day: 'monday',
    time: '07:00',
    modality: 'Remote',
    location: '',
    url: 'https://cuboulder.zoom.us/j/4951826125',
    attendees: 'Steven, Doria',
  },
];

const CALENDAR_DAYS = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',

];

// We're sequentially going to fill out the initialize_content() method
function initialize_content() {
  EVENT_MODAL = new bootstrap.Modal("#exampleModal");
  const calendar_element = document.getElementById("calendar"); //@TODO: Fill this out
  // forEach() allows us to perform an action, using a callback function, on each element of an array.
  CALENDAR_DAYS.forEach(day => {
    // Create a bootstrap card for each weekday
    // @TODO: Use document.createElement to create a div
    var card = document.createElement('div');// @TODO: Fill this out
    // We'll add some bootstrap classes to the div to upgrade its appearance
    // This is the equivalent of <div class="col-sm m-1 bg-white rounded px-1 px-md-2"> in HTML
    card.className = 'col-sm m-1 bg-white rounded px-1 px-md-2';
    // card.style = 'width:10%';
    // Taking Monday as a sample for a weekday,
    // the below line of code is the equivalent of <div id="monday"> in HTML
    card.id = day.toLowerCase();

    // @TODO: Add the card to the calendar element you fetched in a previous step.
    // Use appendChild()
    calendar_element.appendChild(card);

    // Create weekday as the title. Here is an example:
    const title = document.createElement('div');
    title.className = 'h6 text-center position-relative py-2';
    title.innerHTML = day;

    // @TODO: Add the title element to the card.
    // Use appendChild()
    card.appendChild(title);

    // Add a button to the card to create an event
    const add_event_icon = document.createElement('i'); // allows to add icons to the UI
    add_event_icon.className =
      'bi bi-calendar-plus btn position-absolute translate-middle start-100  rounded p-0 btn-link';

    // adding an event listener to the click event of the icon to open the modal
    // the below line of code would be the equivalent of:
    // <i onclick="open_event_modal({day: 'monday'})"> in HTML.
    add_event_icon.setAttribute(
      'onclick',
      `open_event_modal({day: '${card.id}'})`
    );

    // add the icon to the title div
    title.appendChild(add_event_icon);

    // Add one more div, to the weekday card, which will be populated with events later.
    const body = document.createElement('div');

    // We are adding a class for this container to able to call it when we're populating the days
    // with the events
    body.classList.add('event-container');

    // @TODO: Add this div to the weekday card
    // Use appendChild()
    card.appendChild(body);
  });
  update_dom(); // We will declare and define this in the next step
} // end of initialize_content()



function update_dom() {
  // Sort events by scheduled time. Note that since we rely on the calendar index for entries to be
  // constant, we should not overwrite the existing array.
  // Remember to replace "CALENDAR_EVENTS" with "sort_calendar_events()" after you have implemented that function in part B
  const events = sort_calendar_events();

  events.forEach((event, id) => {
    // First try to update the event if it already exists.
    // @TODO: Use the "id" parameter to fetch the object if it already exists.
    // Replace <> with the appropriate variable name

    // In templated strings, you can include variables as ${var_name}.
    // For eg: let name = 'John'; let msg = `Welcome ${name}`;
    let event_element = document.querySelector(`#event-${id}`);

    // if event is undefined, make a new one.
    if (event_element === null) {
      event_element = document.createElement('div')// @TODO: create a new div element
      event_element.classList = 'event row border rounded m-1 py-1';
      // @TODO: Set the id for the event div to be the same as the input.
      // Replace <> with the correct HTML attribute
      // event_element.<> = `event-${id}`;
      event_element.id = `event-${id}`;

      // Create the element for the Event Name
      const title = document.createElement('div');
      title.classList.add('col', 'event-title');

      // @TODO: Add the title to the event element
      event_element.appendChild(title);

    } else {
      // @TODO: Remove the old element, just in case we are changing the day while updating the event.
      // Use remove()
      event_element.remove();
    }

    // Add the Event Name
    const title = event_element.querySelector('div.event-title');
    title.innerHTML = event.name; // event here is an input parameter to the function

    // Add a tooltip with more information on hover
    // @TODO: you will add code here when you are working on for Part B 2.
    event_element.setAttribute('data-bs-toggle','tooltip');
    if (event.modality ==='In-Person'){
      let content = event.name + ', ' + event.time + ', ' + event.location;
      event_element.setAttribute('data-bs-title', `${content}`);
    }
    else if (event.modality ==='Remote'){
      let content = event.name + ', ' + event.time + ', ' + event.url;
      event_element.setAttribute('data-bs-title', `${content}`);
    }
    
    // @TODO: On clicking the event div, it should open the modal with the fields pre-populated.
    // Replace <> with the triggering action.
    event_element.setAttribute('onclick', `open_event_modal({id: ${id}})`);

    // Add the event div to the parent
    document
      .querySelector(`#${event.day} .event-container`)
      .appendChild(event_element);
  });  
  
  
   update_tooltips(); // Declare the function in the script.js. You will define this function in Part B 2.
}

function update_location_options(value) {
  // @TODO: get the "Location" and "Remote URL" HTML elements from the modal.
  // Hint: you can use querySelector or getElementById.
  // This would depend on how you have initialized it in your HTML.
  // Depending on the "value" change the visibility of these fields on the modal.
  //const event_modailty = document.getElementById("event-modality")
  let location = document.getElementById('Location');
  let remote_url = document.getElementById('RemoteURL');
  let location_label = document.getElementById('location_label');
  let remote_label = document.getElementById('remote_label');
  
  if (value === 'In-Person') {
    remote_url.style.display = "none";
    remote_label.style.display = "none";
    location.style.display = "inline";
    location_label.style.display = "inline";
  }
  else if (value === 'Remote'){
    location.style.display= "none";
    location_label.style.display = "none";
    remote_url.style.display = "inline";
    remote_label.style.display = "inline";
  }
  else{
    remote_url.style.display = "inline";
    remote_label.style.display = "inline";
    location.style.display = "inline";
    location_label.style.display = "inline";
  }

}

function open_event_modal({id, day}) {
  // Since we will be reusing the same modal for both creating and updating events,
  // we're creating variables for them in javascript so we can update the text suitably
  const submit_button = document.querySelector('#submit_button');
  const modal_title = document.querySelector('.modal-title');

  // Attempt to get the event by id
  // Note that on the first attempt, attempt to access an element which does
  // not exist will add 1 entry to the list. This is fine.
  let event = CALENDAR_EVENTS[id];

  // If event is undefined, then we are creating a new event. Otherwise, we
  // load the current event into the modal.
  if (event === undefined) {
    // @TODO: Access the modal_title and submit_button object and edit the names
    // Replace <> with the correct attribute
    modal_title.innerHTML = 'Create Event';
    submit_button.innerHTML = 'Create Event';

    // Initiazing an empty event
    event = {
      name: '',
      day: day,
      time: '',
      modality: '',
      location: '',
      url: '',
      attendees: '',
    };

    // Allocate a new event id. Note that nothing is inserted into the calendar yet.
    // @TODO: Set the id to be the length of the CALENDAR_DAYS because we are adding a new element

     id = CALENDAR_EVENTS.length;
    }
    else {
    // We will default to "Update Event" as the text for the title and the submit button
    modal_title.innerHTML = 'Update Event';
    submit_button.innerHTML = 'Update Event';
  }

  // Once the event is validated, populate the modal.
  // @TODO: Update all elements of the modal with suitable values using QuerySelector.
  // Hint: If it is a new event, the fields in the modal will be empty.
  document.querySelector('#inputName').value = event.name;
  document.querySelector('#Weekday').value = event.day;
  document.querySelector('#Time').value = event.time;
  document.querySelector('#event-modality').value = event.modality;
  document.querySelector('#Location').value = event.location;
  document.querySelector('#RemoteURL').value = event.url;
  document.querySelector('#Attendees').value = event.attendees;
  // Location options depend on the event modality
  // @TODO: send modality as a variable, replace <> with appropriate variable
  update_location_options(event.modality);
  // console.log(document.querySelector('#Time').value);
  // Set the "action" event for the form to call the update_event_from_modal for a specific event
  const form = document.querySelector('#exampleModal form');
  form.setAttribute('action', `javascript:update_event_from_modal(${id})`);

  EVENT_MODAL.show();
}

// Updates the event for a given id with values taken from the modal.

function update_event_from_modal(id) {
  // console.log(id)
  CALENDAR_EVENTS[id] = {
    name: document.querySelector('#inputName').value,
    // @TODO: Update the json object with values from the remaining fields of the modal
    day: document.querySelector('#Weekday').value,
    time: document.querySelector('#Time').value,
    modality: document.querySelector('#event-modality').value,
    location: document.querySelector('#Location').value,
    url: document.querySelector('#RemoteURL').value,
    attendees: document.querySelector('#Attendees').value,
  };

  // Update the dom and hide the event modal
  update_dom();
  EVENT_MODAL.hide();
}

// Sorts the calendar events by day and time @returns A sorted array of events
// @TODO: Replace the initialization of "events" in update_dom() to call this function.
function sort_calendar_events() {
  
  return CALENDAR_EVENTS.sort((a, b) => {
    // @TODO: First sort the calendar events by day.
    // @TODO: If the events are on the same day, sort by time.
    const map = {
      'monday': 1,'tuesday': 2,'wednesday': 3,'thursday': 4,'friday': 5,'saturday': 6,
      'sunday': 7
   };
     if ((map[a.day]- map[b.day]) != 0){

      return map[a.day]- map[b.day]
     }
     else if ((map[a.day]- map[b.day]) == 0){
      // let a_time = a.time.split(':')
      // console.log(a_time)
      // let a_sec = a_time[0]
      // a.time - b.time
      return a.time > b.time? 1:-1
     }
  });
}

function update_tooltips() {
  // @TODO: Display tooltip with the Name, Time and Location of the event.
  // The formatting of the contents of the tooltip is up to your discretion.
  // const events = sort_calendar_events();
  
  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
  const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

}