// =============================
// MENU BURGER
// =============================
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

if (hamburger && navMenu) {
  hamburger.addEventListener("click", mobileMenu);

  function mobileMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  }

  function closeMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  }

  navLinks.forEach((link) => link.addEventListener("click", closeMenu));
}

// =============================
// THEME SOMBRE / CLAIR
// =============================
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');

function switchTheme(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  }
}

if (toggleSwitch) {
  toggleSwitch.addEventListener("change", switchTheme, false);

  const currentTheme = localStorage.getItem("theme");

  if (currentTheme) {
    document.documentElement.setAttribute("data-theme", currentTheme);

    if (currentTheme === "dark") {
      toggleSwitch.checked = true;
    } else {
      toggleSwitch.checked = false;
    }
  }
}

// =============================
// DATE FOOTER
// =============================
const myDate = document.querySelector("#datee");

if (myDate) {
  myDate.innerHTML = new Date().getFullYear();
}

// =============================
// MODAL PROJETS PORTFOLIO
// =============================
const cards = document.querySelectorAll(".card");
const modal = document.getElementById("projectModal");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");
const modalCounter = document.getElementById("modalCounter");
const closeModalBtn = document.getElementById("closeModal");
const prevImageBtn = document.getElementById("prevImage");
const nextImageBtn = document.getElementById("nextImage");
const modalOverlay = document.querySelector(".project-modal-overlay");

if (
  cards.length > 0 &&
  modal &&
  modalImage &&
  modalTitle &&
  modalText &&
  modalCounter &&
  closeModalBtn &&
  prevImageBtn &&
  nextImageBtn &&
  modalOverlay
) {
  let currentImages = [];
  let currentIndex = 0;

  function updateModal() {
    if (currentImages.length === 0) return;

    modalImage.src = currentImages[currentIndex].trim();
    modalCounter.textContent = `${currentIndex + 1} / ${currentImages.length}`;
  }

  function closeProjectModal() {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const images = card.dataset.images ? card.dataset.images.split(",") : [];
      const title = card.dataset.title || "";
      const description = card.dataset.description || "";

      if (images.length === 0) return;

      currentImages = images;
      currentIndex = 0;

      modalTitle.textContent = title;
      modalText.textContent = description;

      updateModal();

      modal.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });

  nextImageBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % currentImages.length;
    updateModal();
  });

  prevImageBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    updateModal();
  });

  closeModalBtn.addEventListener("click", closeProjectModal);
  modalOverlay.addEventListener("click", closeProjectModal);

  document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("active")) return;

    if (e.key === "Escape") {
      closeProjectModal();
    }

    if (e.key === "ArrowRight") {
      currentIndex = (currentIndex + 1) % currentImages.length;
      updateModal();
    }

    if (e.key === "ArrowLeft") {
      currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
      updateModal();
    }
  });
}

// =============================
// CASES À COCHER / RADIOS
// =============================
const casecocher = document.querySelectorAll('#competences input[type="radio"]');

// version du stockage
const storageVersion = "v2";

// reset uniquement si la version change
if (localStorage.getItem("skill_version") !== storageVersion) {
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith("skill_")) {
      localStorage.removeItem(key);
    }
  });

  localStorage.setItem("skill_version", storageVersion);
}

// restauration des cases cochées
casecocher.forEach((input) => {
  const cle = "skill_" + input.name;
  const etatSave = localStorage.getItem(cle);

  if (etatSave === "checked") {
    input.checked = true;
  }
});

// sauvegarde des cases cochées
casecocher.forEach((input) => {
  const cle = "skill_" + input.name;

  input.addEventListener("change", () => {
    if (input.checked) {
      localStorage.setItem(cle, "checked");
    } else {
      localStorage.removeItem(cle);
    }
  });
});

/*const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", mobileMenu);

function mobileMenu() {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
}

// Close navbar when link is clicked
const navLink = document.querySelectorAll(".nav-link");

navLink.forEach((n) => n.addEventListener("click", closeMenu));

function closeMenu() {
  hamburger.classList.remove("active");
  navMenu.classList.remove("active");
}

// Event Listeners: Handling toggle event
const toggleSwitch = document.querySelector(
  '.theme-switch input[type="checkbox"]'
);

function switchTheme(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
  }
}

toggleSwitch.addEventListener("change", switchTheme, false);

//  Store color theme for future visits

function switchTheme(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark"); //add this
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light"); //add this
  }
}

// Save user preference on load

const currentTheme = localStorage.getItem("theme")
  ? localStorage.getItem("theme")
  : null;

if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);

  if (currentTheme === "dark") {
    toggleSwitch.checked = true;
  }
}

//Adding date

let myDate = document.querySelector("#datee");

const yes = new Date().getFullYear();
myDate.innerHTML = yes;

/* =============================
   MODAL PROJETS PORTFOLIO
============================= */

/*const cards = document.querySelectorAll('.card');
const modal = document.getElementById('projectModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalText = document.getElementById('modalText');
const modalCounter = document.getElementById('modalCounter');
const closeModal = document.getElementById('closeModal');
const prevImage = document.getElementById('prevImage');
const nextImage = document.getElementById('nextImage');
const modalOverlay = document.querySelector('.project-modal-overlay');

if (
  cards.length > 0 &&
  modal &&
  modalImage &&
  modalTitle &&
  modalText &&
  modalCounter &&
  closeModal &&
  prevImage &&
  nextImage &&
  modalOverlay
) {
  let currentImages = [];
  let currentIndex = 0;

  function updateModal() {
    modalImage.src = currentImages[currentIndex];
    modalCounter.textContent = `${currentIndex + 1} / ${currentImages.length}`;
  }

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const images = card.dataset.images.split(',');
      const title = card.dataset.title;
      const description = card.dataset.description;

      currentImages = images;
      currentIndex = 0;

      modalTitle.textContent = title;
      modalText.textContent = description;

      updateModal();
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  nextImage.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % currentImages.length;
    updateModal();
  });

  prevImage.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    updateModal();
  });

  function closeProjectModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  closeModal.addEventListener('click', closeProjectModal);
  modalOverlay.addEventListener('click', closeProjectModal);

  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;

    if (e.key === "Escape") closeProjectModal();

    if (e.key === "ArrowRight") {
      currentIndex = (currentIndex + 1) % currentImages.length;
      updateModal();
    }

    if (e.key === "ArrowLeft") {
      currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
      updateModal();
    }
  });
}

//Cases à cocher
// Sélectionne toutes les cases radio 
const casecocher = document.querySelectorAll(
    '#competences input[type="radio"]'
);

// version du stockage (à changer si tu modifies tes cases)
const storageVersion = "v2";

// vérifie la version
if (localStorage.getItem("skill_version") !== storageVersion) {
    Object.keys(localStorage).forEach(key => {
        if (key.startsWith("skill_")) {
            localStorage.removeItem(key);
        }
    });

    localStorage.setItem("skill_version", storageVersion);
}

// restaure l'état
casecocher.forEach(input => {
    const cle = 'skill_' + input.name;
    const etatSave = localStorage.getItem(cle);

    if (etatSave === 'checked') {
        input.checked = true;
    }
});

// sauvegarde l'état
casecocher.forEach(input => {
    const cle = 'skill_' + input.name;

    input.addEventListener('change', () => {
        if (input.checked) {
            localStorage.setItem(cle, 'checked');
        } else {
            localStorage.removeItem(cle);
        }
    });
});*/
