/**
 * Escudo Digital — App Logic
 * Interactive quiz, animations, navigation, and counters
 */

// ===== QUIZ DATA =====
const quizQuestions = [
  {
    scenario: "Você recebe uma mensagem no WhatsApp de um número desconhecido:",
    sender: "Suporte WhatsApp",
    senderIcon: "💬",
    message: "Olá! Identificamos atividade suspeita na sua conta. Para manter seu WhatsApp seguro, precisamos confirmar seu número. Envie o código de 6 dígitos que você recebeu por SMS.",
    options: [
      { text: "É golpe — o WhatsApp nunca pede código por mensagem", correct: true },
      { text: "Parece legítimo — vou enviar o código para proteger minha conta", correct: false }
    ],
    explanation: "O WhatsApp NUNCA entra em contato pedindo códigos de verificação. Se você enviar o código, o golpista clona sua conta e se passa por você para pedir dinheiro aos seus contatos."
  },
  {
    scenario: "Sua mãe recebe esta mensagem de um número novo:",
    sender: "Número Desconhecido",
    senderIcon: "👤",
    message: "Oi mãe! Mudei de número, salva aí! Mãe, estou com um problema urgente. Preciso que você me transfira R$ 1.200 via Pix pra eu pagar um boleto que vence hoje. Depois te devolvo!",
    options: [
      { text: "Parece urgente — é melhor transferir logo para ajudar", correct: false },
      { text: "É golpe — preciso ligar para o número antigo e confirmar", correct: true }
    ],
    explanation: "Este é o golpe do 'falso parente'. O criminoso usa fotos das redes sociais para se passar por alguém da família. SEMPRE ligue para o número antigo da pessoa ou faça uma videochamada antes de transferir dinheiro."
  },
  {
    scenario: "Você recebe um SMS do que parece ser seu banco:",
    sender: "Banco Central",
    senderIcon: "🏦",
    message: "ALERTA: Compra aprovada no seu cartão final 4532 no valor de R$ 3.847,00 em MAGAZINE ONLINE. Se não reconhece, clique aqui para cancelar: seguranca-bancobr.xyz/cancelar",
    options: [
      { text: "É golpe — o link não é do site oficial do banco", correct: true },
      { text: "Vou clicar no link para cancelar a compra rapidamente", correct: false }
    ],
    explanation: "O link usa um domínio falso (.xyz). Bancos nunca enviam links por SMS para cancelar compras. Se receber algo assim, abra o app oficial do banco ou ligue para o número no verso do cartão."
  },
  {
    scenario: "Um amigo compartilha este link no grupo do WhatsApp:",
    sender: "Grupo da Família",
    senderIcon: "👨‍👩‍👧‍👦",
    message: "Gente, a Coca-Cola está dando um kit de Natal grátis! Eu já resgatei o meu! É só preencher um formulário e compartilhar com 10 pessoas. Corre que é limitado! 🎁🎄 promo-cocacola-natal.com/resgatar",
    options: [
      { text: "Se meu amigo compartilhou, deve ser confiável — vou participar", correct: false },
      { text: "É golpe — promoções reais ficam no site oficial da marca", correct: true }
    ],
    explanation: "Promoções que exigem compartilhamento obrigatório são sempre golpes. Mesmo que um amigo tenha compartilhado, ele provavelmente também foi vítima. Promoções reais estão no site oficial da empresa."
  },
  {
    scenario: "Você recebe uma proposta no WhatsApp:",
    sender: "Renda Extra Digital",
    senderIcon: "💰",
    message: "🔥 OPORTUNIDADE ÚNICA! Ganhe de R$ 300 a R$ 3.000 por dia fazendo tarefas simples pelo celular! Investimento inicial de apenas R$ 50 com retorno de 200% em 24h. Centenas de pessoas já lucraram! Quer participar?",
    options: [
      { text: "É golpe — retornos de 200% em 24h não existem no mercado real", correct: true },
      { text: "Vou tentar com R$ 50 — é pouco dinheiro para testar", correct: false }
    ],
    explanation: "Nenhum investimento legítimo garante retorno de 200% em 24h. Esse é o golpe da 'tarefa/renda extra'. Eles podem até pagar no início para ganhar sua confiança, mas depois pedem valores maiores e somem."
  },
  {
    scenario: "Você recebe uma ligação e depois esta mensagem no WhatsApp:",
    sender: "Central Antifraude",
    senderIcon: "🔒",
    message: "Sou do departamento de segurança do Banco. Detectamos uma invasão na sua conta. Para sua proteção, preciso que instale o app TeamViewer para que eu possa bloquear os acessos indevidos remotamente.",
    options: [
      { text: "Vou instalar — o banco precisa proteger minha conta", correct: false },
      { text: "É golpe — bancos nunca pedem para instalar apps de acesso remoto", correct: true }
    ],
    explanation: "NENHUM banco pede para você instalar apps de acesso remoto (TeamViewer, AnyDesk, etc.). Com acesso remoto, o criminoso controla seu celular e faz transferências. Desligue e ligue para o banco pelo número oficial."
  },
  {
    scenario: "Você recebe um e-mail com o assunto 'Ação judicial em seu nome':",
    sender: "Tribunal Regional",
    senderIcon: "⚖️",
    message: "Prezado(a), informamos que existe um processo judicial nº 2026.0012.3456 em tramitação contra seu CPF. Para consultar os detalhes e evitar bloqueio de bens, acesse o documento em anexo (Intimacao_Judicial.exe).",
    options: [
      { text: "É golpe — arquivo .exe é programa malicioso, não documento", correct: true },
      { text: "Preciso verificar — vou abrir o arquivo para ver o processo", correct: false }
    ],
    explanation: "Arquivos .exe são programas executáveis, não documentos. A Justiça não envia intimações por e-mail com arquivos executáveis. Esse tipo de arquivo instala vírus ou ransomware no seu computador."
  },
  {
    scenario: "Alguém que você conheceu online há 2 meses manda esta mensagem:",
    sender: "Roberto 💕",
    senderIcon: "💕",
    message: "Amor, estou viajando a trabalho e minha carteira foi roubada. Estou sem dinheiro para o hotel e a passagem de volta. Você poderia me emprestar R$ 3.000 via Pix? Quando voltar ao Brasil semana que vem eu te pago. Só confio em você.",
    options: [
      { text: "Vou ajudar — confio nele/nela e parece uma situação real", correct: false },
      { text: "É golpe sentimental — nunca envie dinheiro para quem só conhece online", correct: true }
    ],
    explanation: "Este é o golpe sentimental. Os criminosos criam relacionamentos virtuais, ganham sua confiança por semanas/meses e depois inventam emergências para pedir dinheiro. Nunca envie dinheiro para quem você só conhece pela internet."
  }
];

