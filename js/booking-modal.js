/* booking-modal.js */

(function() {
    // 1. Create Modal HTML Element and append to body
    const modalHTML = `
    <div class="booking-overlay" id="bookingOverlay">
        <div class="booking-phone">
            <!-- Notch Mockup -->
            <div class="phone-notch-container">
                <div class="phone-notch"></div>
            </div>
            
            <!-- Close Button -->
            <button class="booking-close" id="bookingClose" aria-label="Fechar">&times;</button>
            
            <!-- Progress Bar -->
            <div class="booking-progress">
                <span class="progress-step active" id="pStep1">1. Parte</span>
                <span class="progress-step" id="pStep2">2. Data</span>
                <span class="progress-step" id="pStep3">3. Pago</span>
            </div>
            
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
                    
                    <label class="form-label">Imagem de referência (Opcional):</label>
                    <div class="upload-area" id="uploadArea">
                        <span class="upload-icon">📷</span>
                        <span class="upload-text">Escolher Arquivo</span>
                        <input type="file" id="fileInput" accept="image/*" style="display: none;">
                    </div>
                    <div class="upload-preview-container" id="uploadPreview">
                        <img src="" alt="Preview" class="upload-preview-img" id="previewImg">
                        <span class="upload-preview-info" id="previewName">nome_do_arquivo.jpg</span>
                        <button class="upload-remove" id="removeUpload" type="button">&times;</button>
                    </div>
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
                    <h2 class="phase-title">Pagamento</h2>
                    
                    <div class="summary-box">
                        <div class="summary-row">
                            <span class="summary-label">Tatuagem</span>
                            <span class="summary-val" id="sumTatoo">Braço</span>
                        </div>
                        <div class="summary-row">
                            <span class="summary-label">Mais de uma</span>
                            <span class="summary-val" id="sumMulti">Não</span>
                        </div>
                        <div class="summary-row">
                            <span class="summary-label">Data & Hora</span>
                            <span class="summary-val" id="sumDateTime">-</span>
                        </div>
                        <div class="summary-row">
                            <span class="summary-label">Cliente</span>
                            <span class="summary-val" id="sumName">-</span>
                        </div>
                    </div>
                    
                    <label class="form-label">Forma de pagamento:</label>
                    <div class="payment-selector">
                        <div class="payment-card selected" data-value="presencial">Presencial</div>
                        <div class="payment-card" data-value="pix">Via Pix</div>
                    </div>
                    
                    <!-- Pix Container -->
                    <div class="pix-details-container" id="pixContainer">
                        <div class="pix-qr-mock">
                            <!-- Inline SVG resembling a QR code -->
                            <svg viewBox="0 0 100 100">
                                <rect x="0" y="0" width="100" height="100" fill="none" />
                                <rect x="5" y="5" width="25" height="25" fill="#181818" />
                                <rect x="10" y="10" width="15" height="15" fill="#fff" />
                                <rect x="70" y="5" width="25" height="25" fill="#181818" />
                                <rect x="75" y="10" width="15" height="15" fill="#fff" />
                                <rect x="5" y="70" width="25" height="25" fill="#181818" />
                                <rect x="10" y="75" width="15" height="15" fill="#fff" />
                                <rect x="40" y="40" width="20" height="20" fill="#181818" />
                                <rect x="45" y="45" width="10" height="10" fill="#fff" />
                                <!-- Little noise squares -->
                                <rect x="35" y="10" width="10" height="5" fill="#181818" />
                                <rect x="50" y="20" width="5" height="10" fill="#181818" />
                                <rect x="15" y="45" width="10" height="10" fill="#181818" />
                                <rect x="40" y="70" width="15" height="5" fill="#181818" />
                                <rect x="80" y="45" width="10" height="15" fill="#181818" />
                                <rect x="70" y="80" width="15" height="10" fill="#181818" />
                            </svg>
                        </div>
                        <div class="pix-key-box" id="pixKeyText">create.tattoos.pix.chave.ficticia12345</div>
                        <button type="button" class="pix-copy-btn" id="pixCopyBtn">Copiar Código</button>
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
    let selectedFile = null;
    
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
    multiTattooCheck.addEventListener('change', (e) => {
        isMultiTattoo = e.target.checked;
    });

    // Step 1: Upload reference image
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    const uploadPreview = document.getElementById('uploadPreview');
    const previewImg = document.getElementById('previewImg');
    const previewName = document.getElementById('previewName');
    const removeUpload = document.getElementById('removeUpload');

    uploadArea.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            selectedFile = file;
            previewName.textContent = file.name;
            
            const reader = new FileReader();
            reader.onload = function(evt) {
                previewImg.src = evt.target.result;
                uploadPreview.style.display = 'flex';
                uploadArea.style.display = 'none';
            };
            reader.readAsDataURL(file);
        }
    });

    removeUpload.addEventListener('click', (e) => {
        e.stopPropagation();
        selectedFile = null;
        fileInput.value = '';
        uploadPreview.style.display = 'none';
        uploadArea.style.display = 'block';
    });

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

    // Step 3: Payment method card selection
    const paymentCards = document.querySelectorAll('.payment-card');
    const pixContainer = document.getElementById('pixContainer');

    paymentCards.forEach(card => {
        card.addEventListener('click', () => {
            paymentCards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            paymentMethod = card.getAttribute('data-value');
            
            if (paymentMethod === 'pix') {
                pixContainer.style.display = 'flex';
            } else {
                pixContainer.style.display = 'none';
            }
        });
    });

    // Copy Pix key
    const pixCopyBtn = document.getElementById('pixCopyBtn');
    const pixKeyText = document.getElementById('pixKeyText').textContent;
    pixCopyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(pixKeyText).then(() => {
            const oldText = pixCopyBtn.textContent;
            pixCopyBtn.textContent = 'Copiado!';
            pixCopyBtn.style.background = '#e7f3e2';
            pixCopyBtn.style.color = '#181818';
            setTimeout(() => {
                pixCopyBtn.textContent = oldText;
                pixCopyBtn.style.background = 'transparent';
                pixCopyBtn.style.color = '#e7f3e2';
            }, 1500);
        });
    });

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
        [pStep1, pStep2, pStep3].forEach(s => s.classList.remove('active'));
        [phase1, phase2, phase3, phaseSuccess].forEach(p => p.classList.remove('active'));
        
        // Reactivate correct step and phase
        if (currentStep === 1) {
            pStep1.classList.add('active');
            phase1.classList.add('active');
            btnBack.style.visibility = 'hidden';
            btnNext.textContent = 'Avançar';
            buttonsArea.style.display = 'flex';
        } else if (currentStep === 2) {
            pStep2.classList.add('active');
            phase2.classList.add('active');
            btnBack.style.visibility = 'visible';
            btnNext.textContent = 'Avançar';
            buttonsArea.style.display = 'flex';
            renderCalendar();
        } else if (currentStep === 3) {
            pStep3.classList.add('active');
            phase3.classList.add('active');
            btnBack.style.visibility = 'visible';
            btnNext.textContent = 'Confirmar';
            buttonsArea.style.display = 'flex';
            
            // Populate Step 3 Summary details
            document.getElementById('sumTatoo').textContent = selectedBodyParts.join(', ');
            document.getElementById('sumMulti').textContent = isMultiTattoo ? 'Sim' : 'Não';
            
            const dateStr = selectedDate ? selectedDate.toLocaleDateString('pt-BR') : '';
            document.getElementById('sumDateTime').textContent = `${dateStr} às ${selectedTimeSlot}`;
            document.getElementById('sumName').textContent = custName;
        } else if (currentStep === 4) {
            // Success step
            pStep3.classList.add('active'); // Keep last progress bar step filled
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
        selectedFile = null;
        selectedDate = null;
        selectedTimeSlot = null;
        paymentMethod = "presencial";
        
        // Reset inputs
        inputName.value = '';
        inputPhone.value = '';
        inputEmail.value = '';
        multiTattooCheck.checked = false;
        fileInput.value = '';
        uploadPreview.style.display = 'none';
        uploadArea.style.display = 'block';
        
        bodyPartCards.forEach(c => c.classList.remove('selected'));
        timeSlots.forEach(s => s.classList.remove('selected'));
        
        paymentCards.forEach(c => c.classList.remove('selected'));
        paymentCards[0].classList.add('selected'); // presencial selected
        pixContainer.style.display = 'none';
        
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

})();
