/**
 * Agentic AI Setup Guide - Interactive Tutorial
 * JavaScript for OS toggle, progress tracking, copy-to-clipboard, and more
 */

(function() {
    'use strict';

    // ==========================================
    // Password Gate
    // ==========================================

    const AUTH_KEY = 'agentic-ai-guide-auth';
    const EMAIL_KEY = 'agentic-ai-guide-email';
    const CORRECT_PASSWORD = 'Time2ElevateMyAIGame#1';
    const LOG_URL = 'https://script.google.com/macros/s/AKfycbyb0PPh_0F9eypxzKdwciGmWlxB_bASTn-94y5Qh4WZSYMDUgOHR5q7JsTK-8qZd6O1/exec';

    function checkAuth() {
        return localStorage.getItem(AUTH_KEY) === 'authenticated' && localStorage.getItem(EMAIL_KEY);
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function logAccess(email, status) {
        fetch(LOG_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, status: status })
        }).catch(() => {}); // Silent fail - don't block user
    }

    function showPasswordGate() {
        const modal = document.createElement('div');
        modal.id = 'password-gate';
        modal.innerHTML = `
            <div class="password-modal">
                <div class="password-logo">
                    <img src="images/AscendNxt Logo Blue.png" alt="AscendNxt" style="max-width: 200px;">
                </div>
                <h2>Welcome to the Agentic AI Setup Guide</h2>
                <p>This resource is for AscendNxt clients. Enter your email and access code.</p>
                <form id="password-form">
                    <input type="email" id="email-input" placeholder="Your email address" autocomplete="email" autofocus required>
                    <input type="password" id="password-input" placeholder="Access code" autocomplete="off" required>
                    <button type="submit">Access Guide</button>
                    <p id="form-error" style="color: #e53e3e; margin-top: 12px; display: none;"></p>
                </form>
                <p class="password-help">Need access? Contact <a href="mailto:scott@ascendnxt.com">scott@ascendnxt.com</a></p>
            </div>
        `;
        document.body.appendChild(modal);

        const style = document.createElement('style');
        style.textContent = `
            #password-gate {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, #515471 0%, #3d4058 100%);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 99999;
            }
            .password-modal {
                background: white;
                padding: 48px;
                border-radius: 16px;
                text-align: center;
                max-width: 420px;
                width: 90%;
                box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            }
            .password-logo {
                margin-bottom: 24px;
            }
            .password-modal h2 {
                color: #515471;
                margin-bottom: 12px;
                font-size: 1.5rem;
            }
            .password-modal p {
                color: #666;
                margin-bottom: 24px;
                line-height: 1.5;
            }
            #password-form {
                display: flex;
                flex-direction: column;
                gap: 12px;
            }
            #password-form input {
                padding: 14px 16px;
                font-size: 16px;
                border: 2px solid #ddd;
                border-radius: 8px;
                transition: border-color 0.2s;
            }
            #password-form input:focus {
                outline: none;
                border-color: #FF9933;
            }
            #password-form button {
                padding: 14px 24px;
                font-size: 16px;
                font-weight: 600;
                background: #FF9933;
                color: white;
                border: none;
                border-radius: 8px;
                cursor: pointer;
                transition: background 0.2s;
            }
            #password-form button:hover {
                background: #e6851f;
            }
            .password-help {
                margin-top: 24px;
                font-size: 14px;
                color: #888;
            }
            .password-help a {
                color: #515471;
            }
        `;
        document.head.appendChild(style);

        document.getElementById('password-form').addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = document.getElementById('email-input');
            const passwordInput = document.getElementById('password-input');
            const error = document.getElementById('form-error');
            const email = emailInput.value.trim();
            const password = passwordInput.value;

            if (!isValidEmail(email)) {
                error.textContent = 'Please enter a valid email address.';
                error.style.display = 'block';
                emailInput.focus();
                return;
            }

            if (password === CORRECT_PASSWORD) {
                localStorage.setItem(AUTH_KEY, 'authenticated');
                localStorage.setItem(EMAIL_KEY, email);
                logAccess(email, 'success');
                modal.remove();
                style.remove();
                initializeApp();
            } else {
                logAccess(email, 'failed');
                error.textContent = 'Incorrect access code. Please try again.';
                error.style.display = 'block';
                passwordInput.value = '';
                passwordInput.focus();
            }
        });
    }

    // Check authentication on page load
    if (!checkAuth()) {
        document.addEventListener('DOMContentLoaded', showPasswordGate);
    } else {
        document.addEventListener('DOMContentLoaded', function() {
            logAccess(localStorage.getItem(EMAIL_KEY), 'return');
            initializeApp();
        });
    }

    // ==========================================
    // Configuration & State
    // ==========================================

    const STORAGE_KEYS = {
        OS: 'agentic-ai-guide-os',
        THEME: 'agentic-ai-guide-theme',
        PROGRESS: 'agentic-ai-guide-progress',
        COMPLETED_PHASES: 'agentic-ai-guide-completed-phases'
    };

    const state = {
        os: 'mac',
        theme: 'dark',
        completedSteps: new Set(),
        completedPhases: new Set()
    };

    // ==========================================
    // Initialization
    // ==========================================

    function initializeApp() {
        loadSavedState();
        initOSToggle();
        initThemeToggle();
        initCopyButtons();
        initProgressTracking();
        initNavigation();
        initExpandableContent();
        initTabs();
        initSearchFilter();
        updateProgressBar();
        applyOSSelection(state.os);
        applyTheme(state.theme);
        showWelcomeBackBanner();
    }

    // ==========================================
    // Welcome Back Banner
    // ==========================================

    function showWelcomeBackBanner() {
        if (state.completedSteps.size === 0) return;

        const totalSteps = document.querySelectorAll('.step-checkbox input[type="checkbox"]').length;
        const completedCount = state.completedSteps.size;
        const percentage = Math.round((completedCount / totalSteps) * 100);

        if (percentage >= 100) return; // Don't show if complete

        const banner = document.createElement('div');
        banner.className = 'welcome-back-banner';
        banner.innerHTML = `
            <div class="welcome-back-content">
                <span class="welcome-back-text">Welcome back! You're ${percentage}% complete (${completedCount}/${totalSteps} steps)</span>
                <button class="welcome-back-dismiss" aria-label="Dismiss">&times;</button>
            </div>
        `;

        document.body.insertBefore(banner, document.body.firstChild);

        // Auto-dismiss after 8 seconds
        setTimeout(() => {
            banner.classList.add('fade-out');
            setTimeout(() => banner.remove(), 300);
        }, 8000);

        // Manual dismiss
        banner.querySelector('.welcome-back-dismiss').addEventListener('click', () => {
            banner.classList.add('fade-out');
            setTimeout(() => banner.remove(), 300);
        });
    }

    // ==========================================
    // Load Saved State from localStorage
    // ==========================================

    function loadSavedState() {
        // Load OS preference
        const savedOS = localStorage.getItem(STORAGE_KEYS.OS);
        if (savedOS && (savedOS === 'mac' || savedOS === 'windows')) {
            state.os = savedOS;
        }

        // Load theme preference
        const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME);
        if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
            state.theme = savedTheme;
        } else {
            // Check system preference
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                state.theme = 'dark';
            }
        }

        // Load completed steps
        const savedProgress = localStorage.getItem(STORAGE_KEYS.PROGRESS);
        if (savedProgress) {
            try {
                const progressArray = JSON.parse(savedProgress);
                state.completedSteps = new Set(progressArray);
            } catch (e) {
                console.error('Error loading progress:', e);
            }
        }

        // Load completed phases
        const savedPhases = localStorage.getItem(STORAGE_KEYS.COMPLETED_PHASES);
        if (savedPhases) {
            try {
                const phasesArray = JSON.parse(savedPhases);
                state.completedPhases = new Set(phasesArray);
            } catch (e) {
                console.error('Error loading phases:', e);
            }
        }
    }

    // ==========================================
    // OS Toggle Functionality
    // ==========================================

    function initOSToggle() {
        const osButtons = document.querySelectorAll('.os-btn');

        osButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const selectedOS = this.dataset.os;
                if (selectedOS) {
                    applyOSSelection(selectedOS);
                    saveOSPreference(selectedOS);
                }
            });
        });
    }

    function applyOSSelection(os) {
        state.os = os;
        document.body.setAttribute('data-os', os);

        // Update button states
        const osButtons = document.querySelectorAll('.os-btn');
        osButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.os === os);
        });

        // Update OS-specific text content
        document.querySelectorAll('[data-mac][data-windows]').forEach(el => {
            el.textContent = el.dataset[os];
        });

        // Update code blocks with OS-specific content
        document.querySelectorAll('code[data-copy-mac][data-copy-windows]').forEach(code => {
            code.textContent = code.dataset[os === 'mac' ? 'copyMac' : 'copyWindows'];
        });
    }

    function saveOSPreference(os) {
        localStorage.setItem(STORAGE_KEYS.OS, os);
    }

    // ==========================================
    // Theme Toggle Functionality
    // ==========================================

    function initThemeToggle() {
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', function() {
                const newTheme = state.theme === 'light' ? 'dark' : 'light';
                applyTheme(newTheme);
                saveThemePreference(newTheme);
            });
        }

        // Listen for system theme changes
        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
                if (!localStorage.getItem(STORAGE_KEYS.THEME)) {
                    applyTheme(e.matches ? 'dark' : 'light');
                }
            });
        }
    }

    function applyTheme(theme) {
        state.theme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        // Icons are handled by CSS based on data-theme attribute
    }

    function saveThemePreference(theme) {
        localStorage.setItem(STORAGE_KEYS.THEME, theme);
    }

    // ==========================================
    // Copy to Clipboard
    // ==========================================

    function initCopyButtons() {
        document.querySelectorAll('.copy-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                let textToCopy = '';

                // Check for OS-specific copy on the button itself
                if (this.dataset.copyMac && this.dataset.copyWindows) {
                    textToCopy = state.os === 'mac'
                        ? this.dataset.copyMac
                        : this.dataset.copyWindows;
                }
                // Check for direct data-copy attribute on button
                else if (this.dataset.copy) {
                    textToCopy = this.dataset.copy;
                }
                // Look in the code block
                else {
                    const codeBlock = this.closest('.code-block');
                    if (codeBlock) {
                        const codeElement = codeBlock.querySelector('code');
                        if (codeElement) {
                            // Check for OS-specific copy content on code element
                            if (codeElement.dataset.copyMac && codeElement.dataset.copyWindows) {
                                textToCopy = state.os === 'mac'
                                    ? codeElement.dataset.copyMac
                                    : codeElement.dataset.copyWindows;
                            } else {
                                textToCopy = codeElement.textContent;
                            }
                        }
                    }
                }

                if (textToCopy) {
                    copyToClipboard(textToCopy, this);
                }
            });
        });
    }

    function copyToClipboard(text, button) {
        navigator.clipboard.writeText(text).then(() => {
            // Show success state
            const originalText = button.innerHTML;
            button.innerHTML = '<svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> Copied!';
            button.classList.add('copied');

            setTimeout(() => {
                button.innerHTML = originalText;
                button.classList.remove('copied');
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy:', err);
            // Fallback for older browsers
            fallbackCopyToClipboard(text, button);
        });
    }

    function fallbackCopyToClipboard(text, button) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);
        textArea.select();

        try {
            document.execCommand('copy');
            const originalText = button.innerHTML;
            button.innerHTML = '<svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> Copied!';
            button.classList.add('copied');

            setTimeout(() => {
                button.innerHTML = originalText;
                button.classList.remove('copied');
            }, 2000);
        } catch (err) {
            console.error('Fallback copy failed:', err);
        }

        document.body.removeChild(textArea);
    }

    // ==========================================
    // Progress Tracking
    // ==========================================

    function initProgressTracking() {
        // Initialize step checkboxes - the input is inside the label.step-checkbox
        document.querySelectorAll('.step-checkbox input[type="checkbox"]').forEach(checkbox => {
            const stepId = checkbox.dataset.step;

            // Restore saved state
            if (state.completedSteps.has(stepId)) {
                checkbox.checked = true;
            }

            checkbox.addEventListener('change', function() {
                if (this.checked) {
                    state.completedSteps.add(stepId);
                } else {
                    state.completedSteps.delete(stepId);
                }
                saveProgress();
                updateProgressBar();
                checkPhaseCompletion();
            });
        });

        // Initialize checkpoint buttons
        document.querySelectorAll('.checkpoint-btn').forEach(btn => {
            const phase = btn.dataset.phase;

            if (state.completedPhases.has(phase)) {
                btn.classList.add('completed');
                btn.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> Phase Complete!';
            }

            btn.addEventListener('click', function() {
                if (!state.completedPhases.has(phase)) {
                    completePhase(phase, this);
                }
            });
        });
    }

    function saveProgress() {
        localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify([...state.completedSteps]));
    }

    function saveCompletedPhases() {
        localStorage.setItem(STORAGE_KEYS.COMPLETED_PHASES, JSON.stringify([...state.completedPhases]));
    }

    function updateProgressBar() {
        const totalSteps = document.querySelectorAll('.step-checkbox input[type="checkbox"]').length;
        const completedSteps = state.completedSteps.size;
        const percentage = totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;

        const progressFill = document.querySelector('.progress-fill');
        const progressPercent = document.getElementById('progressPercent');

        if (progressFill) {
            progressFill.style.width = percentage + '%';
        }

        if (progressPercent) {
            progressPercent.textContent = `${completedSteps}/${totalSteps} (${percentage}%)`;
        }
    }

    function checkPhaseCompletion() {
        // Check each phase for completion
        document.querySelectorAll('.checkpoint').forEach(checkpoint => {
            const phase = checkpoint.dataset.phase;
            const section = checkpoint.closest('section');

            if (section) {
                const checkboxes = section.querySelectorAll('.step-checkbox input[type="checkbox"]');
                const allChecked = Array.from(checkboxes).every(cb => cb.checked);

                if (allChecked && checkboxes.length > 0) {
                    const btn = checkpoint.querySelector('.checkpoint-btn');
                    if (btn && !btn.classList.contains('completed')) {
                        btn.classList.add('ready');
                    }
                }
            }
        });
    }

    function completePhase(phase, button) {
        state.completedPhases.add(phase);
        saveCompletedPhases();

        // Log phase completion to Google Sheets
        const email = localStorage.getItem(EMAIL_KEY);
        if (email) {
            logAccess(email, 'completed_phase' + phase);
        }

        button.classList.remove('ready');
        button.classList.add('completed');
        button.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> Phase Complete!';

        // Celebration animation
        showCelebration();
    }

    function showCelebration() {
        const celebration = document.createElement('div');
        celebration.className = 'celebration';
        celebration.innerHTML = '🎉';
        document.body.appendChild(celebration);

        // Trigger animation
        setTimeout(() => celebration.classList.add('show'), 10);

        // Remove after animation
        setTimeout(() => {
            celebration.classList.remove('show');
            setTimeout(() => celebration.remove(), 300);
        }, 1500);
    }

    // ==========================================
    // Navigation
    // ==========================================

    function initNavigation() {
        // Smooth scroll for nav links
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    e.preventDefault();

                    // Close mobile menu if open
                    const navLinks = document.querySelector('.nav-links');
                    const menuToggle = document.querySelector('.mobile-menu-toggle');
                    if (navLinks && navLinks.classList.contains('active')) {
                        navLinks.classList.remove('active');
                        if (menuToggle) menuToggle.classList.remove('active');
                    }

                    // Scroll to target
                    const headerOffset = 140;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Mobile menu toggle
        const menuToggle = document.querySelector('.mobile-menu-toggle');
        const navLinks = document.querySelector('.nav-links');

        if (menuToggle && navLinks) {
            menuToggle.addEventListener('click', function() {
                this.classList.toggle('active');
                navLinks.classList.toggle('active');
            });
        }

        // Active nav highlighting on scroll
        const sections = document.querySelectorAll('section[id]');
        const navItems = document.querySelectorAll('.nav-list .nav-link');

        window.addEventListener('scroll', debounce(function() {
            let current = '';
            const scrollPos = window.pageYOffset + 150; // Account for header + nav

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;

                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });

            // Only update if we found a current section
            if (current) {
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === '#' + current) {
                        item.classList.add('active');
                    }
                });
            }
        }, 50));
    }

    // ==========================================
    // Expandable Content
    // ==========================================

    function initExpandableContent() {
        // Capability card expand buttons
        document.querySelectorAll('.expand-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const targetId = this.dataset.expand;
                const expandContent = document.getElementById(targetId);

                if (expandContent) {
                    const isExpanded = expandContent.classList.contains('active');
                    expandContent.classList.toggle('active');
                    this.textContent = isExpanded ? 'See example →' : 'Hide example ←';
                }
            });
        });

        // Collapsible sections
        document.querySelectorAll('.collapsible-toggle').forEach(toggle => {
            toggle.addEventListener('click', function() {
                const section = this.closest('.collapsible');
                section.classList.toggle('expanded');
            });
        });
    }

    // ==========================================
    // Tabs
    // ==========================================

    function initTabs() {
        // Handle tabs with .example-tabs and .reference-tabs containers
        document.querySelectorAll('.example-tabs, .reference-tabs').forEach(tabContainer => {
            const tabButtons = tabContainer.querySelectorAll('.tab-btn');
            const tabContents = tabContainer.querySelectorAll('.tab-content');

            tabButtons.forEach(btn => {
                btn.addEventListener('click', function() {
                    const targetTab = this.dataset.tab;

                    // Update button states
                    tabButtons.forEach(b => b.classList.remove('active'));
                    this.classList.add('active');

                    // Update content visibility - match by ID pattern tab-{name}
                    tabContents.forEach(content => {
                        const contentId = content.id;
                        const isMatch = contentId === 'tab-' + targetTab;
                        content.classList.toggle('active', isMatch);
                    });
                });
            });
        });
    }

    // ==========================================
    // Search/Filter (for Reference section)
    // ==========================================

    function initSearchFilter() {
        const searchInput = document.querySelector('.command-search');

        if (searchInput) {
            searchInput.addEventListener('input', debounce(function() {
                const query = this.value.toLowerCase().trim();
                const rows = document.querySelectorAll('.command-table tbody tr');

                rows.forEach(row => {
                    const text = row.textContent.toLowerCase();
                    row.style.display = text.includes(query) ? '' : 'none';
                });
            }, 200));
        }

        // Glossary filter
        const glossarySearch = document.querySelector('.glossary-search');

        if (glossarySearch) {
            glossarySearch.addEventListener('input', debounce(function() {
                const query = this.value.toLowerCase().trim();
                const terms = document.querySelectorAll('.glossary-item');

                terms.forEach(term => {
                    const text = term.textContent.toLowerCase();
                    term.style.display = text.includes(query) ? '' : 'none';
                });
            }, 200));
        }
    }

    // ==========================================
    // Utility Functions
    // ==========================================

    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func.apply(this, args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // ==========================================
    // Reset Progress (for testing/debugging)
    // ==========================================

    window.resetProgress = function() {
        localStorage.removeItem(STORAGE_KEYS.PROGRESS);
        localStorage.removeItem(STORAGE_KEYS.COMPLETED_PHASES);
        state.completedSteps.clear();
        state.completedPhases.clear();

        document.querySelectorAll('.step-checkbox input[type="checkbox"]').forEach(cb => cb.checked = false);
        document.querySelectorAll('.checkpoint-btn').forEach(btn => {
            btn.classList.remove('completed', 'ready');
            btn.innerHTML = 'Mark Phase Complete';
        });

        updateProgressBar();
        console.log('Progress reset!');
    };

})();
