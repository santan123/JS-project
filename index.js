let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")
const leadsInLocalStorage = localStorage.getItem('myLeads')


if (leadsInLocalStorage) {
    myLeads = JSON.parse(localStorage.getItem('myLeads'))
    render(myLeads)
}

tabBtn.addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem('myLeads', JSON.stringify(myLeads))
        render(myLeads)
    })
})

deleteBtn.addEventListener('dblclick', function() {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

inputBtn.addEventListener('click', function() {
    myLeads.push(inputEl.value)
    render(myLeads)
    localStorage.setItem('myLeads', JSON.stringify(myLeads)) 
    inputEl.value = ""
})

function render(leads){
    let list = ``
    for (let i = 0; i < leads.length; i++) {
        list += `<li><a target="_blank" href="${leads[i]}">${leads[i]}</a></li>`
    }
    ulEl.innerHTML = list
}


