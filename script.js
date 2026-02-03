document.addEventListener("DOMContentLoaded", () => {

    // =========================================================================
    // 1. CRITICAL: MODAL LOGIC & DATA (Must run first)
    // =========================================================================

    // --- V8 COMPREHENSIVE EVENT DATA ---
    const eventData = {
        "paper": {
            title: "📄 PAPER PRESENTATION",
            overview: "Paper Presentation is a prestigious platform for participants to present innovative ideas, research findings, or technical solutions in a structured academic format. This event encourages analytical thinking, problem-solving, and effective communication skills that are essential for future engineers and researchers.",
            objective: [
                "Showcase original research, innovative ideas, or technical case studies",
                "Develop and improve presentation and public speaking skills",
                "Gain academic recognition and professional exposure",
                "Network with peers and industry experts in the field",
                "Receive constructive feedback from experienced judges"
            ],
            eligibility: [
                "Open to all undergraduate and postgraduate students",
                "Individual or team participation (maximum 2 members per team)",
                "Valid college ID card is mandatory",
                "Cross-institutional teams are allowed"
            ],
            format: [
                "Round 1: Abstract Submission - Submit a 300-word abstract before the deadline",
                "Round 2: Screening - Abstracts will be reviewed and shortlisted",
                "Round 3: Presentation - Shortlisted teams present using PowerPoint (PPT)",
                "Duration: 8-10 minutes presentation followed by 2-3 minutes Q&A",
                "Projector and screen will be provided; bring your PPT on USB"
            ],
            rules: [
                "Plagiarism is strictly prohibited - all content must be original",
                "PPT must follow the provided template (if any)",
                "Exceeding time limits will result in penalty points",
                "Maintain professional decorum throughout the presentation",
                "Decision of the judges is final and binding",
                "What to Bring: PPT on USB drive (with backup), Laptop (optional)"
            ],
            judging: [
                "Innovation & Originality (25%) - Novelty of the idea or research",
                "Technical Depth (25%) - Quality of research and technical accuracy",
                "Clarity of Explanation (20%) - How well the concept is communicated",
                "Presentation Skills (15%) - Confidence, body language, and delivery",
                "Response to Questions (15%) - Ability to handle Q&A effectively"
            ]
        },
        "poster": {
            title: "🎨 POSTER PRESENTATION",
            overview: "Poster Presentation empowers participants to visually communicate ideas, concepts, or research through creative and informative poster designs. This event tests your ability to condense complex information into a visually appealing and easily understandable format.",
            objective: [
                "Promote the art of visual storytelling in technical domains",
                "Learn to simplify complex ideas into digestible visual formats",
                "Enhance creative communication and design thinking skills",
                "Develop the ability to explain concepts concisely"
            ],
            eligibility: [
                "Individual participation or team of maximum 2 members",
                "Open to students from all disciplines",
                "Valid institutional ID required"
            ],
            format: [
                "Physical poster display at designated venue locations",
                "Each team gets 5 minutes to explain their poster to judges",
                "Poster Size: A1 (594 × 841 mm) - Portrait orientation preferred",
                "Must include: Title, Abstract, Methodology, Results, Conclusion"
            ],
            rules: [
                "Poster must be original work created by the participant(s)",
                "No pre-printed commercial posters or templates allowed",
                "Hand-drawn or digitally designed posters are both acceptable",
                "Include institution name and participant details on the poster"
            ],
            judging: [
                "Creativity & Design (30%) - Visual appeal and innovative layout",
                "Relevance to Theme (25%) - Alignment with symposium themes",
                "Clarity of Explanation (25%) - How well the poster communicates",
                "Visual Appeal (10%) - Color scheme, readability, and aesthetics",
                "Q&A Response (10%) - Ability to defend and explain the work"
            ]
        },
        "quiz": {
            title: "🧠 TECHNICAL QUIZ",
            overview: "Technical Quiz is a fast-paced, adrenaline-pumping competition designed to test participants' technical knowledge, logical thinking, and quick decision-making abilities. This event covers a wide range of technical topics and challenges your engineering fundamentals.",
            objective: [
                "Assess technical fundamentals across multiple engineering domains",
                "Encourage quick thinking, accuracy, and time management",
                "Test knowledge in current technologies and emerging trends",
                "Foster healthy competition among technically-minded students"
            ],
            eligibility: [
                "Individual participation or team of 2 members",
                "Open to all engineering and science students"
            ],
            format: [
                "Preliminary Round: Written test (20 MCQs in 15 minutes)",
                "Final Round 1: Rapid Fire - 30 seconds per question",
                "Final Round 2: Visual Connect - Identify from images/videos",
                "Final Round 3: Buzzer Round - First to buzz gets to answer"
            ],
            rules: [
                "Absolutely no electronic gadgets allowed during the quiz",
                "Mobile phones must be submitted before entering the quiz hall",
                "Discussion between teams is strictly prohibited",
                "Quiz master's decision on answers is final and binding"
            ],
            judging: [
                "Accuracy (60%) - Correctness of answers",
                "Speed (40%) - Time taken to answer (especially in finals)"
            ]
        },
        "debate": {
            title: "🗣️ DEBATE COMPETITION",
            overview: "Debate Competition is a platform to express opinions, challenge perspectives, and engage in intellectual discussions on contemporary topics. This event sharpens your critical thinking, argumentation skills, and ability to present viewpoints convincingly.",
            objective: [
                "Enhance critical thinking and analytical reasoning abilities",
                "Improve public speaking and communication skills",
                "Encourage healthy discussions on important topics",
                "Develop the ability to view issues from multiple perspectives"
            ],
            eligibility: [
                "Individual participation only",
                "Open to all students with proficiency in English"
            ],
            format: [
                "Topics will be announced 10 minutes before each round",
                "Participants randomly assigned 'For' or 'Against' position",
                "Speaking Time: 3 minutes per participant",
                "Rebuttal Time: 1 minute to counter opponent's arguments"
            ],
            rules: [
                "Time limits are strictly enforced",
                "Respectful and parliamentary language is mandatory",
                "No personal attacks on opponents - focus on arguments only",
                "Judge's decision is final"
            ],
            judging: [
                "Content Relevance (30%) - How well arguments relate to the topic",
                "Argument Strength (30%) - Logic, facts, and persuasiveness",
                "Confidence & Clarity (20%) - Delivery and stage presence",
                "Rebuttal Quality (10%) - Effectiveness of counter-arguments"
            ]
        },
        "udyat": {
            title: "🚀 UDYAT (Innovation Challenge)",
            overview: "UDYAT - meaning 'Rising' - is an innovation-driven event encouraging participants to propose creative solutions to real-world problems. This is your chance to think like an entrepreneur, present your startup ideas, working prototypes, or innovative concepts.",
            objective: [
                "Foster innovation and entrepreneurial thinking",
                "Promote problem-solving mindset among students",
                "Encourage practical application of theoretical knowledge",
                "Provide a platform to showcase working prototypes and models"
            ],
            eligibility: [
                "Open to all students - individuals or teams (max 3 members)",
                "Projects can be at any stage: idea, prototype, or working model"
            ],
            format: [
                "Round 1: Idea Submission - Submit a 500-word concept note",
                "Round 2: Live Pitch - 7 minutes presentation + 3 minutes Q&A",
                "Prototype Demo: Working models can be demonstrated"
            ],
            rules: [
                "Ideas must be original - plagiarism will lead to disqualification",
                "Prototypes are encouraged but not mandatory for participation",
                "Business viability and scalability will be considered",
                "Power supply and table space for demo will be provided"
            ],
            judging: [
                "Innovation (35%) - Novelty and creativity of the solution",
                "Feasibility (25%) - Technical and practical viability",
                "Impact Potential (20%) - Social/commercial value of the idea",
                "Presentation Quality (10%) - Clarity and confidence"
            ]
        },
        "talent": {
            title: "🎭 SHOW YOUR TALENT",
            overview: "Show Your Talent is a vibrant stage to showcase your abilities beyond academics! Whether you're a singer, dancer, mimicry artist, beatboxer, stand-up comedian, or instrumentalist - this is YOUR moment to shine.",
            objective: [
                "Provide a creative outlet for artistic expression",
                "Celebrate the diverse talents within the student community",
                "Build stage confidence and performance skills",
                "Create an entertaining atmosphere at the symposium"
            ],
            eligibility: [
                "Individual or group performance (max 5 members for group)",
                "Open to all students across institutions"
            ],
            format: [
                "Categories: Singing, Dancing, Acting, Mimicry, Beatboxing, Comedy, Instrumental",
                "Time Limit: 4 minutes for solo, 6 minutes for group",
                "Sound check: 30 minutes before your slot"
            ],
            rules: [
                "Content must be appropriate and non-offensive",
                "No vulgarity, political, or religious content allowed",
                "Props are allowed within standard safety guidelines",
                "Background music/tracks must be submitted on USB 1 hour prior"
            ],
            judging: [
                "Creativity & Originality (30%) - Unique presentation",
                "Performance Quality (35%) - Technical skill and execution",
                "Audience Engagement (20%) - Connection with the crowd",
                "Stage Presence (15%) - Confidence and charisma"
            ]
        },
        "game": {
            title: "🎮 FREE FIRE TOURNAMENT",
            overview: "Free Fire Tournament brings the ultimate E-Sports experience! Squad up with your team and battle it out in this intense mobile gaming competition. Strategy, reflexes, teamwork, and survival instincts will be tested.",
            objective: [
                "Promote E-Sports and gaming culture among students",
                "Test strategic thinking and teamwork skills",
                "Provide a competitive platform for gaming enthusiasts",
                "Encourage healthy competition in the digital arena"
            ],
            eligibility: [
                "Squad Mode: 4 players per team",
                "Open to all students - no rank restrictions",
                "Must have Free Fire installed and updated"
            ],
            format: [
                "Match Format: Classic Battle Royale - Bermuda/Purgatory maps",
                "Scoring: Points based on placement + kill points",
                "Top teams from groups advance to Finals"
            ],
            rules: [
                "Fair Play Only - Any form of hacking/cheating = permanent ban",
                "Emulators and triggers are strictly prohibited (Mobile only)",
                "Participants must bring their own devices and mobile data",
                "Match rooms will be created by organizers - codes shared on time"
            ],
            judging: [
                "Placement Points - Higher finish = More points",
                "Kill Points - Each elimination adds to team score",
                "Total Score across all matches determines ranking"
            ]
        },
        "eat": {
            title: "🍽️ EAT AS POSSIBLE",
            overview: "Eat As Possible is a fun-filled, high-energy challenge where participants compete to eat the maximum quantity of food within a strict time limit! Do you have the appetite of a sailor?",
            objective: [
                "Create a fun and entertaining atmosphere",
                "Test appetite, speed, and determination",
                "Provide a unique non-academic competition"
            ],
            eligibility: [
                "Individual participation only",
                "Open to all students (18+ recommended)",
                "Participants with known food allergies should refrain"
            ],
            format: [
                "Food items will be provided by the organizers",
                "Vegetarian and Non-vegetarian options available",
                "Time Limit: 5 minutes to consume as much as possible"
            ],
            rules: [
                "No food wastage - dropped food won't be counted",
                "Hygiene is mandatory - eat with clean hands",
                "Participant must finish chewing before being counted",
                "No external food or drinks allowed"
            ],
            judging: [
                "Quantity Consumed (80%) - Total amount eaten",
                "Time Efficiency (20%) - Speed of completion"
            ]
        },
        "explore": {
            title: "🔍 EXPLORE THE TOPIC",
            overview: "Explore The Topic is an exciting on-the-spot thinking challenge (Extempore / Just-A-Minute) where participants are given a random topic and must speak fluently and coherently with minimal preparation.",
            objective: [
                "Test quick thinking and conceptual clarity",
                "Develop impromptu speaking abilities",
                "Assess general knowledge and current affairs awareness",
                "Build confidence in spontaneous communication"
            ],
            eligibility: [
                "Individual participation only",
                "Open to all students basic English proficiency"
            ],
            format: [
                "Topic Given: Random topic from a chit/bowl",
                "Preparation Time: 1 minute (no notes allowed)",
                "Speaking Time: 2 minutes continuous speaking"
            ],
            rules: [
                "No external references, notes, or mobile phones allowed",
                "Must stay relevant to the given topic",
                "Speaking must be continuous - long pauses are penalized",
                "Maintain appropriate language and decorum"
            ],
            judging: [
                "Fluency (25%) - Smooth and continuous delivery",
                "Relevance (25%) - Staying on topic throughout",
                "Confidence (20%) - Stage presence and body language",
                "Content Quality (20%) - Depth and insight"
            ]
        },
        "content": {
            title: "📱 CONTENT CREATION",
            overview: "Content Creation challenges participants to create engaging digital content based on given themes. Whether it's reels, posters, short videos, or social media posts - showcase your creativity!",
            objective: [
                "Showcase digital creativity and media skills",
                "Promote social media and content creation expertise",
                "Identify talented content creators among students",
                "Create promotional content for the symposium"
            ],
            eligibility: [
                "Individual or team participation (max 2 members)",
                "Open to all students",
                "Must have own device for editing (laptop/phone)"
            ],
            format: [
                "Theme will be announced at the start of the event",
                "Formats Allowed: Reels, Posters, Short Videos, Social Media Posts",
                "Creation Time: 2-3 hours",
                "Submission via Google Drive link"
            ],
            rules: [
                "All content must be original - no copyrighted material",
                "Content must align with the given theme",
                "No offensive, political, or inappropriate content",
                "Submission deadline is strict"
            ],
            judging: [
                "Creativity (35%) - Originality and innovative approach",
                "Engagement Potential (25%) - Likelihood to attract views/shares",
                "Relevance to Theme (20%) - Alignment with given topic",
                "Technical Quality (10%) - Video/image quality and editing"
            ]
        },
        "fit": {
            title: "🏋️ FITNESS CHALLENGE",
            overview: "Fitness Challenge is a physical endurance and fitness-based competition that tests your strength, stamina, and determination! Prove that you're the fittest participant!",
            objective: [
                "Promote fitness and healthy lifestyle",
                "Test physical endurance and mental discipline",
                "Create a fun competitive atmosphere around fitness"
            ],
            eligibility: [
                "Individual participation only",
                "Open to all students (no medical conditions)",
                "Sports attire is mandatory"
            ],
            format: [
                "Challenge 1: Maximum Push-ups in 1 minute",
                "Challenge 2: Longest Plank Hold",
                "Challenge 3: Maximum Squats in 1 minute",
                "Combined score determines overall ranking"
            ],
            rules: [
                "Proper form is mandatory - improper reps won't be counted",
                "Referee's count is final - no arguments allowed",
                "Participants must complete warm-up before starting",
                "Sports shoes are compulsory"
            ],
            judging: [
                "Endurance (50%) - Total reps/duration achieved",
                "Form & Technique (30%) - Quality of each repetition",
                "Consistency (20%) - Maintaining pace throughout"
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

});
