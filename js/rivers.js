// 水域数据 - 12个水域景点，每个包含多张照片
const riversData = [
    {
        id: 1,
        name: "黄河",
        location: "青海-山东",
        images: [
            "images/huanghe/1.jpg",
            "images/huanghe/2.jpg",
            "images/huanghe/3.jpg",
            "images/huanghe/4.jpg"
        ],
        description: "中华民族的母亲河，中华文明的主要发源地，流经九个省区。黄河发源于青藏高原，流经黄土高原，携带大量泥沙，形成了独特的黄色河水。",
        features: ["母亲河", "文明发源", "壶口瀑布", "九曲黄河", "黄土高原", "龙门石窟"],
        length: "5464公里",
        type: "大河",
        bestSeason: "春秋季"
    },
    {
        id: 2,
        name: "长江",
        location: "青海-上海",
        images: [
            "images/changjiang/1.jpg",
            "images/changjiang/2.jpg",
            "images/changjiang/3.jpg",
            "images/changjiang/4.jpg"
        ],
        description: "中国第一大河，世界第三长河，孕育了灿烂的长江文明。长江流域经济发达，物产丰富，是中国最重要的经济带之一。",
        features: ["第一大河", "黄金水道", "三峡大坝", "长江三角洲", "三峡风光", "江豚保护"],
        length: "6300公里",
        type: "大河",
        bestSeason: "四季皆宜"
    },
    {
        id: 3,
        name: "珠江",
        location: "云南-广东",
        images: [
            "images/zhujiang/1.jpg",
            "images/zhujiang/2.jpg",
            "images/zhujiang/3.jpg",
            "images/zhujiang/4.jpg"
        ],
        description: "华南第一大河，珠江三角洲经济区的命脉。珠江水量充沛，航运发达，连接着粤港澳大湾区。",
        features: ["华南母亲河", "珠江三角洲", "航运发达", "粤港澳", "珠江夜景", "水上人家"],
        length: "2320公里",
        type: "大河",
        bestSeason: "10-4月"
    },
    {
        id: 4,
        name: "黑龙江",
        location: "内蒙古-俄罗斯",
        images: [
            "images/heilongjiang/1.jpg",
            "images/heilongjiang/2.jpg",
            "images/heilongjiang/3.jpg",
            "images/heilongjiang/4.jpg"
        ],
        description: "中俄界河，流域广阔，冬季冰封期长。黑龙江水质清澈，森林资源丰富，是中俄边境的重要水道。",
        features: ["中俄界河", "冬季冰封", "森林资源", "边境贸易", "冷水鱼种", "原始生态"],
        length: "4370公里",
        type: "界河",
        bestSeason: "6-9月"
    },
    {
        id: 5,
        name: "澜沧江",
        location: "青海-东南亚",
        images: [
            "images/lancangjiang/1.jpg",
            "images/lancangjiang/2.jpg",
            "images/lancangjiang/3.jpg",
            "images/lancangjiang/4.jpg"
        ],
        description: "东南亚第一大河，流出中国后称湄公河。澜沧江水流湍急，水能资源丰富，是重要的国际河流。",
        features: ["国际河流", "水能丰富", "湄公河上游", "峡谷风光", "少数民族", "热带雨林"],
        length: "4880公里",
        type: "国际河流",
        bestSeason: "11-4月"
    },
    {
        id: 6,
        name: "雅鲁藏布江",
        location: "西藏-印度",
        images: [
            "images/yaluzangbujiang/1.jpg",
            "images/yaluzangbujiang/2.jpg",
            "images/yaluzangbujiang/3.jpg",
            "images/yaluzangbujiang/4.jpg"
        ],
        description: "世界海拔最高的大河，拥有世界第一大峡谷。雅鲁藏布江水流湍急，水能资源极其丰富。",
        features: ["世界最高大河", "大峡谷", "水能丰富", "藏族文化", "高山峡谷", "生物多样性"],
        length: "2057公里",
        type: "高原河流",
        bestSeason: "5-10月"
    },
    {
        id: 7,
        name: "青海湖",
        location: "青海省",
        images: [
            "images/qinghaihu/1.jpg",
            "images/qinghaihu/2.jpg",
            "images/qinghaihu/3.jpg",
            "images/qinghaihu/4.jpg"
        ],
        description: "中国最大的内陆咸水湖，高原上的蓝宝石。青海湖景色壮美，是候鸟的重要栖息地。",
        features: ["最大咸水湖", "候鸟天堂", "环湖骑行", "油菜花海", "藏族圣湖", "高原明珠"],
        area: "4435平方公里",
        type: "咸水湖",
        bestSeason: "7-8月"
    },
    {
        id: 8,
        name: "鄱阳湖",
        location: "江西省",
        images: [
            "images/poyanghu/1.jpg",
            "images/poyanghu/2.jpg",
            "images/poyanghu/3.jpg",
            "images/poyanghu/4.jpg"
        ],
        description: "中国第一大淡水湖，长江流域的重要调节湖泊。鄱阳湖湿地生态系统完整，是重要的候鸟越冬地。",
        features: ["第一大淡水湖", "候鸟越冬", "湿地生态", "枯水草原", "湖鲜美食", "水上森林"],
        area: "3583平方公里",
        type: "淡水湖",
        bestSeason: "10-3月"
    },
    {
        id: 9,
        name: "洞庭湖",
        location: "湖南省",
        images: [
            "images/dongtinghu/1.jpg",
            "images/dongtinghu/2.jpg",
            "images/dongtinghu/3.jpg",
            "images/dongtinghu/4.jpg"
        ],
        description: "中国第二大淡水湖，'洞庭天下水，岳阳天下楼'。洞庭湖物产丰富，文化底蕴深厚。",
        features: ["第二大淡水湖", "岳阳楼", "湖湘文化", "水产丰富", "龙舟文化", "湿地保护"],
        area: "2579平方公里",
        type: "淡水湖",
        bestSeason: "春秋季"
    },
    {
        id: 10,
        name: "太湖",
        location: "江苏-浙江",
        images: [
            "images/taihu/1.jpg",
            "images/taihu/2.jpg",
            "images/taihu/3.jpg",
            "images/taihu/4.jpg"
        ],
        description: "中国第三大淡水湖，江南水乡的核心。太湖风景秀丽，周边古镇林立，文化底蕴深厚。",
        features: ["第三大淡水湖", "江南水乡", "太湖三白", "古镇环绕", "园林文化", "渔业发达"],
        area: "2427平方公里",
        type: "淡水湖",
        bestSeason: "春秋季"
    },
    {
        id: 11,
        name: "南海",
        location: "中国南部",
        images: [
            "images/nanhai/1.jpg",
            "images/nanhai/2.jpg",
            "images/nanhai/3.jpg",
            "images/nanhai/4.jpg"
        ],
        description: "中国三大边缘海之一，海域辽阔，资源丰富。南海战略地位重要，是海上丝绸之路的重要通道。",
        features: ["重要海域", "海上丝路", "岛屿众多", "海洋资源", "珊瑚礁群", "海洋生态"],
        area: "350万平方公里",
        type: "海域",
        bestSeason: "10-4月"
    },
    {
        id: 12,
        name: "杭州西湖",
        location: "浙江省杭州市",
        images: [
            "images/xihu/1.jpg",
            "images/xihu/2.jpg",
            "images/xihu/3.jpg",
            "images/xihu/4.jpg"
        ],
        description: "中国最具文化内涵的湖泊，'欲把西湖比西子，淡妆浓抹总相宜'。西湖风景如画，文化底蕴深厚。",
        features: ["世界遗产", "西湖十景", "爱情传说", "诗词文化", "龙井茶乡", "园林艺术"],
        area: "6.39平方公里",
        type: "文化湖泊",
        bestSeason: "春秋季"
    },
    {
    id: 13,
    name: "东海",
    location: "中国东部沿海",
    images: [
        "images/donghai/1.jpg",
        "images/donghai/2.jpg",
        "images/donghai/3.jpg",
        "images/donghai/4.jpg"
    ],
    description: "中国三大边缘海之一，连接长江三角洲与太平洋的重要海域。东海渔业资源丰富，海上丝绸之路的重要通道。",
    features: ["舟山群岛", "海洋渔场", "海上贸易", "岛屿风光", "海洋生态", "港口枢纽"],
    area: "77万平方公里",
    type: "边缘海",
    bestSeason: "春夏秋季"
},
{
    id: 14,
    name: "渤海",
    location: "中国北部沿海",
    images: [
        "images/bohai/1.jpg",
        "images/bohai/2.jpg",
        "images/bohai/3.jpg",
        "images/bohai/4.jpg"
    ],
    description: "中国唯一的内海，三面环陆，被誉为'北方的明珠'。渤海湾沿岸经济发达，是环渤海经济圈的核心区域。",
    features: ["内海特色", "渤海湾", "石油资源", "港口群", "海洋牧场", "候鸟栖息地"],
    area: "7.7万平方公里",
    type: "内海",
    bestSeason: "夏秋季"
}
];
// 未找到景点留言板块
function createNotFoundSection() {
    // 先检查是否已经存在，避免重复添加
    if (document.querySelector('.not-found-section')) {
        return;
    }

    const notFoundHTML = `
        <div class="not-found-section" style="
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 60px 20px;
            text-align: center;
            color: white;
            margin: 40px auto;
            border-radius: 20px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            max-width: 1200px;
            width: 90%;
        ">
            <div class="not-found-content" style="max-width: 600px; margin: 0 auto;">
                <div class="not-found-icon" style="font-size: 64px; margin-bottom: 20px;">🌊</div>
                <h2 style="font-size: 2rem; margin-bottom: 16px; font-weight: 600;">
                    没找到心仪的江河景点？
                </h2>
                <p style="font-size: 1.1rem; margin-bottom: 30px; line-height: 1.6; opacity: 0.9;">
                    告诉我们您想了解的江河美景，我们会尽快补充相关内容。<br>
                    您的建议将帮助我们完善山河知识库！
                </p>
                <button id="goToMessageBtn" style="
                    background: rgba(255,255,255,0.2);
                    border: 2px solid white;
                    color: white;
                    padding: 12px 32px;
                    font-size: 1.1rem;
                    border-radius: 50px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    backdrop-filter: blur(10px);
                " onmouseover="this.style.background='rgba(255,255,255,0.3)'; this.style.transform='translateY(-2px)';" 
                   onmouseout="this.style.background='rgba(255,255,255,0.2)'; this.style.transform='translateY(0)';">
                    📝 去留言板块
                </button>
            </div>
        </div>
    `;
    
    // 尝试多种插入位置
    const possibleContainers = [
        document.querySelector('.mountains-container'),
        document.querySelector('.panorama-gallery'),
        document.querySelector('.gallery-container'),
        document.querySelector('#mountainsGallery'),
        document.querySelector('.container'),
        document.querySelector('main'),
        document.querySelector('#app')
    ];
    
    let container = null;
    for (const possibleContainer of possibleContainers) {
        if (possibleContainer) {
            container = possibleContainer;
            break;
        }
    }
    
    // 如果找不到合适的容器，就插入到body末尾
    if (container) {
        container.insertAdjacentHTML('afterend', notFoundHTML);
    } else {
        document.body.insertAdjacentHTML('beforeend', notFoundHTML);
    }
    
    // 绑定按钮事件
    setTimeout(() => {
        const messageBtn = document.getElementById('goToMessageBtn');
        if (messageBtn) {
            messageBtn.addEventListener('click', goToMessageSection);
        }
    }, 100);
}

