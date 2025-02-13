(async function() {
    const redirectURL = "/403.html"; // リダイレクト先のURL

    try {
        // 外部APIでIPアドレスと国コードを取得
        const response = await fetch("https://1.bujitianzhong03.workers.dev/");
        const data = await response.json();
        const countryCode = data.country_code;

        // 取得した国コードが "CN"（中国）ならリダイレクト
        if (countryCode === "CN") {
            window.location.replace(redirectURL);
            return;
        }
    } catch (error) {
        console.warn("IPチェック失敗:", error);
    }

    const userLang = (navigator.language || navigator.userLanguage).toLowerCase();
    if (userLang.startsWith("zh")) {
        window.location.replace(redirectURL);
        return;
    }

    // タイムゾーンの確認
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const chinaTimeZones = ["Asia/Shanghai", "Asia/Urumqi"];
    if (chinaTimeZones.includes(userTimeZone)) {
        window.location.replace(redirectURL);
    }

    // UAチェック（WeChatやAlipayのチェック）
    const userAgent = navigator.userAgent.toLowerCase();

    // WeChatやAlipayを使用している場合にリダイレクト
    if (userAgent.includes("micromessenger") || userAgent.includes("alipayclient")) {
        window.location.replace(redirectURL);
    }
})();
