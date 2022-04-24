// =============
const regex = /^.*<span class="js-apply-count">/
const replace = '<span class="js-apply-count">'

let isChangeApplyProceed = false;
let isChangeFavoriteReceived = false;

let v_keyword = "";
let v_color = "";

// TODO: chromeの取得が遅い
//let keyword = "ログ";
chrome.storage.sync.get("keyword", ({ keyword }) => {
	chrome.storage.sync.get("color", ({ color }) => {
		v_keyword = keyword;
		console.log("key:::::" + keyword);
		v_color = color;
		console.log("color:::::" + color);
		customizeApplyProceed(v_keyword, v_color);
		customizeFavoriteReceive(v_keyword, v_color);
	});
});
// chrome.storage.sync.get("color", ({ color }) => {
// 	color = color;
// 	console.log("color:::::" + color);
// });

const observer = new MutationObserver(function (mutations) {
	console.log("content-script start");

	console.log(`keyword: ${v_keyword}, color: ${v_color}`);

	if (!v_keyword || !v_color) {
		return;
	}

	// アプローチ管理画面
	if (!isChangeApplyProceed) {
		isChangeApplyProceed = true; // 無限呼び出し回避
		customizeApplyProceed(v_keyword, v_color);
	}

	if (!isChangeFavoriteReceived) {
		isChangeFavoriteReceived = true; // 無限呼び出し回避
		customizeFavoriteReceive(v_keyword, v_color);
	}
});

observer.observe(document.querySelector("#js-side-menu-category"), {
	childList: true,
	subtree: true
});

/**
 * アプローチ管理-応募一覧の改善
 * - 応募全文を表示、文字サイズを小さくする
 * - keyword に該当する応募はリストの先頭に移動し、文字色を変更する
 * @param {*} keyword
 */
function customizeApplyProceed(keyword, color) {
	console.log("応募一覧の処理-開始")
	let targets = document.querySelectorAll(`.js-job-title[id^='js-apply-proceed-']`);
	console.log(`処理対象: ${targets.length}`);

	//console.log(targets.length);
	for (var i = 0; i < targets.length; i++) {
		const t = targets[i];
		t.innerHTML = t.innerHTML.replace(regex, t.title + replace);
		t.style.fontSize = '0.4rem'
		//console.log(t.innerHTML);
		if (t.title.indexOf(keyword) > -1) {
			t.style.color = color; // 色の強調

			// リストの先頭に移動する
			const ulEle = t.parentElement;
			const listEle = ulEle.parentElement;
			listEle.insertBefore(ulEle, listEle.firstChild);
		}
	}
	console.log("応募一覧の処理-終了")
}

function customizeFavoriteReceive(keyword, color) {
	console.log("気になる一覧の処理-開始")
	let targets = document.querySelectorAll(`.js-job-title[id^='js-favorite-receive-']`);
	console.log(`処理対象: ${targets.length}`);

	//console.log(targets.length);
	for (var i = 0; i < targets.length; i++) {
		const t = targets[i];
		t.innerHTML = t.innerHTML.replace(regex, t.title + replace);
		t.style.fontSize = '0.4rem'
		//console.log(t.innerHTML);
		if (t.title.indexOf(keyword) > -1) {
			t.style.color = color; // 色の強調

			// リストの先頭に移動する
			const ulEle = t.parentElement;
			const listEle = ulEle.parentElement;
			listEle.insertBefore(ulEle, listEle.firstChild);
		}
	}
	console.log("気になる一覧の処理-終了")
}
