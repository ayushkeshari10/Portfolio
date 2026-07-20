// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    // Preloader Sequence
    const preloader = document.getElementById('preloader');
    const preloaderCounter = document.getElementById('preloader-counter');
    const preloaderBar = document.querySelector('.preloader-bar');
    
    if (preloader && preloaderCounter && preloaderBar) {
        let progress = 0;
        // Disable scroll while loading
        document.body.style.overflow = 'hidden';
        
        const updateLoader = () => {
            progress += Math.floor(Math.random() * 8) + 2;
            if (progress > 100) progress = 100;
            
            preloaderCounter.innerText = progress + '%';
            preloaderBar.style.width = progress + '%';
            
            if (progress < 100) {
                setTimeout(updateLoader, Math.random() * 40 + 20);
            } else {
                // Advanced Shutter Slice Reveal Sequence
                const preloaderContent = document.getElementById('preloader-content-initial');
                const shuttersContainer = document.getElementById('preloader-shutters');
                const shutterSpans = document.querySelectorAll('.shutter span');
                
                setTimeout(() => {
                    // Hide initial loading content
                    if (preloaderContent) {
                        preloaderContent.style.opacity = '0';
                        setTimeout(() => preloaderContent.style.display = 'none', 500);
                    }
                    
                    // 1. Show outlined text
                    setTimeout(() => {
                        shutterSpans.forEach(span => span.classList.add('active'));
                        
                        // 2. Fill the text with glowing color
                        setTimeout(() => {
                            shutterSpans.forEach(span => span.classList.add('fill'));
                            
                            // 3. Slice open the screen (Shutters)
                            setTimeout(() => {
                                if (shuttersContainer) shuttersContainer.classList.add('open');
                                
                                // Unlock scrolling and trigger hero animations
                                document.body.style.overflow = 'auto';
                                document.body.style.overflowX = 'hidden';
                                document.body.classList.add('loaded');
                                
                                // Completely remove preloader after slices slide away
                                setTimeout(() => {
                                    if (preloader) preloader.style.display = 'none';
                                }, 1500);
                                
                            }, 800); // Time holding the glowing text
                        }, 800); // Time holding the outline text
                    }, 400); // Wait for initial loading content to disappear
                }, 300); // Wait after hitting 100%
            }
        };
        
        setTimeout(updateLoader, 100);
    }
    
    // Magnetic Button Physics
    const magneticElements = document.querySelectorAll('.btn, .nav-links a, .social-links a');
    
    magneticElements.forEach(elem => {
        elem.addEventListener('mousemove', (e) => {
            const rect = elem.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            // Move the button (strength: 0.3)
            elem.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
            elem.style.transition = 'none';
        });
        
        elem.addEventListener('mouseleave', () => {
            elem.style.transform = `translate(0px, 0px)`;
            // Add a temporary transition class so it snaps back smoothly
            elem.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        });
        
        elem.addEventListener('mouseenter', () => {
            elem.style.transition = 'none';
        });
    });
    
    // Cursor-Reactive Glow Cards
    const glowCards = document.querySelectorAll('.glass-card');
    glowCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // Interactive Typography (Name Physics)
    const nameElement = document.querySelector('.name');
    if (nameElement) {
        // 1. Split text into individual letter spans
        const text = nameElement.innerText;
        nameElement.innerHTML = '';
        
        text.split('').forEach(char => {
            const span = document.createElement('span');
            span.classList.add('letter');
            if (char === ' ') {
                span.innerHTML = '&nbsp;';
            } else {
                span.innerText = char;
            }
            nameElement.appendChild(span);
        });
        
        const letters = document.querySelectorAll('.name .letter');
        
        // 2. Mouse tracking physics
        nameElement.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            
            letters.forEach(letter => {
                const rect = letter.getBoundingClientRect();
                const letterX = rect.left + rect.width / 2;
                const letterY = rect.top + rect.height / 2;
                
                const distX = mouseX - letterX;
                const distY = mouseY - letterY;
                const distance = Math.sqrt(distX * distX + distY * distY);
                
                const maxDist = 120; // Radius of influence
                if (distance < maxDist) {
                    const force = (maxDist - distance) / maxDist;
                    
                    const moveX = (distX / distance) * -force * 20; 
                    const moveY = (distY / distance) * -force * 30 - (force * 15); // Push up and away
                    const rotX = (distY / distance) * force * 40;
                    const rotY = (distX / distance) * -force * 40;
                    
                    letter.style.transform = `translate3d(${moveX}px, ${moveY}px, ${force * 50}px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(${1 + force * 0.2})`;
                    letter.style.color = '#ffffff';
                    letter.style.textShadow = '0 0 15px var(--primary-color), 0 0 30px var(--secondary-color)';
                    letter.style.zIndex = 10;
                    letter.style.transition = 'none';
                } else {
                    resetLetter(letter);
                }
            });
        });
        
        nameElement.addEventListener('mouseleave', () => {
            letters.forEach(letter => resetLetter(letter));
        });
        
        function resetLetter(letter) {
            letter.style.transform = `translate3d(0, 0, 0) rotateX(0deg) rotateY(0deg) scale(1)`;
            letter.style.color = '';
            letter.style.textShadow = 'none';
            letter.style.zIndex = 1;
            letter.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275), color 0.5s, text-shadow 0.5s';
        }
    }

    // Hero Parallax Effect
    const heroSection = document.querySelector('.hero');
    const heroText = document.querySelector('.hero-text');
    const heroImage = document.querySelector('.hero-image');
    
    if (heroSection) {
        heroSection.addEventListener('mousemove', (e) => {
            const x = (window.innerWidth / 2 - e.pageX) / 60;
            const y = (window.innerHeight / 2 - e.pageY) / 60;
            
            if (heroText) heroText.style.transform = `translate(${x}px, ${y}px)`;
            if (heroImage) heroImage.style.transform = `translate(${x * -2}px, ${y * -2}px)`; // Image moves opposite
        });
        
        heroSection.addEventListener('mouseleave', () => {
            if (heroText) heroText.style.transform = `translate(0px, 0px)`;
            if (heroImage) heroImage.style.transform = `translate(0px, 0px)`;
            if (heroText) heroText.style.transition = `transform 0.5s ease`;
            if (heroImage) heroImage.style.transition = `transform 0.5s ease`;
        });
        
        heroSection.addEventListener('mouseenter', () => {
            if (heroText) heroText.style.transition = `none`;
            if (heroImage) heroImage.style.transition = `none`;
        });
    }

    // Custom Cursor & Follower
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, .glass-card, .btn, .project-card, .close-modal');

    // 3D Tilt Effect for Project & Education Cards
    const tiltCards = document.querySelectorAll('.project-card, .education-card');
    
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element
            const y = e.clientY - rect.top; // y position within the element
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Calculate rotation (max 10 degrees)
            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            card.style.transition = 'transform 0.5s ease';
        });
        
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'none';
        });
    });

    // Neural Network Canvas Animation
    const canvas = document.getElementById('neural-net-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];
        
        function resize() {
            width = canvas.clientWidth;
            height = canvas.clientHeight;
            canvas.width = width;
            canvas.height = height;
        }
        
        window.addEventListener('resize', resize);
        resize();
        
        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 1.5;
                this.vy = (Math.random() - 0.5) * 1.5;
                this.radius = Math.random() * 2 + 1;
            }
            
            update() {
                this.x += this.vx;
                this.y += this.vy;
                
                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;
            }
            
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = '#a18cd1'; // primary theme color
                ctx.fill();
            }
        }
        
        for (let i = 0; i < 70; i++) {
            particles.push(new Particle());
        }
        
        function animateNet() {
            ctx.clearRect(0, 0, width, height);
            
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
                
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    
                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(161, 140, 209, ${1 - dist / 120})`;
                        ctx.lineWidth = 1;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(animateNet);
        }
        
        animateNet();
    }

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.5;
        cursorY += (mouseY - cursorY) * 0.5;
        followerX += (mouseX - followerX) * 0.15;
        followerY += (mouseY - followerY) * 0.15;
        
        if (cursor) {
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
        }
        if (cursorFollower) {
            cursorFollower.style.left = followerX + 'px';
            cursorFollower.style.top = followerY + 'px';
        }
        
        requestAnimationFrame(animateCursor);
    }
    
    if (window.innerWidth > 900) {
        animateCursor();
    }

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            if (cursorFollower) cursorFollower.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            if (cursorFollower) cursorFollower.classList.remove('hover');
        });
    });

    // Ambient Mouse-Tracking Background
    const blobs = document.querySelectorAll('.blob');
    document.addEventListener('mousemove', (e) => {
        if (window.innerWidth <= 900) return; // Disable on mobile
        const x = (e.clientX / window.innerWidth - 0.5) * 60;
        const y = (e.clientY / window.innerHeight - 0.5) * 60;
        
        blobs.forEach((blob, index) => {
            const speed = index === 0 ? 1 : -1.5;
            blob.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
        });
    });

    // Navbar Scroll Effect & Scroll Progress
    const navbar = document.querySelector('.navbar');
    const scrollProgress = document.querySelector('.scroll-progress');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        if (scrollProgress) {
            const totalScroll = document.documentElement.scrollTop;
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scroll = `${(totalScroll / windowHeight) * 100}%`;
            scrollProgress.style.width = scroll;
        }
    });

    // Advanced Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');
            mobileBtn.classList.toggle('toggle');
        });
    }

    // Timeline Scroll Draw
    const timeline = document.querySelector('.timeline');
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    if (timeline) {
        window.addEventListener('scroll', () => {
            const timelineRect = timeline.getBoundingClientRect();
            // We use 3/4 of the screen height as the drawing threshold
            const drawThreshold = window.innerHeight * 0.75;
            
            let progress = 0;
            if (timelineRect.top < drawThreshold) {
                progress = ((drawThreshold - timelineRect.top) / timelineRect.height) * 100;
            }
            if (progress > 100) progress = 100;
            if (progress < 0) progress = 0;
            
            timeline.style.setProperty('--scroll-progress', `${progress}%`);
            
            // Light up dots when the line reaches them
            timelineItems.forEach(item => {
                const itemRect = item.getBoundingClientRect();
                if (itemRect.top < drawThreshold) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });
        });
    }

    // Intersection Observer for Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once visible if you only want it to animate once
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in-up');
    animatedElements.forEach(el => observer.observe(el));
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Adjust for navbar height
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Hide mobile menu after clicking a link
                if (window.innerWidth <= 768) {
                    navLinks.classList.remove('nav-active');
                    mobileBtn.classList.remove('toggle');
                }
            }
        });
    });

    // Typewriter Effect
    const titleElement = document.querySelector('.title .gradient-text');
    if (titleElement) {
        const text = "Software Engineer"; // We will set this directly
        titleElement.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                titleElement.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        setTimeout(typeWriter, 1000);
    }

    // 3D Tilt Effect on cards
    const cards = document.querySelectorAll('.glass-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -5;
            const rotateY = ((x - centerX) / centerX) * 5;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // Project Modals
    const modal = document.getElementById('project-modal');
    if (modal) {
        const modalTitle = document.getElementById('modal-title');
        const modalDesc = document.getElementById('modal-desc');
        const modalTags = document.getElementById('modal-tags');
        const modalLinks = document.getElementById('modal-links');
        const closeModal = document.querySelector('.close-modal');
        
        const projectData = {
            'Nexus - Social Media': {
                title: 'Nexus - Social Media',
                desc: 'A full-stack social media platform enabling users to connect, share posts, and interact in real-time. Features JWT authentication, secure password hashing, and a scalable MERN architecture. It demonstrates a deep understanding of RESTful APIs and modern frontend state management.',
                tags: ['MongoDB', 'Express', 'React', 'Node.js'],
                links: '<a href="https://github.com/ayushkeshari10/Nexus" target="_blank" class="btn btn-primary"><i class="fab fa-github"></i> View Code</a>'
            },
            'Auth-System': {
                title: 'Auth-System',
                desc: 'A robust authentication and authorization system using JSON Web Tokens (JWT). Includes secure route protection, encrypted user data storage, and middleware integration to ensure enterprise-grade security standards.',
                tags: ['Node.js', 'Express', 'JWT', 'MongoDB'],
                links: '<a href="https://github.com/ayushkeshari10/Auth-System" target="_blank" class="btn btn-primary"><i class="fab fa-github"></i> View Code</a>'
            }
        };

        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (e.target.closest('a')) return;
                
                const titleNode = card.querySelector('h3');
                if (!titleNode) return;
                
                const title = titleNode.innerText.trim();
                const data = projectData[title] || { 
                    title: title, 
                    desc: card.querySelector('p') ? card.querySelector('p').innerText : 'Detailed description coming soon.', 
                    tags: Array.from(card.querySelectorAll('.tags span')).map(s => s.innerText),
                    links: card.querySelector('.project-links') ? card.querySelector('.project-links').innerHTML : ''
                };

                modalTitle.innerText = data.title;
                modalDesc.innerText = data.desc;
                modalTags.innerHTML = data.tags.map(t => `<span>${t}</span>`).join('');
                modalLinks.innerHTML = data.links;
                
                modal.classList.add('active');
            });
        });

        if (closeModal) {
            closeModal.addEventListener('click', () => modal.classList.remove('active'));
        }
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.classList.remove('active');
        });
    }
});

// ==========================================
// Holographic Radar Chart for Personal Skills
// ==========================================
function initRadarChart() {
    const canvas = document.getElementById('radarChart');
    const container = document.querySelector('.radar-container');
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    
    const size = 600;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    
    canvas.style.width = '100%';
    canvas.style.maxWidth = `${size}px`;
    canvas.style.height = 'auto';
    canvas.style.aspectRatio = '1 / 1';
    canvas.style.transition = 'transform 0.1s ease-out';
    
    ctx.scale(dpr, dpr);

    const centerX = size / 2;
    const centerY = size / 2;
    const radius = 180;

    const skills = [
        { name: "Problem Solving", value: 95 },
        { name: "Leadership", value: 85 },
        { name: "Communication", value: 90 },
        { name: "Adaptability", value: 88 },
        { name: "Critical Thinking", value: 92 },
        { name: "Time Management", value: 80 }
    ];

    const numSides = skills.length;
    const angleStep = (Math.PI * 2) / numSides;
    
    let progress = 0;
    let isAnimating = false;
    let startTime = null;

    // 3D Hover Physics
    container.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const rotateX = (y / rect.height) * -20; // Max tilt 20deg
        const rotateY = (x / rect.width) * 20;
        canvas.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });

    container.addEventListener('mouseleave', () => {
        canvas.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
        canvas.style.transition = 'transform 0.5s ease-out';
        setTimeout(() => canvas.style.transition = 'transform 0.1s ease-out', 500);
    });

    function drawRadar(currentProgress, time) {
        ctx.clearRect(0, 0, size, size);

        // 1. Draw concentric background grids
        const levels = 5;
        for (let i = 1; i <= levels; i++) {
            const r = (radius / levels) * i;
            ctx.beginPath();
            for (let j = 0; j < numSides; j++) {
                const angle = j * angleStep - Math.PI / 2;
                const x = centerX + Math.cos(angle) * r;
                const y = centerY + Math.sin(angle) * r;
                if (j === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.closePath();
            ctx.strokeStyle = `rgba(99, 102, 241, ${0.1 + (i * 0.05)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
        }

        // 2. Sweeping Radar Beam (Continuous)
        if (currentProgress > 0.5) {
            const sweepAngle = (time / 1000) * (Math.PI * 2) * 0.5; // Rotate half a circle per sec
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, sweepAngle, sweepAngle + 0.5);
            ctx.closePath();
            const beamGrad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
            beamGrad.addColorStop(0, "rgba(236, 72, 153, 0.4)");
            beamGrad.addColorStop(1, "rgba(236, 72, 153, 0)");
            ctx.fillStyle = beamGrad;
            ctx.fill();
        }

        // 3. Draw axes and labels
        for (let i = 0; i < numSides; i++) {
            const angle = i * angleStep - Math.PI / 2;
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;
            
            // Axis line
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(x, y);
            ctx.strokeStyle = "rgba(99, 102, 241, 0.2)";
            ctx.lineWidth = 1.5;
            ctx.stroke();

            // Label
            const labelX = centerX + Math.cos(angle) * (radius + 40);
            const labelY = centerY + Math.sin(angle) * (radius + 40);
            
            ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
            ctx.font = "600 15px 'Inter', sans-serif";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(skills[i].name, labelX, labelY);
        }

        // 4. Draw the animated Data Polygon
        ctx.beginPath();
        for (let i = 0; i < numSides; i++) {
            const angle = i * angleStep - Math.PI / 2;
            const easedProgress = Math.min(1, Math.max(0, currentProgress * 1.5 - i * 0.1));
            const p = 1 - Math.pow(1 - easedProgress, 3); 
            
            const valueRadius = (skills[i].value / 100) * radius * p;
            const x = centerX + Math.cos(angle) * valueRadius;
            const y = centerY + Math.sin(angle) * valueRadius;
            
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.closePath();

        // Polygon Fill
        const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
        gradient.addColorStop(0, "rgba(99, 102, 241, 0.8)");
        gradient.addColorStop(1, "rgba(236, 72, 153, 0.4)");
        ctx.fillStyle = gradient;
        ctx.fill();

        // Polygon Stroke
        ctx.strokeStyle = "#ec4899";
        ctx.lineWidth = 3;
        ctx.lineJoin = "round";
        ctx.stroke();

        // 5. Draw continuously pulsing glowing nodes
        for (let i = 0; i < numSides; i++) {
            const angle = i * angleStep - Math.PI / 2;
            const easedProgress = Math.min(1, Math.max(0, currentProgress * 1.5 - i * 0.1));
            const p = 1 - Math.pow(1 - easedProgress, 3); 
            const valueRadius = (skills[i].value / 100) * radius * p;
            const x = centerX + Math.cos(angle) * valueRadius;
            const y = centerY + Math.sin(angle) * valueRadius;

            if (p > 0) {
                // Continuous pulse math
                const pulse = Math.sin(time / 200 + i) * 2; 

                ctx.beginPath();
                ctx.arc(x, y, 6, 0, Math.PI * 2);
                ctx.fillStyle = "#ffffff";
                ctx.fill();
                
                ctx.beginPath();
                ctx.arc(x, y, 10 + pulse, 0, Math.PI * 2);
                ctx.strokeStyle = "rgba(236, 72, 153, 0.8)";
                ctx.lineWidth = 2;
                ctx.stroke();
            }
        }
    }

    // Infinite Animation Loop
    function animate(timestamp) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        
        if (progress < 1) {
            progress += 0.015; // Initial reveal speed
        }
        
        drawRadar(Math.min(progress, 1), elapsed);
        requestAnimationFrame(animate);
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !isAnimating) {
                isAnimating = true;
                requestAnimationFrame(animate);
            }
        });
    }, { threshold: 0.3 });

    observer.observe(container);
}

// Call on load
document.addEventListener('DOMContentLoaded', () => {
    initRadarChart();
});
