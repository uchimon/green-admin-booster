// pop up started
init();

// initialized pop up
function init() {
    chrome.storage.sync.get("keyword", ({ keyword }) => {
        document.getElementById("keyword").value = keyword;
    });
    chrome.storage.sync.get("color", ({ color }) => {
        document.getElementById("color").value = color;
    });
    let save_btn = document.getElementById("save_btn");
    save_btn.addEventListener("click", saveData);
}

function saveData() {
	chrome.storage.sync.set({ color: document.getElementById("color").value });
	chrome.storage.sync.set({ keyword: document.getElementById("keyword").value });

    var bar = document.getElementById("snackbar");
    bar.innerText = "保存しました";
    setTimeout(function(){ bar.innerText = ""; }, 2000);
}

