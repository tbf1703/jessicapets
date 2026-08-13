// ============================================================
// novo_endereco.js - Popup de Novo Endereço
// ============================================================

(function() {
    'use strict';

    // Configurações
    const POPUP_DELAY = 5000; // 5 segundos em milissegundos
    const STORAGE_KEY = 'jessicapets_popup_closed';

    // Verifica se o popup já foi fechado nesta sessão
    if (sessionStorage.getItem(STORAGE_KEY)) {
        return;
    }

    // ===== ESTILOS CSS =====
    const styles = `
        /* Overlay do popup */
        #popupNovoEndereco {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            z-index: 99999;
            display: none;
            align-items: center;
            justify-content: center;
            animation: popupFadeIn 0.5s ease;
            padding: 1.5rem;
        }

        #popupNovoEndereco.show {
            display: flex;
        }

        @keyframes popupFadeIn {
            from {
                opacity: 0;
                transform: scale(0.9);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }

        /* Container do popup */
        .popup-container {
            background: #ffffff;
            border-radius: 20px;
            max-width: 520px;
            width: 100%;
            padding: 2.5rem 2rem 2rem;
            position: relative;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            text-align: center;
            animation: popupBounce 0.6s ease;
            border: 3px solid #b94754;
        }

        @keyframes popupBounce {
            0% { transform: scale(0.5); opacity: 0; }
            70% { transform: scale(1.05); opacity: 1; }
            100% { transform: scale(1); }
        }

        /* Botão fechar (X) */
        .popup-close {
            position: absolute;
            top: 12px;
            right: 16px;
            background: none;
            border: none;
            font-size: 1.8rem;
            color: #999;
            cursor: pointer;
            transition: all 0.3s ease;
            line-height: 1;
            padding: 4px 8px;
            border-radius: 50%;
        }

        .popup-close:hover {
            color: #b94754;
            transform: rotate(90deg);
            background: rgba(185, 71, 84, 0.1);
        }

        /* Ícone de localização */
        .popup-icon {
            font-size: 3.5rem;
            color: #b94754;
            margin-bottom: 0.5rem;
            display: block;
        }

        /* Título */
        .popup-title {
            font-family: 'Poppins', sans-serif;
            font-size: 1.8rem;
            font-weight: 700;
            color: #b94754;
            margin-bottom: 0.5rem;
            line-height: 1.2;
        }

        /* Subtítulo / frase chamativa */
        .popup-subtitle {
            font-family: 'Poppins', sans-serif;
            font-size: 1.1rem;
            font-weight: 500;
            color: #996130;
            margin-bottom: 1rem;
            font-style: italic;
        }

        /* Texto do endereço */
        .popup-address {
            font-family: 'Poppins', sans-serif;
            font-size: 1rem;
            color: #444444;
            line-height: 1.6;
            margin-bottom: 0.3rem;
        }

        .popup-address strong {
            color: #b94754;
            font-weight: 600;
        }

        .popup-reference {
            font-family: 'Poppins', sans-serif;
            font-size: 0.95rem;
            color: #996130;
            font-weight: 500;
            margin-bottom: 1.5rem;
        }

        .popup-reference i {
            margin-right: 6px;
        }

        /* Divisória decorativa */
        .popup-divider {
            width: 60px;
            height: 3px;
            background: linear-gradient(to right, #b94754, #996130);
            margin: 1rem auto 1.5rem;
            border-radius: 2px;
        }

        /* Frase de impacto */
        .popup-message {
            font-family: 'Poppins', sans-serif;
            font-size: 0.95rem;
            color: #555;
            line-height: 1.7;
            margin-bottom: 1.8rem;
            padding: 0 0.5rem;
        }

        .popup-message .highlight {
            color: #b94754;
            font-weight: 600;
        }

        /* Botão de ação */
        .popup-btn {
            display: inline-block;
            padding: 0.9rem 2.5rem;
            background: #b94754;
            color: #ffffff;
            font-family: 'Poppins', sans-serif;
            font-weight: 600;
            font-size: 1rem;
            border: none;
            border-radius: 50px;
            cursor: pointer;
            transition: all 0.3s ease;
            text-decoration: none;
            box-shadow: 0 4px 15px rgba(185, 71, 84, 0.3);
        }

        .popup-btn:hover {
            background: #9e3a45;
            transform: translateY(-3px);
            box-shadow: 0 8px 25px rgba(185, 71, 84, 0.4);
        }

        .popup-btn i {
            margin-right: 8px;
        }

        /* Botão "Fechar" secundário */
        .popup-close-text {
            display: block;
            margin-top: 1rem;
            font-family: 'Poppins', sans-serif;
            font-size: 0.85rem;
            color: #aaa;
            background: none;
            border: none;
            cursor: pointer;
            transition: color 0.3s ease;
            text-decoration: underline;
            text-underline-offset: 2px;
        }

        .popup-close-text:hover {
            color: #b94754;
        }

        /* Responsivo */
        @media (max-width: 480px) {
            .popup-container {
                padding: 2rem 1.2rem 1.5rem;
                max-width: 95%;
            }

            .popup-title {
                font-size: 1.4rem;
            }

            .popup-subtitle {
                font-size: 0.95rem;
            }

            .popup-icon {
                font-size: 2.8rem;
            }

            .popup-btn {
                width: 100%;
                padding: 0.8rem 1.5rem;
                font-size: 0.95rem;
            }
        }
    `;

    // ===== HTML DO POPUP =====
    const html = `
        <div id="popupNovoEndereco" role="dialog" aria-modal="true" aria-labelledby="popupTitle">
            <div class="popup-container">
                <!-- Botão fechar (X) -->
                <button class="popup-close" id="popupCloseBtn" aria-label="Fechar popup">
                    <i class="fas fa-times"></i>
                </button>

                <!-- Ícone -->
                <span class="popup-icon">
                    <i class="fas fa-location-dot"></i>
                </span>

                <!-- Título -->
                <h2 class="popup-title" id="popupTitle">✨ Novo Endereço!</h2>

                <!-- Subtítulo chamativo -->
                <p class="popup-subtitle">📍 Estamos mais perto de você!</p>

                <!-- Endereço completo -->
                <p class="popup-address">
                    <strong>Rua Eugênio Francisco de Macedo, 138</strong><br>
                    Dormentes, Pernambuco - PE
                </p>
                <p class="popup-reference">
                    <i class="fas fa-utensils"></i> Em frente à Lanchonete Rosa de Saron
                </p>

                <!-- Divisória -->
                <div class="popup-divider"></div>

                <!-- Frase de impacto -->
                <p class="popup-message">
                    <span class="highlight">❤️ Mudamos de endereço, mas o carinho continua o mesmo!</span><br>
                    Venha conhecer nossa nova casa e dar um <span class="highlight">chamego</span> no seu pet com produtos de qualidade e atendimento que acolhe.
                </p>

                <!-- Botão principal -->
                <a href="#localizacao" class="popup-btn" id="popupActionBtn">
                    <i class="fas fa-map-pin"></i> Quero visitar!
                </a>

                <!-- Fechar com texto -->
                <button class="popup-close-text" id="popupCloseText">Fechar e continuar navegando</button>
            </div>
        </div>
    `;

    // ===== INJETAR CSS E HTML =====
    function injectPopup() {
        // Injetar CSS
        const styleTag = document.createElement('style');
        styleTag.id = 'popupNovoEnderecoStyle';
        styleTag.textContent = styles;
        document.head.appendChild(styleTag);

        // Injetar HTML
        const container = document.createElement('div');
        container.innerHTML = html;
        document.body.appendChild(container.firstElementChild);

        // ===== CONFIGURAR EVENTOS =====
        const popup = document.getElementById('popupNovoEndereco');
        const closeBtn = document.getElementById('popupCloseBtn');
        const closeText = document.getElementById('popupCloseText');
        const actionBtn = document.getElementById('popupActionBtn');

        function closePopup() {
            popup.classList.remove('show');
            // Marcar como fechado na sessão
            sessionStorage.setItem(STORAGE_KEY, 'true');
            // Remover após animação
            setTimeout(() => {
                if (popup.parentNode) {
                    popup.style.display = 'none';
                }
            }, 300);
        }

        // Fechar pelo X
        if (closeBtn) {
            closeBtn.addEventListener('click', closePopup);
        }

        // Fechar pelo texto
        if (closeText) {
            closeText.addEventListener('click', closePopup);
        }

        // Fechar ao clicar fora do container (no overlay)
        popup.addEventListener('click', function(e) {
            if (e.target === this) {
                closePopup();
            }
        });

        // Ação do botão principal - fecha e navega
        if (actionBtn) {
            actionBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const target = this.getAttribute('href');
                closePopup();
                // Navega suavemente para a seção
                setTimeout(() => {
                    const el = document.querySelector(target);
                    if (el) {
                        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }, 400);
            });
        }

        // Fechar com tecla ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && popup.classList.contains('show')) {
                closePopup();
            }
        });

        // ===== EXIBIR O POPUP APÓS O DELAY =====
        setTimeout(function() {
            popup.style.display = 'flex';
            // Força reflow para animação
            void popup.offsetWidth;
            popup.classList.add('show');
        }, POPUP_DELAY);
    }

    // ===== CARREGAR O POPUP QUANDO O DOM ESTIVER PRONTO =====
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectPopup);
    } else {
        injectPopup();
    }

})();