

function initMountainsSearch() {
    const searchInput = document.getElementById('mountainsSearch');
    const searchResults = document.getElementById('mountainsResults');
    const mountainsGrid = document.getElementById('mountainsGrid');
    const noResults = document.createElement('div');
    noResults.className = 'no-results';
    noResults.textContent = '未找到匹配的名山';
    noResults.style.display = 'none';
    mountainsGrid.parentNode.appendChild(noResults);

    const originalContents = {};    
    function initOriginalContents() {
        const cards = document.querySelectorAll('.mountain-card');
        cards.forEach((card, index) => {
            const nameElement = card.querySelector('.mountain-name');
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
        
        const cards = document.querySelectorAll('.mountain-card');
        cards.forEach((card, index) => {
            const mountain = mountainsData[index];
            if (!mountain) return;

            const nameElement = card.querySelector('.mountain-name');
            if (!nameElement) return;
          
            const matches = mountain.name.toLowerCase().includes(searchTerm) ||
                           mountain.location.toLowerCase().includes(searchTerm) ||
                           mountain.description.toLowerCase().includes(searchTerm) ||
                           mountain.features.some(feature => feature.toLowerCase().includes(searchTerm)) ||
                           mountain.type.toLowerCase().includes(searchTerm);

            if (matches) {
                card.style.display = 'block';
                card.style.opacity = '1';
                
                
                nameElement.innerHTML = highlightText(mountain.name, searchTerm);
                
                matchCount++;
            } else {
                card.style.display = 'none';
            }
        });
 
        if (matchCount > 0) {
            searchResults.textContent = `找到 ${matchCount} 个匹配的名山`;
            noResults.style.display = 'none';
            
            
            scrollToFirstMatch();
        } else {
            searchResults.textContent = '';
            noResults.style.display = 'block';
        }
    }
    
    function resetAllContent() {
        const cards = document.querySelectorAll('.mountain-card');
        cards.forEach((card, index) => {
            card.style.display = 'block';
            card.style.opacity = '1';
            
            const nameElement = card.querySelector('.mountain-name');
            if (nameElement && originalContents[index]) {
                nameElement.innerHTML = originalContents[index];
            }
        });
    }
  
    function scrollToFirstMatch() {
        const firstMatch = document.querySelector('.mountain-card[style*="display: block"]');
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

    
    document.querySelector('.search-icon').addEventListener('click', function() {
        performSearch(searchInput.value);
    });

    setTimeout(initOriginalContents, 100);
}

document.addEventListener('DOMContentLoaded', function() {
    initMountainsGrid();
    initDetailShowcase();
    initMountainsSearch(); 
       
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
const mountainsData = [
    {
        id: 1,
        name: "黄山",
        location: "安徽黄山",
        images: [
            "images/huangshan/1.jpg",
            "images/huangshan/2.jpg", 
            "images/huangshan/3.jpg",
            "images/huangshan/4.jpg"
        ],
        description: "以奇松、怪石、云海、温泉四绝著称，是世界文化与自然双重遗产。黄山被誉为'天下第一奇山'，其独特的花岗岩峰林地貌和丰富的生物多样性令人叹为观止。",
        features: ["奇松", "怪石", "云海", "温泉", "冬雪", "日出"],
        altitude: "1864.8米",
        type: "花岗岩地貌",
        bestSeason: "春秋季"
    },
    {
        id: 2,
        name: "泰山",
        location: "山东泰安",
        images: [
            "images/taishan/1.jpg",
            "images/taishan/2.jpg",
            "images/taishan/3.jpg",
            "images/taishan/4.jpg"
        ],
        description: "五岳之首，古代帝王封禅之地，中华民族的精神象征。泰山雄伟壮观，有'会当凌绝顶，一览众山小'的壮美景色，是中华文化的重要发源地。",
        features: ["帝王封禅", "日出云海", "石刻文化", "十八盘", "南天门"],
        altitude: "1545米",
        type: "五岳之尊",
        bestSeason: "4-11月"
    },
    {
        id: 3,
        name: "华山",
        location: "陕西华阴",
        images: [
            "images/huashan/1.jpg",
            "images/huashan/2.jpg",
            "images/huashan/3.jpg",
            "images/huashan/4.jpg"
        ],
        description: "以险著称，有'奇险天下第一山'之说。华山五峰环抱，如一朵盛开的莲花，其长空栈道、鹞子翻身等险道令人叹为观止。",
        features: ["长空栈道", "鹞子翻身", "苍龙岭", "金锁关", "云梯"],
        altitude: "2154.9米",
        type: "花岗岩断块山",
        bestSeason: "4-10月"
    },
    {
        id: 4,
        name: "峨眉山",
        location: "四川乐山",
        images: [
            "images/emeishan/1.jpg",
            "images/emeishan/2.jpg",
            "images/emeishan/3.jpg",
            "images/emeishan/4.jpg"
        ],
        description: "中国四大佛教名山之一，普贤菩萨道场。峨眉山以秀丽的自然风光和悠久的佛教文化闻名，有'峨眉天下秀'之美誉。",
        features: ["金顶佛光", "云海日出", "猴群嬉戏", "万年寺", "清音阁"],
        altitude: "3099米",
        type: "佛教名山",
        bestSeason: "春秋季"
    },
    {
        id: 5,
        name: "庐山",
        location: "江西九江",
        images: [
            "images/lushan/1.jpg",
            "images/lushan/2.jpg",
            "images/lushan/3.jpg",
            "images/lushan/4.jpg"
        ],
        description: "以雄、奇、险、秀闻名于世，素有'匡庐奇秀甲天下'之誉。庐山是中国山水诗的摇篮，无数文人墨客在此留下传世佳作。",
        features: ["三叠泉瀑布", "含鄱口", "五老峰", "美庐别墅", "白鹿洞书院"],
        altitude: "1474米",
        type: "断块山",
        bestSeason: "夏季避暑"
    },
    {
        id: 6,
        name: "武夷山",
        location: "福建武夷山",
        images: [
            "images/wuyishan/1.jpg",
            "images/wuyishan/2.jpg",
            "images/wuyishan/3.jpg",
            "images/wuyishan/4.jpg"
        ],
        description: "典型的丹霞地貌，素有'奇秀甲东南'之称。武夷山是朱子理学的发源地，也是世界乌龙茶和红茶的发源地。",
        features: ["九曲溪", "天游峰", "大红袍", "武夷宫", "一线天"],
        altitude: "2158米",
        type: "丹霞地貌",
        bestSeason: "春秋季"
    },
    {
        id: 7,
        name: "张家界",
        location: "湖南张家界",
        images: [
            "images/zhangjiajie/1.jpg",
            "images/zhangjiajie/2.jpg",
            "images/zhangjiajie/3.jpg",
            "images/zhangjiajie/4.jpg"
        ],
        description: "以峰称奇、以谷显幽、以林见秀，有'三千奇峰，八百秀水'之美称。张家界是电影《阿凡达》取景地，世界自然遗产。",
        features: ["袁家界", "天子山", "金鞭溪", "黄石寨", "天门山"],
        altitude: "1262.5米",
        type: "石英砂岩峰林",
        bestSeason: "4-10月"
    },
    {
        id: 8,
        name: "长白山",
        location: "吉林延边",
        images: [
            "images/changbaishan/1.jpg",
            "images/changbaishan/2.jpg",
            "images/changbaishan/3.jpg",
            "images/changbaishan/4.jpg"
        ],
        description: "东北第一高峰，中朝界山。长白山以其雄伟、神奇、壮观闻名，天池如一块碧玉镶嵌在群峰之间。",
        features: ["天池", "长白瀑布", "地下森林", "温泉群", "高山花园"],
        altitude: "2691米",
        type: "火山地貌",
        bestSeason: "7-9月"
    },
    {
        id: 9,
        name: "玉龙雪山",
        location: "云南丽江",
        images: [
            "images/yulongxueshan/1.jpg",
            "images/yulongxueshan/2.jpg",
            "images/yulongxueshan/3.jpg",
            "images/yulongxueshan/4.jpg"
        ],
        description: "北半球最南的大雪山，以险、奇、美、秀著称。玉龙雪山在纳西语中被称为'欧鲁'，意为'天山'，是纳西族的神山。",
        features: ["冰川公园", "云杉坪", "牦牛坪", "甘海子", "蓝月谷"],
        altitude: "5596米",
        type: "雪山冰川",
        bestSeason: "11-3月"
    },
    {
        id: 10,
        name: "衡山",
        location: "湖南衡阳",
        images: [
            "images/hengshan2/1.jpg",
            "images/hengshan2/2.jpg",
            "images/hengshan2/3.jpg",
            "images/hengshan2/4.jpg"
        ],
        description: "五岳中的南岳，以壮美的自然风光和佛道文化闻名。衡山素有'五岳独秀'、'宗教圣地'之称，是重要的佛教、道教圣地。",
        features: ["祝融峰", "南岳大庙", "藏经殿", "方广寺", "水帘洞"],
        altitude: "1300.2米",
        type: "花岗岩地貌",
        bestSeason: "夏秋季节"
    },
    {
        id: 11,
        name: "恒山",
        location: "山西大同",
        images: [
            "images/hengshan1/1.jpg",
            "images/hengshan1/2.jpg",
            "images/hengshan1/3.jpg",
            "images/hengshan1/4.jpg"
        ],
        description: "五岳中的北岳，以险峻著称。恒山是道教圣地，悬空寺依崖而建，结构奇巧，令人叹为观止。",
        features: ["悬空寺", "天峰岭", "翠屏峰", "金龙峡", "恒宗殿"],
        altitude: "2016.1米",
        type: "断层山",
        bestSeason: "4-10月"
    },
    {
        id: 12,
        name: "嵩山",
        location: "河南登封",
        images: [
            "images/songshan/1.jpg",
            "images/songshan/2.jpg",
            "images/songshan/3.jpg",
            "images/songshan/4.jpg"
        ],
        description: "五岳中的中岳，少林寺所在地，中华武术的发源地。嵩山是儒、释、道三教荟萃之地，有'天地之中'的美誉。",
        features: ["少林寺", "中岳庙", "嵩阳书院", "观星台", "三皇寨"],
        altitude: "1491.7米",
        type: "褶皱断块山",
        bestSeason: "春秋季"
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
                <div class="not-found-icon" style="font-size: 64px; margin-bottom: 20px;">🏔️</div>
                <h2 style="font-size: 2rem; margin-bottom: 16px; font-weight: 600;">
                    没找到心仪的山川景点？
                </h2>
                <p style="font-size: 1.1rem; margin-bottom: 30px; line-height: 1.6; opacity: 0.9;">
                    告诉我们您想了解的山川美景，我们会尽快补充相关内容。<br>
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
    currentMountainIndex: 0,
    currentImageIndex: 0,
    isPlaying: true,
    intervalId: null,
    intervalTime: 2000 
};

document.addEventListener('DOMContentLoaded', function() {
    initMountainsGrid();
    initDetailShowcase();
    
    
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

function initMountainsGrid() {
    const gridContainer = document.getElementById('mountainsGrid');
    gridContainer.innerHTML = ''; 
    
    mountainsData.forEach(mountain => {
        const card = createMountainCard(mountain);
        gridContainer.appendChild(card);
    });
}


function createMountainCard(mountain) {
    const card = document.createElement('div');
    card.className = 'mountain-card';
    card.setAttribute('data-id', mountain.id);
    
    
    const firstImage = mountain.images[0];
    
    card.innerHTML = `
        <div class="mountain-bg" style="background-image: url('${firstImage}')"></div>
        <div class="mountain-name">${mountain.name}</div>
    `;
    
    
    let hoverTimer;
    
    card.addEventListener('mouseenter', function() {
        clearTimeout(hoverTimer);
        
        
        hoverTimer = setTimeout(() => {
            const mountainIndex = mountainsData.findIndex(m => m.id === mountain.id);
            showMountainDetail(mountainIndex);
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
            <h2 class="detail-title" id="detailTitle">山脉名称</h2>
            <div class="detail-info">
                <div class="detail-info-item">
                    <span class="label">位置</span>
                    <span class="value" id="detailLocation">---</span>
                </div>
                <div class="detail-info-item">
                    <span class="label">海拔</span>
                    <span class="value" id="detailAltitude">---</span>
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
            <p class="detail-description" id="detailDescription">这里是山脉的详细描述...</p>
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


function showMountainDetail(mountainIndex) {
    carouselState.currentMountainIndex = mountainIndex;
    carouselState.currentImageIndex = 0;
    
    const detailShowcase = document.querySelector('.detail-showcase');
    const overlay = document.querySelector('.overlay');
    
    
    updateMountainContent();
    
    
    detailShowcase.classList.add('active');
    overlay.classList.add('active');
    
    
    startAutoPlay();
    
    
    document.body.style.overflow = 'hidden';
}


function updateMountainContent() {
    const mountain = mountainsData[carouselState.currentMountainIndex];
    const currentImage = mountain.images[carouselState.currentImageIndex];
    const detailImage = document.getElementById('detailImage');
    const detailTitle = document.getElementById('detailTitle');
    const detailLocation = document.getElementById('detailLocation');
    const detailAltitude = document.getElementById('detailAltitude');
    const detailType = document.getElementById('detailType');
    const detailSeason = document.getElementById('detailSeason');
    const detailDescription = document.getElementById('detailDescription');
    const detailFeatures = document.getElementById('detailFeatures');
    
    detailImage.classList.add('fade-out');
    
    setTimeout(() => {
        
        detailImage.style.backgroundImage = `url('${currentImage}')`;
          
        if (carouselState.currentImageIndex === 0) {
            detailTitle.textContent = mountain.name;
            detailLocation.textContent = mountain.location;
            detailAltitude.textContent = mountain.altitude;
            detailType.textContent = mountain.type;
            detailSeason.textContent = mountain.bestSeason || '四季皆宜';
            detailDescription.textContent = mountain.description;
            
            
            detailFeatures.innerHTML = mountain.features.map(feature => 
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
    const mountain = mountainsData[carouselState.currentMountainIndex];
    carouselState.currentImageIndex = (carouselState.currentImageIndex + 1) % mountain.images.length;
    updateMountainContent();
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