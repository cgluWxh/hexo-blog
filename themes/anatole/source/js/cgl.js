document.addEventListener("DOMContentLoaded", () => {
  const initJumpBtn = () => {
    // 获取回到顶部和回到底部的按钮
    const topBtn = document.querySelector('.setting_tool a[title="回到顶部"]');
    const bottomBtn = document.querySelector('.setting_tool a[title="回到底部"]');

    // 回到顶部
    topBtn.addEventListener('click', function (e) {
      e.preventDefault(); // 阻止默认跳转
      const scrollTarget = window.innerWidth < 960 ? document.documentElement : window;
      scrollTarget.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // 回到底部
    bottomBtn.addEventListener('click', function (e) {
      e.preventDefault();
      const scroller = window.innerWidth < 960 ? document.documentElement : window;
      const scrollTarget = window.innerWidth < 960 ? document.documentElement : document.body;
      scroller.scrollTo({ top: scrollTarget.scrollHeight, behavior: 'smooth' });
    });

    // 显示/隐藏按钮的函数
    function updateBtnVisibility() {
      let scrollTop, windowHeight, docHeight;
      if (window.innerWidth < 960) {
        scrollTop = document.documentElement.scrollTop;
        windowHeight = window.innerHeight || document.documentElement.clientHeight;
        docHeight = document.documentElement.scrollHeight;
      } else {
        scrollTop = window.scrollY || document.documentElement.scrollTop;
        windowHeight = window.innerHeight || document.documentElement.clientHeight;
        docHeight = document.documentElement.scrollHeight;
      }

      // 距离顶部小于50px，隐藏回到顶部按钮，否则显示
      if (scrollTop < 50) {
        topBtn.classList.add('fadeUp');
        topVisible = false;
      } else {
        topBtn.classList.remove('fadeUp');
        topVisible = true;
      }

      // 距离底部小于50px，隐藏回到底部按钮，否则显示
      if (scrollTop + windowHeight >= docHeight - 50) {
        bottomBtn.classList.add('fadeDown');
        topBtn.classList.add('moveDown');
        bottomVisible = false;
      } else {
        topBtn.classList.remove('moveDown');
        bottomBtn.classList.remove('fadeDown');
        bottomVisible = true;
      }
    }

    // 初始设置
    updateBtnVisibility();
    // 监听滚动事件
    window.addEventListener('scroll', updateBtnVisibility);
    // 监听窗口大小变化
    window.addEventListener('resize', updateBtnVisibility);
  }
  if (!localStorage.initialized && location.pathname === "/" && document.referrer === '') {
    const newHTML = `
      <style>
        #bili-redirect {
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          background-size: cover;
          background-position: center;
          min-height: 100vh;
          background-repeat: no-repeat;
          position: fixed;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          z-index: 114514;
          background-color: white;
        }

        b {
          color: crimson;
        }

        span {
          font-size: large;
        }

        .container {
          margin-top: -24px;
          opacity: 0;
          width: 400px;
          height: auto;
          padding: 36px;
          background-color: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(12px);
          border-radius: 24px;
          box-shadow: 0 0 48px rgba(0, 0, 0, 0.5);
          transition: opacity 1s cubic-bezier(0.51, 0.01, 0, 1);
        }

        .container.visible {
          opacity: 1;
        }

        .button-container {
          display: flex;
          justify-content: flex-end;
        }

        #greeting {
          font-weight: bold;
          font-size: xx-large;
        }

        input[type="button"] {
          margin-top: 36px;
          color: white;
          background-color: #0fa7d9;
          border-radius: 24px;
          border: none;
          padding: 12px;
          transition: opacity 0.2s ease-in-out;
          margin-left: 12px;
        }

        input[type="button"]:hover {
          opacity: 0.75;
          cursor: pointer;
        }

        #footer {
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
          mask-image: linear-gradient(to bottom,
              rgba(0, 0, 0, 0) 10%,
              rgba(0, 0, 0, 1) 90%);
          -webkit-mask-image: -webkit-linear-gradient(to bottom,
              rgba(0, 0, 0, 0) 10%,
              rgba(0, 0, 0, 1) 90%);
          height: 100px;
          opacity: 1;
          color: rgba(255, 255, 255, 0.76);
          position: fixed;
          bottom: 0;
          width: 100%;
          text-align: center;
          font-size: small;
          padding: 3px;
          backdrop-filter: blur(12px);
        }
      </style>
      <div id="bili-redirect">
        <div class="container">
          <div id="greeting">嗨! ヾ(*´▽‘*)</div>
          <br />
          <span>这里是 bilib<b>ii</b>li.com! 您可能输入了错误的网址.</span>
          <div class="button-container">
            <input
              id="blog"
              type="button"
              value="访问本站"
            />
            <input
              id="redirect"
              type="button"
              value=" 是否本来要前往哔哩哔哩？"
            />
          </div>
        </div>
        <footer id="footer">
          <div style="position: fixed; bottom: 12px">&copy; 2025 bilibiili.com. <a style="color:rgba(255, 255, 255, 0.76);font-size:small;" href="https://beian.miit.gov.cn/">湘ICP备2025134544号-1</a></div>
        </footer>
      </div>
    `;
    const originalTitle = document.title;
    document.title = "bilibiili.com";
    document.body.innerHTML += newHTML;
    const biliRedirect = document.getElementById("bili-redirect");
    function redirect() {
      document.getElementById("redirect").value = "正在跳转...";
      document.getElementById("redirect").style.opacity = "0.5";
      window.location.href = "https://www.bilibili.com/";
    }
    document.querySelector("#redirect").addEventListener("click", redirect);
    document.querySelector("#blog").addEventListener("click", () => {
      localStorage.initialized = true;
      biliRedirect.remove();
      document.title = originalTitle;
      document.querySelectorAll(".animated").forEach(e=>{
        e.classList.remove("animated");
        e.classList.remove("fadeInDown");
        initJumpBtn();
        setTimeout(()=>e.classList.add("animated"),0);
        setTimeout(()=>e.classList.add("fadeInDown"),0);
      });
    });

    const img = new Image();
    let timer = null;
    img.src = "https://t.mwm.moe/fj";
    img.onload = () => {
      clearTimeout(timer);
      timer = null;
      biliRedirect.style.backgroundImage = `url(${img.src})`;
      document.querySelector(".container").classList.add("visible");
    };
    img.onerror = () => {
      clearTimeout(timer);
      timer = null;
      biliRedirect.style.backgroundImage = "url(/images/fallbackBg.webp)";
      document.querySelector(".container").classList.add("visible");
    };
    timer = setTimeout(()=>{
      img.src = "/images/fallbackBg.webp";
    }, 3000);
    return;
  }
  initJumpBtn();
  
})