// 跳转到留言板块
function goToMessageSection() {
    // 方法1: 通过导航链接跳转
    const messageLinks = document.querySelectorAll('a[href*="message"], a[href*="contact"], a[href*="留言"], a[href*="联系"]');
    if (messageLinks.length > 0) {
        messageLinks[0].click();
        return;
    }
    
    // 方法2: 通过导航文本跳转
    const navItems = document.querySelectorAll('nav a, .nav a, .navbar a, .menu a');
    for (let item of navItems) {
        if (item.textContent.includes('留言') || 
            item.textContent.includes('联系') || 
            item.textContent.includes('Contact') || 
            item.textContent.includes('Message')) {
            item.click();
            return;
        }
    }
    
    // 方法3: 通过ID或class跳转
    const messageSections = [
        document.getElementById('message'),
        document.getElementById('contact'),
        document.getElementById('messages'),
        document.getElementById('feedback'),
        document.querySelector('.message-section'),
        document.querySelector('.contact-section'),
        document.querySelector('.feedback-section')
    ];
    
    for (let section of messageSections) {
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
            return;
        }
    }
    
    // 方法4: 如果以上都找不到，显示提示
    alert('请在网站导航中找到"留言"或"联系我们"板块进行留言。');
}

// 初始化留言板块
function initNotFoundSection() {
    // 等待页面加载完成
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(() => {
                createNotFoundSection();
            }, 1000);
        });
    } else {
        setTimeout(() => {
            createNotFoundSection();
        }, 1000);
    }
}

