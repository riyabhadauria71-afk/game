const today = new Date();
const yyyy = today.getFullYear();
const mm = String(today.getMonth() + 1).padStart(2, '0');
const dd = String(today.getDate()).padStart(2, '0');
const latestDate = `${yyyy}-${mm}-${dd}`;
const BASE_URL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${latestDate}/v1`;
const dropdown = document.querySelectorAll(".dropdown select")
const button = document.querySelector("form button");
const fromCurr = document.querySelector(".from select")
const tocurr = document.querySelector(".to select")
let msg = document.querySelector(".msg");

const updateExchangeRate = async () => {
    let amount = document.querySelector("form input");
    if (amount.value === "" || amount.value < 1) {
        amount.value = 1;
    }
    const from = fromCurr.value.toLowerCase();
    const to = tocurr.value.toLowerCase();
    const URL = `${BASE_URL}/currencies/${from}.json`;
    const response = await fetch(URL);
    const data = await response.json();
    const rate = data[from][to];
    let convertedAmount = (amount.value * rate).toFixed(3);
    msg.innerText = `${amount.value}${fromCurr.value} = ${convertedAmount}${tocurr.value}`;
}

for (let select of dropdown) {
    for (curcode in countryList) {
        let newoption = document.createElement("option")
        newoption.innerText = curcode;
        newoption.value = curcode;
        if (select.name == "from" && curcode === "USD") {
            newoption.selected = "selected"
        }
        if (select.name == "to" && curcode === "INR") {
            newoption.selected = "selected"
        }
        select.append(newoption)
    }
    select.addEventListener("change", (evt) => {
        updateflag(evt.target);
    });
}

const updateflag = (element) => {
    let curcode = element.value;
    let countrycode = countryList[curcode];
    let newsouce = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newsouce;
}

button.addEventListener("click", (evt) => {
    evt.preventDefault();
        updateExchangeRate();
});

window.addEventListener("load", async () => {
    updateExchangeRate();
})

