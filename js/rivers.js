
function initRiversSearch() {
    const searchInput = document.getElementById('riversSearch');
    const searchResults = document.getElementById('riversResults');
    const riversGrid = document.getElementById('riversGrid');
    
    if (!searchInput || !riversGrid) {
        console.log('搜索元素未找到，等待重新初始化...');
        setTimeout(initRiversSearch, 100);
        return;
    }
    
    
    const noResults = document.createElement('div');
    noResults.className = 'no-results';
    noResults.textContent = '未找到匹配的水域';
    noResults.style.display = 'none';
    riversGrid.parentNode.appendChild(noResults);

    
    const originalContents = {};
    
    
    function initOriginalContents() {
        const cards = document.querySelectorAll('.river-card');
        console.log('初始化水域卡片数量:', cards.length);
        
        cards.forEach((card, index) => {
            const nameElement = card.querySelector('.river-name');
            if (nameElement) {
                originalContents[index] = nameElement.innerHTML;
            }
        });
    }

    
    function highlightText(text, searchTerm) {
        if (!searchTerm) return text;
        const regex = new RegExp(searchTerm, 'gi');
        return text.replace(regex, match => `<span class="highlight">${match}</span>`);
    }

    
    function performSearch(searchTerm) {
        searchTerm = searchTerm.toLowerCase().trim();
        let matchCount = 0;
        
        
        resetAllContent();
        
        if (!searchTerm) {
            searchResults.textContent = '';
            noResults.style.display = 'none';
            return;
        }

        
        const cards = document.querySelectorAll('.river-card');
        
        cards.forEach((card, index) => {
            const river = riversData[index];
            if (!river) return;

            const nameElement = card.querySelector('.river-name');
            if (!nameElement) return;

            
            const matches = river.name.toLowerCase().includes(searchTerm) ||
                           river.location.toLowerCase().includes(searchTerm) ||
                           river.description.toLowerCase().includes(searchTerm) ||
                           (river.features && river.features.some(feature => feature.toLowerCase().includes(searchTerm))) ||
                           river.type.toLowerCase().includes(searchTerm);

            if (matches) {
                card.style.display = 'block';
                card.style.opacity = '1';
                
                
                nameElement.innerHTML = highlightText(river.name, searchTerm);
                
                matchCount++;
            } else {
                card.style.display = 'none';
            }
        });

        
        if (matchCount > 0) {
            searchResults.textContent = `找到 ${matchCount} 个匹配的水域`;
            noResults.style.display = 'none';
            
            
            scrollToFirstMatch();
        } else {
            searchResults.textContent = '';
            noResults.style.display = 'block';
        }
    }

    
    function resetAllContent() {
        const cards = document.querySelectorAll('.river-card');
        cards.forEach((card, index) => {
            card.style.display = 'block';
            card.style.opacity = '1';
            
            const nameElement = card.querySelector('.river-name');
            if (nameElement && originalContents[index]) {
                nameElement.innerHTML = originalContents[index];
            }
        });
    }

    
    function scrollToFirstMatch() {
        const firstMatch = document.querySelector('.river-card[style*="display: block"]');
        if (firstMatch) {
            firstMatch.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
        }
    }

    
    searchInput.addEventListener('input', function() {
        performSearch(this.value);
    });

    
    const searchIcon = document.querySelector('.search-icon');
    if (searchIcon) {
        searchIcon.addEventListener('click', function() {
            performSearch(searchInput.value);
        });
    }

    
    setTimeout(() => {
        initOriginalContents();
        console.log('水域搜索功能初始化完成');
    }, 500);
}

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

function createNotFoundSection() {
    
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
    
    
    if (container) {
        container.insertAdjacentHTML('afterend', notFoundHTML);
    } else {
        document.body.insertAdjacentHTML('beforeend', notFoundHTML);
    }
    
    
    setTimeout(() => {
        const messageBtn = document.getElementById('goToMessageBtn');
        if (messageBtn) {
            messageBtn.addEventListener('click', goToMessageSection);
        }
    }, 100);
}


function goToMessageSection() {
    
    const messageLinks = document.querySelectorAll('a[href*="message"], a[href*="contact"], a[href*="留言"], a[href*="联系"]');
    if (messageLinks.length > 0) {
        messageLinks[0].click();
        return;
    }
    
    
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
    
    
    alert('请在网站导航中找到"留言"或"联系我们"板块进行留言。');
}


