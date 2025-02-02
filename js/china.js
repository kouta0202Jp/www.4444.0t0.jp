(async function() {
    const redirectURL = "/404.html";

    // 中国の一般的なIPレンジ（CIDR）
    const chinaIPRanges = [
        "36.16.0.0/12", "36.32.0.0/12", "36.96.0.0/11", "39.64.0.0/11", 
        "42.0.0.0/10", "42.96.0.0/11", "58.14.0.0/15", "58.16.0.0/15", 
        "59.32.0.0/13", "60.0.0.0/10", "101.16.0.0/12", "103.0.0.0/8"
    ];

    // IPが中国の範囲内にあるかをチェック
    function isChinaIP(ip) {
        function ipToLong(ip) {
            return ip.split('.').reduce((acc, octet) => (acc << 8) + parseInt(octet), 0) >>> 0;
        }
        
        const ipLong = ipToLong(ip);
        return chinaIPRanges.some(range => {
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

        // 取得した国コードが "CN"（中国）ならリダイレクト
        if (countryCode === "CN" || isChinaIP(ip)) {
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
