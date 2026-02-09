# 🎮 GameCoins - 游戏积分墙

一个游戏类积分墙（Offer Wall）前端演示项目，纯静态网站，可直接部署到 GitHub Pages。

![GameCoins](https://img.shields.io/badge/GameCoins-Offer%20Wall-6C5CE7?style=for-the-badge)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## ✨ 功能特性

### 用户系统
- 📧 邮箱注册/登录
- 🎮 游客快速体验
- 🎁 新用户注册赠送 100 积分

### 任务墙
- 🔥 20+ 游戏任务（休闲、益智、RPG、策略、射击、卡牌等）
- 🔍 搜索功能
- 🏷️ 多维度筛选（类型、奖励、难度、设备、地区）
- 📱 热门/新上线/全部任务分区展示

### 任务流程
- 📋 任务详情页（步骤说明、注意事项、奖励信息）
- 🚀 模拟跳转到第三方合作方页面
- ✅ 确认完成 → 审核中(Pending) → 自动通过(Approved)
- 🎉 完成任务获得积分 + 庆祝动画

### 钱包/积分中心
- 💰 积分余额展示（含等值现金）
- 💎 6种兑换方式（PayPal、Amazon、Steam、iTunes、游戏货币、话费）
- 📊 积分收支明细

### 排行榜
- 🏆 本周积分 TOP 20
- 🥇🥈🥉 前三名特殊展示
- 📍 当前用户排名高亮

### 个人中心
- 👤 个人信息与统计
- 🎁 邀请好友（邀请码复制）
- 🌐 中英文切换
- 🔔 通知开关
- ❓ FAQ 常见问题

### UI/UX
- 🌙 暗色游戏主题
- 📱 移动端优先响应式设计
- ✨ 页面过渡动画
- 🎊 任务完成撒花庆祝动画
- 🔢 数字滚动动画
- 💬 Toast 提示消息
- 🪟 模态弹窗

## 🛠️ 技术栈

- **HTML5** + **CSS3** + **Vanilla JavaScript**
- 无任何外部依赖，无需构建工具
- 使用 `localStorage` 模拟数据持久化
- Hash 路由实现 SPA 页面切换
- Emoji 图标，无需图片资源

## 📁 项目结构

```
game-offer-wall/
├── index.html          # 主入口
├── css/
│   └── style.css       # 全部样式
├── js/
│   ├── data.js         # 模拟数据 & 国际化文本
│   ├── ui.js           # UI组件（Toast、弹窗、动画）
│   ├── auth.js         # 注册/登录逻辑
│   ├── tasks.js        # 任务墙/详情/我的任务/排行榜
│   ├── wallet.js       # 钱包/兑换/个人中心
│   └── app.js          # 路由 & 初始化
└── README.md           # 项目说明
```

## 🚀 部署到 GitHub Pages

### 方法一：直接上传

1. 在 GitHub 上创建一个新仓库（如 `game-offer-wall`）
2. 将本项目所有文件上传到仓库
3. 进入仓库 **Settings** → **Pages**
4. Source 选择 **Deploy from a branch**
5. Branch 选择 **main**，目录选择 **/ (root)**
6. 点击 **Save**
7. 等待几分钟后访问：`https://你的用户名.github.io/game-offer-wall/`

### 方法二：Git 命令行

```bash
# 克隆或初始化
git init
git add .
git commit -m "Initial commit: GameCoins offer wall"

# 添加远程仓库
git remote add origin https://github.com/你的用户名/game-offer-wall.git
git branch -M main
git push -u origin main
```

然后在 GitHub 仓库 Settings → Pages 中启用。

## 📱 使用说明

1. 打开网站后进入登录页
2. 可以注册新账号或点击「游客快速体验」
3. 进入任务墙浏览游戏任务
4. 点击任务卡片查看详情
5. 点击「立即前往」模拟跳转到游戏
6. 点击「确认完成」提交任务
7. 等待约5秒自动审核通过，积分到账
8. 在钱包页面可以兑换各种奖励
9. 在个人中心可以切换中英文语言

## 🎯 演示流程

```
注册/登录 → 浏览任务墙 → 选择任务 → 查看详情 
→ 前往任务(模拟) → 确认完成 → 审核中(5秒) 
→ 积分到账 + 庆祝动画 → 钱包兑换
```

## ⚠️ 注意事项

- 本项目为**前端演示**，所有数据存储在浏览器 `localStorage` 中
- 清除浏览器数据会丢失所有用户信息和任务记录
- 任务跳转为模拟操作，不会真正跳转到第三方
- 兑换为模拟操作，不涉及真实交易

## 📄 License

MIT License - 可自由使用和修改
