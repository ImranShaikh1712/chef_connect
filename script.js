document.addEventListener('DOMContentLoaded', () => {

  // --- SMOOTH SCROLL FOR NAV LINKS ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  // --- REVEAL SECTIONS ON SCROLL ---
  const sections = document.querySelectorAll('.content-section');
  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    sections.forEach(sec => {
      const secTop = sec.getBoundingClientRect().top;
      // Reveal section when its top is 100px above the bottom of the viewport
      if (secTop < windowHeight - 100) {
        sec.classList.add('show');
      }
    });
  };
  // Initial check in case some sections are already in view on page load
  revealOnScroll(); 
  window.addEventListener('scroll', revealOnScroll);
  
  // --- LOGIN MODAL LOGIC ---
  const loginModal = document.getElementById('login-modal');
  const loginBtn = document.querySelector('.login-btn');
  const closeBtn = document.querySelector('.close-btn');
  const loginForm = document.getElementById('login-form');

  // Function to open the modal
  const openModal = () => {
    loginModal.style.display = 'block';
  };

  // Function to close the modal
  const closeModal = () => {
    loginModal.style.display = 'none';
  };

  // Event listeners to open and close the modal
  loginBtn.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);

  // Close modal if user clicks on the background overlay
  window.addEventListener('click', (event) => {
    if (event.target == loginModal) {
      closeModal();
    }
  });
  
  // Handle form submission (for demonstration)
  loginForm.addEventListener('submit', (e) => {
      e.preventDefault(); // Prevent the form from actually submitting
      // In a real application, you would send the data to a server here.
      // For this demo, we'll just show an alert.
      alert('Login successful! (This is a demonstration)');
      closeModal(); // Close the modal after "login"
  });

  // --- INTERACTIVE BUTTONS LOGIC ---

  // Search bar functionality
  const searchBar = document.querySelector('.search-bar');
  searchBar.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && this.value.trim() !== '') {
      alert(`Searching for "${this.value}"...`);
      this.value = ''; // Clear search bar after search
    }
  });

  // "Upload Recipe" button in the "Add Recipes" section
  const uploadBtn = document.querySelector('#add .btn');
  if(uploadBtn) {
    uploadBtn.addEventListener('click', () => {
        alert('The "Upload Recipe" feature is coming soon!');
    });
  }

  // "Find a Chef" button in the "Chef Connect" section
  const findChefBtn = document.querySelector('#connect .btn');
  if(findChefBtn) {
    findChefBtn.addEventListener('click', () => {
        alert('The "Find a Chef" feature will be available shortly!');
    });
  }
});
