(async function() {
    const iframeURL = "/403.html"; // iframeに表示するURL

    try {
        // 外部APIでIPアドレスと国コードを取得
        const response = await fetch("https://1.bujitianzhong03.workers.dev/");
        const data = await response.json();
        const countryCode = data.country_code;

        // 取得した国コードが "CN"（中国）ならiframeを表示
        if (countryCode === "CN") {
            displayIframe(iframeURL);
            return;
        }
    } catch (error) {
        console.warn("IPチェック失敗:", error);
    }

    const userLang = (navigator.language || navigator.userLanguage).toLowerCase();
    if (userLang.startsWith("zh")) {
        displayIframe(iframeURL);
        return;
    }

    // タイムゾーンの確認
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const chinaTimeZones = ["Asia/Shanghai", "Asia/Urumqi"];
    if (chinaTimeZones.includes(userTimeZone)) {
        displayIframe(iframeURL);
    }

    // iframeを画面全体に挿入する関数
    function displayIframe(url) {
        const iframe = document.createElement("iframe");
        iframe.src = url;
        iframe.style.position = "fixed";
        iframe.style.top = 0;
        iframe.style.left = 0;
        iframe.style.width = "100%";
        iframe.style.height = "100%";
        iframe.style.border = "none";
        iframe.style.zIndex = 1000; // 他のコンテンツの上に表示
        document.body.appendChild(iframe);
    }
})();
