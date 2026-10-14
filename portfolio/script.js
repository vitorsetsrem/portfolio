/**
 * PORTFÓLIO - JOÃO VITOR SESTREM
 * Lógica, Interatividade e Animações Naturais
 */

document.addEventListener('DOMContentLoaded', () => {
  // Inicializa ícones do Lucide
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Ano dinâmico no rodapé
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ----------------------------------------------------
     1. ANIMAÇÕES NATURAIS DE ENTRADA NA ROLAGEM
     ---------------------------------------------------- */
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -30px 0px'
    });

    revealElements.forEach((el) => observer.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add('is-visible'));
  }

  /* ----------------------------------------------------
     2. TEMA (DARK / LIGHT MODE)
     ---------------------------------------------------- */
  const themeToggle = document.getElementById('themeToggle');
  const htmlRoot = document.documentElement;

  const savedTheme = localStorage.getItem('portfolio-theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'light') {
    htmlRoot.classList.remove('dark');
  } else if (savedTheme === 'dark') {
    htmlRoot.classList.add('dark');
  } else if (!systemPrefersDark) {
    htmlRoot.classList.remove('dark');
  } else {
    htmlRoot.classList.add('dark');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDark = htmlRoot.classList.contains('dark');
      if (isDark) {
        htmlRoot.classList.remove('dark');
        localStorage.setItem('portfolio-theme', 'light');
      } else {
        htmlRoot.classList.add('dark');
        localStorage.setItem('portfolio-theme', 'dark');
      }
      if (window.lucide) {
        window.lucide.createIcons();
      }
    });
  }

  /* ----------------------------------------------------
     3. MENU MOBILE RESPONSIVO
     ---------------------------------------------------- */
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  /* ----------------------------------------------------
     4. COPIAR E-MAIL COM FEEDBACK VISUAL
     ---------------------------------------------------- */
  const copyBtn = document.getElementById('copyEmailBtn');
  const copyText = document.getElementById('copyEmailText');
  const emailValue = document.getElementById('emailValue');

  if (copyBtn && emailValue && copyText) {
    copyBtn.addEventListener('click', async () => {
      const email = emailValue.textContent.trim();
      try {
        await navigator.clipboard.writeText(email);
        const originalText = copyText.textContent;
        copyText.textContent = 'Copiado!';
        copyText.classList.add('text-blue-700', 'dark:text-blue-400');

        setTimeout(() => {
          copyText.textContent = originalText;
          copyText.classList.remove('text-blue-700', 'dark:text-blue-400');
        }, 2500);
      } catch (err) {
        console.error('Falha ao copiar:', err);
      }
    });
  }

  /* ----------------------------------------------------
     5. FORMULÁRIO DE CONTATO
     ---------------------------------------------------- */
  const contactForm = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const feedbackEl = document.getElementById('formFeedback') || document.getElementById('formSuccess');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.classList.add('opacity-75');
        submitBtn.innerHTML = `<span>Enviando...</span>`;
      }

      setTimeout(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.classList.remove('opacity-75');
          submitBtn.innerHTML = `<span>Enviar Mensagem</span><i data-lucide="send" class="w-3.5 h-3.5"></i>`;
        }

        contactForm.reset();

        if (feedbackEl) {
          feedbackEl.classList.remove('hidden');
          setTimeout(() => {
            feedbackEl.classList.add('hidden');
          }, 4500);
        }

        if (window.lucide) {
          window.lucide.createIcons();
        }
      }, 700);
    });
  }
});