// 手动测试函数
function testNotFoundSection() {
    createNotFoundSection();
    console.log('测试留言板块 - 应该可以看到"没找到心仪的山川景点？"的板块');
}

// 自动初始化
initNotFoundSection();

// 导出函数供其他脚本使用
window.goToMessageSection = goToMessageSection;
window.testNotFoundSection = testNotFoundSection;

console.log('名山数据加载完成，留言板块功能已就绪');
// 轮播状态
let carouselState = {
    currentRiverIndex: 0,
    currentImageIndex: 0,
    isPlaying: true,
    intervalId: null,
    intervalTime: 3000 // 3秒切换一张照片
};

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initRiversGrid();
    initDetailShowcase();
    
    // 导航栏滚动效果
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if(window.scrollY > 50) {
            header.style.background = 'rgba(10, 25, 47, 0.95)';
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.background = 'rgba(10, 25, 47, 0.9)';
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        }
    });
});

// 初始化水域网格
function initRiversGrid() {
    const gridContainer = document.getElementById('riversGrid');
    gridContainer.innerHTML = ''; // 清空容器
    
    riversData.forEach(river => {
        const card = createRiverCard(river);
        gridContainer.appendChild(card);
    });
}

// 创建水域卡片 - 使用第一张图片作为卡片背景
function createRiverCard(river) {
    const card = document.createElement('div');
    card.className = 'river-card';
    card.setAttribute('data-id', river.id);
    
    // 使用第一张图片作为卡片背景
    const firstImage = river.images[0];
    
    card.innerHTML = `
        <div class="river-bg" style="background-image: url('${firstImage}')"></div>
        <div class="river-name">${river.name}</div>
    `;
    
    // 添加鼠标悬停事件
    let hoverTimer;
    
    card.addEventListener('mouseenter', function() {
        clearTimeout(hoverTimer);
        
        // 翻转动画完成后显示详情
        hoverTimer = setTimeout(() => {
            const riverIndex = riversData.findIndex(r => r.id === river.id);
            showRiverDetail(riverIndex);
        }, 700);
    });
    
    card.addEventListener('mouseleave', function() {
        clearTimeout(hoverTimer);
    });
    
    return card;
}

