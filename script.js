document.addEventListener('DOMContentLoaded', () => {
    // Gestione Preloader dinamico
    const logo = document.querySelector('.logo-text');
    if(logo) {
        setTimeout(() => logo.style.opacity = '1', 100);
    }
    
    // Attendi load del DOM, poi rimuovi splash screen
    setTimeout(() => {
        const preloader = document.querySelector('.preloader');
        if(preloader) preloader.classList.add('slide-up');
        
        const hero = document.querySelector('.hero');
        if(hero) hero.classList.add('loaded');
        
        // Attiva animazioni testuali
        const fadeElements = document.querySelectorAll('.hero .fade-up');
        fadeElements.forEach(el => el.classList.add('visible'));
    }, 1800); // Più veloce se l'utente vuole navigare subito
});

// Navbar change on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Scroll Reveal Observer
const revealElements = document.querySelectorAll('.scroll-reveal');
const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
};
const revealOptions = { root: null, threshold: 0.15, rootMargin: "0px 0px -100px 0px" };
const revealObserver = new IntersectionObserver(revealCallback, revealOptions);
revealElements.forEach(el => revealObserver.observe(el));


// Widget Contatto Fluttuante
const contactBubble = document.querySelector('.main-bubble');
const contactFloat = document.querySelector('.floating-contact');
if(contactBubble && contactFloat) {
    contactBubble.addEventListener('click', () => {
        contactFloat.classList.toggle('active');
    });
    // Chiudi off-click
    document.addEventListener('click', (e) => {
        if(!contactFloat.contains(e.target)) {
            contactFloat.classList.remove('active');
        }
    });
}

// Carousel Scroll Buttons
const track = document.getElementById('roomTrack');
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');

if(track && nextBtn && prevBtn) {
    const scrollAmount = 400; 
    nextBtn.addEventListener('click', () => {
        track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
    prevBtn.addEventListener('click', () => {
        track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
}


// Modale Stanze Logic Data
const roomsData = {
    'giulia': {
        title: 'Suite Giulia',
        desc: "L'equilibrio perfetto tra eleganza minimalista e il tepore del design pugliese. Questa suite vanta uno spazio immenso e un balcone con vista privilegiata. Ideale per le coppie.",
        amenities: ['Letto King Size', 'Balcone Privato Panoramico', 'Vasca Idromassaggio', 'Macchina Caffè Espresso', 'Wi-Fi Ultra veloce'],
        img: 'assets/room.png',
        mailSubject: 'Informazioni Prenotazione Suite Giulia'
    },
    'sofia': {
        title: 'Camera Sofia',
        desc: 'Torna alle origini grazie alle imponenti pareti in pietra originaria di questa struttura. Un nido caldo ed accogliente, restaurato con passione maniacale.',
        amenities: ['Letto Matrimoniale Deluxe', 'Pareti in pietra del 1400', 'Doccia a Pioggia', 'Smart TV a schermo piatto', 'Climatizzazione Indipendente'],
        img: 'assets/room.png',
        mailSubject: 'Informazioni Prenotazione Camera Sofia'
    },
    'martina': {
        title: 'Camera Martina',
        desc: 'Fresca e giovanile. La Camera Martina richiama i toni accesi del nostro storico marchio. Uno spazio dove l\'anima si rigenera tra tessuti morbidi organici e design contemporaneo.',
        amenities: ['Letto a Baldacchino', 'Area Salottino interna', 'Vista sulla pittoresca corte interna', 'Set di Cortesia Bio'],
        img: 'assets/room.png',
        mailSubject: 'Informazioni Prenotazione Camera Martina'
    },
    'chiara': {
        title: 'Suite Chiara',
        desc: 'Un angolo di paradiso dedicato a chi non rinuncia a nulla. Il lusso è di casa nella Suite Chiara, adornata da marmi e riflessi bronzati, dove la modernità dialoga con il pregio del passato.',
        amenities: ['Letto Super King', 'Terrazzino Panoramico', 'Bagno rivestito in Marmo', 'Servizio in Camera Esclusivo', 'Welcome Drink di Casa Mia'],
        img: 'assets/room.png',
        mailSubject: 'Informazioni Prenotazione Suite Chiara'
    },
    'beatrice': {
        title: 'Dependance Beatrice',
        desc: 'Indipendenza totale. La Dependance Beatrice è uno spazio isolato e prestigioso dedicato ai soggiorni prolungati o a chi desidera l\'assoluta e totale privacy.',
        amenities: ['Ingresso privato indipendente', 'Minibar dedicato', 'Cortico privato all\'aperto', 'Vasca emozionale', 'Lettore Vinili Vintage'],
        img: 'assets/room.png',
        mailSubject: 'Informazioni Prenotazione Dependance Beatrice'
    }
};

function openModal(roomId) {
    const modal = document.getElementById('room-modal');
    const data = roomsData[roomId];
    if(!modal || !data) return;

    // Popola Testi
    document.getElementById('modal-title').textContent = data.title;
    document.getElementById('modal-desc').textContent = data.desc;
    
    // Funzione helper per l'errore: mostra placeholder chiari con testo
    const fallback = (name, suff) => `https://placehold.co/800x600/EFEFEF/2C362B.jpg?text=${name.toUpperCase()}+${suff}`;

    // Immagine principale & Thumbnails dinamicamente per ogni Room!
    const mainImg = document.getElementById('modal-main-img');
    const t1 = document.getElementById('modal-thumb-1');
    const t2 = document.getElementById('modal-thumb-2');
    const t3 = document.getElementById('modal-thumb-3');

    mainImg.onerror = () => mainImg.src = fallback(roomId, 'MAIN');
    mainImg.src = `assets/${roomId}-main.jpg`;

    if(t1) { t1.onerror = () => t1.src = fallback(roomId, '1'); t1.src = `assets/${roomId}-1.jpg`; }
    if(t2) { t2.onerror = () => t2.src = fallback(roomId, '2'); t2.src = `assets/${roomId}-2.jpg`; }
    if(t3) { t3.onerror = () => t3.src = fallback(roomId, '3'); t3.src = `assets/${roomId}-3.jpg`; }

    // Popola Lista Servizi
    const amList = document.getElementById('modal-amenities');
    amList.innerHTML = '';
    data.amenities.forEach(am => {
        const li = document.createElement('li');
        li.textContent = am;
        amList.appendChild(li);
    });

    const emailBtn = document.getElementById('modal-email');
    if(emailBtn) {
        emailBtn.href = `mailto:barsvevo@libero.it?subject=${encodeURIComponent(data.mailSubject)}&body=Salve, vorrei chiedere disponibilità sulla ${data.title}...`;
    }

    // Mostra il Modale
    modal.classList.add('show');
    // Nascondiamo l'overflow dal body per non far scorrere la pagina dietro
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('room-modal');
    if(modal) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
}

// Chiudi col tasto ESC
document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape') closeModal();
});

// Funzione globale chiamata dalle thumbnail
window.changeModalImg = function(src) {
    document.getElementById('modal-main-img').src = src;
}
