/* ============================================
   GameCoins - Mock Data
   ============================================ */

// Localization text
const baseLocale = {
    // Common
    appName: 'GameCoins',
    appSlogan: 'Play Offers, Earn Coins, Claim Rewards',
    coins: 'Coins',
    go: 'Get Offer',
    confirm: 'Confirm',
    cancel: 'Cancel',
    copy: 'Copy',
    close: 'Close',
    loading: 'Loading...',

    // Navigation
    navTasks: 'Offers',
    navMyTasks: 'My Offers',
    navLeaderboard: 'Leaderboard',
    navWallet: 'Wallet',
    navProfile: 'Profile',

    // Auth
    login: 'Log In',
    register: 'Sign Up',
    email: 'Email',
    password: 'Password',
    nickname: 'Display Name',
    emailPlaceholder: 'Enter your email address',
    passwordPlaceholder: 'Enter your password (at least 6 characters)',
    nicknamePlaceholder: 'Choose a display name',
    guestLogin: 'Try as Guest',
    loginSuccess: 'Logged in successfully.',
    registerSuccess: 'Account created. +100 Coins welcome bonus.',
    loginError: 'Incorrect email or password.',
    registerError: 'This email is already registered.',
    inputError: 'Please complete all required fields.',
    passwordError: 'Password must be at least 6 characters.',

    // Offer wall
    searchPlaceholder: 'Search offers...',
    filterAll: 'All',
    filterRegister: 'Sign-Up',
    filterDownload: 'Install',
    filterSurvey: 'Survey',
    filterPurchase: 'Purchase',
    filterPlay: 'Play',
    filterHighReward: 'Top Reward',
    filterEasy: 'Easy Start',
    filterIOS: 'iOS',
    filterAndroid: 'Android',
    filterAllPlatform: 'All Devices',
    filterGlobal: 'Global',
    filterUS: 'United States',
    filterJP: 'United Kingdom',
    filterSEA: 'Canada',
    filterEU: 'Australia',
    hotTasks: '🔥 Trending Offers',
    newTasks: '🆕 New Offers',
    allTasks: '📋 All Offers',
    seeAll: 'View All',
    bannerTitle: 'Limited-Time Double Rewards',
    bannerDesc: 'Complete 3 offers today to unlock 2x Coins',
    bannerBtn: 'Get Offer',
    minuteShort: 'min',

    // Difficulty
    easy: 'Easy',
    medium: 'Medium',
    hard: 'Hard',

    // Offer details
    back: '← Back',
    taskSteps: '📝 Steps',
    taskNotes: '⚠️ Requirements',
    goToTask: 'Install Now',
    confirmComplete: 'Submit Completion',
    similarTasks: '🎯 Similar Offers',
    difficulty: 'Difficulty',
    estimatedTime: 'Estimated Time',
    platform: 'Platform',
    region: 'Region',
    taskType: 'Offer Type',
    redirectMsg: 'You are being redirected to a partner app. Complete the offer and return to submit.',
    pendingMsg: 'Submission received. Review usually takes up to 24 hours.',
    alreadyCompleted: 'You already completed this offer.',

    // My offers
    myTasksTitle: 'My Offers',
    inProgress: 'In Progress',
    pending: 'Under Review',
    approved: 'Completed',
    rejected: 'Rejected',
    noTasks: 'No offers found',
    noTasksDesc: 'Browse the offer wall to start earning.',

    // Wallet
    walletTitle: 'Coin Wallet',
    currentBalance: 'Current Coin Balance',
    equivalentCash: '≈$',
    earnMore: 'Get More',
    exchangeTitle: '💎 Rewards Store',
    transactionTitle: '📊 Coin Activity',
    paypal: 'PayPal Cashout',
    amazon: 'Amazon Gift Card',
    steam: 'Steam Gift Card',
    itunes: 'Apple Gift Card',
    gameCurrency: 'Game Credits',
    phoneCredit: 'Mobile Top-Up',
    minExchange: 'Minimum {n} Coins',
    exchangeConfirmTitle: 'Confirm Redemption',
    exchangeConfirmMsg: 'Redeem {n} Coins for {item}?',
    exchangeSuccess: 'Redemption successful. Check your account shortly.',
    exchangeInsufficient: 'Not enough Coins yet. Complete more offers.',
    newUserBonus: 'Welcome Bonus',
    taskReward: 'Offer Reward',
    exchangeDeduct: 'Redemption',

    // Leaderboard
    leaderboardTitle: '🏆 Coin Leaderboard',
    leaderboardDesc: 'Top earners this week',
    weeklyScore: 'Weekly Coins',
    yourRank: 'Your Rank',

    // Profile
    profileTitle: 'Account',
    joinDate: 'Joined ',
    totalEarned: 'Total Earned',
    totalExchanged: 'Total Redeemed',
    completedTasks: 'Offers Completed',
    inviteFriends: '🎁 Refer Friends',
    inviteDesc: 'Invite a friend and both receive 200 Coins after sign-up.',
    inviteCode: 'Referral Code',
    copied: 'Copied to clipboard.',
    settings: 'Settings',
    notifications: 'Notifications',
    language: 'Language',
    chinese: 'English',
    english: 'English',
    logout: 'Log Out',
    logoutConfirm: 'Do you want to log out?',
    faqTitle: '❓ FAQ',
    faq1q: 'How do I earn Coins?',
    faq1a: 'Open an offer, complete all required steps, then submit completion for review.',
    faq2q: 'When are rewards credited?',
    faq2a: 'Most submissions are reviewed and credited within 24 hours.',
    faq3q: 'How do I redeem rewards?',
    faq3a: 'Go to Wallet, choose a redemption option, and confirm your request.',
    faq4q: 'Why was my offer rejected?',
    faq4a: 'Common reasons include incomplete steps, duplicate accounts, or expired offer windows.'
};