// 初始化详情展示区域
function initDetailShowcase() {
    // 创建详情展示HTML结构
    const detailShowcase = document.createElement('div');
    detailShowcase.className = 'detail-showcase';
    detailShowcase.innerHTML = `
        <div class="detail-image-container">
            <div class="detail-image" id="detailImage"></div>
        </div>
        <div class="detail-text-container">
            <h2 class="detail-title" id="detailTitle">水域名称</h2>
            <div class="detail-info">
                <div class="detail-info-item">
                    <span class="label">位置</span>
                    <span class="value" id="detailLocation">---</span>
                </div>
                <div class="detail-info-item">
                    <span class="label">${riversData[0]?.length ? '长度' : '面积'}</span>
                    <span class="value" id="detailSize">---</span>
                </div>
                <div class="detail-info-item">
                    <span class="label">类型</span>
                    <span class="value" id="detailType">---</span>
                </div>
                <div class="detail-info-item">
                    <span class="label">最佳季节</span>
                    <span class="value" id="detailSeason">---</span>
                </div>
            </div>
            <p class="detail-description" id="detailDescription">这里是水域的详细描述...</p>
            <div class="detail-features" id="detailFeatures">
                <!-- 特色标签将动态生成 -->
            </div>
        </div>
        <button class="close-btn">&times;</button>
    `;
    
    // 创建遮罩层
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    
    // 添加到页面
    document.body.appendChild(detailShowcase);
    document.body.appendChild(overlay);
    
    // 添加关闭事件
    const closeBtn = detailShowcase.querySelector('.close-btn');
    closeBtn.addEventListener('click', closeDetailShowcase);
    overlay.addEventListener('click', closeDetailShowcase);
    
    // ESC键关闭
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeDetailShowcase();
        }
    });
}

