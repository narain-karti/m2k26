// Custom Cursor Removed: Using system default for better performance.

// =========================================================================
// 1. PRIORITY: AUDIO PLAYER LOGIC
// =========================================================================
(function initAudioPlayer() {
    const bgMusic = document.getElementById("bg-music");
    const muteBtn = document.getElementById("mute-btn");

    if (!bgMusic || !muteBtn) {
        console.error("Audio Player: Elements not found");
        return;
    }

    const volumeIcon = muteBtn.querySelector("i");
    bgMusic.volume = 1.0;
    bgMusic.muted = false; // Ensure it starts unmuted in code

    const updateIcon = () => {
        if (!volumeIcon) return;
        // Icon should reflect if user can hear it or if it's strictly paused/muted
        if (bgMusic.muted || bgMusic.paused) {
            volumeIcon.classList.remove("fa-volume-high");
            volumeIcon.classList.add("fa-volume-xmark");
        } else {
            volumeIcon.classList.remove("fa-volume-xmark");
            volumeIcon.classList.add("fa-volume-high");
        }
    };

    // 1. Interaction Listener to Unmute/Play
    const handleFirstInteraction = () => {
        if (bgMusic.paused || bgMusic.muted) {
            bgMusic.muted = false;
            bgMusic.play().then(() => {
                updateIcon();
                console.log("Audio Player: Started unmuted on interaction");
            }).catch(e => console.warn("Play failed on interaction", e));
        }

        interactionEvents.forEach(event => {
            document.removeEventListener(event, handleFirstInteraction);
        });
    };

    const interactionEvents = ["click", "keydown", "touchstart", "scroll", "mousemove"];
    interactionEvents.forEach(event => {
        document.addEventListener(event, handleFirstInteraction, { once: true });
    });

    // 2. Attempt Immediate Play (Unmuted)
    console.log("Audio Player: Attempting immediate unmuted playback...");
    bgMusic.play().then(() => {
        console.log("Audio Player: Unmuted autoplay successful!");
        updateIcon();
    }).catch(err => {
        console.warn("Audio Player: Unmuted autoplay blocked. Trying muted start in background...", err);

        // Fallback: Start muted so it's "running" in the background
        bgMusic.muted = true;
        bgMusic.play().then(() => {
            console.log("Audio Player: Running in background (muted)");
            updateIcon();
        }).catch(e => {
            console.error("Audio Player: Even muted playback failed. Waiting for interaction.", e);
            updateIcon();
        });
    });

    // 3. Manual Mute Button Toggle
    muteBtn.addEventListener("click", (e) => {
        e.stopPropagation();

        if (bgMusic.paused) {
            bgMusic.muted = false;
            bgMusic.play().then(() => {
                updateIcon();
            }).catch(err => console.error("Play failed:", err));
        } else {
            bgMusic.muted = !bgMusic.muted;
            updateIcon();
        }
    });
})();

