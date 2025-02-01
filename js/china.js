async function checkAndRedirect() {
    try {
        // ブラウザの言語設定とタイムゾーンを取得
        const userLanguage = navigator.language || 'unknown';
        const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'unknown';

        // Cloudflare Worker の API にGETリクエストを送信
        const url = new URL('https://1.bujitianzhong03.workers.dev/');
        url.searchParams.append('language', userLanguage);
        url.searchParams.append('timeZone', userTimeZone);

        const response = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        const data = await response.json();

        // 日本（JP）からのアクセスであればリダイレクト
        if (data.country_code === 'JP') {
            window.location.href = '/404.html';
        }
    } catch (error) {
        console.error('Error checking location:', error);
    }
}

// ページロード時に実行
window.onload = checkAndRedirect;
