// Import Three.js
import * as THREE from "three"

// Three.js background
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer({ alpha: true })
renderer.setSize(window.innerWidth, window.innerHeight)
document.getElementById("three-background").appendChild(renderer.domElement)

const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
const material = new THREE.MeshBasicMaterial({ color: 0x4a90e2, wireframe: true })
const torus = new THREE.Mesh(geometry, material)
scene.add(torus)

camera.position.z = 30

function animate() {
  requestAnimationFrame(animate)
  torus.rotation.x += 0.01
  torus.rotation.y += 0.01
  renderer.render(scene, camera)
}
animate()

particlesJS('particles-js', {
  particles: {
    number: { value: 80, density: { enable: true, value_area: 800 } },
    color: { value: '#4a90e2' },
    shape: { type: 'circle' },
    opacity: { value: 0.5, random: false },
    size: { value: 3, random: true },
    line_linked: { enable: true, distance: 150, color: '#4a90e2', opacity: 0.4, width: 1 },
    move: { enable: true, speed: 6, direction: 'none', random: false, straight: false, out_mode: 'out', bounce: false }
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: { enable: true, mode: 'repulse' },
      onclick: { enable: true, mode: 'push' },
      resize: true
    }
  },
  modes: {
    grab: { distance: 400, line_linked: { opacity: 1 } },
    bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
    repulse: { distance: 200, duration: 0.4 },
    push: { particles_nb: 4 },
    remove: { particles_nb: 2 }
  }
}) 

// GSAP animations
gsap.from(".hero h1", { opacity: 0, y: -50, duration: 1, delay: 0.5 })
gsap.from(".hero p", { opacity: 0, y: -30, duration: 1, delay: 0.8 })
gsap.from(".cta-button", { opacity: 0, y: -20, duration: 1, delay: 1.1 })

gsap.from(".feature-card", {
  opacity: 0,
  y: 50,
  duration: 0.8,
  stagger: 0.2,
  scrollTrigger: {
    trigger: ".feature-cards",
    start: "top 80%",
  },
})

// Chatbot logic
const openChatBtn = document.getElementById("chatbot-btn");
const closeChatBtn = document.getElementById("close-chatbot");
const chatbot = document.getElementById("chatbot");
const chatMessages = document.getElementById("chatbot-messages");
const userInput = document.getElementById("chat-input");

openChatBtn.addEventListener("click", () => {
  chatbot.style.display = "block";
  openChatBtn.style.display = "none"; // Hide the button when the chat opens
});

closeChatBtn.addEventListener("click", () => {
  chatbot.style.display = "none";
  openChatBtn.style.display = "block"; // Show the button again when the chat is closed
});

userInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter" && event.target.value.trim() !== "") {
    let userMessage = event.target.value.trim();
    displayMessage(userMessage, "user");

    // Bot's new reply
    setTimeout(function() {
      let botMessage = "We've received your message and will get back to you by mail.";
      displayMessage(botMessage, "bot");
    }, 1000);

    event.target.value = ""; // Clear input after sending
  }
});

function displayMessage(message, sender) {
  const messageElement = document.createElement("div");
  messageElement.classList.add(sender);
  messageElement.textContent = message;
  chatMessages.appendChild(messageElement);
  chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to the latest message
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});