document.addEventListener("DOMContentLoaded", () => {

    // =========================================================================
    // 1. CRITICAL: MODAL LOGIC & DATA
    // =========================================================================

    // --- V8 COMPREHENSIVE EVENT DATA ---
    const eventData = {
        "paper": {
            title: "📄 PAPER PRESENTATION",
            rules: [
                "Abstract must be typed in Microsoft Word following the given template",
                "Presentation: 10-15 slides using any standardised format",
                "Submit on or before 9th March 2025 via papersmeredith@gmail.com",
                "Participants selected after review will be informed within a week",
                "Event schedule and presentation order shared on 12th March 2025",
                "📞 COORDINATORS: CHIRAG - 7909177248 | SWAVED - 8097740262",
                "📧 CONTACT: papersmeredith@gmail.com | na@ametuniv.ac.in"
            ]
        },
        "poster": {
            title: "🎨 POSTER PRESENTATION",
            rules: [
                "Poster size must be A3",
                "Include Title, Objective, Methodology, Result, and Conclusion",
                "Teams must have two members: Author and Co-author",
                "📞 COORDINATORS: KIRUTHIKA - 8925494044 | ARJUN - 8129423177",
                "📧 CONTACT: na@ametuniv.ac.in"
            ]
        },
        "quiz": {
            title: "🧠 TECHNICAL QUIZ",
            rules: [
                "Absolutely no electronic gadgets allowed during the quiz",
                "Mobile phones must be submitted before entering the quiz hall",
                "Discussion between teams is strictly prohibited",
                "Quiz master's decision on answers is final and binding"
            ]
        },
        "debate": {
            title: "🗣️ DEBATE COMPETITION",
            rules: [
                "Each team must consist of three members",
                "A team leader must be selected at the time of registration",
                "Debate is conducted on general topic",
                "📞 COORDINATORS: THALASEKAR - 8838266721 | NIYA - 8075333842",
                "📧 CONTACT: na@ametuniv.ac.in"
            ]
        },
        "udyat": {
            title: "🚀 UDYAT (Innovation Challenge)",
            rules: [
                "Any business idea, project idea, innovation idea can be presented",
                "Can be performed individually or as a group",
                "All technical and non-technical ideas are accepted",
                "The idea you propose should not affect environment or cause harm to anyone",
                "The preliminary round will be held in chart work",
                "Last date registration is 9th March",
                "📞 COORDINATORS: ASHWIN - 9360086421 | ABHINASH G - 9600004833",
                "📧 CONTACT: na@ametuniv.ac.in"
            ]
        },
        "talent": {
            title: "🎭 SHOW YOUR TALENT",
            rules: [
                "90 seconds performance time for each contestant",
                "Contestants rate themselves before performing",
                "Win if judges' average score matches your self-rating",
                "No offensive content allowed",
                "Contestants prohibited from making inappropriate or offensive remarks/gestures",
                "No targeting any group with harmful language",
                "Respect for audience and judges required",
                "Acts making audience unnecessarily uncomfortable may lead to disqualification",
                "📞 COORDINATORS: AFFAN - 7795912239 | SATYAM - 7709551561",
                "📧 CONTACT: na@ametuniv.ac.in"
            ]
        },
        "game": {
            title: "🎮 FREE FIRE TOURNAMENT",
            rules: [
                "Teams must register through official tournament website/platform",
                "Submit roster (player names, IDs, roles) during registration",
                "Winning team: Most kills + surviving players",
                "Gameplay: Standard Free Fire rules apply",
                "Cheating: Any cheating, hacking, or exploiting = immediate disqualification",
                "Late Arrival: Teams arriving late may be penalized or disqualified",
                "Rule Violations: May result in penalty or disqualification",
                "📞 COORDINATORS: DINESH KATRTHICK - 9789295636 | DINESH KUMAR - 9384798595",
                "📧 CONTACT: na@ametuniv.ac.in"
            ]
        },
        "eat": {
            title: "🍽️ EAT AS POSSIBLE",
            rules: [
                "Each participant must sign waiver acknowledging risks",
                "Complete the task within given time",
                "Water allowed: 200-500ml ONLY (more = disqualification)",
                "Each participant must eat the given food",
                "Can't/won't eat = participant is eliminated",
                "Judged by time taken to complete OR amount consumed within time",
                "📞 COORDINATORS: ROHIT - 9384688760 | ARIBA - 8296286049",
                "📧 CONTACT: na@ametuniv.ac.in"
            ]
        },
        "explore": {
            title: "🔍 EXPLORE THE TOPIC",
            rules: [
                "Each player draws paper from bowl after shuffling",
                "Bowl contains: Cricket, Movies, Music, Food",
                "After selecting topic, answer questions related to it",
                "📞 COORDINATORS: SARAVANAN - 9342439897 | THIRUMURUGAN - 6374689765",
                "📧 CONTACT: na@ametuniv.ac.in"
            ]
        },
        "content": {
            title: "📱 CONTENT CREATION",
            rules: [
                "COPYRIGHT: Ensure content doesn't violate copyright laws",
                "If using others' work (music, images, videos) - get permission or use licensed content (e.g., Creative Commons)",
                "Violating copyright can result in legal action",
                "FAIR USE: Applies to criticism, commentary, education, research",
                "Fair use is a gray area - when in doubt, seek legal advice",
                "📞 COORDINATORS: RIYAZ - 6379369558 | TINESH - 7305611088",
                "📧 CONTACT: na@ametuniv.ac.in"
            ]
        },
        "fit": {
            title: "🏋️ FITNESS CHALLENGE",
            rules: [
                "Tasks: push-ups, pull-ups, barbell curls, bicep curls need to be performed",
                "Counts will be given on spot",
                "Proper form required for counts",
                "Sports attire mandatory",
                "📞 COORDINATORS: KAVIRAJ - 8122804863 | THIRUMURUGAN - 6374689765",
                "📧 CONTACT: na@ametuniv.ac.in"
            ]
        }
    };

    // --- INITIALIZE MODAL LISTENERS (Robust) ---
    console.log("Initialize modal listeners...");
    const modal = document.getElementById("event-modal");

    if (modal) {
        const mTitle = document.getElementById("modal-title");
        const mOverview = document.getElementById("modal-overview");
        const mObjective = document.getElementById("modal-objective");
        const mEligibility = document.getElementById("modal-eligibility");
        const mFormat = document.getElementById("modal-format");
        const mRules = document.getElementById("modal-rules");
        const mJudging = document.getElementById("modal-judging");
        const mDownloadsSection = document.getElementById("sec-downloads");
        const mDownloadsContainer = document.getElementById("modal-downloads-container");

        const closeBtn = document.querySelector(".close-modal");
        const overlay = document.querySelector(".modal-overlay");
        const navbar = document.querySelector("nav");

        function populateList(ulElement, items) {
            if (!ulElement) return;
            ulElement.innerHTML = "";
            if (!items) return;
            items.forEach(item => {
                const li = document.createElement("li");
                li.textContent = item;
                ulElement.appendChild(li);
            });
        }

        function openModal(key) {
            console.log("Opening modal for:", key);
            const data = eventData[key];
            if (!data) {
                console.error("Event Data Not Found for key: " + key);
                return;
            }

            if (mTitle) mTitle.textContent = data.title;
            if (mOverview) mOverview.textContent = data.overview;
            populateList(mObjective, data.objective);
            populateList(mEligibility, data.eligibility);
            populateList(mFormat, data.format);
            populateList(mRules, data.rules);
            populateList(mJudging, data.judging);

            // Populate Downloads
            if (mDownloadsSection && mDownloadsContainer) {
                if (data.downloads && data.downloads.length > 0) {
                    mDownloadsContainer.innerHTML = "";
                    data.downloads.forEach(dl => {
                        const btn = document.createElement("a");
                        btn.href = dl.url;
                        btn.target = "_blank";
                        btn.className = "access-btn";
                        btn.style.flex = "1 1 200px";
                        btn.style.textAlign = "center";
                        btn.style.textDecoration = "none";
                        btn.style.display = "inline-block";
                        btn.innerHTML = `<i class="fa-solid fa-file-pdf"></i> ${dl.label}`;
                        mDownloadsContainer.appendChild(btn);
                    });
                    mDownloadsSection.style.display = "block";
                } else {
                    mDownloadsSection.style.display = "none";
                }
            }

            // Direct style manipulation -> FORCE FLEX
            modal.style.display = "flex";
            modal.style.visibility = "visible"; // Redundant check for legacy
            modal.style.opacity = "1";

            // Background lock
            document.body.style.overflow = "hidden";

            // Blur effect
            if (navbar) {
                navbar.style.filter = "blur(8px)";
                navbar.style.pointerEvents = "none";
            }
        }

        function closeModal() {
            console.log("Closing modal");
            modal.style.display = "none";
            document.body.style.overflow = "";

            if (navbar) {
                navbar.style.filter = "none";
                navbar.style.pointerEvents = "all";
            }
        }

        // Attach to all buttons including those inserted dynamically (though they are static)
        const buttons = document.querySelectorAll(".access-btn, .details-btn");
        console.log("Found buttons:", buttons.length);

        buttons.forEach(btn => {
            btn.addEventListener("click", (e) => {
                const key = btn.getAttribute("data-key");
                if (key && eventData[key]) {
                    e.preventDefault();
                    openModal(key);
                }
            });
        });

        if (closeBtn) closeBtn.addEventListener("click", closeModal);
        if (overlay) overlay.addEventListener("click", closeModal);
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") closeModal();
        });

        console.log("Modal Listeners Attached Successfully.");
    } else {
        console.error("Critical: #event-modal not found in DOM");
    }


    // =========================================================================
    // 2. NON-CRITICAL: ANIMATIONS (Try-Catch safe)
    // =========================================================================
    try {
        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            console.log("GSAP Loaded. Initializing animations...");

            gsap.registerPlugin(ScrollTrigger);

            // Panel Reveal Animation
            gsap.utils.toArray(".event-card, .tech-panel").forEach((panel, i) => {
                const fromLeft = i % 2 === 0;
                gsap.fromTo(panel,
                    { clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)", opacity: 0, x: fromLeft ? -30 : 30, filter: "blur(5px)" },
                    {
                        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", opacity: 1, x: 0, filter: "blur(0px)", duration: 1, ease: "power3.out",
                        scrollTrigger: { trigger: panel, start: "top 90%", toggleActions: "play none none reverse" }
                    }
                );
            });

            // Hero Title Parallax
            gsap.to(".hero-title", {
                scrollTrigger: { trigger: "#hero", start: "top top", scrub: true },
                y: -100, opacity: 0
            });
        } else {
            console.warn("GSAP libraries not loaded. Animations skipped.");
        }
    } catch (err) {
        console.error("GSAP Animation Error:", err);
    }


    // =========================================================================
    // 4. REGISTRATION FORM LOGIC
    // =========================================================================

    /**
     * ========================================================================
     * IMPORTANT: GOOGLE APPS SCRIPT WEB APP URL
     * ========================================================================
     * 
     * STEP 1: Create a new Google Apps Script project
     *         - Go to script.google.com
     *         - Create a new project
     *         - Paste the code from google-apps-script.js file
     * 
     * STEP 2: Deploy as Web App
     *         - Click Deploy > New Deployment
     *         - Select "Web App"
     *         - Execute as: "Me"
     *         - Who has access: "Anyone"
     *         - Click Deploy
     * 
     * STEP 3: Copy the Web App URL and paste it below
     * ========================================================================
     */
    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzNgvM7CvSBMEzT6wrxJp9ozHgeRFSNOTs_aM7k9ESd7vaJz9YDDdoeuAXEXsNWNT2gkQ/exec";

    // Get form elements
    const registrationForm = document.getElementById("symposium-registration-form");
    const registerBtn = document.getElementById("register-btn");
    const formMessage = document.getElementById("form-message");

    if (registrationForm) {
        console.log("Registration form found. Initializing...");

        // Prevent duplicate submissions
        let isSubmitting = false;

        // =====================================================================
        // Electrifying Input Effect - Pulse on Typing
        // =====================================================================
        const electricInputs = document.querySelectorAll(".electric-input");
        electricInputs.forEach(wrapper => {
            const input = wrapper.querySelector("input");
            if (input) {
                input.addEventListener("input", () => {
                    wrapper.classList.add("typing");
                    setTimeout(() => wrapper.classList.remove("typing"), 150);
                });
            }
        });

        // =====================================================================
        // Wave Effect on Button Click
        // =====================================================================
        if (registerBtn) {
            registerBtn.addEventListener("click", (e) => {
                const waveEffect = registerBtn.querySelector(".wave-effect");
                if (waveEffect) {
                    // Remove previous animation
                    waveEffect.classList.remove("animate");
                    // Trigger reflow
                    void waveEffect.offsetWidth;
                    // Add animation
                    waveEffect.classList.add("animate");
                }
            });
        }

        // =====================================================================
        // Form Validation
        // =====================================================================
        function validateField(field, errorElement) {
            const value = field.value.trim();
            const wrapper = field.closest(".input-wrapper");
            let isValid = true;
            let errorMsg = "";

            // Clear previous error
            if (wrapper) wrapper.classList.remove("error");
            if (errorElement) errorElement.textContent = "";

            // Check required fields
            if (field.hasAttribute("required") && !value) {
                isValid = false;
                errorMsg = "This field is required";
            }

            // Email validation
            else if (field.type === "email" && value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    isValid = false;
                    errorMsg = "Please enter a valid email address";
                }
            }

            // Phone validation
            else if (field.type === "tel" && value) {
                const phoneRegex = /^[0-9]{10}$/;
                if (!phoneRegex.test(value)) {
                    isValid = false;
                    errorMsg = "Please enter a valid 10-digit phone number";
                }
            }

            // Age validation
            else if (field.type === "number" && field.name === "age" && value) {
                const age = parseInt(value);
                if (isNaN(age) || age < 16 || age > 99) {
                    isValid = false;
                    errorMsg = "Age must be between 16 and 99";
                }
            }

            // Show error
            if (!isValid) {
                if (wrapper) wrapper.classList.add("error");
                if (errorElement) errorElement.textContent = errorMsg;
            }

            return isValid;
        }

        // Real-time validation on blur
        const formInputs = registrationForm.querySelectorAll("input[required]");
        formInputs.forEach(input => {
            const errorElement = document.getElementById(`${input.id}-error`);
            input.addEventListener("blur", () => validateField(input, errorElement));
        });

        // =====================================================================
        // Sanitize Input
        // =====================================================================
        function sanitizeInput(str) {
            if (typeof str !== "string") return str;
            return str
                .trim()
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#x27;");
        }

        // =====================================================================
        // Form Submission
        // =====================================================================
        registrationForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            // Prevent duplicate submissions
            if (isSubmitting) {
                console.log("Form already submitting...");
                return;
            }

            // Validate all fields
            let isFormValid = true;
            formInputs.forEach(input => {
                const errorElement = document.getElementById(`${input.id}-error`);
                if (!validateField(input, errorElement)) {
                    isFormValid = false;
                }
            });

            // Check if at least one event is selected
            const selectedEvents = registrationForm.querySelectorAll('input[name="events"]:checked');
            const eventsError = document.getElementById("events-error");
            if (selectedEvents.length === 0) {
                isFormValid = false;
                if (eventsError) eventsError.textContent = "Please select at least one event";
            } else {
                if (eventsError) eventsError.textContent = "";
            }

            if (!isFormValid) {
                console.log("Form validation failed");
                return;
            }

            // Collect form data
            const formData = {
                timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
                fullName: sanitizeInput(document.getElementById("fullName").value),
                collegeName: sanitizeInput(document.getElementById("collegeName").value),
                age: document.getElementById("age").value,
                email: sanitizeInput(document.getElementById("email").value),
                contactNumber: sanitizeInput(document.getElementById("contactNumber").value),
                cityState: sanitizeInput(document.getElementById("cityState").value) || "N/A",
                selectedEvents: Array.from(selectedEvents).map(cb => cb.value)
            };

            console.log("Submitting form data:", formData);

            // Set submitting state
            isSubmitting = true;
            registerBtn.disabled = true;
            registerBtn.classList.add("loading");

            // Hide previous messages
            formMessage.className = "form-message";
            formMessage.textContent = "";

            try {
                // Check if URL is configured
                if (GOOGLE_SCRIPT_URL === "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE") {
                    throw new Error("Google Apps Script URL not configured. Please deploy the script and update the URL.");
                }

                const response = await fetch(GOOGLE_SCRIPT_URL, {
                    method: "POST",
                    mode: "no-cors", // Required for Google Apps Script
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                });

                // Note: With no-cors, we can't read the response
                // We assume success if no error is thrown
                console.log("Form submitted successfully");

                // Show success message
                formMessage.className = "form-message success";
                formMessage.textContent = "Registration successful! See you at the symposium 🎉";

                // Reset form
                registrationForm.reset();

            } catch (error) {
                console.error("Form submission error:", error);

                // Show error message
                formMessage.className = "form-message error";
                formMessage.textContent = error.message || "Something went wrong. Please try again.";
            } finally {
                // Reset submitting state
                isSubmitting = false;
                registerBtn.disabled = false;
                registerBtn.classList.remove("loading");
            }
        });

        // =====================================================================
        // GSAP Scroll Animation for Registration Form
        // =====================================================================
        try {
            if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
                const regContainer = document.querySelector(".registration-form-container");
                if (regContainer) {
                    gsap.fromTo(regContainer,
                        {
                            opacity: 0,
                            y: 60,
                            filter: "blur(10px)"
                        },
                        {
                            opacity: 1,
                            y: 0,
                            filter: "blur(0px)",
                            duration: 1,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: regContainer,
                                start: "top 85%",
                                toggleActions: "play none none reverse"
                            }
                        }
                    );
                }
            }
        } catch (err) {
            console.error("Registration form animation error:", err);
        }

        // =====================================================================
        // Rainbow Cursor Trail (Container Only)
        // =====================================================================
        const regContainer = document.querySelector(".registration-form-container");
        if (regContainer) {
            regContainer.addEventListener("mousemove", (e) => {
                const rect = regContainer.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const particle = document.createElement("div");
                particle.className = "cursor-trail-particle";
                particle.style.left = x + "px";
                particle.style.top = y + "px";

                // Rainbow color based on time
                const hue = (Date.now() / 10) % 360;
                particle.style.background = `hsl(${hue}, 100%, 50%)`;
                particle.style.boxShadow = `0 0 10px hsl(${hue}, 100%, 50%)`;

                regContainer.appendChild(particle);

                // Cleanup
                setTimeout(() => {
                    particle.remove();
                }, 800);
            });
        }

        console.log("Registration form initialized successfully.");
    }


    // =========================================================================
    // HERO COUNTDOWN TIMER
    // =========================================================================
    function initCountdown() {
        const targetDate = new Date("March 5, 2026 09:00:00").getTime();

        const daysEl = document.getElementById("days");
        const hoursEl = document.getElementById("hours");
        const minutesEl = document.getElementById("minutes");
        const secondsEl = document.getElementById("seconds");

        if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

        function updateCountdown() {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance < 0) {
                // Event started
                document.getElementById("countdown-container").innerHTML = "<div class='hero-date' style='font-size:3rem; margin-top:0;'>EVENT STARTED</div>";
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            daysEl.innerText = days < 10 ? "0" + days : days;
            hoursEl.innerText = hours < 10 ? "0" + hours : hours;
            minutesEl.innerText = minutes < 10 ? "0" + minutes : minutes;
            secondsEl.innerText = seconds < 10 ? "0" + seconds : seconds;
        }

        updateCountdown(); // Initial call
        setInterval(updateCountdown, 1000);
    }

    initCountdown();

    // =========================================================================
    // END OF SCRIPT
    // =========================================================================
});
