document.addEventListener("DOMContentLoaded", () => {
  fetch("../json/events.json")
    .then((response) => response.json())
    .then((data) => renderEvents(data))
    .catch((error) => console.error("Error loading events:", error));

  const model = document.getElementById("event-model");
  const closeBtn = document.querySelector(".close");

  closeBtn.onclick = function () {
    model.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target === model) {
      model.style.display = "none";
    }
  };
});

function renderEvents(events) {
  const eventContainer = document.getElementById("event-container");
  events.forEach((event) => {
    const eventCard = document.createElement("div");
    eventCard.classList.add("event-card");

    eventCard.innerHTML = `
      <img src="${event.thumbnail}" alt="${event.eventName}">
      <div class="event-details">
        <h2>${event.eventName}</h2>
        <p class="date"><strong>Date:</strong> ${new Date(
          event.date
        ).toLocaleDateString()}</p>
        <p class="time"><strong>Time:</strong> ${new Date(
          event.startTime
        ).toLocaleTimeString()} - ${new Date(
      event.endTime
    ).toLocaleTimeString()}</p>
        <p class="location"><strong>Location:</strong> ${
          event.location.venueName
        }, ${event.location.city}, ${event.location.state}, ${
      event.location.country
    }</p>
        
        <button class="view-details-btn-1">View Details</button>
      </div>
    `;

    eventContainer.appendChild(eventCard);

    const viewDetailsBtn = eventCard.querySelector(".view-details-btn-1");
    viewDetailsBtn.addEventListener("click", () => {
      document.getElementById(
        "event-description"
      ).textContent = `More details about ${event.eventName}...`;
      document.getElementById("event-model").style.display = "block";
    });
  });
}
