/* booking-modal.js */

(function() {
    // 1. Create Modal HTML Element and append to body
    const modalHTML = `
    <div class="booking-overlay" id="bookingOverlay">
        <div class="booking-phone booking-popup">
            <!-- Close Button -->
            <button class="booking-close" id="bookingClose" aria-label="Fechar">&times;</button>
            
            <!-- Content Area -->
            <div class="booking-content" id="bookingContent">
                
                <!-- PHASE 1 -->
                <div class="booking-phase active" id="phase1">
                    <h2 class="phase-title">Onde será a arte?</h2>
                    
                    <label class="form-label">Escolha o local do corpo:</label>
                    <div class="body-parts-grid" id="bodyPartsGrid">
                        <div class="body-part-card" data-value="Braço">Braço</div>
                        <div class="body-part-card" data-value="Perna">Perna</div>
                        <div class="body-part-card" data-value="Costas">Costas</div>
                        <div class="body-part-card" data-value="Peito">Peito</div>
                        <div class="body-part-card" data-value="Pescoço">Pescoço</div>
                        <div class="body-part-card" data-value="Outro">Outro</div>
                    </div>
                    
                    <div class="toggle-container">
                        <span class="form-label" style="margin-bottom: 0;">Mais de uma tatuagem?</span>
                        <label class="switch">
                            <input type="checkbox" id="multiTattoo">
                            <span class="slider"></span>
                        </label>
                    </div>
                    
                    <label class="form-label">Link da Imagem de referência (Opcional):</label>
                    <div class="url-input-container" id="urlInputArea" style="display: flex; gap: 8px; margin-bottom: 12px;">
                        <input type="text" id="urlInput" class="booking-input" placeholder="Cole o link da imagem (ex: Pinterest, Instagram, etc.)..." style="flex: 1; border-bottom: 1px solid rgba(231, 243, 226, 0.3); margin-bottom: 0; padding: 6px 0;">
                        <button type="button" class="booking-btn" id="btnConfirmUrl" style="flex: 0 0 auto; width: auto; padding: 8px 12px; margin: 0; font-size: 10px;">Adicionar</button>
                    </div>
                    <div class="upload-previews-container" id="uploadPreviewsContainer" style="display: none; margin-top: 12px;"></div>
                </div>
                
                <!-- PHASE 2 -->
                <div class="booking-phase" id="phase2">
                    <h2 class="phase-title">Selecione Data e Hora</h2>
                    
                    <label class="form-label">Data:</label>
                    <div class="calendar-widget">
                        <div class="calendar-header">
                            <button class="calendar-nav-btn" id="calPrev">&lt;</button>
                            <span class="calendar-month-year" id="calMonthYear">Julho 2026</span>
                            <button class="calendar-nav-btn" id="calNext">&gt;</button>
                        </div>
                        <div class="calendar-grid" id="calendarGrid">
                            <!-- Populated by JS -->
                        </div>
                    </div>
                    
                    <label class="form-label">Horários Disponíveis:</label>
                    <div class="time-slots-container">
                        <div class="time-slots-grid" id="timeSlotsGrid">
                            <div class="time-slot-btn" data-time="09:00">09:00</div>
                            <div class="time-slot-btn" data-time="10:30">10:30</div>
                            <div class="time-slot-btn" data-time="13:00">13:00</div>
                            <div class="time-slot-btn" data-time="14:30">14:30</div>
                            <div class="time-slot-btn" data-time="16:00">16:00</div>
                            <div class="time-slot-btn" data-time="17:30">17:30</div>
                        </div>
                    </div>
                    
                    <label class="form-label">Suas Informações:</label>
                    <div class="form-group">
                        <input type="text" id="custName" class="booking-input" placeholder="Nome Completo" required>
                    </div>
                    <div class="form-group">
                        <input type="tel" id="custPhone" class="booking-input" placeholder="Telefone (WhatsApp)" required>
                    </div>
                    <div class="form-group">
                        <input type="email" id="custEmail" class="booking-input" placeholder="Seu Gmail / E-mail" required>
                    </div>
                </div>
                
                <!-- PHASE 3 -->
                <div class="booking-phase" id="phase3">
                    <h2 class="phase-title">Confirme suas Escolhas</h2>
                    
                    <div class="summary-box">
                        <div class="summary-row">
                            <span class="summary-label">Tatuagem</span>
                            <span class="summary-val-container">
                                <span class="summary-val" id="sumTatoo">Braço</span>
                                <button type="button" class="summary-edit-btn" data-step="1">Alterar</button>
                            </span>
                        </div>
                        <div class="summary-row">
                            <span class="summary-label">Mais de uma</span>
                            <span class="summary-val-container">
                                <span class="summary-val" id="sumMulti">Não</span>
                                <button type="button" class="summary-edit-btn" data-step="1">Alterar</button>
                            </span>
                        </div>
                        <div class="summary-row">
                            <span class="summary-label">Referências</span>
                            <span class="summary-val-container">
                                <span class="summary-val" id="sumPhotos">Nenhuma</span>
                                <button type="button" class="summary-edit-btn" data-step="1" id="btnEditPhotos">Alterar</button>
                            </span>
                        </div>
                        <div class="summary-row">
                            <span class="summary-label">Data & Hora</span>
                            <span class="summary-val-container">
                                <span class="summary-val" id="sumDateTime">-</span>
                                <button type="button" class="summary-edit-btn" data-step="2">Alterar</button>
                            </span>
                        </div>
                        <div class="summary-row">
                            <span class="summary-label">Cliente</span>
                            <span class="summary-val-container">
                                <span class="summary-val" id="sumName">-</span>
                                <button type="button" class="summary-edit-btn" data-step="2">Alterar</button>
                            </span>
                        </div>
                    </div>
                    
                    <div class="summary-previews-container" id="summaryPreviewsContainer" style="display: none; margin-top: 12px; margin-bottom: 16px;"></div>
                    
                    <!-- Direct Reference Image URL change inside summary -->
                    <div class="summary-url-section" id="summaryUrlSection" style="display: flex; gap: 8px; margin-bottom: 20px;">
                        <input type="text" id="summaryUrlInput" class="booking-input" placeholder="Cole o novo link da imagem..." style="flex: 1; border-bottom: 1px solid rgba(231, 243, 226, 0.3); margin-bottom: 0;">
                        <button type="button" class="summary-upload-btn" id="btnSummaryUrlAdd" style="width: auto; margin-bottom: 0; padding: 8px 14px; white-space: nowrap;">📷 Trocar Imagem</button>
                    </div>

                    <div class="confirm-actions-container">
                        <button type="button" class="confirm-action-btn confirm-btn-whatsapp" id="btnConfirmWhatsapp">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="wpp-icon" style="width: 14px; height: 14px; margin-right: 6px; vertical-align: middle;">
                                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                            </svg>Falar no WhatsApp</button>
                        <button type="button" class="confirm-action-btn confirm-btn-submit" id="btnConfirmSubmit">Confirmar Agendamento</button>
                    </div>
                </div>
                
                <!-- SUCCESS PHASE -->
                <div class="booking-phase" id="phaseSuccess">
                    <div class="success-screen">
                        <div class="success-icon-container">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h2 class="phase-title" style="margin-bottom: 8px;">Tudo Pronto!</h2>
                        <p class="success-subtitle" id="successMsg">Seu agendamento foi pré-confirmado.<br>Entraremos em contato pelo WhatsApp em breve!</p>
                    </div>
                </div>
                
            </div>
            
            <!-- Actions buttons (Voltar/Avancar) -->
            <div class="booking-buttons" id="bookingButtons">
                <button type="button" class="booking-btn" id="btnBack">Voltar</button>
                <button type="button" class="booking-btn booking-btn-primary" id="btnNext">Avançar</button>
            </div>

            <!-- Floating Support Chat inside the popup -->
            <div class="chat-widget-container" id="chatWidgetContainer">
                <div class="chat-widget-button" id="chatWidgetButton" aria-label="Suporte">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="chat-icon">
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                    </svg>
                </div>
                <div class="chat-widget-window" id="chatWidgetWindow">
                    <div class="chat-widget-header">
                        <div class="chat-widget-profile">
                            <span class="chat-widget-avatar">🎨</span>
                            <div class="chat-widget-status-info">
                                <span class="chat-widget-name">Suporte Quizz Tattoo</span>
                                <span class="chat-widget-status"><span class="status-dot"></span> Online</span>
                            </div>
                        </div>
                        <button class="chat-widget-close" id="chatWidgetClose">&times;</button>
                    </div>
                    <div class="chat-widget-body" id="chatWidgetBody">
                        <div class="chat-widget-message system">
                            Olá! Tem alguma dúvida sobre o agendamento? Digite sua mensagem abaixo para falar conosco diretamente no WhatsApp!
                        </div>
                    </div>
                    <div class="chat-widget-footer">
                        <textarea class="chat-widget-input" id="chatWidgetInput" placeholder="Digite sua dúvida..." rows="1"></textarea>
                        <button class="chat-widget-send" id="chatWidgetSend">Enviar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // 2. Select DOM Elements
    const overlay = document.getElementById('bookingOverlay');
    const closeBtn = document.getElementById('bookingClose');
    const btnBack = document.getElementById('btnBack');
    const btnNext = document.getElementById('btnNext');
    const buttonsArea = document.getElementById('bookingButtons');
    
    const pStep1 = document.getElementById('pStep1');
    const pStep2 = document.getElementById('pStep2');
    const pStep3 = document.getElementById('pStep3');
    
    const phase1 = document.getElementById('phase1');
    const phase2 = document.getElementById('phase2');
    const phase3 = document.getElementById('phase3');
    const phaseSuccess = document.getElementById('phaseSuccess');

    // Form inputs & selections state
    let selectedBodyParts = [];
    let isMultiTattoo = false;
    let selectedLinks = []; // Array of URL strings
    
    let selectedDate = null; // Date object
    let selectedTimeSlot = null; // String "09:00"
    
    let custName = "";
    let custPhone = "";
    let custEmail = "";
    
    let paymentMethod = "presencial"; // "presencial" or "pix"
    
    let currentStep = 1; // 1, 2, 3, 4 (Success)

    // Calendar state
    let calCurrentDate = new Date(); // Date showing on calendar header

    // 3. Setup Interactive Elements
    
    // Step 1: Body Parts
    const bodyPartCards = document.querySelectorAll('.body-part-card');
    bodyPartCards.forEach(card => {
        card.addEventListener('click', () => {
            const val = card.getAttribute('data-value');
            if (card.classList.contains('selected')) {
                card.classList.remove('selected');
                selectedBodyParts = selectedBodyParts.filter(part => part !== val);
            } else {
                card.classList.add('selected');
                selectedBodyParts.push(val);
            }
            validateStep();
        });
    });

    // Step 1: Multi Toggle
    const multiTattooCheck = document.getElementById('multiTattoo');
    const uploadPreviewsContainer = document.getElementById('uploadPreviewsContainer');
    const urlInputArea = document.getElementById('urlInputArea');
    const urlInput = document.getElementById('urlInput');
    const btnConfirmUrl = document.getElementById('btnConfirmUrl');
    
    multiTattooCheck.addEventListener('change', (e) => {
        isMultiTattoo = e.target.checked;
        if (isMultiTattoo) {
            urlInput.placeholder = 'Cole outro link da imagem...';
        } else {
            urlInput.placeholder = 'Cole o link da imagem (ex: Pinterest, Instagram, etc.)...';
            // If toggling off, keep only the first link if any exist
            if (selectedLinks.length > 1) {
                selectedLinks = selectedLinks.slice(0, 1);
            }
        }
        renderPreviews();
    });

    // Step 1: Add Image Link URL logic
    const addLink = (linkVal) => {
        let url = linkVal.trim();
        if (!url) return;
        
        // Safety prefix checks
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'https://' + url;
        }

        if (isMultiTattoo) {
            if (!selectedLinks.includes(url)) {
                selectedLinks.push(url);
            }
        } else {
            selectedLinks = [url];
        }
        renderPreviews();
    };

    if (btnConfirmUrl && urlInput) {
        btnConfirmUrl.addEventListener('click', () => {
            addLink(urlInput.value);
            urlInput.value = '';
        });

        urlInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                addLink(urlInput.value);
                urlInput.value = '';
            }
        });
    }

    function renderPreviews() {
        uploadPreviewsContainer.innerHTML = '';
        
        if (selectedLinks.length === 0) {
            uploadPreviewsContainer.style.display = 'none';
            urlInputArea.style.display = 'flex';
        } else {
            uploadPreviewsContainer.style.display = 'block';
            if (isMultiTattoo) {
                urlInputArea.style.display = 'flex';
            } else {
                urlInputArea.style.display = 'none';
            }
            
            selectedLinks.forEach((link, index) => {
                const item = document.createElement('div');
                item.className = 'upload-preview-item';
                
                // Show thumbnail if it is a valid image URL
                const img = document.createElement('img');
                img.src = link;
                img.className = 'upload-preview-img';
                
                const placeholder = document.createElement('div');
                placeholder.className = 'upload-preview-placeholder';
                placeholder.textContent = '🔗';
                placeholder.style.width = '40px';
                placeholder.style.height = '40px';
                placeholder.style.background = 'rgba(231, 243, 226, 0.1)';
                placeholder.style.border = '1px solid rgba(231, 243, 226, 0.2)';
                placeholder.style.borderRadius = '4px';
                placeholder.style.display = 'none';
                placeholder.style.alignItems = 'center';
                placeholder.style.justifyContent = 'center';
                placeholder.style.fontSize = '14px';

                img.onerror = () => {
                    img.style.display = 'none';
                    placeholder.style.display = 'flex';
                };
                
                const info = document.createElement('span');
                info.className = 'upload-preview-info';
                info.textContent = link;
                
                const removeBtn = document.createElement('button');
                removeBtn.className = 'upload-remove-item';
                removeBtn.type = 'button';
                removeBtn.innerHTML = '&times;';
                
                removeBtn.addEventListener('click', (evt) => {
                    evt.stopPropagation();
                    selectedLinks.splice(index, 1);
                    renderPreviews();
                });
                
                item.appendChild(img);
                item.appendChild(placeholder);
                item.appendChild(info);
                item.appendChild(removeBtn);
                uploadPreviewsContainer.appendChild(item);
            });
        }
        
        updateSummaryPhotosText();
        renderSummaryPreviews();
    }

    // Step 2: Inputs validation
    const inputName = document.getElementById('custName');
    const inputPhone = document.getElementById('custPhone');
    const inputEmail = document.getElementById('custEmail');

    const checkInputsValidity = () => {
        custName = inputName.value.trim();
        custPhone = inputPhone.value.trim();
        custEmail = inputEmail.value.trim();
        validateStep();
    };

    inputName.addEventListener('input', checkInputsValidity);
    inputPhone.addEventListener('input', checkInputsValidity);
    inputEmail.addEventListener('input', checkInputsValidity);

    // Step 2: Time Slots
    const timeSlots = document.querySelectorAll('.time-slot-btn');
    timeSlots.forEach(slot => {
        slot.addEventListener('click', () => {
            timeSlots.forEach(s => s.classList.remove('selected'));
            slot.classList.add('selected');
            selectedTimeSlot = slot.getAttribute('data-time');
            validateStep();
        });
    });

    // Step 2: Calendar Navigation
    document.getElementById('calPrev').addEventListener('click', () => {
        calCurrentDate.setMonth(calCurrentDate.getMonth() - 1);
        renderCalendar();
    });
    document.getElementById('calNext').addEventListener('click', () => {
        calCurrentDate.setMonth(calCurrentDate.getMonth() + 1);
        renderCalendar();
    });

    // Render Custom Calendar
    const monthNames = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];
    const dayNames = ["D", "S", "T", "Q", "Q", "S", "S"];

    function renderCalendar() {
        const grid = document.getElementById('calendarGrid');
        const monthYearLabel = document.getElementById('calMonthYear');
        
        grid.innerHTML = '';
        
        const year = calCurrentDate.getFullYear();
        const month = calCurrentDate.getMonth();
        
        monthYearLabel.textContent = `${monthNames[month]} ${year}`;
        
        // Render headers (days of week)
        dayNames.forEach(name => {
            const h = document.createElement('div');
            h.className = 'calendar-day-header';
            h.textContent = name;
            grid.appendChild(h);
        });
        
        const firstDayIndex = new Date(year, month, 1).getDay();
        const numDays = new Date(year, month + 1, 0).getDate();
        
        // Empty cells before 1st of month
        for (let i = 0; i < firstDayIndex; i++) {
            const empty = document.createElement('div');
            empty.className = 'calendar-day empty';
            grid.appendChild(empty);
        }
        
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        // Days of month
        for (let d = 1; d <= numDays; d++) {
            const dayCell = document.createElement('div');
            dayCell.className = 'calendar-day';
            dayCell.textContent = d;
            
            const cellDate = new Date(year, month, d);
            
            // Disable past dates
            if (cellDate < today) {
                dayCell.classList.add('disabled');
            } else {
                // If it's selected, mark it
                if (selectedDate && 
                    selectedDate.getDate() === d && 
                    selectedDate.getMonth() === month && 
                    selectedDate.getFullYear() === year) {
                    dayCell.classList.add('selected');
                }
                
                dayCell.addEventListener('click', () => {
                    selectedDate = cellDate;
                    renderCalendar(); // Rerender to update selection styling
                    validateStep();
                });
            }
            grid.appendChild(dayCell);
        }
    }

    // Setup Edit buttons in Summary
    const setupSummaryEditListeners = () => {
        document.querySelectorAll('.summary-edit-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const step = parseInt(btn.getAttribute('data-step'), 10);
                if (step >= 1 && step <= 2) {
                    currentStep = step;
                    updateStepUI();
                }
            });
        });
    };

    // Summary URL Setup
    const btnSummaryUrlAdd = document.getElementById('btnSummaryUrlAdd');
    const summaryUrlInput = document.getElementById('summaryUrlInput');
    
    const addSummaryUrl = (linkVal) => {
        let url = linkVal.trim();
        if (!url) return;
        
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'https://' + url;
        }

        if (isMultiTattoo) {
            if (!selectedLinks.includes(url)) {
                selectedLinks.push(url);
            }
        } else {
            selectedLinks = [url];
        }
        renderPreviews();
    };

    if (btnSummaryUrlAdd && summaryUrlInput) {
        btnSummaryUrlAdd.addEventListener('click', () => {
            addSummaryUrl(summaryUrlInput.value);
            summaryUrlInput.value = '';
        });
        
        summaryUrlInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                addSummaryUrl(summaryUrlInput.value);
                summaryUrlInput.value = '';
            }
        });
    }

    function updateSummaryPhotosText() {
        const sumPhotos = document.getElementById('sumPhotos');
        if (sumPhotos) {
            if (selectedLinks.length === 0) {
                sumPhotos.textContent = 'Nenhuma';
            } else if (selectedLinks.length === 1) {
                sumPhotos.textContent = '1 imagem';
            } else {
                sumPhotos.textContent = `${selectedLinks.length} imagens`;
            }
        }
    }

    function renderSummaryPreviews() {
        const container = document.getElementById('summaryPreviewsContainer');
        if (!container) return;
        
        container.innerHTML = '';
        
        if (selectedLinks.length === 0) {
            container.style.display = 'none';
            return;
        }
        
        container.style.display = 'flex';
        container.style.flexWrap = 'wrap';
        container.style.gap = '8px';
        
        selectedLinks.forEach((link, index) => {
            const item = document.createElement('div');
            item.className = 'summary-preview-item';
            item.style.position = 'relative';
            item.style.width = '50px';
            item.style.height = '50px';
            item.style.border = '1px solid rgba(231, 243, 226, 0.3)';
            item.style.borderRadius = '4px';
            item.style.overflow = 'hidden';
            
            const img = document.createElement('img');
            img.src = link;
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'cover';
            
            const placeholder = document.createElement('div');
            placeholder.textContent = '🔗';
            placeholder.style.width = '100%';
            placeholder.style.height = '100%';
            placeholder.style.background = 'rgba(231, 243, 226, 0.1)';
            placeholder.style.display = 'none';
            placeholder.style.alignItems = 'center';
            placeholder.style.justifyContent = 'center';
            placeholder.style.fontSize = '16px';

            img.onerror = () => {
                img.style.display = 'none';
                placeholder.style.display = 'flex';
            };
            
            const removeBtn = document.createElement('button');
            removeBtn.type = 'button';
            removeBtn.innerHTML = '&times;';
            removeBtn.style.position = 'absolute';
            removeBtn.style.top = '2px';
            removeBtn.style.right = '2px';
            removeBtn.style.background = 'rgba(0, 0, 0, 0.7)';
            removeBtn.style.color = '#fff';
            removeBtn.style.border = 'none';
            removeBtn.style.borderRadius = '50%';
            removeBtn.style.width = '16px';
            removeBtn.style.height = '16px';
            removeBtn.style.display = 'flex';
            removeBtn.style.alignItems = 'center';
            removeBtn.style.justifyContent = 'center';
            removeBtn.style.fontSize = '10px';
            removeBtn.style.cursor = 'pointer';
            
            removeBtn.addEventListener('click', (evt) => {
                evt.stopPropagation();
                selectedLinks.splice(index, 1);
                renderPreviews();
            });
            
            item.appendChild(img);
            item.appendChild(placeholder);
            item.appendChild(removeBtn);
            container.appendChild(item);
        });
    }

    // Custom Confirmation Actions Setup
    const btnConfirmSubmit = document.getElementById('btnConfirmSubmit');
    const btnConfirmWhatsapp = document.getElementById('btnConfirmWhatsapp');

    if (btnConfirmSubmit) {
        btnConfirmSubmit.addEventListener('click', () => {
            currentStep = 4;
            updateStepUI();
        });
    }

    if (btnConfirmWhatsapp) {
        btnConfirmWhatsapp.addEventListener('click', () => {
            const dateStr = selectedDate ? selectedDate.toLocaleDateString('pt-BR') : '';
            const msg = `Olá! Gostaria de confirmar meu agendamento:\n- Local: ${selectedBodyParts.join(', ')}\n- Mais de uma tattoo: ${isMultiTattoo ? 'Sim' : 'Não'}\n- Links de referência:\n${selectedLinks.join('\n')}\n- Data/Hora: ${dateStr} às ${selectedTimeSlot}\n- Nome: ${custName}\n- Telefone: ${custPhone}\n- Email: ${custEmail}`;
            const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
            window.open(url, '_blank');
            
            // Go to success phase
            currentStep = 4;
            updateStepUI();
        });
    }

    // 4. Modal Flow Control & Validation

    function validateStep() {
        let isValid = false;
        
        if (currentStep === 1) {
            // Must select at least one body part
            isValid = selectedBodyParts.length > 0;
        } else if (currentStep === 2) {
            // Must select a date, time slot, and fill name, email, and phone
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            isValid = selectedDate !== null && 
                      selectedTimeSlot !== null && 
                      custName.length > 1 && 
                      custPhone.length > 7 && 
                      emailRegex.test(custEmail);
        } else if (currentStep === 3) {
            // Payment method is preselected as "presencial", always valid
            isValid = true;
        }
        
        btnNext.disabled = !isValid;
    }

    function updateStepUI() {
        // Deactivate all steps and phases
        [pStep1, pStep2, pStep3].filter(Boolean).forEach(s => s.classList.remove('active'));
        [phase1, phase2, phase3, phaseSuccess].forEach(p => p.classList.remove('active'));
        
        // Reactivate correct step and phase
        if (currentStep === 1) {
            if (pStep1) pStep1.classList.add('active');
            phase1.classList.add('active');
            btnBack.style.visibility = 'hidden';
            btnNext.textContent = 'Avançar';
            btnNext.style.display = 'block';
            buttonsArea.style.display = 'flex';
        } else if (currentStep === 2) {
            if (pStep2) pStep2.classList.add('active');
            phase2.classList.add('active');
            btnBack.style.visibility = 'visible';
            btnNext.textContent = 'Avançar';
            btnNext.style.display = 'block';
            buttonsArea.style.display = 'flex';
            renderCalendar();
        } else if (currentStep === 3) {
            if (pStep3) pStep3.classList.add('active');
            phase3.classList.add('active');
            btnBack.style.visibility = 'visible';
            btnNext.style.display = 'none'; // Hide default next/confirm button
            buttonsArea.style.display = 'flex';
            
            // Populate Step 3 Summary details
            document.getElementById('sumTatoo').textContent = selectedBodyParts.join(', ');
            document.getElementById('sumMulti').textContent = isMultiTattoo ? 'Sim' : 'Não';
            updateSummaryPhotosText();
            renderSummaryPreviews(); // Call rendering for summary thumbnails
            setupSummaryEditListeners(); // Bind summary edit links click listeners
            
            const dateStr = selectedDate ? selectedDate.toLocaleDateString('pt-BR') : '';
            document.getElementById('sumDateTime').textContent = `${dateStr} às ${selectedTimeSlot}`;
            document.getElementById('sumName').textContent = custName;
        } else if (currentStep === 4) {
            // Success step
            if (pStep3) pStep3.classList.add('active'); // Keep last progress bar step filled
            phaseSuccess.classList.add('active');
            buttonsArea.style.display = 'none'; // Hide next/back buttons
        }
        
        validateStep();
    }

    // Next Button Click
    btnNext.addEventListener('click', () => {
        if (currentStep < 3) {
            currentStep++;
            updateStepUI();
        } else if (currentStep === 3) {
            currentStep = 4;
            updateStepUI();
        }
    });

    // Back Button Click
    btnBack.addEventListener('click', () => {
        if (currentStep > 1) {
            currentStep--;
            updateStepUI();
        }
    });

    // Open/Close Actions
    function openBookingModal() {
        // Reset states
        currentStep = 1;
        selectedBodyParts = [];
        isMultiTattoo = false;
        selectedLinks = []; // Reset list
        selectedDate = null;
        selectedTimeSlot = null;
        paymentMethod = "presencial";
        
        // Reset inputs
        inputName.value = '';
        inputPhone.value = '';
        inputEmail.value = '';
        multiTattooCheck.checked = false;
        urlInput.value = '';
        urlInput.placeholder = 'Cole o link da imagem (ex: Pinterest, Instagram, etc.)...';
        uploadPreviewsContainer.style.display = 'none';
        uploadPreviewsContainer.innerHTML = '';
        urlInputArea.style.display = 'flex';
        
        bodyPartCards.forEach(c => c.classList.remove('selected'));
        timeSlots.forEach(s => s.classList.remove('selected'));
        
        calCurrentDate = new Date();
        
        updateStepUI();
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Lock main page scrolling
    }

    function closeBookingModal() {
        overlay.classList.remove('active');
        document.body.style.overflow = ''; // Unlock page scrolling
    }

    closeBtn.addEventListener('click', closeBookingModal);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeBookingModal();
        }
    });

    // 5. Intercept Click on any Booking Links dynamically
    function initInterceptors() {
        document.querySelectorAll('a').forEach(link => {
            const href = link.getAttribute('href') || '';
            const text = link.textContent.trim().toLowerCase();
            
            // Matches any link containing "agendamento" or matching the exact booking URLs
            const isBooking = text.includes('agendamento') || 
                              href.includes('booking') || 
                              href.includes('agendamento');
                              
            if (isBooking) {
                // Remove direct navigation link
                link.removeAttribute('href');
                link.style.cursor = 'pointer';
                
                // Add click listener
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    openBookingModal();
                });
            }
        });
    }

    // Run interceptor initialization
    initInterceptors();
    
    // Rerun check periodically in case elements are rendered dynamically
    setInterval(initInterceptors, 2000);

    // 6. Floating Support Chat Logic
    const chatWidgetButton = document.getElementById('chatWidgetButton');
    const chatWidgetWindow = document.getElementById('chatWidgetWindow');
    const chatWidgetClose = document.getElementById('chatWidgetClose');
    const chatWidgetSend = document.getElementById('chatWidgetSend');
    const chatWidgetInput = document.getElementById('chatWidgetInput');
    const WHATSAPP_NUMBER = "5547999999999"; // Substitua pelo seu número

    if (chatWidgetButton && chatWidgetWindow) {
        chatWidgetButton.addEventListener('click', () => {
            chatWidgetWindow.classList.toggle('active');
            if (chatWidgetWindow.classList.contains('active')) {
                chatWidgetInput.focus();
            }
        });

        chatWidgetClose.addEventListener('click', (e) => {
            e.stopPropagation();
            chatWidgetWindow.classList.remove('active');
        });

        chatWidgetInput.addEventListener('input', () => {
            chatWidgetInput.style.height = 'auto';
            chatWidgetInput.style.height = (chatWidgetInput.scrollHeight) + 'px';
        });

        function sendChatMessage() {
            const text = chatWidgetInput.value.trim();
            if (!text) return;

            const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
            window.open(url, '_blank');

            chatWidgetInput.value = '';
            chatWidgetInput.style.height = 'auto';
            chatWidgetWindow.classList.remove('active');
        }

        chatWidgetSend.addEventListener('click', sendChatMessage);
        chatWidgetInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendChatMessage();
            }
        });
    }

})();
