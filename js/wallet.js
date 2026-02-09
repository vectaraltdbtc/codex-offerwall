/* ============================================
   GameCoins - 钱包/积分/兑换逻辑
   ============================================ */

const Wallet = {
    // ---- 获取交易记录 ----
    getTransactions() {
        const data = localStorage.getItem('gc_transactions');
        return data ? JSON.parse(data) : [];
    },

    saveTransactions(transactions) {
        localStorage.setItem('gc_transactions', JSON.stringify(transactions));
    },

    // ---- 添加交易记录 ----
    addTransaction(transaction) {
        const transactions = this.getTransactions();
        transactions.unshift({
            id: 'tx_' + Date.now(),
            ...transaction
        });
        // 最多保留100条
        if (transactions.length > 100) transactions.length = 100;
        this.saveTransactions(transactions);
    },

    // ---- 兑换 ----
    exchange(option) {
        const user = Auth.getUser();
        if (!user) return;

        if (user.coins < option.min) {
            UI.toast(t('exchangeInsufficient'), 'warning');
            return;
        }

        UI.showModal({
            icon: '💎',
            title: t('exchangeConfirmTitle'),
            message: t('exchangeConfirmMsg').replace('{n}', option.min).replace('{item}', t(option.nameKey)),
            confirmText: t('confirm'),
            cancelText: t('cancel'),
            onConfirm: () => {
                Auth.updateCoins(-option.min);
                this.addTransaction({
                    type: 'expense',
                    title: `${t('exchangeDeduct')} - ${t(option.nameKey)}`,
                    amount: option.min,
                    time: Date.now()
                });
                UI.toast(t('exchangeSuccess'), 'success');
                UI.celebrate();
                // 刷新钱包页
                setTimeout(() => this.renderWalletPage(), 500);
            }
        });
    },

    // ============================================
    // 渲染钱包页
    // ============================================
    renderWalletPage() {
        const user = Auth.getUser();
        const container = document.getElementById('page-container');
        const transactions = this.getTransactions();

        container.innerHTML = `
            <div class="wallet-page page-enter">
                <!-- 余额头部 -->
                <div class="wallet-header">
                    <div class="wallet-balance-label">${t('currentBalance')}</div>
                    <div class="wallet-balance" id="wallet-balance-num">${user ? user.coins.toLocaleString() : 0} <small>🪙</small></div>
                    <div class="wallet-cash">${t('equivalentCash')}${user ? UI.coinsToCash(user.coins) : '0.00'}</div>
                </div>

                <!-- 快捷操作 -->
                <div class="wallet-quick-actions">
                    <div class="quick-action" onclick="App.navigate('#/tasks')">
                        <div class="qa-icon">🎮</div>
                        <div class="qa-label">${t('earnMore')}</div>
                    </div>
                    <div class="quick-action" onclick="App.navigate('#/my-tasks')">
                        <div class="qa-icon">📋</div>
                        <div class="qa-label">${t('navMyTasks')}</div>
                    </div>
                    <div class="quick-action" onclick="App.navigate('#/leaderboard')">
                        <div class="qa-icon">🏆</div>
                        <div class="qa-label">${t('navLeaderboard')}</div>
                    </div>
                </div>

                <!-- 兑换中心 -->
                <div class="section-title">
                    <h3>${t('exchangeTitle')}</h3>
                </div>
                <div class="exchange-section">
                    <div class="exchange-grid">
                        ${EXCHANGE_OPTIONS.map(opt => `
                            <div class="exchange-card" data-exchange-id="${opt.id}">
                                <div class="ex-icon">${opt.icon}</div>
                                <div class="ex-name">${t(opt.nameKey)}</div>
                                <div class="ex-min">${t('minExchange').replace('{n}', opt.min)}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- 积分明细 -->
                <div class="section-title">
                    <h3>${t('transactionTitle')}</h3>
                </div>
                <div class="transaction-list">
                    ${transactions.length === 0 ? `
                        <div class="empty-state">
                            <div class="empty-icon">📊</div>
                            <h3>${t('noTasks')}</h3>
                        </div>
                    ` : transactions.slice(0, 20).map(tx => `
                        <div class="transaction-item">
                            <div class="transaction-icon ${tx.type}">
                                ${tx.type === 'income' ? '📥' : '📤'}
                            </div>
                            <div class="transaction-info">
                                <h4>${tx.title}</h4>
                                <div class="transaction-time">${UI.formatDate(tx.time)}</div>
                            </div>
                            <div class="transaction-amount ${tx.type === 'income' ? 'positive' : 'negative'}">
                                ${tx.type === 'income' ? '+' : '-'}${tx.amount}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        this.bindWalletEvents();
    },

    // ---- 绑定钱包事件 ----
    bindWalletEvents() {
        document.querySelectorAll('.exchange-card').forEach(card => {
            card.addEventListener('click', () => {
                const id = card.dataset.exchangeId;
                const option = EXCHANGE_OPTIONS.find(o => o.id === id);
                if (option) {
                    this.exchange(option);
                }
            });
        });
    },

    // ============================================
    // 渲染个人中心页
    // ============================================
    renderProfilePage() {
        const user = Auth.getUser();
        const container = document.getElementById('page-container');
        const lang = localStorage.getItem('gc_language') || 'en';
        const notificationsOn = user ? user.notifications !== false : true;

        container.innerHTML = `
            <div class="profile-page page-enter">
                <!-- 头部 -->
                <div class="profile-header">
                    <div class="profile-avatar">${user ? user.avatar : 'G'}</div>
                    <div class="profile-name">${user ? user.nickname : 'Guest'}</div>
                    <div class="profile-join">${t('joinDate')}${user ? UI.formatDate(user.joinDate).split(' ')[0] : '-'}</div>
                </div>

                <!-- 统计 -->
                <div class="profile-stats">
                    <div class="profile-stat">
                        <div class="stat-num">${user ? user.totalEarned.toLocaleString() : 0}</div>
                        <div class="stat-label">${t('totalEarned')}</div>
                    </div>
                    <div class="profile-stat">
                        <div class="stat-num">${user ? user.totalExchanged.toLocaleString() : 0}</div>
                        <div class="stat-label">${t('totalExchanged')}</div>
                    </div>
                    <div class="profile-stat">
                        <div class="stat-num">${user ? (user.completedTasks || 0) : 0}</div>
                        <div class="stat-label">${t('completedTasks')}</div>
                    </div>
                </div>

                <!-- 邀请好友 -->
                <div class="invite-card">
                    <h3>${t('inviteFriends')}</h3>
                    <p>${t('inviteDesc')}</p>
                    <div class="invite-code-box">
                        <div class="invite-code" id="invite-code">${user ? user.inviteCode : 'GCXXXXXX'}</div>
                        <button class="btn btn-accent btn-small" id="copy-invite-btn">${t('copy')}</button>
                    </div>
                </div>

                <!-- 设置 -->
                <div class="section-title">
                    <h3>⚙️ ${t('settings')}</h3>
                </div>
                <div class="settings-list">
                    <div class="settings-item" id="toggle-notifications">
                        <div class="si-icon">🔔</div>
                        <div class="si-label">${t('notifications')}</div>
                        <div class="toggle-switch ${notificationsOn ? 'active' : ''}" id="notification-toggle"></div>
                    </div>
                    <div class="settings-item" id="toggle-language">
                        <div class="si-icon">🌐</div>
                        <div class="si-label">${t('language')}</div>
                        <div class="si-value">${lang === 'zh' ? t('chinese') : t('english')}</div>
                        <div class="si-arrow">›</div>
                    </div>
                    <div class="settings-item" id="btn-logout">
                        <div class="si-icon">🚪</div>
                        <div class="si-label" style="color:var(--danger)">${t('logout')}</div>
                        <div class="si-arrow">›</div>
                    </div>
                </div>

                <!-- FAQ -->
                <div class="section-title">
                    <h3>${t('faqTitle')}</h3>
                </div>
                <div class="faq-section">
                    ${this.renderFAQ()}
                </div>
            </div>
        `;

        this.bindProfileEvents();
    },

    // ---- 渲染FAQ ----
    renderFAQ() {
        const faqs = [
            { q: t('faq1q'), a: t('faq1a') },
            { q: t('faq2q'), a: t('faq2a') },
            { q: t('faq3q'), a: t('faq3a') },
            { q: t('faq4q'), a: t('faq4a') },
        ];

        return faqs.map((faq, i) => `
            <div class="faq-item" data-faq="${i}">
                <div class="faq-question">
                    <span>${faq.q}</span>
                    <span class="faq-arrow">▼</span>
                </div>
                <div class="faq-answer">
                    <p>${faq.a}</p>
                </div>
            </div>
        `).join('');
    },

    // ---- 绑定个人中心事件 ----
    bindProfileEvents() {
        // 复制邀请码
        const copyBtn = document.getElementById('copy-invite-btn');
        if (copyBtn) {
            copyBtn.addEventListener('click', () => {
                const code = document.getElementById('invite-code').textContent;
                // 使用 Clipboard API 或 fallback
                if (navigator.clipboard) {
                    navigator.clipboard.writeText(code).then(() => {
                        UI.toast(t('copied'), 'success');
                    });
                } else {
                    // Fallback
                    const textarea = document.createElement('textarea');
                    textarea.value = code;
                    document.body.appendChild(textarea);
                    textarea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textarea);
                    UI.toast(t('copied'), 'success');
                }
            });
        }

        // 通知开关
        const notificationToggle = document.getElementById('toggle-notifications');
        if (notificationToggle) {
            notificationToggle.addEventListener('click', () => {
                const user = Auth.getUser();
                if (user) {
                    user.notifications = !user.notifications;
                    Auth.saveUser(user);
                    const toggle = document.getElementById('notification-toggle');
                    toggle.classList.toggle('active');
                }
            });
        }

        // 语言切换
        const langBtn = document.getElementById('toggle-language');
        if (langBtn) {
            langBtn.addEventListener('click', () => {
                const currentLang = localStorage.getItem('gc_language') || 'en';
                const newLang = currentLang === 'zh' ? 'en' : 'zh';
                localStorage.setItem('gc_language', newLang);
                // 更新导航栏文本
                App.updateNavLabels();
                // 重新渲染当前页
                this.renderProfilePage();
                UI.toast('Language switched', 'success');
            });
        }

        // 退出登录
        const logoutBtn = document.getElementById('btn-logout');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                UI.showModal({
                    icon: '🚪',
                    title: t('logout'),
                    message: t('logoutConfirm'),
                    confirmText: t('confirm'),
                    cancelText: t('cancel'),
                    onConfirm: () => {
                        Auth.logout();
                        App.navigate('#/login');
                    }
                });
            });
        }

        // FAQ 手风琴
        document.querySelectorAll('.faq-item').forEach(item => {
            item.querySelector('.faq-question').addEventListener('click', () => {
                // 关闭其他
                document.querySelectorAll('.faq-item').forEach(other => {
                    if (other !== item) other.classList.remove('open');
                });
                item.classList.toggle('open');
            });
        });
    }
};
