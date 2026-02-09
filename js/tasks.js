/* ============================================
   GameCoins - 任务墙、任务详情、我的任务逻辑
   ============================================ */

const Tasks = {
    currentFilter: 'all',
    searchQuery: '',

    // ---- 获取我的任务列表 ----
    getMyTasks() {
        const data = localStorage.getItem('gc_my_tasks');
        return data ? JSON.parse(data) : [];
    },

    saveMyTasks(tasks) {
        localStorage.setItem('gc_my_tasks', JSON.stringify(tasks));
    },

    // ---- 添加任务到我的任务 ----
    addMyTask(taskId, status) {
        const myTasks = this.getMyTasks();
        if (myTasks.find(t => t.taskId === taskId)) return;
        myTasks.push({
            taskId,
            status, // 'in-progress', 'pending', 'approved', 'rejected'
            startTime: Date.now(),
            updateTime: Date.now()
        });
        this.saveMyTasks(myTasks);
    },

    // ---- 更新任务状态 ----
    updateTaskStatus(taskId, status) {
        const myTasks = this.getMyTasks();
        const task = myTasks.find(t => t.taskId === taskId);
        if (task) {
            task.status = status;
            task.updateTime = Date.now();
            this.saveMyTasks(myTasks);
        }
    },

    // ---- 获取任务状态 ----
    getTaskStatus(taskId) {
        const myTasks = this.getMyTasks();
        const task = myTasks.find(t => t.taskId === taskId);
        return task ? task.status : null;
    },

    // ---- 筛选任务 ----
    filterTasks(tasks, filter, query) {
        let result = [...tasks];

        // 搜索
        if (query) {
            const q = query.toLowerCase();
            const lang = localStorage.getItem('gc_language') || 'en';
            result = result.filter(task => {
                const name = lang === 'en' ? (task.nameEn || task.name) : task.name;
                const desc = lang === 'en' ? (task.descEn || task.desc) : task.desc;
                return name.toLowerCase().includes(q) || desc.toLowerCase().includes(q);
            });
        }

        // 类型筛选
        if (filter && filter !== 'all') {
            if (['play', 'register', 'download', 'survey', 'purchase'].includes(filter)) {
                result = result.filter(task => task.type === filter);
            } else if (filter === 'high-reward') {
                result.sort((a, b) => b.reward - a.reward);
            } else if (filter === 'easy') {
                result = result.filter(task => task.difficulty === 'easy');
            } else if (['ios', 'android', 'all'].includes(filter)) {
                result = result.filter(task => task.platform === filter || task.platform === 'all');
            } else if (['global', 'us', 'jp', 'sea', 'eu'].includes(filter)) {
                result = result.filter(task => task.region === filter || task.region === 'global');
            }
        }

        return result;
    },

    // ============================================
    // 渲染任务墙主页
    // ============================================
    renderTasksPage() {
        const user = Auth.getUser();
        const container = document.getElementById('page-container');

        // 热门任务（有badge的）
        const hotTasks = TASKS_DATA.filter(t => t.badge === 'hot');
        const newTasks = TASKS_DATA.filter(t => t.badge === 'new');
        const filteredTasks = this.filterTasks(TASKS_DATA, this.currentFilter, this.searchQuery);

        container.innerHTML = `
            <div class="tasks-page page-enter">
                <!-- 顶部栏 -->
                <div class="header-bar">
                    <div class="header-user">
                        <div class="header-avatar">${user ? user.avatar : 'G'}</div>
                        <div class="header-info">
                            <h3>${user ? user.nickname : 'Guest'}</h3>
                            <div class="header-coins">🪙 ${user ? user.coins.toLocaleString() : 0} ${t('coins')}</div>
                        </div>
                    </div>
                    <div class="header-actions">
                        <div class="icon-btn" onclick="App.navigate('#/wallet')" title="${t('navWallet')}">💰</div>
                        <div class="icon-btn" title="🔔">🔔</div>
                    </div>
                </div>

                <!-- Banner -->
                <div class="banner-section">
                    <div class="banner-card">
                        <h2>${t('bannerTitle')}</h2>
                        <p>${t('bannerDesc')}</p>
                        <a class="banner-btn" href="#/tasks">${t('bannerBtn')}</a>
                        <span class="banner-emoji">🎁</span>
                    </div>
                </div>

                <!-- 搜索栏 -->
                <div class="search-section">
                    <div class="search-bar">
                        <span class="search-icon">🔍</span>
                        <input type="text" id="task-search" placeholder="${t('searchPlaceholder')}" value="${this.searchQuery}">
                    </div>
                </div>

                <!-- 筛选标签 -->
                <div class="filter-section">
                    <div class="filter-row" id="filter-type">
                        ${this.renderFilterTags([
                            { key: 'all', label: t('filterAll') },
                            { key: 'play', label: t('filterPlay') },
                            { key: 'register', label: t('filterRegister') },
                            { key: 'survey', label: t('filterSurvey') },
                            { key: 'purchase', label: t('filterPurchase') },
                            { key: 'high-reward', label: t('filterHighReward') },
                            { key: 'easy', label: t('filterEasy') },
                        ])}
                    </div>
                    <div class="filter-row" id="filter-region">
                        ${this.renderFilterTags([
                            { key: 'global', label: t('filterGlobal') },
                            { key: 'us', label: t('filterUS') },
                            { key: 'jp', label: t('filterJP') },
                            { key: 'sea', label: t('filterSEA') },
                            { key: 'eu', label: t('filterEU') },
                        ], 'region')}
                    </div>
                </div>

                <!-- 热门任务 -->
                ${hotTasks.length > 0 ? `
                <div class="section-title">
                    <h3>${t('hotTasks')}</h3>
                    <span class="see-all">${t('seeAll')}</span>
                </div>
                <div class="task-grid">
                    ${hotTasks.map(task => this.renderTaskCard(task)).join('')}
                </div>
                ` : ''}

                <!-- 新上线 -->
                ${newTasks.length > 0 && !this.searchQuery ? `
                <div class="section-title">
                    <h3>${t('newTasks')}</h3>
                </div>
                <div class="task-list">
                    ${newTasks.map(task => this.renderTaskListItem(task)).join('')}
                </div>
                ` : ''}

                <!-- 全部任务 -->
                <div class="section-title">
                    <h3>${t('allTasks')}</h3>
                </div>
                <div class="task-list" id="all-tasks-list">
                    ${filteredTasks.map(task => this.renderTaskListItem(task)).join('')}
                </div>

                ${filteredTasks.length === 0 ? `
                <div class="empty-state">
                    <div class="empty-icon">🔍</div>
                    <h3>${t('noTasks')}</h3>
                    <p>${t('noTasksDesc')}</p>
                </div>
                ` : ''}
            </div>
        `;

        this.bindTasksEvents();
    },

    // ---- 渲染筛选标签 ----
    renderFilterTags(tags, group = 'type') {
        return tags.map(tag => {
            const isActive = (group === 'type' && this.currentFilter === tag.key) ||
                           (group === 'region' && this.currentFilter === tag.key);
            return `<button class="filter-tag ${isActive ? 'active' : ''}" data-filter="${tag.key}" data-group="${group}">${tag.label}</button>`;
        }).join('');
    },

    // ---- 渲染任务卡片（网格） ----
    renderTaskCard(task) {
        return `
            <div class="task-card" data-task-id="${task.id}">
                ${UI.getBadgeHTML(task.badge)}
                <div class="task-card-icon" style="background:${task.iconBg}20">${task.icon}</div>
                <div class="task-card-name">${UI.getTaskName(task)}</div>
                <div class="task-card-desc">${UI.getTaskDesc(task)}</div>
                <div class="task-card-meta">
                    <span class="meta-tag ${UI.getDifficultyClass(task.difficulty)}">${UI.getDifficultyText(task.difficulty)}</span>
                    <span class="meta-tag">~${UI.formatTime(task.time)}</span>
                </div>
                <div class="task-card-footer">
                    <span class="task-reward">+${task.reward} <small>🪙</small></span>
                    <button class="btn btn-go">${t('go')}</button>
                </div>
            </div>
        `;
    },

    // ---- 渲染任务列表项 ----
    renderTaskListItem(task) {
        return `
            <div class="task-list-item" data-task-id="${task.id}">
                <div class="task-list-icon" style="background:${task.iconBg}20">${task.icon}</div>
                <div class="task-list-info">
                    <h4>${UI.getTaskName(task)}</h4>
                    <p>${UI.getTaskDesc(task)}</p>
                    <div class="task-list-tags">
                        <span class="meta-tag ${UI.getDifficultyClass(task.difficulty)}">${UI.getDifficultyText(task.difficulty)}</span>
                        <span class="meta-tag">~${UI.formatTime(task.time)}</span>
                        <span class="meta-tag">${UI.getTypeText(task.type)}</span>
                    </div>
                </div>
                <div class="task-list-right">
                    <div class="reward">+${task.reward}🪙</div>
                    <button class="btn btn-go btn-small">${t('go')}</button>
                </div>
            </div>
        `;
    },

    // ---- 绑定任务墙事件 ----
    bindTasksEvents() {
        // 搜索
        const searchInput = document.getElementById('task-search');
        if (searchInput) {
            let debounceTimer;
            searchInput.addEventListener('input', (e) => {
                clearTimeout(debounceTimer);
                debounceTimer = setTimeout(() => {
                    this.searchQuery = e.target.value.trim();
                    this.renderTasksPage();
                    // 恢复焦点
                    const newInput = document.getElementById('task-search');
                    if (newInput) {
                        newInput.focus();
                        newInput.setSelectionRange(newInput.value.length, newInput.value.length);
                    }
                }, 300);
            });
        }

        // 筛选标签
        document.querySelectorAll('.filter-tag').forEach(tag => {
            tag.addEventListener('click', () => {
                this.currentFilter = tag.dataset.filter;
                this.renderTasksPage();
            });
        });

        // 任务卡片/列表项点击
        document.querySelectorAll('.task-card, .task-list-item').forEach(el => {
            el.addEventListener('click', (e) => {
                // 如果点击的是GO按钮，也跳转到详情
                const taskId = parseInt(el.dataset.taskId);
                App.navigate(`#/task/${taskId}`);
            });
        });
    },

    // ============================================
    // 渲染任务详情页
    // ============================================
    renderTaskDetailPage(taskId) {
        const task = TASKS_DATA.find(t => t.id === taskId);
        if (!task) {
            App.navigate('#/tasks');
            return;
        }

        const container = document.getElementById('page-container');
        const status = this.getTaskStatus(taskId);
        const steps = UI.getTaskSteps(task);
        const notes = UI.getTaskNotes(task);

        // 获取相似任务（同类型，排除自己）
        const similarTasks = TASKS_DATA.filter(t => t.type === task.type && t.id !== task.id).slice(0, 5);

        container.innerHTML = `
            <div class="task-detail-page page-enter">
                <div class="detail-back" onclick="window.history.back()">
                    ${t('back')}
                </div>

                <!-- Banner -->
                <div class="detail-banner" style="background:${task.iconBg}30">
                    <span style="position:relative;z-index:1">${task.icon}</span>
                </div>

                <!-- 标题信息 -->
                <div class="detail-header">
                    <h1>${UI.getTaskName(task)}</h1>
                    <p class="detail-desc">${UI.getTaskDesc(task)}</p>
                    <div class="detail-stats">
                        <div class="detail-stat">
                            📊 ${t('difficulty')}: <span class="stat-value">${UI.getDifficultyText(task.difficulty)}</span>
                        </div>
                        <div class="detail-stat">
                            ⏱️ ${t('estimatedTime')}: <span class="stat-value">${UI.formatTime(task.time)}</span>
                        </div>
                        <div class="detail-stat">
                            📱 ${t('platform')}: <span class="stat-value">${UI.getPlatformText(task.platform)}</span>
                        </div>
                        <div class="detail-stat">
                            🌍 ${t('region')}: <span class="stat-value">${UI.getRegionText(task.region)}</span>
                        </div>
                    </div>
                </div>

                <!-- 奖励 -->
                <div class="detail-reward-box">
                    <div class="reward-amount">🪙 +${task.reward.toLocaleString()}</div>
                    <div class="reward-label">${t('coins')} (${t('equivalentCash')}${UI.coinsToCash(task.reward)})</div>
                </div>

                <!-- 任务步骤 -->
                <div class="detail-section">
                    <h3>${t('taskSteps')}</h3>
                    <div class="step-list">
                        ${steps.map((step, i) => `
                            <div class="step-item">
                                <div class="step-number">${i + 1}</div>
                                <div class="step-text">${step}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- 注意事项 -->
                <div class="detail-section">
                    <h3>${t('taskNotes')}</h3>
                    <div class="detail-notes">
                        <p>${notes}</p>
                    </div>
                </div>

                <!-- 相似推荐 -->
                ${similarTasks.length > 0 ? `
                <div class="detail-section">
                    <h3>${t('similarTasks')}</h3>
                    <div class="similar-scroll">
                        ${similarTasks.map(st => `
                            <div class="similar-card" data-task-id="${st.id}">
                                <div class="similar-icon">${st.icon}</div>
                                <div class="similar-name">${UI.getTaskName(st)}</div>
                                <div class="similar-reward">+${st.reward}🪙</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                ` : ''}

                <!-- 底部操作按钮 -->
                <div class="detail-actions">
                    ${status === 'approved' ? `
                        <button class="btn btn-success" disabled>✅ ${t('approved')}</button>
                    ` : status === 'pending' ? `
                        <button class="btn btn-secondary" disabled style="margin-top:0">⏳ ${t('pending')}</button>
                    ` : status === 'in-progress' ? `
                        <button class="btn btn-accent" id="btn-confirm-complete" style="margin-top:0">${t('confirmComplete')}</button>
                    ` : `
                        <button class="btn btn-accent" id="btn-go-task" style="margin-top:0">${t('goToTask')}</button>
                        <button class="btn btn-primary" id="btn-confirm-complete" style="margin-top:0">${t('confirmComplete')}</button>
                    `}
                </div>
            </div>
        `;

        this.bindDetailEvents(task);
    },

    // ---- 绑定详情页事件 ----
    bindDetailEvents(task) {
        // 前往任务
        const goBtn = document.getElementById('btn-go-task');
        if (goBtn) {
            goBtn.addEventListener('click', () => {
                // 模拟跳转到第三方
                this.addMyTask(task.id, 'in-progress');
                UI.showModal({
                    icon: '🚀',
                    title: UI.getTaskName(task),
                    message: t('redirectMsg'),
                    confirmText: t('confirm'),
                    onConfirm: () => {
                        this.renderTaskDetailPage(task.id);
                    }
                });
            });
        }

        // 确认完成
        const confirmBtn = document.getElementById('btn-confirm-complete');
        if (confirmBtn) {
            confirmBtn.addEventListener('click', () => {
                const status = this.getTaskStatus(task.id);
                if (status === 'approved') {
                    UI.toast(t('alreadyCompleted'), 'info');
                    return;
                }

                // 如果还没开始，先标记为进行中
                if (!status) {
                    this.addMyTask(task.id, 'pending');
                } else {
                    this.updateTaskStatus(task.id, 'pending');
                }

                UI.toast(t('pendingMsg'), 'info');
                this.renderTaskDetailPage(task.id);

                // 模拟5秒后审核通过
                setTimeout(() => {
                    const currentStatus = this.getTaskStatus(task.id);
                    if (currentStatus === 'pending') {
                        this.updateTaskStatus(task.id, 'approved');
                        const result = Auth.updateCoins(task.reward);
                        Auth.incrementCompletedTasks();

                        // 添加交易记录
                        Wallet.addTransaction({
                            type: 'income',
                            title: `${t('taskReward')} - ${UI.getTaskName(task)}`,
                            amount: task.reward,
                            time: Date.now()
                        });

                        UI.toast(`+${task.reward} ${t('coins')}! 🎉`, 'success');
                        UI.celebrate();

                        // 如果当前还在详情页，刷新
                        if (window.location.hash.startsWith(`#/task/${task.id}`)) {
                            this.renderTaskDetailPage(task.id);
                        }
                    }
                }, 5000);
            });
        }

        // 相似任务点击
        document.querySelectorAll('.similar-card').forEach(card => {
            card.addEventListener('click', () => {
                const id = parseInt(card.dataset.taskId);
                App.navigate(`#/task/${id}`);
            });
        });
    },

    // ============================================
    // 渲染我的任务页
    // ============================================
    renderMyTasksPage() {
        const container = document.getElementById('page-container');
        const myTasks = this.getMyTasks();

        const inProgress = myTasks.filter(t => t.status === 'in-progress');
        const pending = myTasks.filter(t => t.status === 'pending');
        const approved = myTasks.filter(t => t.status === 'approved');
        const rejected = myTasks.filter(t => t.status === 'rejected');

        // 默认显示第一个有内容的tab
        const defaultTab = inProgress.length > 0 ? 'in-progress' :
                          pending.length > 0 ? 'pending' :
                          approved.length > 0 ? 'approved' : 'in-progress';

        container.innerHTML = `
            <div class="my-tasks-page page-enter">
                <div class="page-header">
                    <h2>${t('myTasksTitle')}</h2>
                </div>

                <div class="tabs-bar">
                    <div class="tab-item ${defaultTab === 'in-progress' ? 'active' : ''}" data-tab="in-progress">
                        ${t('inProgress')} ${inProgress.length > 0 ? `<span class="tab-count">${inProgress.length}</span>` : ''}
                    </div>
                    <div class="tab-item ${defaultTab === 'pending' ? 'active' : ''}" data-tab="pending">
                        ${t('pending')} ${pending.length > 0 ? `<span class="tab-count">${pending.length}</span>` : ''}
                    </div>
                    <div class="tab-item ${defaultTab === 'approved' ? 'active' : ''}" data-tab="approved">
                        ${t('approved')} ${approved.length > 0 ? `<span class="tab-count">${approved.length}</span>` : ''}
                    </div>
                    <div class="tab-item ${defaultTab === 'rejected' ? 'active' : ''}" data-tab="rejected">
                        ${t('rejected')}
                    </div>
                </div>

                <div id="my-tasks-content">
                    ${this.renderMyTaskTab(defaultTab, { 'in-progress': inProgress, pending, approved, rejected })}
                </div>
            </div>
        `;

        // Tab 切换
        document.querySelectorAll('.tabs-bar .tab-item').forEach(tab => {
            tab.addEventListener('click', () => {
                document.querySelectorAll('.tabs-bar .tab-item').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                const tabName = tab.dataset.tab;
                document.getElementById('my-tasks-content').innerHTML =
                    this.renderMyTaskTab(tabName, { 'in-progress': inProgress, pending, approved, rejected });
                this.bindMyTaskItemEvents();
            });
        });

        this.bindMyTaskItemEvents();
    },

    // ---- 渲染我的任务Tab内容 ----
    renderMyTaskTab(tabName, groups) {
        const tasks = groups[tabName] || [];
        if (tasks.length === 0) {
            return `
                <div class="empty-state">
                    <div class="empty-icon">📭</div>
                    <h3>${t('noTasks')}</h3>
                    <p>${t('noTasksDesc')}</p>
                </div>
            `;
        }

        return `
            <div class="my-task-list">
                ${tasks.map(myTask => {
                    const taskData = TASKS_DATA.find(t => t.id === myTask.taskId);
                    if (!taskData) return '';
                    const statusMap = {
                        'in-progress': { text: t('inProgress'), cls: 'status-in-progress' },
                        'pending': { text: t('pending'), cls: 'status-pending' },
                        'approved': { text: t('approved'), cls: 'status-approved' },
                        'rejected': { text: t('rejected'), cls: 'status-rejected' }
                    };
                    const st = statusMap[myTask.status] || statusMap['in-progress'];
                    return `
                        <div class="my-task-item" data-task-id="${taskData.id}">
                            <div class="task-icon" style="background:${taskData.iconBg}20">${taskData.icon}</div>
                            <div class="task-info">
                                <h4>${UI.getTaskName(taskData)}</h4>
                                <div class="task-time">${UI.formatDate(myTask.updateTime)}</div>
                            </div>
                            <div class="task-status">
                                <span class="status-badge ${st.cls}">${st.text}</span>
                                <div class="my-task-reward">+${taskData.reward}🪙</div>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    },

    // ---- 绑定我的任务项点击 ----
    bindMyTaskItemEvents() {
        document.querySelectorAll('.my-task-item').forEach(item => {
            item.addEventListener('click', () => {
                const taskId = parseInt(item.dataset.taskId);
                App.navigate(`#/task/${taskId}`);
            });
        });
    },

    // ============================================
    // 渲染排行榜页
    // ============================================
    renderLeaderboardPage() {
        const container = document.getElementById('page-container');
        const user = Auth.getUser();
        const top3 = LEADERBOARD_DATA.slice(0, 3);
        const rest = LEADERBOARD_DATA.slice(3);

        // 用户排名（模拟）
        const userRank = Math.floor(Math.random() * 50) + 21;

        container.innerHTML = `
            <div class="leaderboard-page page-enter">
                <div class="leaderboard-header">
                    <h2>${t('leaderboardTitle')}</h2>
                    <p>${t('leaderboardDesc')}</p>
                </div>

                <!-- 前三名 -->
                <div class="top-three">
                    ${top3.map((player, i) => {
                        const rank = i + 1;
                        const cls = rank === 1 ? 'first' : rank === 2 ? 'second' : 'third';
                        return `
                            <div class="top-player ${cls}">
                                <div class="top-avatar">
                                    ${player.avatar}
                                    <span class="top-rank-badge">${rank}</span>
                                </div>
                                <div class="top-name">${UI.getLeaderboardName(player)}</div>
                                <div class="top-score">${player.score.toLocaleString()}🪙</div>
                            </div>
                        `;
                    }).join('')}
                </div>

                <!-- 排名列表 -->
                <div class="section-title">
                    <h3>📊 TOP 4-20</h3>
                </div>
                <div class="rank-list">
                    ${rest.map((player, i) => `
                        <div class="rank-item">
                            <div class="rank-number">${i + 4}</div>
                            <div class="rank-avatar">${player.avatar}</div>
                            <div class="rank-info">
                                <h4>${UI.getLeaderboardName(player)}</h4>
                            </div>
                            <div class="rank-score">${player.score.toLocaleString()}🪙</div>
                        </div>
                    `).join('')}

                    <!-- 当前用户 -->
                    ${user ? `
                    <div class="rank-item current-user" style="margin-top:10px">
                        <div class="rank-number">${userRank}</div>
                        <div class="rank-avatar" style="background:linear-gradient(135deg,var(--primary),var(--secondary));color:white">${user.avatar}</div>
                        <div class="rank-info">
                            <h4>${user.nickname} (${t('yourRank')})</h4>
                        </div>
                        <div class="rank-score">${user.totalEarned.toLocaleString()}🪙</div>
                    </div>
                    ` : ''}
                </div>
            </div>
        `;
    }
};
