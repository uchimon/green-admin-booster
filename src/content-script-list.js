// =============

let isChangeSavedConditionCnt = 0;
let isChangeSharedListCnt = 0;


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
		customizeSavedCondition(v_keyword, v_color);
		customizeSharedList(v_keyword, v_color);
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

	// 求職者検索画面
	if (isChangeSavedConditionCnt < 15) { // 最初に全件取得していないので試行回数を設定
		isChangeSavedConditionCnt++;
		customizeSavedCondition(v_keyword, v_color);
	}

	if (isChangeSharedListCnt < 1) {
		isChangeSharedListCnt++;
		customizeSharedList(v_keyword, v_color);
	}

	//console.log("content-script end");
});

observer.observe(document.querySelector(".search-parenet"), {
	childList: true,
	subtree: true
});

function customizeSavedCondition(keyword, color) {
	console.log("保存した条件の処理-開始")
	//let targets = document.querySelectorAll(`.js-job-title[id^='js-apply-proceed-']`);
	let mainDiv = document.querySelector(".mdl-navigation.client-navigation");
	if (!mainDiv) {
		return;
	}

	let targets = mainDiv.children;
	console.log(`処理対象: ${targets.length}`);

	//console.log(targets.length);
	for (var i = 0; i < targets.length; i++) {
		const t = targets[i];
		t.firstElementChild.style.fontSize = '0.4rem'
		//console.log(t.innerHTML);
		if (t.firstElementChild.innerText.indexOf(keyword) > -1) {
			t.firstElementChild.style.color = color; // 色の強調

			mainDiv.insertBefore(t, mainDiv.firstChild);
		}
	}
	console.log("保存した条件の処理-終了")
}

function customizeSharedList(keyword, color) {
	console.log("共有した条件の処理-開始")
	//let targets = document.querySelectorAll(`.js-job-title[id^='js-apply-proceed-']`);
	let savedConditionDiv = document.querySelector(".mdl-navigation.client-navigation");
	if (!savedConditionDiv) {
		console.log("no savedConditionDiv");
		return;
	}

	let mainDiv = savedConditionDiv.parentElement.children[3].children[1]
	if (!mainDiv && mainDiv.className != "mdl-navigation") {
		console.log("no mdl-navigation");
		return;
	}

	let targets = mainDiv.children;
	console.log(`処理対象: ${targets.length}`);
	//console.log(targets.length);
	for (var i = 0; i < targets.length; i++) {
		const t = targets[i];
		t.firstElementChild.style.fontSize = '0.4rem'
		//console.log(t.innerHTML);
		if (t.firstElementChild.innerText.indexOf(keyword) > -1) {
			t.firstElementChild.style.color = color; // 色の強調

			mainDiv.insertBefore(t, mainDiv.firstChild);
		}
	}
	console.log("共有した条件の処理-終了")
}
