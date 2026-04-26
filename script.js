var audio = document.getElementById('bgMusic');
var toggleBtn = document.getElementById('musicToggleBtn');
var isMusicPlaying = false;

function toggleMusic() {
  if (isMusicPlaying) {
    audio.pause();
    toggleBtn.innerHTML = 'MUSIC OFF';
    isMusicPlaying = false;
  } else {
    var playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.then(function() {
        toggleBtn.innerHTML = 'MUSIC ON';
        isMusicPlaying = true;
      }).catch(function(error) {
        console.warn("Автовоспроизведение заблокировано:", error);
        toggleBtn.innerHTML = 'CLICK ME';
        setTimeout(function() {
          if(!isMusicPlaying) toggleBtn.innerHTML = 'MUSIC OFF';
        }, 1500);
      });
    }
  }
}

if (audio && toggleBtn) {
  audio.addEventListener('play', function() {
    if(audio.currentTime > 0 || !audio.paused) {
      toggleBtn.innerHTML = 'MUSIC ON';
      isMusicPlaying = true;
    }
  });
  audio.addEventListener('pause', function() {
    toggleBtn.innerHTML = 'MUSIC OFF';
    isMusicPlaying = false;
  });
  toggleBtn.addEventListener('click', toggleMusic);
}

document.addEventListener('DOMContentLoaded', function() {
  var playPromise = audio.play();
  if (playPromise !== undefined) {
    playPromise.then(function() {
      toggleBtn.innerHTML = 'MUSIC ON';
      isMusicPlaying = true;
    }).catch(function(error) {
      console.warn("Автовоспроизведение заблокировано:", error);
      toggleBtn.innerHTML = 'MUSIC OFF';
    });
  }
});

var scrollBtn = document.getElementById('scrollTopBtn');
if (scrollBtn) {
  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
      scrollBtn.classList.add('visible');
    } else {
      scrollBtn.classList.remove('visible');
    }
  });
  scrollBtn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function createChords() {
  var container = document.getElementById('chords-container');
  if(!container) return;
  var chordNames = ['Am', 'C', 'D', 'Em', 'G', 'F', 'E', 'A', 'B', 'Dm'];
  var chordCount = 20;
  for(var i = 0; i < chordCount; i++) {
    var chord = document.createElement('div');
    chord.classList.add('chord');
    var randomChord = chordNames[Math.floor(Math.random() * chordNames.length)];
    chord.textContent = randomChord;
    chord.style.left = Math.random() * 100 + '%';
    chord.style.bottom = Math.random() * 80 + 5 + '%';
    chord.style.animationDelay = Math.random() * 5 + 's';
    chord.style.animationDuration = (Math.random() * 3 + 2.5) + 's';
    chord.style.opacity = Math.random() * 0.2 + 0.1;
    container.appendChild(chord);
  }
}
createChords();

function initAccordion() {
  var accordionItems = document.querySelectorAll('.accordion-item');
  for (var i = 0; i < accordionItems.length; i++) {
    var item = accordionItems[i];
    var header = item.querySelector('.accordion-header');
    if (header) {
      header.addEventListener('click', function() {
        this.parentElement.classList.toggle('open');
      });
    }
  }
}

var quotes = [
  { text: "Когда слова заканчиваются, начинает говорить гитара.", author: "Виктор Цой" },
  { text: "Гитара — это самый простой способ выразить себя.", author: "Джими Хендрикс" },
  { text: "В шести струнах заключена целая вселенная.", author: "Томми Эммануэль" }
];

function updateRandomQuote() {
  var quoteElement = document.getElementById('random-quote');
  if (quoteElement) {
    var randomIndex = Math.floor(Math.random() * quotes.length);
    var quote = quotes[randomIndex];
    quoteElement.innerHTML = '<div class="quote-text">' + quote.text + '</div><div class="quote-author">— ' + quote.author + '</div>';
  }
}

function setActiveNav() {
  var currentPage = window.location.pathname.split('/').pop();
  var navLinks = document.querySelectorAll('.nav-btn');
  for (var i = 0; i < navLinks.length; i++) {
    var link = navLinks[i];
    var href = link.getAttribute('href');
    if (href === currentPage || 
        (currentPage === '' && href === 'index.html') || 
        (currentPage === '/' && href === 'index.html') ||
        (currentPage === 'index.html' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  }
}

document.addEventListener('DOMContentLoaded', function() {
  setActiveNav();
  initAccordion();
  updateRandomQuote();
});