/* ============================================
   GameCoins - 路由、初始化、全局状态管理
   ============================================ */

const App = {
    // 当前页面
    currentPage: '',

    // ---- 初始化 ----
    init() {
        // 监听 hash 变化
        window.addEventListener('hashchange', () => this.handleRoute());

        // 初始路由
        this.handleRoute();
    },

    // ---- 路由处理 ----
    handleRoute() {
        const hash = window.location.hash || '#/login';
        const user = Auth.getUser();

        // 未登录时，除了登录页都跳转到登录
        if (!user && hash !== '#/login') {
            window.location.hash = '#/login';
            return;
        }

        // 已登录时访问登录页，跳转到任务墙
        if (user && hash === '#/login') {
            window.location.hash = '#/tasks';
            return;
        }

        // 滚动到顶部
        window.scrollTo(0, 0);

        // 路由匹配
        if (hash === '#/login') {
            this.showPage('login');
            Auth.renderLoginPage();
        } else if (hash === '#/tasks') {
            this.showPage('tasks');
            Tasks.renderTasksPage();
        } else if (hash.startsWith('#/task/')) {
            const taskId = parseInt(hash.split('/')[2]);
            this.showPage('tasks'); // 保持任务墙导航高亮
            Tasks.renderTaskDetailPage(taskId);
        } else if (hash === '#/my-tasks') {
            this.showPage('my-tasks');
            Tasks.renderMyTasksPage();
        } else if (hash === '#/leaderboard') {
            this.showPage('leaderboard');
            Tasks.renderLeaderboardPage();
        } else if (hash === '#/wallet') {
            this.showPage('wallet');
            Wallet.renderWalletPage();
        } else if (hash === '#/profile') {
            this.showPage('profile');
            Wallet.renderProfilePage();
        } else {
            // 默认跳转
            window.location.hash = user ? '#/tasks' : '#/login';
        }
    },

    // ---- 显示页面（控制导航栏） ----
    showPage(page) {
        this.currentPage = page;
        const nav = document.getElementById('bottom-nav');

        if (page === 'login') {
            nav.classList.add('hidden');
        } else {
            nav.classList.remove('hidden');
            this.updateNavLabels();
            // 更新导航高亮
            document.querySelectorAll('.nav-item').forEach(item => {
                item.classList.remove('active');
                if (item.dataset.page === page) {
                    item.classList.add('active');
                }
            });
        }
    },

    // ---- 导航跳转 ----
    navigate(hash) {
        window.location.hash = hash;
    },

    // ---- 更新导航栏文本（语言切换时） ----
    updateNavLabels() {
        const labels = {
            'tasks': t('navTasks'),
            'my-tasks': t('navMyTasks'),
            'leaderboard': t('navLeaderboard'),
            'wallet': t('navWallet'),
            'profile': t('navProfile')
        };

        document.querySelectorAll('.nav-item').forEach(item => {
            const page = item.dataset.page;
            const label = item.querySelector('.nav-label');
            if (label && labels[page]) {
                label.textContent = labels[page];
            }
        });
    }
};

// ---- 启动应用 ----
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});
