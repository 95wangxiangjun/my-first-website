// 搜索功能
function initRegionsSearch() {
    const searchInput = document.getElementById('regionsSearch');
    const searchResults = document.getElementById('regionsResults');
    const regionsGrid = document.getElementById('regionsGrid');
    
    if (!searchInput || !regionsGrid) {
        console.log('搜索元素未找到，等待重新初始化...');
        setTimeout(initRegionsSearch, 100);
        return;
    }
    
    // 创建无结果提示
    const noResults = document.createElement('div');
    noResults.className = 'no-results';
    noResults.textContent = '未找到匹配的区域';
    noResults.style.display = 'none';
    regionsGrid.parentNode.appendChild(noResults);

    // 保存原始内容
    const originalContents = {};
    
    // 初始化原始内容
    function initOriginalContents() {
        const cards = document.querySelectorAll('.region-card');
        console.log('初始化区域卡片数量:', cards.length);
        
        cards.forEach((card, index) => {
            const nameElement = card.querySelector('.region-name');
            if (nameElement) {
                originalContents[index] = nameElement.innerHTML;
            }
        });
    }

    // 高亮文本函数
    function highlightText(text, searchTerm) {
        if (!searchTerm) return text;
        const regex = new RegExp(searchTerm, 'gi');
        return text.replace(regex, match => `<span class="highlight">${match}</span>`);
    }

    // 执行搜索
    // 执行搜索
function performSearch(searchTerm) {
    searchTerm = searchTerm.toLowerCase().trim();
    let matchCount = 0;
    
    // 重置所有内容
    resetAllContent();
    
    if (!searchTerm) {
        searchResults.textContent = '';
        noResults.style.display = 'none';
        return;
    }

    // 搜索区域
    const cards = document.querySelectorAll('.region-card');
    
    cards.forEach((card, index) => {
        const region = regionsData[index];
        if (!region) return;

        const nameElement = card.querySelector('.region-name');
        if (!nameElement) return;

        // 检查是否匹配 - 使用区域数据实际存在的字段
        const matches = region.name.toLowerCase().includes(searchTerm) ||
                       region.location.toLowerCase().includes(searchTerm) ||
                       region.description.toLowerCase().includes(searchTerm) ||
                       (region.features && region.features.some(feature => feature.toLowerCase().includes(searchTerm))) ||
                       region.climate.toLowerCase().includes(searchTerm) ||  // ✅ 改为 climate
                       region.culture.toLowerCase().includes(searchTerm);    // ✅ 改为 culture

        if (matches) {
            card.style.display = 'block';
            card.style.opacity = '1';
            
            // 高亮匹配文本
            nameElement.innerHTML = highlightText(region.name, searchTerm);
            
            matchCount++;
        } else {
            card.style.display = 'none';
        }
    });

    // 显示搜索结果
    if (matchCount > 0) {
        searchResults.textContent = `找到 ${matchCount} 个匹配的区域`;
        noResults.style.display = 'none';
        
        // 滚动到第一个匹配项
        scrollToFirstMatch();
    } else {
        searchResults.textContent = '';
        noResults.style.display = 'block';
    }
}

    // 重置所有内容
    function resetAllContent() {
        const cards = document.querySelectorAll('.region-card');
        cards.forEach((card, index) => {
            card.style.display = 'block';
            card.style.opacity = '1';
            
            const nameElement = card.querySelector('.region-name');
            if (nameElement && originalContents[index]) {
                nameElement.innerHTML = originalContents[index];
            }
        });
    }

    // 滚动到第一个匹配项
    function scrollToFirstMatch() {
        const firstMatch = document.querySelector('.region-card[style*="display: block"]');
        if (firstMatch) {
            firstMatch.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
        }
    }

    // 事件监听
    searchInput.addEventListener('input', function() {
        performSearch(this.value);
    });

    // 点击搜索图标也触发搜索
    const searchIcon = document.querySelector('.search-icon');
    if (searchIcon) {
        searchIcon.addEventListener('click', function() {
            performSearch(searchInput.value);
        });
    }

    // 初始化原始内容 - 等待卡片生成完成
    setTimeout(() => {
        initOriginalContents();
        console.log('区域搜索功能初始化完成');
    }, 500);
}
// 区域特色数据 - 12个区域，每个包含多张照片
const regionsData = [
    {
        id: 1,
        name: "北国风光",
        location: "东北、华北地区",
        images: [
            "images/beiguofengguang/1.jpg",
            "images/beiguofengguang/2.jpg",
            "images/beiguofengguang/3.jpg",
            "images/beiguofengguang/4.jpg"
        ],
        description: "冰雪世界，林海雪原，冬季银装素裹，展现北国特有的雄浑壮美。这里有壮观的冰雕雪景，茂密的原始森林，独特的北方民俗文化。",
        features: ["冰雪景观", "林海雪原", "冰雕文化", "北方民俗", "雾凇奇观", "雪乡风情"],
        climate: "温带季风气候",
        culture: "东北文化",
        bestSeason: "冬季"
    },
    {
        id: 2,
        name: "江南水乡",
        location: "长江三角洲地区",
        images: [
            "images/jiangnanshuixiang/1.jpg",
            "images/jiangnanshuixiang/2.jpg",
            "images/jiangnanshuixiang/3.jpg",
            "images/jiangnanshuixiang/4.jpg"
        ],
        description: "小桥流水，古镇园林，温婉秀丽的江南文化和精致典雅的水乡风情。这里有着深厚的文化底蕴和独特的水乡建筑风格。",
        features: ["小桥流水", "古镇园林", "吴越文化", "丝绸之乡", "茶文化", "古镇风情"],
        climate: "亚热带季风气候",
        culture: "江南文化",
        bestSeason: "春季"
    },
    {
        id: 3,
        name: "西部高原",
        location: "青藏高原地区",
        images: [
            "images/xibugaoyuan/1.jpg",
            "images/xibugaoyuan/2.jpg",
            "images/xibugaoyuan/3.jpg",
            "images/xibugaoyuan/4.jpg"
        ],
        description: "壮丽的高原风光，独特的民族文化，神秘的宗教氛围。这里有世界屋脊的雄伟，藏族文化的深邃，高原湖泊的纯净。",
        features: ["高原湖泊", "藏族文化", "雪山冰川", "宗教圣地", "草原牧场", "牦牛文化"],
        climate: "高原气候",
        culture: "藏族文化",
        bestSeason: "5-10月"
    },
    {
        id: 4,
        name: "西南秘境",
        location: "云贵高原地区",
        images: [
            "images/xinanmijing/1.jpg",
            "images/xinanmijing/2.jpg",
            "images/xinanmijing/3.jpg",
            "images/xinanmijing/4.jpg"
        ],
        description: "喀斯特地貌，少数民族风情，热带雨林景观。这里有独特的溶洞奇观，多彩的民族节日，丰富的生物多样性。",
        features: ["喀斯特地貌", "少数民族", "热带雨林", "梯田景观", "溶洞奇观", "民族节日"],
        climate: "亚热带高原气候",
        culture: "多民族文化",
        bestSeason: "春秋季"
    },
    {
        id: 5,
        name: "西北大漠",
        location: "新疆、甘肃地区",
        images: [
            "images/xibeidamo/1.jpg",
            "images/xibeidamo/2.jpg",
            "images/xibeidamo/3.jpg",
            "images/xibeidamo/4.jpg"
        ],
        description: "浩瀚沙漠，丝绸之路，多元民族文化。这里有壮观的沙漠风光，古老的丝绸之路遗迹，浓郁的伊斯兰文化。",
        features: ["沙漠风光", "丝绸之路", "伊斯兰文化", "绿洲农业", "雅丹地貌", "古城遗址"],
        climate: "温带大陆性气候",
        culture: "伊斯兰文化",
        bestSeason: "春秋季"
    },
    {
        id: 6,
        name: "中原文化",
        location: "黄河中下游地区",
        images: [
            "images/zhongyuanwenhua/1.jpg",
            "images/zhongyuanwenhua/2.jpg",
            "images/zhongyuanwenhua/3.jpg",
            "images/zhongyuanwenhua/4.jpg"
        ],
        description: "中华文明发源地，古都文化，黄河风情。这里有丰富的历史遗迹，深厚的文化底蕴，独特的黄河景观。",
        features: ["古都文化", "黄河风情", "历史遗迹", "农耕文明", "武术文化", "民俗艺术"],
        climate: "温带季风气候",
        culture: "中原文化",
        bestSeason: "春秋季"
    },
    {
        id: 7,
        name: "岭南风情",
        location: "广东、广西地区",
        images: [
            "images/lingnanfengqing/1.jpg",
            "images/lingnanfengqing/2.jpg",
            "images/lingnanfengqing/3.jpg",
            "images/lingnanfengqing/4.jpg"
        ],
        description: "热带风光，岭南文化，侨乡风情。这里有独特的岭南建筑，丰富的热带水果，浓郁的侨乡文化。",
        features: ["热带风光", "岭南建筑", "侨乡文化", "粤菜美食", "龙舟文化", "功夫茶艺"],
        climate: "热带季风气候",
        culture: "岭南文化",
        bestSeason: "10-4月"
    },
    {
        id: 8,
        name: "滨海风光",
        location: "东南沿海地区",
        images: [
            "images/binhaifengguang/1.jpg",
            "images/binhaifengguang/2.jpg",
            "images/binhaifengguang/3.jpg",
            "images/binhaifengguang/4.jpg"
        ],
        description: "碧海蓝天，海岛风光，海洋文化。这里有美丽的海滩，丰富的海洋资源，独特的海岛民俗。",
        features: ["海岛风光", "海洋文化", "沙滩度假", "海鲜美食", "渔村风情", "海上运动"],
        climate: "海洋性气候",
        culture: "海洋文化",
        bestSeason: "4-10月"
    },
    {
        id: 9,
        name: "草原牧歌",
        location: "内蒙古草原地区",
        images: [
            "images/caoyuanmuge/1.jpg",
            "images/caoyuanmuge/2.jpg",
            "images/caoyuanmuge/3.jpg",
            "images/caoyuanmuge/4.jpg"
        ],
        description: "辽阔草原，蒙古文化，游牧生活。这里有壮观的草原风光，独特的蒙古包，豪放的蒙古族文化。",
        features: ["草原风光", "蒙古文化", "游牧生活", "那达慕大会", "马背文化", "奶制品"],
        climate: "温带草原气候",
        culture: "蒙古文化",
        bestSeason: "6-9月"
    },
    {
        id: 10,
        name: "巴蜀文化",
        location: "四川盆地地区",
        images: [
            "images/bashuwenhua/1.jpg",
            "images/bashuwenhua/2.jpg",
            "images/bashuwenhua/3.jpg",
            "images/bashuwenhua/4.jpg"
        ],
        description: "天府之国，美食文化，悠闲生活。这里有丰富的川菜美食，独特的茶馆文化，悠闲的生活方式。",
        features: ["川菜美食", "茶馆文化", "熊猫故乡", "三国文化", "古镇风情", "蜀绣艺术"],
        climate: "亚热带季风气候",
        culture: "巴蜀文化",
        bestSeason: "春秋季"
    },
    {
        id: 11,
        name: "黄土高原",
        location: "陕西、山西地区",
        images: [
            "images/huangtugaoyuan/1.jpg",
            "images/huangtugaoyuan/2.jpg",
            "images/huangtugaoyuan/3.jpg",
            "images/huangtugaoyuan/4.jpg"
        ],
        description: "黄土沟壑，窑洞民居，革命圣地。这里有独特的黄土地貌，传统的窑洞建筑，丰富的革命历史遗迹。",
        features: ["黄土沟壑", "窑洞民居", "革命圣地", "民间艺术", "面食文化", "剪纸艺术"],
        climate: "温带大陆性气候",
        culture: "黄土文化",
        bestSeason: "4-10月"
    },
    {
        id: 12,
        name: "热带雨林",
        location: "海南、西双版纳地区",
        images: [
            "images/redaiyulin/1.jpg",
            "images/redaiyulin/2.jpg",
            "images/redaiyulin/3.jpg",
            "images/redaiyulin/4.jpg"
        ],
        description: "热带雨林，生物多样性，少数民族文化。这里有丰富的热带植物，多样的野生动物，独特的少数民族风情。",
        features: ["热带雨林", "生物多样性", "少数民族", "热带水果", "雨林探险", "温泉度假"],
        climate: "热带雨林气候",
        culture: "少数民族文化",
        bestSeason: "11-4月"
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
                <div class="not-found-icon" style="font-size: 64px; margin-bottom: 20px;">🗺️</div>
                <h2 style="font-size: 2rem; margin-bottom: 16px; font-weight: 600;">
                    没找到心仪的区域景点？
                </h2>
                <p style="font-size: 1.1rem; margin-bottom: 30px; line-height: 1.6; opacity: 0.9;">
                    告诉我们您想了解的区域美景，我们会尽快补充相关内容。<br>
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
    currentRegionIndex: 0,
    currentImageIndex: 0,
    isPlaying: true,
    intervalId: null,
    intervalTime: 3000 // 3秒切换一张照片
};

// 修正初始化函数名
document.addEventListener('DOMContentLoaded', function() {
    console.log('开始初始化区域页面...');
    
    // 先初始化网格 - 确保函数名正确
    initRegionsGrid();  // 注意大小写
    
    // 然后初始化详情展示
    initDetailShowcase();
    
    // 最后初始化搜索功能
    setTimeout(() => {
        initRegionsSearch();
    }, 300);
    
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

// 初始化区域网格
function initRegionsGrid() {
    const gridContainer = document.getElementById('regionsGrid');
    gridContainer.innerHTML = ''; // 清空容器
    
    regionsData.forEach(region => {
        const card = createRegionCard(region);
        gridContainer.appendChild(card);
    });
}

// 创建区域卡片 - 使用第一张图片作为卡片背景
function createRegionCard(region) {
    const card = document.createElement('div');
    card.className = 'region-card';
    card.setAttribute('data-id', region.id);
    
    // 使用第一张图片作为卡片背景
    const firstImage = region.images[0];
    
    card.innerHTML = `
        <div class="region-bg" style="background-image: url('${firstImage}')"></div>
        <div class="region-name">${region.name}</div>
    `;
    
    // 添加鼠标悬停事件
    let hoverTimer;
    
    card.addEventListener('mouseenter', function() {
        clearTimeout(hoverTimer);
        
        // 翻转动画完成后显示详情
        hoverTimer = setTimeout(() => {
            const regionIndex = regionsData.findIndex(r => r.id === region.id);
            showRegionDetail(regionIndex);
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
            <h2 class="detail-title" id="detailTitle">区域名称</h2>
            <div class="detail-info">
                <div class="detail-info-item">
                    <span class="label">位置</span>
                    <span class="value" id="detailLocation">---</span>
                </div>
                <div class="detail-info-item">
                    <span class="label">气候</span>
                    <span class="value" id="detailClimate">---</span>
                </div>
                <div class="detail-info-item">
                    <span class="label">文化</span>
                    <span class="value" id="detailCulture">---</span>
                </div>
                <div class="detail-info-item">
                    <span class="label">最佳季节</span>
                    <span class="value" id="detailSeason">---</span>
                </div>
            </div>
            <p class="detail-description" id="detailDescription">这里是区域的详细描述...</p>
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

// 显示区域详细信息
function showRegionDetail(regionIndex) {
    carouselState.currentRegionIndex = regionIndex;
    carouselState.currentImageIndex = 0;
    
    const detailShowcase = document.querySelector('.detail-showcase');
    const overlay = document.querySelector('.overlay');
    
    // 更新内容
    updateRegionContent();
    
    // 显示详情展示
    detailShowcase.classList.add('active');
    overlay.classList.add('active');
    
    // 开始自动轮播
    startAutoPlay();
    
    // 禁止背景滚动
    document.body.style.overflow = 'hidden';
}

// 更新区域内容
function updateRegionContent() {
    const region = regionsData[carouselState.currentRegionIndex];
    const currentImage = region.images[carouselState.currentImageIndex];
    const detailImage = document.getElementById('detailImage');
    const detailTitle = document.getElementById('detailTitle');
    const detailLocation = document.getElementById('detailLocation');
    const detailClimate = document.getElementById('detailClimate');
    const detailCulture = document.getElementById('detailCulture');
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
            detailTitle.textContent = region.name;
            detailLocation.textContent = region.location;
            detailClimate.textContent = region.climate;
            detailCulture.textContent = region.culture;
            detailSeason.textContent = region.bestSeason || '四季皆宜';
            detailDescription.textContent = region.description;
            
            // 更新特色标签
            detailFeatures.innerHTML = region.features.map(feature => 
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
    const region = regionsData[carouselState.currentRegionIndex];
    carouselState.currentImageIndex = (carouselState.currentImageIndex + 1) % region.images.length;
    updateRegionContent();
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