// Google翻訳の設定
function googleTranslateElementInit() {
  new google.translate.TranslateElement({
    pageLanguage: 'ja', // ページの言語
    includedLanguages: 'en,ja,es,fr,de,it,pt,zh-CN,zh-TW', // 対応する言語
    layout: google.translate.TranslateElement.InlineLayout.SIMPLE
  }, 'google_translate_element');
}

// Google翻訳ウィジェットのスクリプトを読み込む
(function() {
  // 翻訳ボタンを右下に固定するためのdivを作成
  var div = document.createElement('div');
  div.id = 'google_translate_element';
  div.style.position = 'fixed';
  div.style.bottom = '10px';
  div.style.right = '10px';
  div.style.zIndex = '1000';
  
  // divをbodyに追加
  document.body.appendChild(div);

  // Google翻訳ウィジェットのスクリプトを読み込む
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
  document.body.appendChild(script);
})();
