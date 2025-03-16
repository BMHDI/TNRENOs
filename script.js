function toggleMenu() {
  const menuList = document.querySelector(".menu-list");
  const menuIcon = document.getElementById("menu-icon");
  const navbar = document.querySelector(".navbar");

  menuList.classList.toggle("show");

  if (menuList.classList.contains("show")) {
    menuIcon.textContent = "X"; // Change to close icon
    navbar.style.top = "0px"; // Keep navbar visible
    scrollDisabled = true; // Disable hiding on scroll
  } else {
    menuIcon.textContent = "☰"; // Change back to hamburger icon
    scrollDisabled = false; // Enable hiding on scroll
  }
}

//    window.addEventListener('scroll', () => {
//        if (scrollDisabled) return; // Prevent hiding if menu is open

//        const navbar = document.querySelector('.navbar');
//        if (window.scrollY < lastScrollY) {
//            // Scrolling up → Show navbar
//            navbar.style.top = '0';
//        } else {
//            // Scrolling down → Hide navbar
//            navbar.style.top = '-100px';
//        }

//        lastScrollY = window.scrollY;
//    });
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
        const name = formData.get("name");
        const email = formData.get("email");
        const message = formData.get("message");
        const phone = formData.get("phone");
        const button = document.getElementById('send-email-button');
        console.log(name, email, message);
  
        // Show sending...
        button.textContent = 'Sending...';
  
        // Make an AJAX request to the email sending endpoint
        try {
          const response = await fetch("http://localhost:3000/send-email", {
            method: "POST",
            mode: "cors",
            body: formData,
          });
  
          console.log("Response:", response); // Add this line to log the response
  
          if (response.ok) {
            console.log("Email sent successfully!");
            document.getElementById("confirmation-div").innerHTML =
              "<div class='confirmation'>Email sent successfully!</div>";
  
            // Reset the form
            form.reset();
          } else {
            const errorResponse = await response.json();
            const errorMessage = errorResponse.error || errorResponse.message;
            console.error("Error sending email:", errorMessage);
            document.getElementById(
              "confirmation-div"
            ).innerHTML = `<div class='error'>${errorMessage}</div>`;
          }
        } catch (error) {
          console.error("Error sending email:", error);
          document.getElementById(
            "confirmation-div"
          ).innerHTML = `<div class='error'>${error}</div><div class='error'>Error sending email please try again!</div>`;
        } finally {
          // Reset button text
          button.textContent = 'Send Email';
        }
      });
    } else {
      console.error("Form not found");
    }
  });
