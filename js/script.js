const url = "https://www.nbrb.by/api/exrates/currencies";
let restData = [];
const h1 = document.querySelector('.idd')
const names = []
const input1 = document.querySelector('.input1')
const input2 = document.querySelector('.input2')
input1.value = '2022-01-01'
input2.value = '2022-01-02'
let val; 
let array = [];


getJson ()

function getJson () {
    fetch(url)
    .then((response) => response.json())
    .then(function (json) {
        json.forEach(el => {
            array.push(obj = {
                Cur_ID: el.Cur_ID,
                Cur_Name: el.Cur_Name,
                Cur_DateStart: el.Cur_DateStart,
                Cur_DateEnd: el.Cur_DateEnd
            })
                let select = document.querySelector('select')
                let option = document.createElement('option')
                option.innerText = el.Cur_Name;
                option.value = el.Cur_ID;
                select.append(option);
        })
        }) 
} 

function getKurs() {
    let tr = document.querySelectorAll('td');
    tr.forEach( e => e.remove('tr') )
    if(tr>0) {tr.remove()};
    const option = document.querySelector('select');
    option.addEventListener('change', () => {
        val =  option.value
    });
    fetch(`https://www.nbrb.by/api/exrates/rates/dynamics/431?startdate=${input1.value}&enddate=${input2.value}`)
    .then((response) => response.json()) 
    .then(function aaa(json) {  
        for(i=0; i<json.length; i++) {
        createTr(`${json[i].Date.slice(0,10)}`, `${json[i].Cur_OfficialRate}`)
        }
        })
}

    function createTr (el1, el2) {
        const div = document.querySelector('.tb');
        const table = document.createElement('table');
        const tr = document.createElement('tr');
        const td1 = document.createElement('td');
        const td2 = document.createElement('td');

        td1.innerText = el1;
        td2.innerText = el2;
        tr.appendChild(td1);
        tr.appendChild(td2);

        table.appendChild(tr);
        div.appendChild(table);
        }