const i18n = {
    zh: { ...baseLocale },
    en: { ...baseLocale }
};

// Get text by current language
function t(key) {
    const lang = localStorage.getItem('gc_language') || 'en';
    return i18n[lang][key] || i18n.en[key] || key;
}

function buildTask(task) {
    return {
        ...task,
        nameEn: task.nameEn || task.name,
        descEn: task.descEn || task.desc,
        stepsEn: task.stepsEn || task.steps,
        notesEn: task.notesEn || task.notes
    };
}

// Offer wall data
const TASKS_DATA = [
    buildTask({
        id: 1,
        name: 'Epic Fantasy RPG',
        icon: '🗡️',
        iconBg: '#4A90D9',
        image: 'https://placehold.co/100x100?text=Epic+Fantasy+RPG',
        desc: 'Reach Level 50 within 7 days.',
        reward: 4200,
        difficulty: 'hard',
        time: 120,
        type: 'play',
        platform: 'all',
        region: 'global',
        badge: 'hot',
        steps: [
            'Tap Install Now and download Epic Fantasy RPG.',
            'Create a new account and finish the tutorial.',
            'Reach Level 50 within 7 days.',
            'Return here and tap Submit Completion.'
        ],
        notes: 'New users only. Rewards are approved after verification.'
    }),
    buildTask({
        id: 2,
        name: 'Kingdom Wars',
        icon: '🏰',
        iconBg: '#5B8DEF',
        image: 'https://placehold.co/100x100?text=Kingdom+Wars',
        desc: 'Upgrade your Stronghold to Level 20 within 10 days.',
        reward: 3600,
        difficulty: 'hard',
        time: 110,
        type: 'play',
        platform: 'all',
        region: 'us',
        badge: 'hot',
        steps: [
            'Install Kingdom Wars from the offer link.',
            'Register with a new account.',
            'Upgrade your Stronghold to Level 20 within 10 days.',
            'Return and submit completion.'
        ],
        notes: 'Progress from existing accounts is not eligible.'
    }),
    buildTask({
        id: 3,
        name: 'Hero AFK',
        icon: '⚔️',
        iconBg: '#6C5CE7',
        image: 'https://placehold.co/100x100?text=Hero+AFK',
        desc: 'Clear Campaign Chapter 12 within 5 days.',
        reward: 2400,
        difficulty: 'medium',
        time: 90,
        type: 'play',
        platform: 'all',
        region: 'jp',
        badge: 'recommend',
        steps: [
            'Install Hero AFK and open the app from this offer.',
            'Create your character and complete onboarding.',
            'Clear Campaign Chapter 12 within 5 days.',
            'Return and tap Submit Completion.'
        ],
        notes: 'Keep notifications enabled so progress can be tracked.'
    }),
    buildTask({
        id: 4,
        name: 'Candy Match 3',
        icon: '🍬',
        iconBg: '#FF6B9D',
        image: 'https://placehold.co/100x100?text=Candy+Match+3',
        desc: 'Pass Level 80 within 3 days.',
        reward: 700,
        difficulty: 'easy',
        time: 35,
        type: 'play',
        platform: 'all',
        region: 'global',
        badge: 'new',
        steps: [
            'Install Candy Match 3.',
            'Complete the beginner levels.',
            'Pass Level 80 within 3 days.',
            'Return and submit completion.'
        ],
        notes: 'Offer is valid on both iOS and Android.'
    }),
    buildTask({
        id: 5,
        name: 'Farm Tycoon',
        icon: '🚜',
        iconBg: '#2ED573',
        image: 'https://placehold.co/100x100?text=Farm+Tycoon',
        desc: 'Unlock Barn Level 12 within 5 days.',
        reward: 1200,
        difficulty: 'medium',
        time: 55,
        type: 'play',
        platform: 'all',
        region: 'sea',
        badge: 'new',
        steps: [
            'Install Farm Tycoon from the partner page.',
            'Create a new farm profile.',
            'Unlock Barn Level 12 within 5 days.',
            'Come back and submit completion.'
        ],
        notes: 'Stable internet is required for tracking.'
    }),
    buildTask({
        id: 6,
        name: 'Word Puzzle Master',
        icon: '🧩',
        iconBg: '#3742FA',
        image: 'https://placehold.co/100x100?text=Word+Puzzle+Master',
        desc: 'Solve 120 words within 48 hours.',
        reward: 500,
        difficulty: 'easy',
        time: 30,
        type: 'play',
        platform: 'all',
        region: 'eu',
        badge: 'recommend',
        steps: [
            'Install Word Puzzle Master.',
            'Finish the tutorial round.',
            'Solve 120 words within 48 hours.',
            'Return and tap Submit Completion.'
        ],
        notes: 'Puzzle count is synced automatically.'
    }),
    buildTask({
        id: 7,
        name: 'Solitaire Classic',
        icon: '🃏',
        iconBg: '#EAB543',
        image: 'https://placehold.co/100x100?text=Solitaire+Classic',
        desc: 'Complete 30 winning hands in Classic mode.',
        reward: 450,
        difficulty: 'easy',
        time: 25,
        type: 'play',
        platform: 'all',
        region: 'us',
        badge: null,
        steps: [
            'Install Solitaire Classic.',
            'Start Classic mode.',
            'Complete 30 winning hands.',
            'Return and submit completion.'
        ],
        notes: 'Only Classic mode wins count toward this offer.'
    }),
    buildTask({
        id: 8,
        name: "Texas Hold'em",
        icon: '♠️',
        iconBg: '#8E44AD',
        image: 'https://placehold.co/100x100?text=Texas+Holdem',
        desc: 'Register and make your first deposit of at least $2.',
        reward: 1900,
        difficulty: 'medium',
        time: 20,
        type: 'purchase',
        platform: 'all',
        region: 'us',
        badge: null,
        steps: [
            "Install Texas Hold'em from this offer link.",
            'Register a verified new account.',
            'Make your first deposit of at least $2.',
            'Return and tap Submit Completion.'
        ],
        notes: '18+ only where applicable. Regional eligibility may apply.'
    }),
    buildTask({
        id: 9,
        name: 'Vegas Slots',
        icon: '🎰',
        iconBg: '#F39C12',
        image: 'https://placehold.co/100x100?text=Vegas+Slots',
        desc: 'Install the app and spin 500 total spins within 24 hours.',
        reward: 1700,
        difficulty: 'medium',
        time: 20,
        type: 'purchase',
        platform: 'all',
        region: 'us',
        badge: null,
        steps: [
            'Install Vegas Slots.',
            'Create a new player profile.',
            'Complete 500 total spins within 24 hours.',
            'Return and submit completion.'
        ],
        notes: 'Offer tracking starts from first app open.'
    }),
    buildTask({
        id: 10,
        name: 'Kingdom Wars: Install Bonus',
        icon: '📲',
        iconBg: '#00CEC9',
        image: 'https://placehold.co/100x100?text=Kingdom+Wars+Install',
        desc: 'Install and launch the app within 1 day.',
        reward: 260,
        difficulty: 'easy',
        time: 8,
        type: 'download',
        platform: 'all',
        region: 'global',
        badge: 'new',
        steps: [
            'Tap Install Now and install the app.',
            'Launch the app from the same device.',
            'Keep the app open for at least 2 minutes.',
            'Return and submit completion.'
        ],
        notes: 'One-time install offer. Reinstalls are not eligible.'
    }),
    buildTask({
        id: 11,
        name: 'Hero AFK: New Account',
        icon: '🛡️',
        iconBg: '#2C3E50',
        image: 'https://placehold.co/100x100?text=Hero+AFK+New+Account',
        desc: 'Create a new account and finish the tutorial within 24 hours.',
        reward: 420,
        difficulty: 'easy',
        time: 12,
        type: 'register',
        platform: 'all',
        region: 'jp',
        badge: null,
        steps: [
            'Install Hero AFK from this offer.',
            'Register a brand-new account.',
            'Complete the full tutorial within 24 hours.',
            'Return and submit completion.'
        ],
        notes: 'Offer is valid for first-time installs only.'
    }),
    buildTask({
        id: 12,
        name: 'Candy Match 3 Blitz',
        icon: '🍭',
        iconBg: '#FF6348',
        image: 'https://placehold.co/100x100?text=Candy+Match+3+Blitz',
        desc: 'Reach Level 120 within 5 days.',
        reward: 650,
        difficulty: 'easy',
        time: 45,
        type: 'play',
        platform: 'all',
        region: 'sea',
        badge: 'recommend',
        steps: [
            'Install Candy Match 3 Blitz.',
            'Complete tutorial stages.',
            'Reach Level 120 within 5 days.',
            'Return and submit completion.'
        ],
        notes: 'Reward is granted after automated level verification.'
    }),
    buildTask({
        id: 13,
        name: 'Farm Tycoon Harvest',
        icon: '🌾',
        iconBg: '#27AE60',
        image: 'https://placehold.co/100x100?text=Farm+Tycoon+Harvest',
        desc: 'Harvest 250 crops and upgrade Silo to Level 8.',
        reward: 1100,
        difficulty: 'medium',
        time: 60,
        type: 'play',
        platform: 'all',
        region: 'eu',
        badge: null,
        steps: [
            'Install Farm Tycoon Harvest.',
            'Start with a fresh account.',
            'Harvest 250 crops and upgrade Silo to Level 8.',
            'Return and submit completion.'
        ],
        notes: 'Checkpoints are validated server-side.'
    }),
    buildTask({
        id: 14,
        name: 'Word Puzzle Master Feedback',
        icon: '📝',
        iconBg: '#6C5CE7',
        image: 'https://placehold.co/100x100?text=Word+Puzzle+Master+Feedback',
        desc: 'Complete the in-app player survey for quick Coins.',
        reward: 180,
        difficulty: 'easy',
        time: 6,
        type: 'survey',
        platform: 'all',
        region: 'global',
        badge: 'new',
        steps: [
            'Install Word Puzzle Master.',
            'Open Settings > Player Survey.',
            'Complete all required questions.',
            'Return and submit completion.'
        ],
        notes: 'Incomplete or inconsistent responses may be rejected.'
    }),
    buildTask({
        id: 15,
        name: 'Epic Fantasy RPG Arena',
        icon: '🏆',
        iconBg: '#C0392B',
        image: 'https://placehold.co/100x100?text=Epic+Fantasy+RPG+Arena',
        desc: 'Reach Power Score 120,000 within 7 days.',
        reward: 5000,
        difficulty: 'hard',
        time: 150,
        type: 'play',
        platform: 'all',
        region: 'global',
        badge: 'hot',
        steps: [
            'Install Epic Fantasy RPG Arena.',
            'Create a new account and complete tutorial quests.',
            'Reach Power Score 120,000 within 7 days.',
            'Return and submit completion.'
        ],
        notes: 'Long-session offer. Daily play is recommended.'
    }),
    buildTask({
        id: 16,
        name: 'Solitaire Classic Pro',
        icon: '♦️',
        iconBg: '#D35400',
        image: 'https://placehold.co/100x100?text=Solitaire+Classic+Pro',
        desc: 'Win 10 streaks within 72 hours.',
        reward: 520,
        difficulty: 'easy',
        time: 28,
        type: 'play',
        platform: 'all',
        region: 'us',
        badge: 'new',
        steps: [
            'Install Solitaire Classic Pro.',
            'Play in Streak mode.',
            'Win 10 streaks within 72 hours.',
            'Return and submit completion.'
        ],
        notes: 'Only consecutive wins count for this offer.'
    }),
    buildTask({
        id: 17,
        name: "Texas Hold'em Live",
        icon: '♥️',
        iconBg: '#1A1A2E',
        image: 'https://placehold.co/100x100?text=Texas+Holdem+Live',
        desc: 'Verify account and enter 3 tournament tables.',
        reward: 2100,
        difficulty: 'medium',
        time: 30,
        type: 'purchase',
        platform: 'all',
        region: 'us',
        badge: null,
        steps: [
            "Install Texas Hold'em Live.",
            'Complete account verification.',
            'Enter 3 tournament tables.',
            'Return and submit completion.'
        ],
        notes: 'Tournament entry may require minimum balance.'
    }),
    buildTask({
        id: 18,
        name: 'Vegas Slots Deluxe',
        icon: '🎲',
        iconBg: '#8E44AD',
        image: 'https://placehold.co/100x100?text=Vegas+Slots+Deluxe',
        desc: 'Reach VIP Level 3 within 4 days.',
        reward: 900,
        difficulty: 'medium',
        time: 40,
        type: 'play',
        platform: 'all',
        region: 'eu',
        badge: null,
        steps: [
            'Install Vegas Slots Deluxe.',
            'Create a new profile and claim starter chips.',
            'Reach VIP Level 3 within 4 days.',
            'Return and submit completion.'
        ],
        notes: 'Chip purchases are optional unless stated in the offer.'
    }),
    buildTask({
        id: 19,
        name: 'Kingdom Wars Alliance',
        icon: '🛡',
        iconBg: '#34495E',
        image: 'https://placehold.co/100x100?text=Kingdom+Wars+Alliance',
        desc: 'Join an alliance and reach Headquarters Level 15 within 7 days.',
        reward: 3400,
        difficulty: 'hard',
        time: 105,
        type: 'play',
        platform: 'all',
        region: 'sea',
        badge: null,
        steps: [
            'Install Kingdom Wars Alliance.',
            'Create a new commander profile.',
            'Join an alliance and reach Headquarters Level 15 within 7 days.',
            'Return and submit completion.'
        ],
        notes: 'Alliance participation must be active to qualify.'
    }),
    buildTask({
        id: 20,
        name: 'Hero AFK Frontier',
        icon: '🔥',
        iconBg: '#2C3E50',
        image: 'https://placehold.co/100x100?text=Hero+AFK+Frontier',
        desc: 'Reach Hero Level 60 within 7 days.',
        reward: 3800,
        difficulty: 'hard',
        time: 115,
        type: 'play',
        platform: 'all',
        region: 'us',
        badge: null,
        steps: [
            'Install Hero AFK Frontier.',
            'Create a new account and complete onboarding.',
            'Reach Hero Level 60 within 7 days.',
            'Return and submit completion.'
        ],
        notes: 'Only first-time users are eligible for payout.'
    })
];

