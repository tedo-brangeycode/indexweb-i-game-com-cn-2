// public/site-helper.js
(function() {
  'use strict';

  // 配置数据：站点信息和关键词
  const SITE_CONFIG = {
    baseUrl: 'https://indexweb-i-game.com.cn',
    keyword: '爱游戏',
    promptCards: [
      { id: 'card-welcome', title: '欢迎访问', content: '探索无限乐趣，尽在爱游戏平台。' },
      { id: 'card-tips', title: '使用提示', content: '请使用现代浏览器访问，获得最佳体验。' },
      { id: 'card-notice', title: '访问说明', content: '本网站需要稳定的网络连接，部分功能需启用 JavaScript。' }
    ],
    badges: [
      { label: '热门', color: '#e74c3c' },
      { label: '新游', color: '#2ecc71' },
      { label: '推荐', color: '#f39c12' },
      { label: '爱游戏', color: '#9b59b6' }
    ]
  };

  // 工具函数：创建 DOM 元素
  function createElement(tag, attributes, children) {
    const el = document.createElement(tag);
    if (attributes) {
      for (const [key, value] of Object.entries(attributes)) {
        if (key === 'className') {
          el.className = value;
        } else if (key === 'style') {
          Object.assign(el.style, value);
        } else if (key === 'textContent') {
          el.textContent = value;
        } else {
          el.setAttribute(key, value);
        }
      }
    }
    if (children) {
      children.forEach(child => {
        if (typeof child === 'string') {
          el.appendChild(document.createTextNode(child));
        } else if (child instanceof Node) {
          el.appendChild(child);
        }
      });
    }
    return el;
  }

  // 创建提示卡片容器
  function createPromptCardContainer() {
    const container = createElement('div', {
      className: 'site-helper-cards',
      style: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '16px',
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        margin: '20px 0'
      }
    });

    SITE_CONFIG.promptCards.forEach(cardData => {
      const card = createElement('div', {
        className: 'prompt-card',
        style: {
          flex: '1 1 200px',
          padding: '16px',
          backgroundColor: '#fff',
          borderRadius: '6px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          borderLeft: '4px solid #3498db'
        }
      });

      const titleEl = createElement('h4', {
        textContent: cardData.title,
        style: { margin: '0 0 8px 0', color: '#2c3e50' }
      });
      const contentEl = createElement('p', {
        textContent: cardData.content,
        style: { margin: '0', color: '#555', fontSize: '14px' }
      });

      card.appendChild(titleEl);
      card.appendChild(contentEl);
      container.appendChild(card);
    });

    return container;
  }

  // 创建关键词徽章
  function createBadgeContainer() {
    const container = createElement('div', {
      className: 'site-helper-badges',
      style: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px',
        padding: '12px 0'
      }
    });

    SITE_CONFIG.badges.forEach(badgeData => {
      const badge = createElement('span', {
        className: 'keyword-badge',
        textContent: badgeData.label,
        style: {
          display: 'inline-block',
          padding: '4px 12px',
          borderRadius: '20px',
          backgroundColor: badgeData.color,
          color: '#fff',
          fontSize: '13px',
          fontWeight: 'bold',
          letterSpacing: '0.5px'
        }
      });
      container.appendChild(badge);
    });

    // 额外添加一个动态关键词徽章（展示站点关键词）
    const keywordBadge = createElement('span', {
      className: 'keyword-badge keyword-main',
      textContent: SITE_CONFIG.keyword,
      style: {
        display: 'inline-block',
        padding: '4px 14px',
        borderRadius: '20px',
        backgroundColor: '#1abc9c',
        color: '#fff',
        fontSize: '14px',
        fontWeight: 'bold',
        border: '2px solid #16a085'
      }
    });
    container.appendChild(keywordBadge);

    return container;
  }

  // 创建访问说明区域
  function createAccessNotice() {
    const notice = createElement('div', {
      className: 'site-helper-notice',
      style: {
        padding: '16px 20px',
        backgroundColor: '#ecf0f1',
        borderRadius: '8px',
        borderLeft: '4px solid #e67e22',
        marginTop: '16px'
      }
    });

    const titleEl = createElement('h4', {
      textContent: '📘 访问说明',
      style: { margin: '0 0 6px 0', color: '#2c3e50' }
    });
    const infoEl = createElement('p', {
      textContent: `当前站点：${SITE_CONFIG.baseUrl}，关键词：${SITE_CONFIG.keyword}。请遵守网站服务条款，合理使用资源。`,
      style: { margin: '0', color: '#34495e', fontSize: '14px', lineHeight: '1.6' }
    });

    const linkEl = createElement('a', {
      href: SITE_CONFIG.baseUrl,
      target: '_blank',
      textContent: '前往平台',
      style: {
        display: 'inline-block',
        marginTop: '10px',
        padding: '6px 16px',
        backgroundColor: '#3498db',
        color: '#fff',
        borderRadius: '4px',
        textDecoration: 'none',
        fontSize: '14px'
      }
    });

    notice.appendChild(titleEl);
    notice.appendChild(infoEl);
    notice.appendChild(linkEl);

    return notice;
  }

  // 初始化：将组件插入到页面中
  function init() {
    // 查找页面中合适的插入点（例如 #site-helper 或 body 开头）
    let targetContainer = document.getElementById('site-helper');
    if (!targetContainer) {
      targetContainer = document.createElement('div');
      targetContainer.id = 'site-helper';
      targetContainer.style.maxWidth = '960px';
      targetContainer.style.margin = '0 auto';
      targetContainer.style.padding = '10px';
      document.body.insertBefore(targetContainer, document.body.firstChild);
    }

    // 清空容器（防止重复插入）
    targetContainer.innerHTML = '';

    // 添加标题
    const header = createElement('h3', {
      textContent: '站点助手',
      style: { color: '#2c3e50', marginBottom: '12px' }
    });
    targetContainer.appendChild(header);

    // 添加提示卡片
    targetContainer.appendChild(createPromptCardContainer());

    // 添加关键词徽章
    targetContainer.appendChild(createBadgeContainer());

    // 添加访问说明
    targetContainer.appendChild(createAccessNotice());
  }

  // 等待 DOM 加载完成后执行
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();