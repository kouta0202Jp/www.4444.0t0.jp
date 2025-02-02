(async function() {
    const redirectURL = "/404.html";

    // 日本の一般的なIPレンジ（CIDR）
    const japanIPRanges = [
        "1.0.0.0/8", "14.0.0.0/8", "27.0.0.0/8", "42.0.0.0/8", 
        "49.0.0.0/8", "60.0.0.0/8", "61.0.0.0/8"
    ];

    // IPが日本の範囲内にあるかをチェック
    function isJapanIP(ip) {
        function ipToLong(ip) {
            return ip.split('.').reduce((acc, octet) => (acc << 8) + parseInt(octet), 0) >>> 0;
        }
        
        const ipLong = ipToLong(ip);
        return japanIPRanges.some(range => {
            const [rangeIP, subnet] = range.split('/');
            const rangeLong = ipToLong(rangeIP);
            const mask = ~(2 ** (32 - subnet) - 1);
            return (ipLong & mask) === (rangeLong & mask);
        });
    }

    try {
        // 外部APIでIPアドレスと国コードを取得
        const response = await fetch("https://1.bujitianzhong03.workers.dev/");
        const data = await response.json();
        const ip = data.ip;
        const countryCode = data.country_code;

        // 取得した国コードが "JP"（日本）ならリダイレクト
        if (countryCode === "JP" || isJapanIP(ip)) {
            window.location.href = redirectURL;
            return;
        }
    } catch (error) {
        console.warn("IPチェック失敗:", error);
    }

    // 言語設定の確認
    const userLang = navigator.language || navigator.userLanguage;
    if (userLang.startsWith("ja")) {
        window.location.href = redirectURL;
        return;
    }

    // タイムゾーンの確認
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const japanTimeZones = ["Asia/Tokyo"];
    if (japanTimeZones.includes(userTimeZone)) {
        window.location.href = redirectURL;
    }
})();