// Leaderboard mock data
const LEADERBOARD_DATA = [
    { id: 'lb1', name: 'ProGamer_X', nameEn: 'ProGamer_X', avatar: '🎮', score: 28500 },
    { id: 'lb2', name: 'GameMaster', nameEn: 'GameMaster', avatar: '🏆', score: 24200 },
    { id: 'lb3', name: 'CoinHunter', nameEn: 'CoinHunter', avatar: '🪙', score: 21800 },
    { id: 'lb4', name: 'AcePlayer', nameEn: 'AcePlayer', avatar: '😎', score: 19500 },
    { id: 'lb5', name: 'NinjaPlayer', nameEn: 'NinjaPlayer', avatar: '🥷', score: 17300 },
    { id: 'lb6', name: 'HappyGamer', nameEn: 'HappyGamer', avatar: '😄', score: 15800 },
    { id: 'lb7', name: 'StarGazer', nameEn: 'StarGazer', avatar: '⭐', score: 14200 },
    { id: 'lb8', name: 'CoinKing', nameEn: 'CoinKing', avatar: '👑', score: 12900 },
    { id: 'lb9', name: 'DragonSlayer', nameEn: 'DragonSlayer', avatar: '🐉', score: 11500 },
    { id: 'lb10', name: 'FlashGamer', nameEn: 'FlashGamer', avatar: '⚡', score: 10200 },
    { id: 'lb11', name: 'PixelHero', nameEn: 'PixelHero', avatar: '🎯', score: 9800 },
    { id: 'lb12', name: 'GamePrince', nameEn: 'GamePrince', avatar: '🤴', score: 8500 },
    { id: 'lb13', name: 'RocketMan', nameEn: 'RocketMan', avatar: '🚀', score: 7200 },
    { id: 'lb14', name: 'SweetPlayer', nameEn: 'SweetPlayer', avatar: '🍬', score: 6800 },
    { id: 'lb15', name: 'SwordMaster', nameEn: 'SwordMaster', avatar: '⚔️', score: 5500 },
    { id: 'lb16', name: 'SunnyAce', nameEn: 'SunnyAce', avatar: '☀️', score: 4900 },
    { id: 'lb17', name: 'MysticWolf', nameEn: 'MysticWolf', avatar: '🐺', score: 4200 },
    { id: 'lb18', name: 'FlowerWorld', nameEn: 'FlowerWorld', avatar: '🌸', score: 3600 },
    { id: 'lb19', name: 'ThunderBolt', nameEn: 'ThunderBolt', avatar: '🌩️', score: 2800 },
    { id: 'lb20', name: 'Newbie', nameEn: 'Newbie', avatar: '🌱', score: 1500 }
];

// Redemption options
const EXCHANGE_OPTIONS = [
    { id: 'paypal', icon: '💸', nameKey: 'paypal', min: 500, value: '$5.00' },
    { id: 'amazon', icon: '📦', nameKey: 'amazon', min: 1000, value: '$10.00' },
    { id: 'steam', icon: '🎮', nameKey: 'steam', min: 1000, value: '$10.00' },
    { id: 'itunes', icon: '🎵', nameKey: 'itunes', min: 800, value: '$8.00' },
    { id: 'game', icon: '💎', nameKey: 'gameCurrency', min: 300, value: '300 Gems' },
    { id: 'phone', icon: '📱', nameKey: 'phoneCredit', min: 500, value: '$5.00' }
];
