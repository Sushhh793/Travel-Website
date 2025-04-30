const destinations = [
  { name: "Europe", available: true },
  { name: "Maldives", available: false },
  { name: "Dubai", available: true },
  { name: "Greece", available: true },
  { name: "Tokyo", available: false },
  { name: "Himalayas", available: true },
  { name: "London", available: false },

  // Newly Added Places
  { name: "Munnar", available: true },
  { name: "Ooty & Kodaikanal", available: true },
  { name: "Manali", available: true },
  { name: "Darjeeling", available: true },
  { name: "Ladakh", available: true },
  { name: "Varkala", available: true },
  { name: "Aleppey", available: true },
  { name: "Gokarna", available: true },
  { name: "Andaman and Nicobar Islands", available: true },
  { name: "Lakshadweep", available: true },
  { name: "Coorg", available: true },
  { name: "Goa", available: true },
  { name: "Delhi", available: true },
  { name: "South and North Korea", available: true },
  { name: "Singapore & Malaysia", available: true },
  { name: "Bali", available: true }
];
  
  function loadAvailability() {
    const params = new URLSearchParams(window.location.search);
    const destinationInput = params.get("destination")?.toLowerCase();
    const container = document.getElementById("availabilityList");
  
    const filtered = destinations.filter(dest =>
      dest.name.toLowerCase().includes(destinationInput)
    );
  
    if (filtered.length === 0) {
      container.innerHTML = `<p>No destinations match your search for "${params.get("destination")}".</p>`;
      return;
    }
  
    filtered.forEach(dest => {
      const div = document.createElement("div");
      div.className = "availability__item";
      div.innerHTML = `
        <span>${dest.name}</span>
        <span class="${dest.available ? "available" : "not-available"}">
          ${dest.available ? "Available" : "Not Available"}
        </span>
        ${
          dest.available
            ? `<button class="btn" onclick="openBookingModal('${dest.name}')">Book Now</button>`
            : ""
        }
      `;
      container.appendChild(div);
    });
  }
  
  function openBookingModal(place) {
    document.getElementById("bookingModal").classList.add("active");
    document.getElementById("bookingPlace").value = place;
    document.getElementById("bookingTitle").textContent = `Book your trip to ${place}`;
  }
  
  function closeBookingModal() {
    document.getElementById("bookingModal").classList.remove("active");
  }
  
  function submitBooking(event) {
    event.preventDefault();
    const form = event.target;
  
    const place = form.place.value;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const guests = form.guests.value.trim();
    const date = form.date.value;
  
    if (!name || !email || !guests || !date) {
      alert("Please fill in all booking details.");
      return;
    }
  
    alert(`🎉 Booking Confirmed!
  Destination: ${place}
  Name: ${name}
  Email: ${email}
  Guests: ${guests}
  Date: ${date}`);
  
    form.reset();
    closeBookingModal();
  }
  
  document.addEventListener("DOMContentLoaded", loadAvailability);
  function submitBooking(e) {
    e.preventDefault();
    const f = e.target;
  
    const booking = {
      place: f.place.value,
      name: f.name.value,
      email: f.email.value,
      guests: f.guests.value,
      date: f.date.value,
    };
  
    // Store the booking to localStorage
    const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    bookings.push(booking);
    localStorage.setItem("bookings", JSON.stringify(bookings));
  
    alert(`🎉 Booking Confirmed!\nDestination: ${booking.place}\nName: ${booking.name}\nEmail: ${booking.email}\nGuests: ${booking.guests}\nDate: ${booking.date}`);
    f.reset();
    closeBookingModal();
  }
  