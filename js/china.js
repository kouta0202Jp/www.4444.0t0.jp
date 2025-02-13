(function() {
    const redirectURL = "/403.html"; // リダイレクト先のURL

    // 🚀 言語チェック（即実行）
    const userLang = (navigator.language || navigator.userLanguage).toLowerCase();
    if (userLang.startsWith("zh")) {
        window.stop();
        location.replace(redirectURL);
        return;
    }

    // 🚀 タイムゾーンチェック（即実行）
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (["Asia/Shanghai", "Asia/Urumqi"].includes(userTimeZone)) {
        window.stop();
        location.replace(redirectURL);
        return;
    }

    // 🚀 ユーザーエージェント（UA）チェック（即実行）
    const userAgent = navigator.userAgent.toLowerCase();
    if (/micromessenger|alipayclient/i.test(userAgent)) {
        window.stop();
        location.replace(redirectURL);
        return;
    }

    // 🌐 非同期IPチェック（最終手段）
    fetch("https://1.bujitianzhong03.workers.dev/")
        .then(response => response.ok ? response.json() : Promise.reject("APIエラー"))
        .then(data => {
            if (data.country_code === "CN") {
                window.stop();
                location.replace(redirectURL);
            }
        })
        .catch(error => console.warn("IPチェック失敗:", error));
})();
