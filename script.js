let currentPage = 0;
const totalPages = 7;
const audio = document.getElementById('backgroundMusic');
const audioToggle = document.getElementById('audioToggle');
const languageToggle = document.getElementById('languageToggle');
let isPlaying = false;
let currentLanguage = 'fr';

// Traductions
const translations = {
    fr: {
        page0: {
            title: "Pour toi, mon cœur ❤️",
            text1: "Hey mon cœur, je sais que je ne suis pas parfait, notamment pour communiquer... mais sache que mon amour pour toi n'a jamais cessé de grandir.",
            text2: "C'est pourquoi j'ai créé ce petit site pour te montrer à quel point tu comptes pour moi et pour qu'on puisse revivre ensemble les moments magiques de pur bonheur passés ensemble...",
            button: "Commencer ✨"
        },
        page1: {
            title: "Autour de Noël et du Nouvel An 🎄",
            text1: "C'était une période magique, festive et joyeuse...",
            text2: "Et c'est là que nos chemins se sont croisés pour la première fois. Moi qui pensait passer une année déjà magnifique, je vennais d'être subjugué par ta personne. Ce fut moment parfait, marquant le début de quelque chose de merveilleux.",
            button: "Continuer →"
        },
        page2: {
            title: "Des appels interminables 📱",
            text1: "Ces conversations qui duraient des heures et des heures...",
            text2: "Passionnantes, enrichissantes, où chaque minute passée à t'écouter était un cadeau. Le temps s'arrêtait et rien d'autre n'avait d'importance.",
            button: "Continuer →"
        },
        page3: {
            title: "Nos rêves d'évasion 🌊",
            text1: "On se projetait déjà dans le futur...",
            text2: "Imaginant nos prochains voyages et notre première réelle rencontre en France, au bord de la mer azure, le vent dans les cheveux et l'horizon devant nous. Construire ensemble des moments inoubliables.",
            button: "Continuer →"
        },
        page4: {
            title: "Ta voix, ta personnalité 💫",
            text1: "Dès que je t'ai entendue, j'ai su...",
            text2: "Par ta douce voix et ta personnalité unique, j'ai compris que je ne pourrais jamais me passer de toi. Tu es devenue essentielle à mon bonheur et j'aimerais rester à tes  côtés pour toujours.",
            button: "Continuer →"
        },
        page5: {
            title: "La première fois que je t'ai vue 😍",
            text1: "Ce moment reste gravé dans ma mémoire...",
            text2: "Je ne pouvais plus détourner le regard. Toute ta beauté me laisse perpétuellement bouche bée, et depuis, je n'ai d'yeux que pour toi.",
            button: "Continuer →"
        },
        page6: {
            title: "Mia, will you be my Valentine? 💝"
        }
    },
    en: {
        page0: {
            title: "For you Mia, mon coeur ❤️",
            text1: "Hey mon coeur, I know I'm far from perfect, especially when it comes to communicating, but know that my love for you never stopped growing.",
            text2: "That's why I created this little website to show you how much you mean to me, so that we can live again the magical moments of pure happiness spent together...",
            button: "Start ✨"
        },
        page1: {
            title: "Around Christmas and New Year 🎄",
            text1: "It was a magical, festive and joyful time...",
            text2: "And that's when our paths crossed for the first time. As I thought that I spent a happy and healthy year, I was just mind blown by the person you are. It was the perfect moment, marking the beginning of something wonderful.",
            button: "Continue →"
        },
        page2: {
            title: "Endless calls 📱",
            text1: "Those conversations that lasted hours upon hours...",
            text2: "Fascinating, enriching, where every minute spent listening to you was a gift. Time stopped and nothing else mattered.",
            button: "Continue →"
        },
        page3: {
            title: "Our dreams of escape 🌊",
            text1: "We were already projecting ourselves into the future...",
            text2: "Imagining our next trips and our first real encounter in France, by the azure sea, wind in our hair and the horizon ahead of us. Building countless and timeless memories together.",
            button: "Continue →"
        },
        page4: {
            title: "Your voice, your personality 💫",
            text1: "As soon as I heard you, I knew...",
            text2: "Through your sweet voice and wonderful personality, I understood that I could never get bored of you. You became a major part of my happiness, and I wish I could forever stay by your side.",
            button: "Continue →"
        },
        page5: {
            title: "The first time I saw you 😍",
            text1: "That moment remains engraved in my memory...",
            text2: "I couldn't look away anymore. All your gorgeousness forever left me speechless, and since then, I only have eyes for you.",
            button: "Continue →"
        },
        page6: {
            title: "Mia, will you be my Valentine? 💝"
        }
    }
};

