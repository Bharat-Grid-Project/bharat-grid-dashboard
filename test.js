

        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        pitchblack: '#020617',
                        neoncyan: '#00f2fe',
                        amethyst: '#7f00ff',
                        plasma: '#ff0055'
                    },
                    fontFamily: {
                        sans: ['Inter', 'sans-serif'],
                        mono: ['JetBrains Mono', 'monospace'],
                    },
                    backgroundImage: {
                        'neon-purple': 'linear-gradient(135deg, #7f00ff 0%, #e100ff 100%)',
                        'electric-mint': 'linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)',
                    },
                    animation: {
                        'spin-slow': 'spin 8s linear infinite',
                        'pulse-glow': 'pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                    },
                    keyframes: {
                        pulseGlow: {
                            '0%, 100%': { opacity: 1, boxShadow: '0 0 15px rgba(0, 242, 254, 0.4)' },
                            '50%': { opacity: .7, boxShadow: '0 0 5px rgba(0, 242, 254, 0.1)' },
                        }
                    }
                }
            }
        }
    

        // --- Generative Node Topology Mesh ---
        const canvas = document.getElementById('topology-canvas');
        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];
        
        let mouseX = -1000;
        let mouseY = -1000;
        const cursorGlow = document.getElementById('cursor-glow');

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorGlow.style.opacity = '1';
            cursorGlow.style.left = mouseX + 'px';
            cursorGlow.style.top = mouseY + 'px';
        });

        window.addEventListener('mouseout', () => {
            mouseX = -1000;
            mouseY = -1000;
            cursorGlow.style.opacity = '0';
        });

        function resizeCanvas() {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        }

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.4;
                this.vy = (Math.random() - 0.5) * 0.4;
                this.baseRadius = Math.random() * 1.5 + 0.5;
                this.radius = this.baseRadius;
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;
                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;
                
                // Interactive mouse repulsion / glow
                const dx = mouseX - this.x;
                const dy = mouseY - this.y;
                const dist = Math.sqrt(dx*dx + dy*dy);
                
                if (dist < 150) {
                    this.radius = this.baseRadius * 2;
                    // gentle repel
                    this.x -= (dx / dist) * 0.05;
                    this.y -= (dy / dist) * 0.05;
                } else {
                    this.radius = this.baseRadius;
                }
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(0, 242, 254, 0.7)';
                ctx.fill();
            }
        }

        const particleCount = Math.floor((window.innerWidth * window.innerHeight) / 12000);
        for (let i = 0; i < Math.min(particleCount, 120); i++) {
            particles.push(new Particle());
        }

        function animateTopology() {
            ctx.clearRect(0, 0, width, height);
            
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 130) {
                        ctx.beginPath();
                        
                        // If near mouse, intense purple, else mix
                        const mouseDistI = Math.sqrt(Math.pow(mouseX - particles[i].x, 2) + Math.pow(mouseY - particles[i].y, 2));
                        if(mouseDistI < 150) {
                            ctx.strokeStyle = `rgba(127, 0, 255, ${0.6 * (1 - distance/130)})`;
                        } else {
                            ctx.strokeStyle = `rgba(0, 242, 254, ${0.15 * (1 - distance/130)})`;
                        }
                        
                        ctx.lineWidth = 1;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
                particles[i].draw();
            }
            
            // Draw lines to mouse
            for (let i = 0; i < particles.length; i++) {
                const dx = particles[i].x - mouseX;
                const dy = particles[i].y - mouseY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 150) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(225, 0, 255, ${0.4 * (1 - distance/150)})`;
                    ctx.lineWidth = 1.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(mouseX, mouseY);
                    ctx.stroke();
                }
            }

            requestAnimationFrame(animateTopology);
        }
        
        animateTopology();

        // --- Live Registry Polling ---
        const generateMockNodes = () => {
            const count = Math.floor(Math.random() * 2) + 4; 
            const nodes = [];
            const regions = ['ap-south-1 (Mumbai)', 'ap-south-2 (Delhi)', 'eu-central-1 (Frankfurt)', 'us-east-1 (N. Virginia)'];
            for(let i=0; i<count; i++) {
                nodes.push({
                    id: 'node-' + Math.random().toString(36).substring(2, 10),
                    status: 'ONLINE',
                    uptime: (Math.random() * 5 + 94).toFixed(2) + '%',
                    cpu: Math.floor(Math.random() * 70) + 10,
                    region: regions[Math.floor(Math.random() * regions.length)]
                });
            }
            return nodes;
        };

        const renderNodes = (nodes) => {
            const container = document.getElementById('nodes-container');
            container.innerHTML = '';
            
            nodes.forEach(node => {
                const card = document.createElement('div');
                card.className = 'glass-card glass-card-hover rounded-xl p-5 flex flex-col gap-4 cursor-default';
                
                card.innerHTML = `
                    <div class="flex justify-between items-start">
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 shadow-inner">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00f2fe" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>
                            </div>
                            <div>
                                <h4 class="font-mono text-sm tracking-tight font-bold text-white">${node.id}</h4>
                                <p class="text-xs text-white/50 flex items-center gap-1 mt-0.5">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                                    ${node.region}
                                </p>
                            </div>
                        </div>
                        <span class="neon-badge-cyan text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 tracking-wider font-mono">
                            <span class="w-1.5 h-1.5 rounded-full bg-neoncyan animate-pulse"></span>
                            ${node.status}
                        </span>
                    </div>
                    <div class="grid grid-cols-2 gap-6 mt-1">
                        <div class="flex flex-col gap-1.5">
                            <div class="flex justify-between items-center">
                                <span class="text-[10px] text-white/40 uppercase tracking-widest font-semibold">CPU Load</span>
                                <span class="text-xs font-mono text-white/80">${node.cpu}%</span>
                            </div>
                            <div class="cpu-bar-bg">
                                <div class="cpu-bar-fill" style="width: ${node.cpu}%"></div>
                            </div>
                        </div>
                        <div class="flex flex-col gap-1.5">
                            <div class="flex justify-between items-center">
                                <span class="text-[10px] text-white/40 uppercase tracking-widest font-semibold">Uptime</span>
                                <span class="text-xs font-mono text-[#00f2fe]">${node.uptime}</span>
                            </div>
                            <div class="cpu-bar-bg">
                                <div class="cpu-bar-fill" style="width: ${parseFloat(node.uptime)}%; background: linear-gradient(90deg, #00f2fe, #00f2fe);"></div>
                            </div>
                        </div>
                    </div>
                `;
                container.appendChild(card);
            });
        };

        const fetchNodes = async () => {
            try {
                const response = await fetch('/api/nodes/active');
                if (response.ok) {
                    const data = await response.json();
                    renderNodes(data);
                } else {
                    renderNodes(generateMockNodes());
                }
            } catch (error) {
                renderNodes(generateMockNodes());
            }
        };

        fetchNodes();
        setInterval(fetchNodes, 5000);

        // --- Deployment Logic & Cyber Terminal ---
        const form = document.getElementById('deploy-form');
        const deployBtn = document.getElementById('deploy-btn');
        const modal = document.getElementById('success-modal');
        const modalContent = document.getElementById('modal-content');
        const modalBackdrop = document.getElementById('modal-backdrop');
        const closeModalBtns = [document.getElementById('close-modal-btn'), document.getElementById('close-x')];
        const nodeIdEl = document.getElementById('modal-node-id');
        const appUrlEl = document.getElementById('modal-app-url');
        const terminalContainer = document.getElementById('terminal-container');
        const terminalOutput = document.getElementById('terminal-output');

        const sleep = ms => new Promise(r => setTimeout(r, ms));

        const addTerminalLine = (text, type="info") => {
            const line = document.createElement('div');
            const timestamp = new Date().toISOString().substring(11, 23);
            
            let colorClass = "text-[#38bdf8]";
            if(type === "warn") colorClass = "text-yellow-400";
            if(type === "success") colorClass = "text-[#00f2fe]";
            if(type === "error") colorClass = "text-[#ff0055]";
            if(type === "system") colorClass = "text-[#e100ff]";

            line.innerHTML = `<span class="text-white/30">[${timestamp}]</span> <span class="${colorClass}">${text}</span>`;
            terminalOutput.appendChild(line);
            terminalOutput.scrollTop = terminalOutput.scrollHeight;
        };

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const appName = document.getElementById('appName').value;
            const imagePath = document.getElementById('imagePath').value;
            
            // UI State change
            const originalBtnText = deployBtn.innerHTML;
            deployBtn.innerHTML = '<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> SHARDING CONTAINER...';
            deployBtn.disabled = true;
            deployBtn.style.opacity = '0.7';

            // Show terminal
            terminalContainer.classList.remove('hidden');
            terminalContainer.classList.add('flex');
            terminalOutput.innerHTML = '';
            
            addTerminalLine("Initializing deployment pipeline for: " + appName, "system");
            await sleep(400);

            try {
                // Simulate fetch request to /api/deploy
                fetch('/api/deploy', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ appName, imagePath })
                }).catch(() => null);

                // Fake terminal sequence based on TRD specs
                addTerminalLine("Pulling image: " + imagePath);
                await sleep(600);
                addTerminalLine("Encrypting image via Developer Public Key (AES-256-XTS)...");
                await sleep(500);
                addTerminalLine("Slicing image into regional shards for P2P Libp2p distribution...");
                await sleep(700);
                addTerminalLine("Querying Orchestrator Neo4j Graph for optimal provider node...", "system");
                await sleep(600);
                addTerminalLine("Matchmaking Scheduler identified optimal low-latency node.", "success");
                await sleep(400);
                addTerminalLine("Issuing gRPC secure command to target Rust Daemon...");
                await sleep(800);
                addTerminalLine("Zero-Knowledge Cryptographic Verification (zk-SNARK) passed.", "success");
                await sleep(500);
                addTerminalLine("Provisioning AWS Firecracker MicroVM block on host hardware...", "system");
                await sleep(900);
                addTerminalLine("MicroVM booted (42ms). Mounting image layer...", "info");
                await sleep(500);
                addTerminalLine("Updating global ingress edge routing tables...");
                await sleep(600);
                addTerminalLine("Container running actively on Bharat-Grid.", "success");
                await sleep(400);

                // Mock data
                const finalNodeId = 'bg-node-' + Math.random().toString(36).substring(2, 6);
                const finalUrl = 'https://' + appName.toLowerCase().replace(/\s+/g, '-') + '.bharatgrid.cloud';

                // Show modal
                nodeIdEl.textContent = finalNodeId;
                appUrlEl.textContent = finalUrl;
                appUrlEl.href = finalUrl;
                
                modal.classList.remove('opacity-0', 'pointer-events-none');
                setTimeout(() => {
                    modalContent.classList.add('modal-enter-active');
                }, 10);

            } catch (error) {
                addTerminalLine("FATAL ERROR: " + error.message, "error");
            } finally {
                deployBtn.innerHTML = originalBtnText;
                deployBtn.disabled = false;
                deployBtn.style.opacity = '1';
                form.reset();
            }
        });

        const closeModal = () => {
            modalContent.classList.remove('modal-enter-active');
            setTimeout(() => {
                modal.classList.add('opacity-0', 'pointer-events-none');
                terminalContainer.classList.add('hidden');
                terminalContainer.classList.remove('flex');
            }, 300);
        };

        closeModalBtns.forEach(btn => btn.addEventListener('click', closeModal));
        modalBackdrop.addEventListener('click', closeModal);

    