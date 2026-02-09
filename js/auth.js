/* ============================================
   GameCoins - 注册/登录逻辑
   ============================================ */

const Auth = {
    // 获取当前用户
    getUser() {
        const data = localStorage.getItem('gc_user');
        return data ? JSON.parse(data) : null;
    },

    // 保存用户
    saveUser(user) {
        localStorage.setItem('gc_user', JSON.stringify(user));
    },

    // 获取所有注册用户
    getUsers() {
        const data = localStorage.getItem('gc_users');
        return data ? JSON.parse(data) : [];
    },

    // 保存用户列表
    saveUsers(users) {
        localStorage.setItem('gc_users', JSON.stringify(users));
    },

    // 注册
    register(email, password, nickname) {
        if (!email || !password || !nickname) {
            UI.toast(t('inputError'), 'error');
            return false;
        }
        if (password.length < 6) {
            UI.toast(t('passwordError'), 'error');
            return false;
        }

        const users = this.getUsers();
        if (users.find(u => u.email === email)) {
            UI.toast(t('registerError'), 'error');
            return false;
        }

        const user = {
            id: 'user_' + Date.now(),
            email,
            password,
            nickname,
            avatar: nickname.charAt(0).toUpperCase(),
            coins: 100, // 新手奖励
            totalEarned: 100,
            totalExchanged: 0,
            completedTasks: 0,
            joinDate: Date.now(),
            inviteCode: this.generateInviteCode(),
            notifications: true
        };

        users.push(user);
        this.saveUsers(users);
        this.saveUser(user);

        // 添加新手奖励交易记录
        Wallet.addTransaction({
            type: 'income',
            title: t('newUserBonus'),
            amount: 100,
            time: Date.now()
        });

        UI.toast(t('registerSuccess'), 'success');
        UI.celebrate();
        return true;
    },

    // 登录
    login(email, password) {
        if (!email || !password) {
            UI.toast(t('inputError'), 'error');
            return false;
        }

        const users = this.getUsers();
        const user = users.find(u => u.email === email && u.password === password);

        if (!user) {
            UI.toast(t('loginError'), 'error');
            return false;
        }

        this.saveUser(user);
        UI.toast(t('loginSuccess'), 'success');
        return true;
    },

    // 游客登录
    guestLogin() {
        const guestId = 'guest_' + Date.now();
        const user = {
            id: guestId,
            email: 'guest@gamecoins.com',
            nickname: 'Guest_' + Math.floor(Math.random() * 9999),
            avatar: 'G',
            coins: 100,
            totalEarned: 100,
            totalExchanged: 0,
            completedTasks: 0,
            joinDate: Date.now(),
            inviteCode: this.generateInviteCode(),
            notifications: true,
            isGuest: true
        };

        this.saveUser(user);

        // 添加新手奖励交易记录
        Wallet.addTransaction({
            type: 'income',
            title: t('newUserBonus'),
            amount: 100,
            time: Date.now()
        });

        UI.toast(t('loginSuccess'), 'success');
        return true;
    },

    // 退出登录
    logout() {
        localStorage.removeItem('gc_user');
        localStorage.removeItem('gc_my_tasks');
        localStorage.removeItem('gc_transactions');
    },

    // 更新用户积分
    updateCoins(amount) {
        const user = this.getUser();
        if (!user) return;
        
        const oldCoins = user.coins;
        user.coins += amount;
        if (amount > 0) {
            user.totalEarned += amount;
        } else {
            user.totalExchanged += Math.abs(amount);
        }
        this.saveUser(user);

        // 同步到用户列表
        if (!user.isGuest) {
            const users = this.getUsers();
            const idx = users.findIndex(u => u.id === user.id);
            if (idx !== -1) {
                users[idx] = user;
                this.saveUsers(users);
            }
        }

        return { oldCoins, newCoins: user.coins };
    },

    // 增加完成任务数
    incrementCompletedTasks() {
        const user = this.getUser();
        if (!user) return;
        user.completedTasks = (user.completedTasks || 0) + 1;
        this.saveUser(user);
    },

    // 生成邀请码
    generateInviteCode() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let code = 'GC';
        for (let i = 0; i < 6; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return code;
    },

    // 渲染登录页
    renderLoginPage() {
        const container = document.getElementById('page-container');
        container.innerHTML = `
            <div class="auth-page page-enter">
                <div class="auth-logo">
                    <span class="logo-icon">🎮</span>
                    <h1>${t('appName')}</h1>
                    <p>${t('appSlogan')}</p>
                </div>
                <div class="auth-card">
                    <div class="auth-tabs">
                        <button class="auth-tab active" data-tab="login">${t('login')}</button>
                        <button class="auth-tab" data-tab="register">${t('register')}</button>
                    </div>
                    
                    <!-- 登录表单 -->
                    <div id="login-form">
                        <div class="form-group">
                            <label>${t('email')}</label>
                            <input type="email" id="login-email" placeholder="${t('emailPlaceholder')}">
                        </div>
                        <div class="form-group">
                            <label>${t('password')}</label>
                            <input type="password" id="login-password" placeholder="${t('passwordPlaceholder')}">
                        </div>
                        <button class="btn btn-primary ripple" id="login-btn">${t('login')}</button>
                    </div>

                    <!-- 注册表单 -->
                    <div id="register-form" class="hidden">
                        <div class="form-group">
                            <label>${t('nickname')}</label>
                            <input type="text" id="reg-nickname" placeholder="${t('nicknamePlaceholder')}">
                        </div>
                        <div class="form-group">
                            <label>${t('email')}</label>
                            <input type="email" id="reg-email" placeholder="${t('emailPlaceholder')}">
                        </div>
                        <div class="form-group">
                            <label>${t('password')}</label>
                            <input type="password" id="reg-password" placeholder="${t('passwordPlaceholder')}">
                        </div>
                        <button class="btn btn-primary ripple" id="register-btn">${t('register')}</button>
                    </div>

                    <button class="btn btn-secondary ripple" id="guest-btn">${t('guestLogin')}</button>
                </div>
            </div>
        `;

        this.bindLoginEvents();
    },

    // 绑定登录页事件
    bindLoginEvents() {
        // Tab 切换
        document.querySelectorAll('.auth-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                const isLogin = tab.dataset.tab === 'login';
                document.getElementById('login-form').classList.toggle('hidden', !isLogin);
                document.getElementById('register-form').classList.toggle('hidden', isLogin);
            });
        });

        // 登录
        document.getElementById('login-btn').addEventListener('click', () => {
            const email = document.getElementById('login-email').value.trim();
            const password = document.getElementById('login-password').value;
            if (this.login(email, password)) {
                App.navigate('#/tasks');
            }
        });

        // 注册
        document.getElementById('register-btn').addEventListener('click', () => {
            const nickname = document.getElementById('reg-nickname').value.trim();
            const email = document.getElementById('reg-email').value.trim();
            const password = document.getElementById('reg-password').value;
            if (this.register(email, password, nickname)) {
                setTimeout(() => App.navigate('#/tasks'), 500);
            }
        });

        // 游客登录
        document.getElementById('guest-btn').addEventListener('click', () => {
            if (this.guestLogin()) {
                App.navigate('#/tasks');
            }
        });

        // 回车提交
        document.querySelectorAll('.auth-card input').forEach(input => {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    const loginForm = document.getElementById('login-form');
                    if (!loginForm.classList.contains('hidden')) {
                        document.getElementById('login-btn').click();
                    } else {
                        document.getElementById('register-btn').click();
                    }
                }
            });
        });
    }
};