// 显示水域详细信息
function showRiverDetail(riverIndex) {
    carouselState.currentRiverIndex = riverIndex;
    carouselState.currentImageIndex = 0;
    
    const detailShowcase = document.querySelector('.detail-showcase');
    const overlay = document.querySelector('.overlay');
    
    // 更新内容
    updateRiverContent();
    
    // 显示详情展示
    detailShowcase.classList.add('active');
    overlay.classList.add('active');
    
    // 开始自动轮播
    startAutoPlay();
    
    // 禁止背景滚动
    document.body.style.overflow = 'hidden';
}

// 更新水域内容
function updateRiverContent() {
    const river = riversData[carouselState.currentRiverIndex];
    const currentImage = river.images[carouselState.currentImageIndex];
    const detailImage = document.getElementById('detailImage');
    const detailTitle = document.getElementById('detailTitle');
    const detailLocation = document.getElementById('detailLocation');
    const detailSize = document.getElementById('detailSize');
    const detailType = document.getElementById('detailType');
    const detailSeason = document.getElementById('detailSeason');
    const detailDescription = document.getElementById('detailDescription');
    const detailFeatures = document.getElementById('detailFeatures');
    
    // 添加淡出效果
    detailImage.classList.add('fade-out');
    
    setTimeout(() => {
        // 更新图片
        detailImage.style.backgroundImage = `url('${currentImage}')`;
        
        // 更新文字内容（只在第一次显示时更新）
        if (carouselState.currentImageIndex === 0) {
            detailTitle.textContent = river.name;
            detailLocation.textContent = river.location;
            detailSize.textContent = river.length || river.area;
            detailType.textContent = river.type;
            detailSeason.textContent = river.bestSeason || '四季皆宜';
            detailDescription.textContent = river.description;
            
            // 更新特色标签
            detailFeatures.innerHTML = river.features.map(feature => 
                `<span class="detail-feature">${feature}</span>`
            ).join('');
        }
        
        // 添加淡入效果
        detailImage.classList.remove('fade-out');
        detailImage.classList.add('fade-in');
        
        setTimeout(() => {
            detailImage.classList.remove('fade-in');
        }, 800);
    }, 400);
}

// 切换到下一张图片
function showNextImage() {
    const river = riversData[carouselState.currentRiverIndex];
    carouselState.currentImageIndex = (carouselState.currentImageIndex + 1) % river.images.length;
    updateRiverContent();
}

// 开始自动轮播
function startAutoPlay() {
    stopAutoPlay();
    
    if (carouselState.isPlaying) {
        carouselState.intervalId = setInterval(() => {
            showNextImage();
        }, carouselState.intervalTime);
    }
}

// 停止自动轮播
function stopAutoPlay() {
    if (carouselState.intervalId) {
        clearInterval(carouselState.intervalId);
        carouselState.intervalId = null;
    }
}

// 关闭详情展示
function closeDetailShowcase() {
    const detailShowcase = document.querySelector('.detail-showcase');
    const overlay = document.querySelector('.overlay');
    
    detailShowcase.classList.remove('active');
    overlay.classList.remove('active');
    
    // 停止自动轮播
    stopAutoPlay();
    
    // 恢复背景滚动
    document.body.style.overflow = 'auto';
}