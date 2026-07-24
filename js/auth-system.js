/**
 * Sistema de Autenticação e Personalização do Nome da Tatuaria
 * Gerencia o estado de login no localStorage e atualiza a interface dinamicamente.
 */

document.addEventListener('DOMContentLoaded', function () {
  const overlay = document.getElementById('auth-overlay');
  const authForm = document.getElementById('auth-form');
  const tabCreate = document.getElementById('tab-create');
  const tabLogin = document.getElementById('tab-login');
  const authTitle = document.getElementById('auth-title');
  const submitBtn = document.getElementById('auth-submit-btn');
  const studioNameGroup = document.getElementById('group-studio-name');
  const closeBtn = document.getElementById('auth-close-btn');

  let currentTab = 'create'; // 'create' ou 'login'

  // Preenche dados salvos anteriormente se existirem (para facilidade do usuário)
  const savedStudioName = localStorage.getItem('tatuaria_nome');
  const savedUserRaw = localStorage.getItem('tatuaria_user');

  if (savedStudioName) {
    const studioInput = document.getElementById('input-studio-name');
    if (studioInput) studioInput.value = savedStudioName;
    applyStudioName(savedStudioName);
    renderUserHeaderBadge(savedStudioName);
  }

  if (savedUserRaw) {
    try {
      const parsed = JSON.parse(savedUserRaw);
      const emailInput = document.getElementById('input-email');
      if (emailInput && parsed.email) emailInput.value = parsed.email;
    } catch (e) {}
  }

  // A tela de login é OBRIGATÓRIA assim que entra no site
  if (overlay) {
    overlay.classList.remove('hidden');
  }

  // Inicia a animação do fundo Shader Lines
  if (window.initShaderAnimation) {
    setTimeout(function () {
      window.initShaderAnimation();
    }, 100);
  }

  // Alternar para a aba "Criar conta"
  if (tabCreate) {
    tabCreate.addEventListener('click', function () {
      currentTab = 'create';
      tabCreate.classList.add('active');
      tabLogin.classList.remove('active');
      authTitle.textContent = 'Criar conta';
      submitBtn.textContent = 'Criar conta';
      if (studioNameGroup) studioNameGroup.style.display = 'flex';
    });
  }

  // Alternar para a aba "Entrar"
  if (tabLogin) {
    tabLogin.addEventListener('click', function () {
      currentTab = 'login';
      tabLogin.classList.add('active');
      tabCreate.classList.remove('active');
      authTitle.textContent = 'Entrar';
      submitBtn.textContent = 'Entrar';
      if (studioNameGroup) studioNameGroup.style.display = 'none';
    });
  }

  // Evento de submit do formulário de autenticação
  if (authForm) {
    authForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const email = document.getElementById('input-email').value.trim();
      const password = document.getElementById('input-password').value;
      let studioName = '';

      if (currentTab === 'create') {
        const studioInput = document.getElementById('input-studio-name');
        studioName = studioInput ? studioInput.value.trim() : '';
        if (!studioName) {
          alert('Por favor, informe o nome da sua tatuaria.');
          return;
        }
      } else {
        // No login, se não foi fornecido novo nome, tenta buscar anterior ou define valor padrão
        studioName = localStorage.getItem('tatuaria_nome') || 'Minha Tatuaria';
      }

      if (!email || !password) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
      }

      // Salva sessão do usuário no localStorage (preparado para futuro BD)
      const userSession = {
        email: email,
        studioName: studioName,
        loggedInAt: new Date().toISOString()
      };

      localStorage.setItem('tatuaria_user', JSON.stringify(userSession));
      localStorage.setItem('tatuaria_nome', studioName);

      // Aplica as alterações no site
      applyStudioName(studioName);
      renderUserHeaderBadge(studioName);

      // Oculta o modal de login com transição
      if (overlay) {
        overlay.classList.add('hidden');
      }
    });
  }

  // Botão fechar (permite visualizar após login ou atua como fechar temporário)
  if (closeBtn) {
    closeBtn.addEventListener('click', function () {
      const saved = localStorage.getItem('tatuaria_nome');
      if (!saved) {
        applyStudioName('Sua Tatuaria');
      }
      if (overlay) overlay.classList.add('hidden');
    });
  }

  // Botão Continuar com Gmail
  const googleBtn = document.getElementById('auth-google-btn');
  if (googleBtn) {
    googleBtn.addEventListener('click', function () {
      const studioInput = document.getElementById('input-studio-name');
      const studioName = (studioInput && studioInput.value.trim()) || localStorage.getItem('tatuaria_nome') || 'Minha Tatuaria';
      const emailInput = document.getElementById('input-email');
      const email = (emailInput && emailInput.value.trim()) || 'usuario@gmail.com';

      const userSession = {
        email: email,
        studioName: studioName,
        loggedInAt: new Date().toISOString(),
        provider: 'gmail'
      };

      localStorage.setItem('tatuaria_user', JSON.stringify(userSession));
      localStorage.setItem('tatuaria_nome', studioName);

      applyStudioName(studioName);
      renderUserHeaderBadge(studioName);

      if (overlay) overlay.classList.add('hidden');
    });
  }

  // Função para atualizar o nome da tatuaria nos componentes do site
  function applyStudioName(name) {
    if (!name) return;

    // 1. Atualizar o SVG do logo no canto superior esquerdo (Hero/Header)
    const logoTexts = document.querySelectorAll('.logo-text, #dynamic-logo-text');
    logoTexts.forEach(function (el) {
      el.textContent = name;
      // Ajusta tamanho da fonte dinamicamente se o nome for longo
      if (name.length > 12) {
        el.setAttribute('font-size', '24px');
      } else if (name.length > 8) {
        el.setAttribute('font-size', '28px');
      } else {
        el.setAttribute('font-size', '36px');
      }
    });

    // 2. Atualizar títulos e menções da marca no Hero se existirem
    const brandElements = document.querySelectorAll('.dynamic-studio-name');
    brandElements.forEach(function (el) {
      el.textContent = name;
    });
  }

  // Função para renderizar o ícone de avatar branco simples com menu dropdown suspenso
  function renderUserHeaderBadge(studioName) {
    const oldContainer = document.getElementById('user-avatar-container');
    if (oldContainer) oldContainer.remove();

    const secondMenuNav = document.querySelector('#menu-hauptmenue-1') || document.querySelector('.main-menu__nav');
    if (secondMenuNav) {
      const containerLi = document.createElement('li');
      containerLi.id = 'user-avatar-container';
      containerLi.className = 'menu-item user-avatar-container';
      containerLi.innerHTML = `
        <button type="button" class="user-avatar-btn" id="user-avatar-btn" title="Perfil & Configurações" aria-label="Perfil de Usuário">
          <svg viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </button>
        <div class="user-dropdown-menu" id="user-dropdown-menu">
          <div class="dropdown-user-header">
            <div class="dropdown-studio-title">Tatuaria Atual</div>
            <div class="dropdown-studio-name" id="dropdown-studio-name-display">${escapeHtml(studioName)}</div>
          </div>
          <div class="dropdown-item" id="btn-dropdown-rename">
            <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
            </svg>
            Mudar Nome da Tatuaria
          </div>
          <div class="dropdown-item" id="btn-dropdown-login">
            <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/>
            </svg>
            Abrir Tela de Login
          </div>
          <div class="dropdown-item danger" id="btn-dropdown-logout">
            <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            Sair da Conta
          </div>
        </div>
      `;
      secondMenuNav.appendChild(containerLi);

      const avatarBtn = document.getElementById('user-avatar-btn');
      const dropdownMenu = document.getElementById('user-dropdown-menu');

      if (avatarBtn && dropdownMenu) {
        avatarBtn.addEventListener('click', function (e) {
          e.stopPropagation();
          const isShow = dropdownMenu.classList.contains('show');
          if (isShow) {
            dropdownMenu.classList.remove('show');
            avatarBtn.classList.remove('active');
          } else {
            dropdownMenu.classList.add('show');
            avatarBtn.classList.add('active');
          }
        });

        // Fechar menu ao clicar fora
        document.addEventListener('click', function (e) {
          if (!containerLi.contains(e.target)) {
            dropdownMenu.classList.remove('show');
            avatarBtn.classList.remove('active');
          }
        });
      }

      // Evento 1: Mudar Nome da Tatuaria / Projeto
      const btnRename = document.getElementById('btn-dropdown-rename');
      const renameModal = document.getElementById('rename-modal-overlay');
      const renameInput = document.getElementById('rename-studio-input');
      const btnCancel = document.getElementById('rename-btn-cancel');
      const btnSave = document.getElementById('rename-btn-save');

      if (btnRename && renameModal) {
        btnRename.addEventListener('click', function () {
          if (dropdownMenu) dropdownMenu.classList.remove('show');
          if (renameInput) renameInput.value = localStorage.getItem('tatuaria_nome') || studioName;
          renameModal.classList.add('show');
        });
      }

      if (btnCancel && renameModal) {
        btnCancel.addEventListener('click', function () {
          renameModal.classList.remove('show');
        });
      }

      if (btnSave && renameModal) {
        btnSave.addEventListener('click', function () {
          const newName = renameInput ? renameInput.value.trim() : '';
          if (!newName) {
            alert('Por favor, digite o novo nome da sua tatuaria.');
            return;
          }
          localStorage.setItem('tatuaria_nome', newName);
          applyStudioName(newName);
          renderUserHeaderBadge(newName);
          renameModal.classList.remove('show');
        });
      }

      // Evento 2: Abrir Tela de Login
      const btnLogin = document.getElementById('btn-dropdown-login');
      if (btnLogin) {
        btnLogin.addEventListener('click', function () {
          if (dropdownMenu) dropdownMenu.classList.remove('show');
          if (overlay) overlay.classList.remove('hidden');
          if (window.initShaderAnimation) {
            window.initShaderAnimation();
          }
        });
      }

      // Evento 3: Sair da Conta (Logout)
      const btnLogout = document.getElementById('btn-dropdown-logout');
      if (btnLogout) {
        btnLogout.addEventListener('click', function () {
          if (dropdownMenu) dropdownMenu.classList.remove('show');
          if (confirm('Deseja realmente sair da sua conta?')) {
            localStorage.removeItem('tatuaria_user');
            localStorage.removeItem('tatuaria_nome');
            location.reload();
          }
        });
      }
    }
  }

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  window.applyStudioName = applyStudioName;
});
