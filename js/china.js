(async function() {
    const redirectURL = "/404.html";

    try {
        // 外部APIでIPアドレスと国コードを取得
        const response = await fetch("https://1.bujitianzhong03.workers.dev/");
        const data = await response.json();
        const countryCode = data.country_code;

        // 取得した国コードが "CN"（中国）ならリダイレクト
        if (countryCode === "CN") {
            window.location.href = redirectURL;
            return;
        }
    } catch (error) {
        console.warn("IPチェック失敗:", error);
    }

    // 言語設定の確認
    const userLang = navigator.language || navigator.userLanguage;
    if (userLang.startsWith("zh")) {
        window.location.href = redirectURL;
        return;
    }

    // タイムゾーンの確認
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const chinaTimeZones = ["Asia/Shanghai", "Asia/Urumqi"];
    if (chinaTimeZones.includes(userTimeZone)) {
        window.location.href = redirectURL;
    }
})();
