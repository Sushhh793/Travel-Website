const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: 1000,
};

// header container
ScrollReveal().reveal(".header__container h1", {
  ...scrollRevealOption,
});

ScrollReveal().reveal(".header__form", {
  ...scrollRevealOption,
  delay: 500,
});

// trending container
ScrollReveal().reveal(".trending__card", {
  ...scrollRevealOption,
  interval: 500,
});

// destination container
ScrollReveal().reveal(".destination__card", {
  duration: 1000,
  interval: 500,
});

// seller container
ScrollReveal().reveal(".seller__card", {
  ...scrollRevealOption,
  interval: 500,
});

// guide container
ScrollReveal().reveal(".guide__card", {
  ...scrollRevealOption,
  interval: 500,
});

//  client container
ScrollReveal().reveal(".client__card", {
  ...scrollRevealOption,
  interval: 500,
});
function toggleLoginModal() {
  const modal = document.getElementById("loginModal");
  modal.classList.toggle("active");
}

function showTab(tab) {
  document.querySelectorAll(".auth-form").forEach(form => form.classList.remove("active"));
  document.querySelectorAll(".auth-tab").forEach(btn => btn.classList.remove("active"));

  document.getElementById(tab + "Form").classList.add("active");
  document.querySelector(`.auth-tab[onclick="showTab('${tab}')"]`).classList.add("active");
}

function handleLogin() {
  const username = document.getElementById("loginUsername").value.trim();
  const password = document.getElementById("loginPassword").value.trim();
  const users = JSON.parse(localStorage.getItem("users")) || {};

  if (users[username] && users[username] === password) {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("loggedInUser", username);
    toggleLoginModal();
    updateAuthUI();
  } else {
    alert("Incorrect username or password.");
  }
}

function handleRegister() {
  const username = document.getElementById("registerUsername").value.trim();
  const password = document.getElementById("registerPassword").value.trim();
  const users = JSON.parse(localStorage.getItem("users")) || {};

  if (users[username]) {
    alert("Username already exists.");
  } else if (!username || !password) {
    alert("Please enter both fields.");
  } else {
    users[username] = password;
    localStorage.setItem("users", JSON.stringify(users));
    alert("Registration successful! You can now log in.");
    showTab('login');
  }
}

function logout() {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("loggedInUser");
  location.reload();
}

function updateAuthUI() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const navAuth = document.querySelector(".nav__auth");

  if (isLoggedIn === "true") {
    const user = localStorage.getItem("loggedInUser");
    navAuth.innerHTML = `
      <span style="color: white; margin-right: 10px;">Hi, ${user}</span>
      <button class="btn" onclick="logout()">Logout</button>
    `;
  }
}

const packageTrips = {
  europe: {
    title: "Europe Adventure - 5 Days",
    amount: "₹95,000",
    guide: {
      name: "Maria Lefevre",
      experience: "10 years guiding in Europe",
      contact: "+33 6 12 34 56 78"
    },
    requirements: ["Valid Passport", "Schengen Visa", "Winter Jacket", "Travel Insurance"],
    itinerary: [
      "Day 1: Arrive in Paris – Visit Eiffel Tower and Seine River Cruise",
      "Day 2: Louvre Museum and Champs-Élysées tour",
      "Day 3: Travel to Switzerland – Explore Lucerne and Mt. Titlis",
      "Day 4: Interlaken sightseeing & optional skydiving",
      "Day 5: Return to Paris and Departure"
    ]
  },
  maldives: {
    title: "Maldives Luxury Trip - 4 Days",
    amount: "₹72,000",
    guide: {
      name: "Zane Mohammed",
      experience: "7 years as a Maldives resort tour guide",
      contact: "+960 7781234"
    },
    requirements: ["Passport", "Beachwear", "Snorkeling gear (optional)", "Sunscreen"],
    itinerary: [
      "Day 1: Arrival and check-in to overwater villa",
      "Day 2: Island hopping and snorkeling with turtles",
      "Day 3: Spa day, sunset beach BBQ, and dolphin cruise",
      "Day 4: Leisure morning and departure"
    ]
  },
  dubai: {
    title: "Dubai Explorer - 4 Days",
    amount: "₹68,500",
    guide: {
      name: "Ahmed Saeed",
      experience: "12 years of luxury tours in UAE",
      contact: "+971 55 987 6543"
    },
    requirements: ["Passport", "Visa or Visa on Arrival", "Modest clothing for mosque", "Sunglasses"],
    itinerary: [
      "Day 1: Arrival and Dhow Cruise Dinner at Dubai Marina",
      "Day 2: Dubai city tour – Burj Khalifa, Dubai Mall, Desert Safari",
      "Day 3: Abu Dhabi Grand Mosque and Ferrari World",
      "Day 4: Leisure shopping and return flight"
    ]
  }
};
function showPackageModal(place) {
  const modal = document.getElementById("packageModal");
  const title = document.getElementById("modalTitle");
  const body = document.getElementById("modalBody");

  const trip = packageTrips[place];
  const user = localStorage.getItem("loggedInUser") || "";

  title.textContent = trip.title;

  body.innerHTML = `
    <p><strong>Total Amount:</strong> ${trip.amount}</p>
    <p><strong>Travel Guide:</strong> ${trip.guide.name} (${trip.guide.experience})<br/>
    <strong>Contact:</strong> ${trip.guide.contact}</p>

    <h3>Itinerary</h3>
    <ul>${trip.itinerary.map(day => `<li>${day}</li>`).join("")}</ul>
  `;

  modal.classList.add("active");
}

function closePackageModal() {
  document.getElementById("packageModal").classList.remove("active");
}

function bookNow(place) {
  const user = localStorage.getItem("loggedInUser");
  if (!user) {
    alert("Please login to book this trip.");
    closePackageModal();
    toggleLoginModal(); // Show login modal
    return;
  }

  alert(`🎉 Booking confirmed for ${place.toUpperCase()}! Thank you, ${user}. We'll contact you soon.`);
  closePackageModal();
}
function submitBooking(event, place) {
  event.preventDefault();
  const form = event.target;

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const guests = form.guests.value.trim();
  const date = form.date.value;

  if (!name || !email || !guests || !date) {
    alert("Please fill out all booking details.");
    return;
  }

  alert(`✅ Booking Confirmed for ${place.toUpperCase()}!
Name: ${name}
Email: ${email}
Guests: ${guests}
Date: ${date}`);

  form.reset();
  closePackageModal();
}
document.getElementById("availabilityForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const form = new FormData(this);
  const params = new URLSearchParams(form).toString();
  window.location.href = `availability.html?${params}`;
});

