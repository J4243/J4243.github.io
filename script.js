document.addEventListener('DOMContentLoaded', () => {
  // Referencias a elementos del DOM
  const sidebar = document.getElementById('sidebar');
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const sidebarOverlay = document.getElementById('sidebarOverlay');
  
  const actionBtn = document.getElementById('actionBtn');
  const actionText = document.getElementById('actionText');
  const actionIcon = document.getElementById('actionIcon');
  
  const currentDateEl = document.getElementById('currentDate');
  const currentTimeEl = document.getElementById('currentTime');

  const navButtons = document.querySelectorAll('.nav-btn');
  const viewSections = document.querySelectorAll('.view-section');

  const cardBack = document.getElementById('cardBack');
  const cardFront = document.getElementById('cardFront');
  const imageModal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImg');
  const closeModal = document.getElementById('closeModal');

  let isBooked = true;

  // 1. Crear un botón flotante hamburguesa para móviles automáticamente
  const mobileHamburger = document.createElement('button');
  mobileHamburger.className = 'mobile-hamburger-trigger';
  mobileHamburger.innerHTML = '<i class="fa-solid fa-bars"></i>';
  document.body.appendChild(mobileHamburger);

  // Funciones para abrir/cerrar el menú
  function toggleSidebar() {
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      sidebar.classList.toggle('open');
      sidebarOverlay.classList.toggle('active');
    } else {
      sidebar.classList.toggle('collapsed');
    }
  }

  function closeMobileSidebar() {
    sidebar.classList.remove('open');
    sidebarOverlay.classList.remove('active');
  }

  // Event Listeners para el botón Hamburguesa
  hamburgerBtn.addEventListener('click', toggleSidebar);
  mobileHamburger.addEventListener('click', toggleSidebar);
  sidebarOverlay.addEventListener('click', closeMobileSidebar);

  // 2. Lógica de Agendamiento (Agendado / Cancelar)
  function updateDateTime() {
    const now = new Date();
    const optionsDate = { day: '2-digit', month: 'short', year: 'numeric' };
    const dateStr = now.toLocaleDateString('es-ES', optionsDate);
    
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    const hoursStr = hours.toString().padStart(2, '0');

    currentDateEl.textContent = `Hoy. ${dateStr}`;
    currentTimeEl.textContent = `${hoursStr}:${minutes} ${ampm}`;
  }

  // Actualizar hora en tiempo real
  updateDateTime();
  setInterval(updateDateTime, 10000);

  // Alternar el estado de agendamiento
  actionBtn.addEventListener('click', () => {
    isBooked = !isBooked;
    if (isBooked) {
      actionBtn.className = 'status-badge booked';
      actionIcon.innerHTML = '<i class="fa-solid fa-check"></i>';
      actionText.textContent = 'Viaje Agendado!';
    } else {
      actionBtn.className = 'status-badge available';
      actionIcon.innerHTML = '<i class="fa-solid fa-plus"></i>';
      actionText.textContent = 'Agendar Viaje';
    }
  });

  // 3. Navegación entre Secciones
  window.navigateTo = function(targetId) {
    viewSections.forEach(section => section.classList.remove('active'));
    navButtons.forEach(btn => btn.classList.remove('active'));

    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.classList.add('active');
    }

    const activeNavBtn = document.querySelector(`.nav-btn[data-target="${targetId}"]`);
    if (activeNavBtn) {
      activeNavBtn.classList.add('active');
    }

    if (window.innerWidth <= 768) {
      closeMobileSidebar();
    }
  };

  navButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const target = btn.getAttribute('data-target');
      navigateTo(target);
    });
  });

  // 4. Abrir imágenes en el Modal al hacer clic
  function openModal(imgSrc) {
    modalImg.src = imgSrc;
    imageModal.classList.add('active');
  }

  cardBack.addEventListener('click', () => openModal(cardBack.querySelector('img').src));
  cardFront.addEventListener('click', () => openModal(cardFront.querySelector('img').src));

  closeModal.addEventListener('click', () => {
    imageModal.classList.remove('active');
  });

  imageModal.addEventListener('click', (e) => {
    if (e.target === imageModal) {
      imageModal.classList.remove('active');
    }
  });
});