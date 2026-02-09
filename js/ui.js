/* ============================================
   GameCoins - UI 组件（Toast、弹窗、动画等）
   ============================================ */

const UI = {
    // ---- Toast 提示 ----
    toast(message, type = 'success', duration = 3000) {
        const container = document.getElementById('toast-container');
        const icons = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' };
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `<span>${icons[type] || ''}</span><span>${message}</span>`;
        container.appendChild(toast);
        setTimeout(() => {
            toast.classList.add('toast-out');
            setTimeout(() => toast.remove(), 300);
        }, duration);
    },

    // ---- 模态弹窗 ----
    showModal(options) {
        const overlay = document.getElementById('modal-overlay');
        const content = document.getElementById('modal-content');
        const { icon, title, message, confirmText, cancelText, onConfirm, onCancel, bodyHTML } = options;

        let html = `<div class="modal-header">`;
        if (icon) html += `<div class="modal-icon">${icon}</div>`;
        if (title) html += `<h3>${title}</h3>`;
        if (message) html += `<p>${message}</p>`;
        html += `</div>`;

        if (bodyHTML) {
            html += `<div class="modal-body">${bodyHTML}</div>`;
        }

        html += `<div class="modal-actions">`;
        if (cancelText) {
            html += `<button class="btn btn-secondary" id="modal-cancel">${cancelText}</button>`;
        }
        if (confirmText) {
            html += `<button class="btn btn-primary" id="modal-confirm" style="margin-top:0">${confirmText}</button>`;
        }
        html += `</div>`;

        content.innerHTML = html;
        overlay.classList.remove('hidden');

        // 绑定事件
        const confirmBtn = document.getElementById('modal-confirm');
        const cancelBtn = document.getElementById('modal-cancel');

        if (confirmBtn) {
            confirmBtn.onclick = () => {
                this.hideModal();
                if (onConfirm) onConfirm();
            };
        }
        if (cancelBtn) {
            cancelBtn.onclick = () => {
                this.hideModal();
                if (onCancel) onCancel();
            };
        }

        // 点击遮罩关闭
        overlay.onclick = (e) => {
            if (e.target === overlay) {
                this.hideModal();
                if (onCancel) onCancel();
            }
        };
    },

    hideModal() {
        document.getElementById('modal-overlay').classList.add('hidden');
    },

    // ---- 庆祝动画（撒花/星星） ----
    celebrate() {
        const container = document.getElementById('celebration-container');
        container.classList.remove('hidden');
        container.innerHTML = '';

        const colors = ['#FF6B35', '#6C5CE7', '#2ED573', '#FFA502', '#FF4757', '#00D2D3', '#A29BFE'];
        const emojis = ['⭐', '🌟', '✨', '🎉', '🎊', '💫'];

        // 撒花
        for (let i = 0; i < 40; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = Math.random() * 0.5 + 's';
            confetti.style.animationDuration = (1.5 + Math.random()) + 's';
            confetti.style.width = (6 + Math.random() * 8) + 'px';
            confetti.style.height = (6 + Math.random() * 8) + 'px';
            container.appendChild(confetti);
        }

        // 星星
        for (let i = 0; i < 8; i++) {
            const star = document.createElement('div');
            star.className = 'star-burst';
            star.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            star.style.left = (10 + Math.random() * 80) + '%';
            star.style.top = (10 + Math.random() * 60) + '%';
            star.style.animationDelay = Math.random() * 0.3 + 's';
            container.appendChild(star);
        }

        setTimeout(() => {
            container.classList.add('hidden');
            container.innerHTML = '';
        }, 2500);
    },

    // ---- 数字滚动动画 ----
    animateNumber(element, from, to, duration = 500) {
        const start = performance.now();
        const diff = to - from;

        function update(currentTime) {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            // easeOutQuad
            const eased = 1 - (1 - progress) * (1 - progress);
            const current = Math.round(from + diff * eased);
            element.textContent = current.toLocaleString();
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }
        requestAnimationFrame(update);
    },

    // ---- 获取任务本地化名称 ----
    getTaskName(task) {
        const lang = localStorage.getItem('gc_language') || 'en';
        return lang === 'en' ? (task.nameEn || task.name) : task.name;
    },

    getTaskDesc(task) {
        const lang = localStorage.getItem('gc_language') || 'en';
        return lang === 'en' ? (task.descEn || task.desc) : task.desc;
    },

    getTaskSteps(task) {
        const lang = localStorage.getItem('gc_language') || 'en';
        return lang === 'en' ? (task.stepsEn || task.steps) : task.steps;
    },

    getTaskNotes(task) {
        const lang = localStorage.getItem('gc_language') || 'en';
        return lang === 'en' ? (task.notesEn || task.notes) : task.notes;
    },

    getLeaderboardName(player) {
        const lang = localStorage.getItem('gc_language') || 'en';
        return lang === 'en' ? (player.nameEn || player.name) : player.name;
    },

    // ---- 难度标签 ----
    getDifficultyClass(difficulty) {
        return `difficulty-${difficulty}`;
    },

    getDifficultyText(difficulty) {
        return t(difficulty);
    },

    // ---- 徽章 ----
    getBadgeHTML(badge) {
        if (!badge) return '';
        const badges = {
            hot: { text: '🔥Hot', cls: 'badge-hot' },
            new: { text: '🆕New', cls: 'badge-new' },
            recommend: { text: '⭐Top Pick', cls: 'badge-recommend' }
        };
        const lang = localStorage.getItem('gc_language') || 'en';
        const badgesEn = {
            hot: { text: '🔥Hot', cls: 'badge-hot' },
            new: { text: '🆕New', cls: 'badge-new' },
            recommend: { text: '⭐Top Pick', cls: 'badge-recommend' }
        };
        const b = lang === 'en' ? badgesEn[badge] : badges[badge];
        if (!b) return '';
        return `<span class="task-card-badge ${b.cls}">${b.text}</span>`;
    },

    // ---- 类型文本 ----
    getTypeText(type) {
        const map = {
            play: 'filterPlay',
            register: 'filterRegister',
            download: 'filterDownload',
            survey: 'filterSurvey',
            purchase: 'filterPurchase'
        };
        return t(map[type] || 'filterPlay');
    },

    // ---- 地区文本 ----
    getRegionText(region) {
        const map = {
            global: 'filterGlobal',
            us: 'filterUS',
            jp: 'filterJP',
            sea: 'filterSEA',
            eu: 'filterEU'
        };
        return t(map[region] || 'filterGlobal');
    },

    // ---- 平台文本 ----
    getPlatformText(platform) {
        const map = {
            all: 'filterAllPlatform',
            ios: 'filterIOS',
            android: 'filterAndroid'
        };
        return t(map[platform] || 'filterAllPlatform');
    },

    // ---- 格式化时间 ----
    formatTime(minutes) {
        if (minutes < 60) return `${minutes}${t('minuteShort')}`;
        const h = Math.floor(minutes / 60);
        const m = minutes % 60;
        return m > 0 ? `${h}h${m}m` : `${h}h`;
    },

    // ---- 格式化日期 ----
    formatDate(timestamp) {
        const d = new Date(timestamp);
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        const h = String(d.getHours()).padStart(2, '0');
        const min = String(d.getMinutes()).padStart(2, '0');
        return `${y}-${m}-${day} ${h}:${min}`;
    },

    // ---- 积分转现金 ----
    coinsToCash(coins) {
        return (coins / 100).toFixed(2);
    }
};
