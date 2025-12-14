
//Load menu
//fetch menu items from the backend api
fetch("/api/v1/menu")
  .then(response => response.json()) // convert response to javascript object
  .then(menu => {
    const container = document.getElementById("menu") // get the div where menu items will be displayed

    // loop through each menu item and create HTML elements
    menu.forEach(item => {
      const div = document.createElement("div") // create a container for each menu item
      div.className = "card" // apply CSS styling

      // menu item image from url & placeholder image
      const imageUrl = item.image && item.image.trim() !== "" 
                       ? item.image 
                       : "https://media.istockphoto.com/id/947687236/photo/quadruple-stack-of-ice-cream-scoops-on-a-sugar-cone.jpg?s=612x612&w=0&k=20&c=G49PjJDEvFgeec06_36rsrqtQpG-nVLUUdKoOMLf240="

      // fill the div with menu item information
      div.innerHTML = `
        <img src="${imageUrl}" alt="${item.name}" class="menu-image">
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <p class="price">${item.price}</p>
      `
      container.appendChild(div) // add this menu item to the page
    })
  })


// Load events
// fetch events from the backend api
fetch("/api/v1/events")
  .then(response => response.json())// convert response to javascript object
  .then(events => {
    const list = document.getElementById("events");// get the list where events will be

    // loop through each event and create a clickable link
    events.forEach(event => {
      const li = document.createElement("li");
      // link includes event number in the URL
      li.innerHTML = `
        <a href="events.html?id=${event.number}">
          ${event.name}  ${event.date}
        </a>
      `;
      list.appendChild(li);// add this event to the list
    });
  });

/// get event number from url parameter
function getEventNumberFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

// display event details on the event page
function displayEvent(eventData) {
  const container = document.getElementById("eventContainer");// div where event details will be

  if (!eventData) {
    container.innerHTML = "<p>Event not found.</p>";// show message if event is missing
    return;
  }

  // display event information in html
  container.innerHTML = `
    <h2>${eventData.name}</h2>
    <p><strong>Location:</strong> ${eventData.location}</p>
    <p><strong>Date:</strong> ${eventData.date}</p>
    <p><strong>Time:</strong> ${eventData.time}</p>
  `;
}


// fetch and load the event data from backend
function loadEvent() {
  const eventNumber = getEventNumberFromURL();// get event number from url

  if (!eventNumber) {
    document.getElementById("eventContainer").innerHTML = "<p>No event selected.</p>";
    return;
  }

   // fetch event data from backend using the event number
  fetch("/api/v1/events/" + eventNumber)
    .then(response => response.json())// convert response to javascript object
    .then(eventData => displayEvent(eventData))// display the event details
    .catch(error => {
      console.error("Error loading event:", error);
      document.getElementById("eventContainer").innerHTML = "<p>Error loading event.</p>";
    });
}

// run the function to display event when the page loads
loadEvent();


//admin forms

//get menu form data
function getMenuFormData() {
  return {
    number: Number(document.getElementById("menuNumber").value),
    name: document.getElementById("menuName").value,
    description: document.getElementById("menuDescription").value,
    price: Number(document.getElementById("menuPrice").value),
    image: document.getElementById("menuImage").value
  }
}

//get event form data
function getEventFormData() {
  return {
    number: Number(document.getElementById("eventNumber").value),
    name: document.getElementById("eventName").value,
    location: document.getElementById("eventLocation").value,
    date: document.getElementById("eventDate").value,
    time: document.getElementById("eventTime").value
  }
}

//submit menu form
function submitMenuForm(eventObject) {
  eventObject.preventDefault() // prevent page reload

  const menuData = getMenuFormData()

  fetch("/api/v1/menu", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(menuData)
  })
  .then(function() {
    alert("Menu item added successfully")
    document.getElementById("menuForm").reset()
  })
}

//submit event form
function submitEventForm(eventObject) {
  eventObject.preventDefault() // prevent page reload

  const eventData = getEventFormData()

  fetch("/api/v1/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(eventData)
  })
  .then(function() {
    alert("Event added successfully")
    document.getElementById("eventForm").reset()
  })
}

//add event listeners to the admin forms
function addFormEventListeners() {
  document.getElementById("menuForm").addEventListener("submit", submitMenuForm)
  document.getElementById("eventForm").addEventListener("submit", submitEventForm)
}

// run the function when page loads
addFormEventListeners()