function initNotFoundSection() {
    
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


function testNotFoundSection() {
    createNotFoundSection();
    console.log('测试留言板块 - 应该可以看到"没找到心仪的山川景点？"的板块');
}


initNotFoundSection();


window.goToMessageSection = goToMessageSection;
window.testNotFoundSection = testNotFoundSection;

console.log('名山数据加载完成，留言板块功能已就绪');

let carouselState = {
    currentRiverIndex: 0,
    currentImageIndex: 0,
    isPlaying: true,
    intervalId: null,
    intervalTime: 3000 
};


document.addEventListener('DOMContentLoaded', function() {
    console.log('开始初始化水域页面...');
    
    
    initRiversGrid();
    
    
    initDetailShowcase();
    
    
    setTimeout(() => {
        initRiversSearch();
    }, 300);
    
    
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


function initRiversGrid() {
    const gridContainer = document.getElementById('riversGrid');
    gridContainer.innerHTML = ''; 
    
    riversData.forEach(river => {
        const card = createRiverCard(river);
        gridContainer.appendChild(card);
    });
}


function createRiverCard(river) {
    const card = document.createElement('div');
    card.className = 'river-card';
    card.setAttribute('data-id', river.id);
    
    
    const firstImage = river.images[0];
    
    card.innerHTML = `
        <div class="river-bg" style="background-image: url('${firstImage}')"></div>
        <div class="river-name">${river.name}</div>
    `;
    
    
    let hoverTimer;
    
    card.addEventListener('mouseenter', function() {
        clearTimeout(hoverTimer);
        
        
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


function initDetailShowcase() {
    
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
                
            </div>
        </div>
        <button class="close-btn">&times;</button>
    `;
    
    
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    
    
    document.body.appendChild(detailShowcase);
    document.body.appendChild(overlay);
    
    
    const closeBtn = detailShowcase.querySelector('.close-btn');
    closeBtn.addEventListener('click', closeDetailShowcase);
    overlay.addEventListener('click', closeDetailShowcase);
    
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeDetailShowcase();
        }
    });
}


function showRiverDetail(riverIndex) {
    carouselState.currentRiverIndex = riverIndex;
    carouselState.currentImageIndex = 0;
    
    const detailShowcase = document.querySelector('.detail-showcase');
    const overlay = document.querySelector('.overlay');
    
    
    updateRiverContent();
    
    
    detailShowcase.classList.add('active');
    overlay.classList.add('active');
    
    
    startAutoPlay();
    
    
    document.body.style.overflow = 'hidden';
}


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
    
    
    detailImage.classList.add('fade-out');
    
    setTimeout(() => {
        
        detailImage.style.backgroundImage = `url('${currentImage}')`;
        
        
        if (carouselState.currentImageIndex === 0) {
            detailTitle.textContent = river.name;
            detailLocation.textContent = river.location;
            detailSize.textContent = river.length || river.area;
            detailType.textContent = river.type;
            detailSeason.textContent = river.bestSeason || '四季皆宜';
            detailDescription.textContent = river.description;
            
            
            detailFeatures.innerHTML = river.features.map(feature => 
                `<span class="detail-feature">${feature}</span>`
            ).join('');
        }
        
        
        detailImage.classList.remove('fade-out');
        detailImage.classList.add('fade-in');
        
        setTimeout(() => {
            detailImage.classList.remove('fade-in');
        }, 800);
    }, 400);
}


function showNextImage() {
    const river = riversData[carouselState.currentRiverIndex];
    carouselState.currentImageIndex = (carouselState.currentImageIndex + 1) % river.images.length;
    updateRiverContent();
}


function startAutoPlay() {
    stopAutoPlay();
    
    if (carouselState.isPlaying) {
        carouselState.intervalId = setInterval(() => {
            showNextImage();
        }, carouselState.intervalTime);
    }
}


function stopAutoPlay() {
    if (carouselState.intervalId) {
        clearInterval(carouselState.intervalId);
        carouselState.intervalId = null;
    }
}


function closeDetailShowcase() {
    const detailShowcase = document.querySelector('.detail-showcase');
    const overlay = document.querySelector('.overlay');
    
    detailShowcase.classList.remove('active');
    overlay.classList.remove('active');
    
    
    stopAutoPlay();
    
    
    document.body.style.overflow = 'auto';
}