// Fonction pour changer la langue
function toggleLanguage() {
    currentLanguage = currentLanguage === 'fr' ? 'en' : 'fr';
    languageToggle.textContent = currentLanguage === 'fr' ? '🇫🇷' : '🇬🇧';
    updateTexts();
}

// Fonction pour mettre à jour tous les textes
function updateTexts() {
    for (let i = 0; i < totalPages; i++) {
        const pageData = translations[currentLanguage][`page${i}`];
        const page = document.getElementById(`page${i}`);
        
        const title = page.querySelector('h1');
        const paragraphs = page.querySelectorAll('p');
        const button = page.querySelector('button');
        
        if (title) title.textContent = pageData.title;
        if (paragraphs[0] && pageData.text1) paragraphs[0].textContent = pageData.text1;
        if (paragraphs[1] && pageData.text2) paragraphs[1].textContent = pageData.text2;
        if (button && pageData.button) button.textContent = pageData.button;
    }
}

// Event listener pour le bouton de langue
languageToggle.addEventListener('click', toggleLanguage);

// Canvas pour l'animation de cœurs
const canvas = document.getElementById('hearts-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Particules en forme de cœur
class Heart {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + 50;
        this.size = Math.random() * 20 + 10;
        this.speedY = Math.random() * 1.5 + 0.5;
        this.speedX = (Math.random() - 0.5) * 2;
        this.opacity = Math.random() * 0.5 + 0.3;
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = '#ff1744';
        
        // Dessiner un cœur
        ctx.beginPath();
        const topCurveHeight = this.size * 0.3;
        ctx.moveTo(this.x, this.y + topCurveHeight);
        
        // Courbe gauche
        ctx.bezierCurveTo(
            this.x, this.y, 
            this.x - this.size / 2, this.y, 
            this.x - this.size / 2, this.y + topCurveHeight
        );
        
        // Courbe gauche du bas
        ctx.bezierCurveTo(
            this.x - this.size / 2, this.y + (this.size + topCurveHeight) / 2, 
            this.x, this.y + (this.size + topCurveHeight) / 2, 
            this.x, this.y + this.size
        );
        
        // Courbe droite du bas
        ctx.bezierCurveTo(
            this.x, this.y + (this.size + topCurveHeight) / 2, 
            this.x + this.size / 2, this.y + (this.size + topCurveHeight) / 2, 
            this.x + this.size / 2, this.y + topCurveHeight
        );
        
        // Courbe droite
        ctx.bezierCurveTo(
            this.x + this.size / 2, this.y, 
            this.x, this.y, 
            this.x, this.y + topCurveHeight
        );
        
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }

    update() {
        this.y -= this.speedY;
        this.x += this.speedX;
        
        if (this.y < -50) {
            this.y = canvas.height + 50;
            this.x = Math.random() * canvas.width;
        }
    }
}

// Créer des cœurs
const hearts = [];
for (let i = 0; i < 50; i++) {
    hearts.push(new Heart());
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    hearts.forEach(heart => {
        heart.update();
        heart.draw();
    });
    
    requestAnimationFrame(animate);
}

animate();

// Gestion du redimensionnement
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Navigation entre les pages
function nextPage() {
    if (currentPage < totalPages - 1) {
        document.getElementById(`page${currentPage}`).classList.remove('active');
        currentPage++;
        document.getElementById(`page${currentPage}`).classList.add('active');
        updatePageCounter();
        
        // Démarrer la musique au premier clic si pas encore démarrée
        if (!isPlaying && currentPage === 1) {
            audio.play().catch(e => console.log('Autoplay bloqué'));
            isPlaying = true;
            audioToggle.textContent = '🔊';
        }
    }
}

// Contrôle audio
audioToggle.addEventListener('click', () => {
    if (isPlaying) {
        audio.pause();
        audioToggle.textContent = '🔇';
        isPlaying = false;
    } else {
        audio.play().catch(e => console.log('Erreur lecture audio'));
        audioToggle.textContent = '🔊';
        isPlaying = true;
    }
});

// Compteur de pages
function updatePageCounter() {
    const counter = document.getElementById('pageCounter');
    if (currentPage === 0) {
        counter.textContent = '';
    } else {
        counter.textContent = `${currentPage} / ${totalPages - 1}`;
    }
}

updatePageCounter();

// Démarrage automatique de la musique (peut être bloqué par le navigateur)
window.addEventListener('click', () => {
    if (!isPlaying) {
        audio.play().catch(e => console.log('Autoplay nécessite interaction utilisateur'));
        isPlaying = true;
        audioToggle.textContent = '🔊';
    }
}, { once: true });