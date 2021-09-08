// Variables
if (window.location.pathname == "/") {
    const actionBtn = document.querySelector(".action-btn");
    const url = document.querySelector(".url-value");
    // Event listeners
    actionBtn.addEventListener("click", async(e) => {
        e.preventDefault();
        const validUrl = url.value.match(
            /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/
        );
        if (validUrl) {
            const header = {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ url: url.value }),
            };
            const response = await fetch("/api/shorten", header);
            const data = await response.json();
            if (data) {
                window.location.replace(`/shorten?data=${data.urlCode}`);
            }
        } else {
            url.value = "";
            url.placeholder = `Invalid Url`;
        }
    });
} else if (window.location.pathname == "/shorten") {
    //   Variable
    (async() => {
        // Variables
        const id = window.location.search.substring(6);
        const inputText = document.getElementById("myInput");
        const copyBtn = document.querySelector(".copy-text");
        const response = await fetch(`/urldata?id=${id}`);
        const data = await response.json();
        // If & eles for checking data
        if (data == "No URL Found") {
            window.location.replace("/");
        } else {
            inputText.value = data.response.shortenUrl;
            document.querySelector(
                ".long-url"
            ).innerHTML = `<a  href="${data.response.longUrl}">${data.response.longUrl}</a>`;
            document.querySelector(
                ".tracker-link"
            ).href = `/tracker?id=${data.response.urlCode}`;
        }
        // Event listeners
        copyBtn.addEventListener("click", () => {
            inputText.select();
            inputText.setSelectionRange(0, 99999);
            navigator.clipboard.writeText(inputText.value);
        });
    })();
} else if (window.location.pathname == "/tracker") {
    (async() => {
        const id = window.location.search.substring(4);
        const response = await fetch(`/urldata?id=${id}`);
        const data = await response.json();
        if (data == "No URL Found") {
            window.location.replace("/");
        } else {
            document.querySelector(".counter").textContent = data.response.clicks;
        }
    })();
}