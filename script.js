
   function toggleMenu() {
       const menuList = document.querySelector('.menu-list');
       const menuIcon = document.getElementById('menu-icon');
       const navbar = document.querySelector('.navbar');

       menuList.classList.toggle('show');

       if (menuList.classList.contains('show')) {
           menuIcon.textContent = 'X'; // Change to close icon
           navbar.style.top = '0px'; // Keep navbar visible
           scrollDisabled = true; // Disable hiding on scroll
       } else {
           menuIcon.textContent = '☰'; // Change back to hamburger icon
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
   const topBar = document.querySelector('.top-bar');
   const navbar = document.querySelector('.navbar');
   
   window.addEventListener('scroll', () => {
     if (window.scrollY > lastScrollY) {
       // Scrolling down → stick navbar to top
       navbar.style.position = 'fixed';
       navbar.style.top = '0';
      
     } else {
       // Scrolling up → show top bar and unstick navbar
       navbar.style.position = 'sticky';

     }
   
     lastScrollY = window.scrollY;
   });
   
   
   // Video Logic

   const video = document.getElementById('video-background');

   const videoSources = [
       './assets/video1.mp4',
       './assets/video2.mp4',
       './assets/video3.mp4',
       './assets/video4.mp4',
       './assets/video5.mp4',
       './assets/video6.mp4'
     
   ];
   
   let currentIndex = 0;
   
   function playNextVideo() {
       video.src = videoSources[currentIndex];
       video.load(); // Ensure the new video is loaded
       video.play();
   
       currentIndex = (currentIndex + 1) % videoSources.length;
   }
   
   // When the video ends, load the next one
   video.addEventListener('ended', playNextVideo);
   
   // Start playback
   playNextVideo();
   


   // Image Scroll Logic
//    let currentIndex = 0;
//    const images = document.querySelectorAll('.hero img');
//    const totalImages = images.length;
   
//    function showImage(index) {
//        console.log(`Showing image ${index + 1} of ${totalImages}`);
//        images.forEach((img, i) => {
//            img.classList.remove('active', 'next');
//            if (i === index) {
//                img.classList.add('active');
//            } else if (i === (index + 1) % totalImages) {
//                img.classList.add('next');
//            }
//        });
//    }
   
//    function startScroll() {
//        showImage(currentIndex);
//        currentIndex = (currentIndex + 1) % totalImages;
   
//        setTimeout(() => {
//            showImage(currentIndex);
//            currentIndex = (currentIndex + 1) % totalImages;
//        }, 4000);
   
//        setTimeout(startScroll, 5000);
//    }
   
//    Promise.all(
//        Array.from(images).map(
//            (img) =>
//                new Promise((resolve, reject) => {
//                    img.onload = resolve;
//                    img.onerror = reject;
//                })
//        )
//    ).then(() => {
//        console.log('All images loaded');
//        showImage(currentIndex);
//        setTimeout(startScroll, 4000);
//    }).catch((error) => console.error('Failed to load an image:', error));

document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("Form");
    if (form !== null) {
        form.addEventListener("submit", async (event) => {
            event.preventDefault(); // prevent default form submission behavior

            // Get the form data
            const formData = new FormData(form);
            const name = formData.get("name");
            const email = formData.get("email");
            const message = formData.get("message");
            console.log(name, email, message);

            // Make an AJAX request to the email sending endpoint
            try {
                const response = await fetch("http://localhost:3000/send-email", {
                    method: "POST",
                    mode: "cors", // Add this line to handle CORS policy error
                    body: formData,
                });

                if (response.ok) {
                    console.log("Email sent successfully!");
                    document.getElementById("confirmation-div").innerHTML = "<p>Email sent successfully!</p>";
                } else {
                    console.error("Error sending email:", response.statusText);
                    document.getElementById("confirmation-div").innerHTML = "<p>Error sending email please try again!</p>";
                }
            } catch (error) {
                console.error("Error sending email:", error);
                document.getElementById("confirmation-div").innerHTML = "<p>Error sending email please try again!</p>";

            }
        });
    } else {
        console.error("Form not found");
    }
});
   