// ===== APP STATE =====
let currentQuestion = 0;
let score = 0;
let quizActive = true;

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollAnimations();
  initTabs();
  initQuiz();
  initCounters();
  initShareButtons();
});

// ===== NAVBAR =====
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const links = navLinks.querySelectorAll('.nav-link');

  // Scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active link
    updateActiveLink();
  });

  // Mobile toggle
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // Close mobile menu on link click
  links.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });
}

function updateActiveLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPos = window.scrollY + 200;

  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-link[href="#${id}"]`);

    if (link) {
      if (scrollPos >= top && scrollPos < top + height) {
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('animated');
        }, parseInt(delay));
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('[data-animate]').forEach(el => {
    observer.observe(el);
  });
}

// ===== TABS =====
function initTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.dataset.tab;

      // Deactivate all
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      // Activate selected
      btn.classList.add('active');
      document.getElementById(`tab-${tabId}`).classList.add('active');

      // Re-trigger animations for new tab content
      const newCards = document.getElementById(`tab-${tabId}`).querySelectorAll('[data-animate]');
      newCards.forEach((card, idx) => {
        card.classList.remove('animated');
        setTimeout(() => {
          card.classList.add('animated');
        }, idx * 100);
      });
    });
  });
}

// ===== QUIZ =====
function initQuiz() {
  renderQuestion();

  document.getElementById('quizRestart').addEventListener('click', () => {
    currentQuestion = 0;
    score = 0;
    quizActive = true;
    document.getElementById('quizResult').classList.add('hidden');
    document.getElementById('quizCard').style.display = 'block';
    document.querySelector('.quiz-progress').style.display = 'block';
    document.querySelector('.quiz-progress-text').style.display = 'block';
    renderQuestion();
  });
}

function renderQuestion() {
  const q = quizQuestions[currentQuestion];
  const total = quizQuestions.length;

  // Update progress
  const progressBar = document.getElementById('quizProgressBar');
  const progressText = document.getElementById('quizProgressText');
  progressBar.style.width = `${((currentQuestion + 1) / total) * 100}%`;
  progressText.textContent = `Pergunta ${currentQuestion + 1} de ${total}`;

  // Scenario
  document.getElementById('quizScenario').innerHTML = `<p>📌 ${q.scenario}</p>`;

  // Message
  document.getElementById('quizMessage').innerHTML = `
    <div class="msg-header">
      <div class="msg-avatar">${q.senderIcon}</div>
      <span class="msg-sender">${q.sender}</span>
    </div>
    <p class="msg-text">"${q.message}"</p>
  `;

  // Options
  const optionsHTML = q.options.map((opt, idx) => {
    const letters = ['A', 'B'];
    return `
      <div class="quiz-option" data-correct="${opt.correct}" onclick="selectAnswer(this, ${opt.correct})">
        <span class="option-letter">${letters[idx]}</span>
        <span>${opt.text}</span>
      </div>
    `;
  }).join('');
  document.getElementById('quizOptions').innerHTML = optionsHTML;

  // Hide feedback
  const feedback = document.getElementById('quizFeedback');
  feedback.classList.remove('show', 'correct', 'wrong');
  feedback.style.display = 'none';
}

function selectAnswer(element, isCorrect) {
  if (!quizActive) return;

  const options = document.querySelectorAll('.quiz-option');
  const feedback = document.getElementById('quizFeedback');
  const q = quizQuestions[currentQuestion];

  // Disable all options
  options.forEach(opt => {
    opt.classList.add('disabled');
    if (opt.dataset.correct === 'true') {
      opt.classList.add('correct');
    }
  });

  if (isCorrect) {
    element.classList.add('correct');
    score++;
    feedback.classList.add('correct');
    feedback.innerHTML = `
      <h4>✅ Correto!</h4>
      <p>${q.explanation}</p>
      ${currentQuestion < quizQuestions.length - 1 
        ? '<button class="next-btn" onclick="nextQuestion()">Próxima Pergunta →</button>' 
        : '<button class="next-btn" onclick="showResults()">Ver Resultado →</button>'}
    `;
  } else {
    element.classList.add('wrong');
    feedback.classList.add('wrong');
    feedback.innerHTML = `
      <h4>❌ Incorreto!</h4>
      <p>${q.explanation}</p>
      ${currentQuestion < quizQuestions.length - 1 
        ? '<button class="next-btn" onclick="nextQuestion()">Próxima Pergunta →</button>' 
        : '<button class="next-btn" onclick="showResults()">Ver Resultado →</button>'}
    `;
  }

  feedback.style.display = 'block';
  feedback.classList.add('show');
  quizActive = false;
}

function nextQuestion() {
  currentQuestion++;
  quizActive = true;
  renderQuestion();

  // Smooth scroll to quiz card
  document.getElementById('quizCard').scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function showResults() {
  const total = quizQuestions.length;
  const percent = Math.round((score / total) * 100);

  document.getElementById('quizCard').style.display = 'none';
  document.querySelector('.quiz-progress').style.display = 'none';
  document.querySelector('.quiz-progress-text').style.display = 'none';

  const result = document.getElementById('quizResult');
  result.classList.remove('hidden');

  // Set result based on score
  let icon, title, desc;
  if (percent >= 90) {
    icon = '🏆';
    title = 'Excelente! Você é um expert!';
    desc = 'Você está muito bem preparado contra golpes digitais. Continue assim e compartilhe esse conhecimento com sua família e amigos!';
  } else if (percent >= 60) {
    icon = '👍';
    title = 'Muito bom! Quase lá!';
    desc = 'Você tem bons conhecimentos, mas ainda pode melhorar. Revise os tipos de golpes na seção acima e tente novamente!';
  } else if (percent >= 40) {
    icon = '⚠️';
    title = 'Atenção! Você está vulnerável.';
    desc = 'Alguns golpes ainda podem te enganar. Leia com atenção as seções de prevenção e tipos de golpes para se proteger melhor.';
  } else {
    icon = '🚨';
    title = 'Cuidado! Risco alto!';
    desc = 'Você precisa se informar melhor sobre golpes digitais. Leia todas as seções deste site e compartilhe com sua família. A informação é sua melhor defesa!';
  }

  document.getElementById('resultIcon').textContent = icon;
  document.getElementById('resultTitle').textContent = title;
  document.getElementById('resultDesc').textContent = desc;
  document.getElementById('scoreText').textContent = `${percent}%`;

  // Animate score circle
  const circumference = 2 * Math.PI * 54; // r = 54
  const offset = circumference - (percent / 100) * circumference;

  // Add SVG gradient
  const svg = document.querySelector('.score-circle svg');
  if (!svg.querySelector('defs')) {
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    defs.innerHTML = `
      <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#10b981"/>
        <stop offset="100%" stop-color="#06d6a0"/>
      </linearGradient>
    `;
    svg.prepend(defs);
  }

  const scoreFill = document.getElementById('scoreFill');
  scoreFill.style.strokeDasharray = circumference;
  scoreFill.style.strokeDashoffset = circumference;
  scoreFill.setAttribute('stroke', 'url(#scoreGradient)');

  requestAnimationFrame(() => {
    setTimeout(() => {
      scoreFill.style.strokeDashoffset = offset;
    }, 100);
  });

  // Scroll to result
  result.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// ===== COUNTERS =====
function initCounters() {
  const counters = document.querySelectorAll('.stat-number');

  const observerOptions = {
    threshold: 0.5
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
  const target = parseFloat(element.dataset.count);
  const duration = 2000;
  const start = performance.now();
  const isDecimal = target % 1 !== 0;

  function update(currentTime) {
    const elapsed = currentTime - start;
    const progress = Math.min(elapsed / duration, 1);

    // Ease out
    const easeOut = 1 - Math.pow(1 - progress, 3);
    const currentValue = target * easeOut;

    if (isDecimal) {
      element.textContent = currentValue.toFixed(1);
    } else {
      element.textContent = Math.round(currentValue);
    }

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

// ===== SHARE =====
function initShareButtons() {
  const shareWhatsApp = document.getElementById('shareWhatsApp');
  const shareCopy = document.getElementById('shareCopy');

  if (shareWhatsApp) {
    shareWhatsApp.addEventListener('click', () => {
      const text = encodeURIComponent(
        '🛡️ Aprenda a se proteger de golpes digitais! Esse site ensina tudo sobre fraudes no WhatsApp e na internet. Compartilhe com sua família: ' +
        window.location.href
      );
      window.open(`https://wa.me/?text=${text}`, '_blank');
    });
  }

  if (shareCopy) {
    shareCopy.addEventListener('click', () => {
      navigator.clipboard.writeText(window.location.href).then(() => {
        const originalText = shareCopy.textContent;
        shareCopy.textContent = '✅ Link copiado!';
        shareCopy.style.borderColor = 'var(--accent-success)';
        shareCopy.style.color = 'var(--accent-success)';
        setTimeout(() => {
          shareCopy.textContent = originalText;
          shareCopy.style.borderColor = '';
          shareCopy.style.color = '';
        }, 2000);
      });
    });
  }
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offset = 80;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});
