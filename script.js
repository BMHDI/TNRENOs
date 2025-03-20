document.addEventListener("DOMContentLoaded", function () {
  // Get the menu elements
  const menuIcon = document.getElementById("menu-icon");
  const menuList = document.querySelector(".menu-list");
  const navbar = document.querySelector(".navbar");
  let scrollDisabled = false;
  const menuItems = document.querySelectorAll(".menu-list li a");
  // Function to handle clicks outside the menu
  function handleOutsideClick(event) {
    // If clicked outside menu and menu icon
    if (!menuList.contains(event.target) && !menuIcon.contains(event.target)) {
      // Close the menu
      menuList.classList.remove("show");
      menuIcon.textContent = "☰"; // Reset icon
      scrollDisabled = false; // Enable hiding on scroll

      // Remove the document click listener
      document.removeEventListener("click", handleOutsideClick);
    }
  }

  // Enhanced toggle function with icon changes
  function toggleMenu(event) {
    // Prevent the click from being detected by the document listener
    event.stopPropagation();

    console.log("Toggle function called");
    if (menuList) {
      menuList.classList.toggle("show");
      const isMenuShown = menuList.classList.contains("show");
      console.log("Menu visibility:", isMenuShown);

      // Change icon and navbar position based on menu state
      if (isMenuShown) {
        menuIcon.textContent = "X"; // Change to close icon
        if (navbar) navbar.style.top = "0px"; // Keep navbar visible
        scrollDisabled = true; // Disable hiding on scroll

        // Add document click listener after a short delay
        setTimeout(() => {
          document.addEventListener("click", handleOutsideClick);
        }, 10);
      } else {
        menuIcon.textContent = "☰"; // Change back to hamburger icon
        scrollDisabled = false; // Enable hiding on scroll

        // Remove document click listener when menu is manually closed
        document.removeEventListener("click", handleOutsideClick);
      }
    }
  }

    if (menuItems) {
  menuItems.forEach((item) => {
    if (item && item.addEventListener) {
      item.addEventListener("click", toggleMenu);
    }
  });
}

  // Add click event to menu icon
  if (menuIcon) {
    console.log("Adding click listener to menu icon");
    menuIcon.addEventListener("click", toggleMenu);
  }
});
// add click event to menu items


// to keep the navbar allt ime shown
// Navbar Scroll Hide/Show Logic
let lastScrollY = window.scrollY;
const topBar = document.querySelector(".top-bar");
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > lastScrollY) {
    // Scrolling down → stick navbar to top
    navbar.style.position = "fixed";
    navbar.style.top = "0";
  } else {
    // Scrolling up → show top bar and unstick navbar
    navbar.style.position = "sticky";
  }

  lastScrollY = window.scrollY;
});

// Video Logic

const video = document.getElementById("video-background");

const videoSources = [
  "./assets/video1.mp4",
  "./assets/video2.mp4",
  "./assets/video3.mp4",
  "./assets/video4.mp4",
  "./assets/video5.mp4",
  "./assets/video6.mp4",
];

let currentIndex = 0;

function playNextVideo() {
  video.src = videoSources[currentIndex];
  video.load(); // Ensure the new video is loaded
  video.play();

  currentIndex = (currentIndex + 1) % videoSources.length;
}

// When the video ends, load the next one
video.addEventListener("ended", playNextVideo);

// Start playback
playNextVideo();

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("Form");
  if (form !== null) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault(); // prevent default form submission behavior

      // Get the form data
      const formData = new FormData(form);

      const button = document.getElementById("send-email-button");

      // Show sending...
      button.textContent = "Sending...";
      document.getElementById("confirmation-div").innerHTML =
      `<div class="confirmation" style="display: flex ; justify-content: center ; align-items: start ;">Sending<span class="loader"></span></div>`;
      // Make an AJAX request to the email sending endpoint
      try {
        const response = await fetch(
          "https://tnrenos.onrender.com/send-email",
          {
            method: "POST",
            mode: "cors",
            body: formData,
          }
        );

        console.log("Response:", response); // Add this line to log the response

        if (response.ok) {
          console.log("Email sent successfully!");
          document.getElementById("confirmation-div").innerHTML =
            "<div class='confirmation'> ✅ Email sent successfully!</div>";

          // Reset the form
          form.reset();
        } else {
          const errorResponse = await response.json();
          const errorMessage = errorResponse.error || errorResponse.message;
          console.error("Error sending email:", errorMessage);
          document.getElementById(
            "confirmation-div"
          ).innerHTML = `<div class='error'> ✖️ ${errorMessage}</div>`;
        }
      } catch (error) {
        console.error("Error sending email:", error);
        document.getElementById(
          "confirmation-div"
        ).innerHTML = `<div class='error'>${error}</div><div class='error'>Error sending email please try again!</div>`;
      } finally {
        // disable button
        button.disabled = true;
        button.textContent = "Email Sent!";
      }
    });
  } else {
    console.error("Form not found");
  }
});