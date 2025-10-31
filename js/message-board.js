// 留言板功能
class MessageBoard {
    constructor() {
        this.messages = this.loadMessages();
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        this.bindEvents();
        this.renderMessages();
        this.updateMessageCount();
    }

    bindEvents() {
        // 表单提交
        document.getElementById('messageForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.previewMessage();
        });

        // 字数统计
        document.getElementById('messageContent').addEventListener('input', (e) => {
            this.updateCharCount(e.target.value.length);
        });

        // 筛选按钮
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setFilter(e.target.dataset.filter);
            });
        });

        // 加载更多
        document.getElementById('loadMoreBtn').addEventListener('click', () => {
            this.loadMoreMessages();
        });

        // 关闭预览模态框
        document.querySelector('#previewModal .close-btn').addEventListener('click', () => {
            this.closePreview();
        });
    }

    updateCharCount(count) {
        const charCount = document.getElementById('charCount');
        charCount.textContent = count;
        
        if (count > 500) {
            charCount.style.color = '#ff6b6b';
        } else if (count > 400) {
            charCount.style.color = '#ffa726';
        } else {
            charCount.style.color = '#a8b2d1';
        }
    }

    previewMessage() {
        const formData = this.getFormData();
        
        if (!this.validateForm(formData)) {
            return;
        }

        const previewContent = document.getElementById('previewContent');
        previewContent.innerHTML = this.generatePreviewHTML(formData);
        
        document.getElementById('previewModal').style.display = 'block';
    }

    getFormData() {
        return {
            userName: document.getElementById('userName').value,
            userLocation: document.getElementById('userLocation').value,
            messageType: document.getElementById('messageType').value,
            placeName: document.getElementById('placeName').value,
            placeLocation: document.getElementById('placeLocation').value,
            messageContent: document.getElementById('messageContent').value,
            photoUrl: document.getElementById('photoUrl').value
        };
    }

    validateForm(data) {
        if (!data.userName.trim()) {
            alert('请输入你的昵称');
            return false;
        }
        if (!data.messageType) {
            alert('请选择推荐类型');
            return false;
        }
        if (!data.placeName.trim()) {
            alert('请输入景点名称');
            return false;
        }
        if (!data.placeLocation.trim()) {
            alert('请输入具体位置');
            return false;
        }
        if (!data.messageContent.trim()) {
            alert('请输入推荐理由');
            return false;
        }
        if (data.messageContent.length > 500) {
            alert('推荐理由不能超过500字');
            return false;
        }
        return true;
    }

    generatePreviewHTML(data) {
        const typeText = {
            'mountain': '名山峻岭',
            'river': '江河湖海',
            'region': '区域特色',
            'other': '其他美景'
        }[data.messageType];

        return `
            <div class="message-card">
                <div class="message-header">
                    <div class="message-user">
                        <div class="message-user-name">${data.userName}</div>
                        ${data.userLocation ? `<div class="message-user-location">📍 ${data.userLocation}</div>` : ''}
                    </div>
                    <span class="message-type">${typeText}</span>
                </div>
                <div class="message-place">
                    <div class="message-place-name">${data.placeName}</div>
                    <div class="message-place-location">📍 ${data.placeLocation}</div>
                </div>
                <div class="message-content">
                    ${data.messageContent.replace(/\n/g, '<br>')}
                </div>
                ${data.photoUrl ? `
                    <div class="message-image">
                        <img src="${data.photoUrl}" alt="${data.placeName}" onerror="this.style.display='none'">
                    </div>
                ` : ''}
                <div class="message-footer">
                    <span>刚刚</span>
                </div>
            </div>
        `;
    }

    submitMessage() {
        const formData = this.getFormData();
        const newMessage = {
            id: Date.now(),
            ...formData,
            timestamp: new Date().toISOString(),
            likes: 0,
            liked: false
        };

        this.messages.unshift(newMessage);
        this.saveMessages();
        this.closePreview();
        this.resetForm();
        this.renderMessages();
        this.updateMessageCount();
        
        this.showSuccessMessage('推荐提交成功！感谢你的分享！');
    }

    showSuccessMessage(text) {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: #2e7d32;
            color: white;
            padding: 1rem 2rem;
            border-radius: 5px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        successDiv.textContent = text;
        
        document.body.appendChild(successDiv);
        
        setTimeout(() => {
            successDiv.remove();
        }, 3000);
    }

    closePreview() {
        document.getElementById('previewModal').style.display = 'none';
    }

    resetForm() {
        document.getElementById('messageForm').reset();
        this.updateCharCount(0);
    }

    setFilter(filter) {
        this.currentFilter = filter;
        
        // 更新按钮状态
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === filter);
        });
        
        this.renderMessages();
    }

    renderMessages() {
        const grid = document.getElementById('messagesGrid');
        const filteredMessages = this.currentFilter === 'all' 
            ? this.messages 
            : this.messages.filter(msg => msg.messageType === this.currentFilter);

        if (filteredMessages.length === 0) {
            grid.innerHTML = `
                <div class="no-messages">
                    <div class="no-messages-icon">💬</div>
                    <h3>还没有推荐内容</h3>
                    <p>成为第一个分享山河美景的人吧！</p>
                </div>
            `;
            return;
        }

        grid.innerHTML = filteredMessages.map(message => this.createMessageHTML(message)).join('');
        
        // 重新绑定点赞事件
        this.bindLikeEvents();
    }

    createMessageHTML(message) {
        const typeText = {
            'mountain': '名山峻岭',
            'river': '江河湖海',
            'region': '区域特色',
            'other': '其他美景'
        }[message.messageType];

        const timeAgo = this.getTimeAgo(message.timestamp);

        return `
            <div class="message-card" data-id="${message.id}">
                <div class="message-header">
                    <div class="message-user">
                        <div class="message-user-name">${message.userName}</div>
                        ${message.userLocation ? `<div class="message-user-location">📍 ${message.userLocation}</div>` : ''}
                    </div>
                    <span class="message-type">${typeText}</span>
                </div>
                <div class="message-place">
                    <div class="message-place-name">${message.placeName}</div>
                    <div class="message-place-location">📍 ${message.placeLocation}</div>
                </div>
                <div class="message-content">
                    ${message.messageContent.replace(/\n/g, '<br>')}
                </div>
                ${message.photoUrl ? `
                    <div class="message-image">
                        <img src="${message.photoUrl}" alt="${message.placeName}" onerror="this.style.display='none'">
                    </div>
                ` : ''}
                <div class="message-footer">
                    <span>${timeAgo}</span>
                    <div class="message-actions">
                        <button class="like-btn ${message.liked ? 'liked' : ''}" data-id="${message.id}">
                            ❤️ <span class="like-count">${message.likes}</span>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    bindLikeEvents() {
        document.querySelectorAll('.like-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const messageId = parseInt(e.target.closest('.like-btn').dataset.id);
                this.toggleLike(messageId);
            });
        });
    }

    toggleLike(messageId) {
        const message = this.messages.find(msg => msg.id === messageId);
        if (message) {
            if (message.liked) {
                message.likes--;
                message.liked = false;
            } else {
                message.likes++;
                message.liked = true;
            }
            this.saveMessages();
            this.renderMessages();
        }
    }

    getTimeAgo(timestamp) {
        const now = new Date();
        const messageTime = new Date(timestamp);
        const diffInSeconds = Math.floor((now - messageTime) / 1000);

        if (diffInSeconds < 60) return '刚刚';
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}分钟前`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}小时前`;
        if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}天前`;
        return `${Math.floor(diffInSeconds / 2592000)}月前`;
    }

    updateMessageCount() {
        const counts = {
            all: this.messages.length,
            mountain: this.messages.filter(msg => msg.messageType === 'mountain').length,
            river: this.messages.filter(msg => msg.messageType === 'river').length,
            region: this.messages.filter(msg => msg.messageType === 'region').length,
            other: this.messages.filter(msg => msg.messageType === 'other').length
        };

        // 更新筛选按钮计数
        document.querySelectorAll('.filter-btn').forEach(btn => {
            const filter = btn.dataset.filter;
            const count = counts[filter];
            if (count > 0) {
                btn.textContent = `${btn.textContent.split('(')[0]}(${count})`;
            }
        });
    }

    loadMoreMessages() {
        // 这里可以实现加载更多功能
        // 目前只是演示，实际项目中可以从服务器加载更多数据
        this.showSuccessMessage('已加载更多推荐内容！');
    }

    loadMessages() {
        const saved = localStorage.getItem('shanhe-messages');
        if (saved) {
            return JSON.parse(saved);
        }
        
        // 默认示例数据
        return [
    {
        id: 1,
        userName: '山河爱好者',
        userLocation: '安徽黄山',
        messageType: 'mountain',
        placeName: '齐云山',
        placeLocation: '安徽省黄山市休宁县',
        messageContent: '齐云山是中国四大道教名山之一，虽然不如黄山出名，但风景同样秀丽。山上的月华街、真仙洞府都很有特色，游客相对较少，适合喜欢安静登山的朋友。',
        photoUrl: 'images/message/1.jpg',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        likes: 5,
        liked: false
    },
    {
        id: 2,
        userName: '山水探秘者',
        userLocation: '浙江丽水',
        messageType: 'mountain',
        placeName: '箬寮岘',
        placeLocation: '浙江省丽水市松阳县',
        messageContent: '箬寮岘是浙南第一高峰，原始森林覆盖率高达95%，夏季凉爽宜人。山中的杜鹃花海和云海景观令人震撼，是个绝佳的避暑胜地。',
        photoUrl: 'images/message/2.jpg',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        likes: 8,
        liked: true
    },
    {
        id: 3,
        userName: '水系探索家',
        userLocation: '贵州黔南',
        messageType: 'water',
        placeName: '小七孔',
        placeLocation: '贵州省黔南布依族苗族自治州荔波县',
        messageContent: '小七孔景区有着"超级盆景"的美誉，68级跌水瀑布层层叠叠，水上森林奇观令人叹为观止。水质清澈见底，颜色如翡翠般碧绿。',
        photoUrl: 'images/message/3.jpg',
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
        likes: 12,
        liked: false
    },
    {
        id: 4,
        userName: '区域评价师',
        userLocation: '云南怒江',
        messageType: 'region',
        placeName: '丙中洛',
        placeLocation: '云南省怒江傈僳族自治州贡山独龙族怒族自治县',
        messageContent: '丙中洛被称为"人神共居的地方"，怒江第一湾气势磅礴，桃花岛与油菜花田相映成趣。这里的多民族文化和原始自然风光完美融合。',
        photoUrl: 'images/message/4.jpg',
        timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
        likes: 15,
        liked: true
    },
    {
        id: 5,
        userName: '深山行者',
        userLocation: '四川甘孜',
        messageType: 'mountain',
        placeName: '格聂神山',
        placeLocation: '四川省甘孜藏族自治州理塘县',
        messageContent: '格聂神山是藏传佛教24座神山之一，海拔6204米。相比稻城亚丁，这里更加原始纯净，格聂之眼和冷古寺都是不容错过的景点。',
        photoUrl: 'images/message/5.jpg',
        timestamp: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
        likes: 20,
        liked: false
    },
    {
        id: 6,
        userName: '水域摄影师',
        userLocation: '新疆阿勒泰',
        messageType: 'water',
        placeName: '可可托海',
        placeLocation: '新疆维吾尔自治区阿勒泰地区富蕴县',
        messageContent: '可可托海不是海，而是集峡谷、湖泊、森林于一体的地质奇观。额尔齐斯河穿流而过，秋季的金色白桦林美得令人窒息。',
        photoUrl: 'images/message/6.jpg',
        timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
        likes: 18,
        liked: true
    },
    {
        id: 7,
        userName: '文化旅者',
        userLocation: '福建宁德',
        messageType: 'region',
        placeName: '霞浦',
        placeLocation: '福建省宁德市霞浦县',
        messageContent: '霞浦被誉为中国最美的滩涂，日出日落时分的光影变化令人惊叹。这里的海带养殖场景观独特，是摄影爱好者的天堂。',
        photoUrl: 'images/message/7.jpg',
        timestamp: new Date(Date.now() - 14 * 60 * 60 * 1000).toISOString(),
        likes: 25,
        liked: false
    },
    {
        id: 8,
        userName: '秘境探索者',
        userLocation: '甘肃张掖',
        messageType: 'mountain',
        placeName: '冰沟丹霞',
        placeLocation: '甘肃省张掖市肃南裕固族自治县',
        messageContent: '冰沟丹霞相比七彩丹霞更为原始壮观，这里的石柱、石墙、石峰形态各异，在日出日落时分呈现出迷人的红色，仿佛来到了外星球。',
        photoUrl: 'images/message/8.jpg',
        timestamp: new Date(Date.now() - 16 * 60 * 60 * 1000).toISOString(),
        likes: 9,
        liked: false
    },
    {
        id: 9,
        userName: '湖泊探索者',
        userLocation: '内蒙古呼伦贝尔',
        messageType: 'water',
        placeName: '阿尔山天池',
        placeLocation: '内蒙古自治区兴安盟阿尔山市',
        messageContent: '阿尔山天池是中国第三高天池，虽然面积不大，但深不可测。四周被原始森林环绕，秋季的五彩林海倒映在湖水中，美不胜收。',
        photoUrl: 'images/message/9.jpg',
        timestamp: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
        likes: 22,
        liked: false
    },
    {
        id: 10,
        userName: '边陲旅人',
        userLocation: '黑龙江漠河',
        messageType: 'region',
        placeName: '北极村',
        placeLocation: '黑龙江省大兴安岭地区漠河市',
        messageContent: '中国最北的村庄，夏季有极昼现象，冬季能观赏极光。这里的星空格外明亮，白桦林和黑龙江第一湾都充满了北国风情。',
        photoUrl: 'images/message/10.jpg',
        timestamp: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(),
        likes: 30,
        liked: true
    }
];
    }

    saveMessages() {
        localStorage.setItem('shanhe-messages', JSON.stringify(this.messages));
    }
    createMessageHTML(message) {
        const typeText = {
            'mountain': '名山峻岭',
            'river': '江河湖海',
            'region': '区域特色',
            'other': '其他美景'
        }[message.messageType];

        const timeAgo = this.getTimeAgo(message.timestamp);

        return `
            <div class="message-card" data-id="${message.id}">
                <div class="message-header">
                    <div class="message-user">
                        <div class="message-user-name">${message.userName}</div>
                        ${message.userLocation ? `<div class="message-user-location">📍 ${message.userLocation}</div>` : ''}
                    </div>
                    <div class="message-header-actions">
                        <span class="message-type">${typeText}</span>
                        <button class="delete-btn" data-id="${message.id}" title="删除这条推荐">
                            🗑️
                        </button>
                    </div>
                </div>
                <div class="message-place">
                    <div class="message-place-name">${message.placeName}</div>
                    <div class="message-place-location">📍 ${message.placeLocation}</div>
                </div>
                <div class="message-content">
                    ${message.messageContent.replace(/\n/g, '<br>')}
                </div>
                ${message.photoUrl ? `
                    <div class="message-image">
                        <img src="${message.photoUrl}" alt="${message.placeName}" onerror="this.style.display='none'">
                    </div>
                ` : ''}
                <div class="message-footer">
                    <span>${timeAgo}</span>
                    <div class="message-actions">
                        <button class="like-btn ${message.liked ? 'liked' : ''}" data-id="${message.id}">
                            ❤️ <span class="like-count">${message.likes}</span>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    // 在 bindLikeEvents 方法中添加删除事件绑定
    bindLikeEvents() {
        document.querySelectorAll('.like-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const messageId = parseInt(e.target.closest('.like-btn').dataset.id);
                this.toggleLike(messageId);
            });
        });

        // 绑定删除按钮事件
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const messageId = parseInt(e.target.closest('.delete-btn').dataset.id);
                this.deleteMessage(messageId);
            });
        });
    }

    // 添加删除消息方法
    deleteMessage(messageId) {
        if (confirm('确定要删除这条推荐吗？此操作不可撤销。')) {
            this.messages = this.messages.filter(msg => msg.id !== messageId);
            this.saveMessages();
            this.renderMessages();
            this.updateMessageCount();
            this.showSuccessMessage('推荐已删除');
        }
    }

}

// 全局函数供HTML调用
function closePreview() {
    window.messageBoard.closePreview();
}

function submitMessage() {
    window.messageBoard.submitMessage();
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    window.messageBoard = new MessageBoard();
    
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