const url = "https://www.nbrb.by/api/exrates/currencies";
let restData = [];
const h1 = document.querySelector('.idd')
const names = []
const input1 = document.querySelector('.input1')
let onDate;
let val;

const valueOption = document.querySelector('select');
valueOption.addEventListener('change', () => {
    val = valueOption.value
});

function createTr (el1, el2) {
    const table = document.querySelector('table');
    const tr = document.createElement('tr');
    const td1 = document.createElement('td');
    const td2 = document.createElement('td');
    td1.innerText = el1;
    td2.innerText = el2;
    tr.appendChild(td1);
    tr.appendChild(td2);
    table.appendChild(tr)
}
 
getJson ()

function getJson () {
    onDate = input1.value
    fetch(url)
    .then((response) => response.json())
    .then(function (json) {
        json.forEach(el => {
            if(parseFloat(el.Cur_DateEnd) > 2022){
                const select = document.querySelector('select')
                const option = document.createElement('option')
                option.innerText = el.Cur_Name;
                option.value = el.Cur_ID;
                select.append(option);
            }
        });
        }) 
    .then (function getKurs () {
        fetch(`https://www.nbrb.by/api/exrates/rates/${val}?${onDate}`)
        .then((response) => response.json()) 
        .then(function (json) {  
            createTr (` ${json.Cur_Scale}  ${json.Cur_Name}, ${json.Date}`, `${json.Cur_OfficialRate}`)
            })
    })
} 
