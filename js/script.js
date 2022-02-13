const url = "https://www.nbrb.by/api/exrates/currencies";
const input1 = document.querySelector('.input1')
const input2 = document.querySelector('.input2')
const select = document.querySelector('select')

let week = document.querySelector('.week')
let month = document.querySelector('.month')
let quarter = document.querySelector('.quarter')
let year = document.querySelector('.year')

week.addEventListener('click', () => period(-1, `week`))
month.addEventListener('click', () => period(-1, `month`))
quarter.addEventListener('click', () => period(-3, `month`))
year.addEventListener('click', () => period(-1, `year`))
select.addEventListener('change', getKurs)
input1.addEventListener('change', getKurs)
input2.addEventListener('change', getKurs)
input1.addEventListener('click', getKurs)
input2.addEventListener('click', getKurs)

let array = [];
let count;

getJson ()

function getJson () {
    deleteTr()
    fetch(url)
    .then((response) => response.json())
    .then(function (json) {
        json.forEach(el => {
            if(parseFloat(el.Cur_DateEnd) > 2022){
            array.push(obj = {
                Cur_ID: el.Cur_ID,
                Cur_Name: el.Cur_Name,
                Cur_DateStart: el.Cur_DateStart,
                Cur_DateEnd: el.Cur_DateEnd,
                Cur_QuotName: el.Cur_QuotName
            })
                let option = document.createElement('option')
                option.innerText = el.Cur_Name;
                option.value = el.Cur_ID;
                select.append(option);
        }
        })
    }) 
}

function nullSelect() {
    input1.value = null;
    input2.value = null; 
}

function getKurs() {
    deleteTr()
    for(let el of array) {
        if(el.Cur_ID == select.value ) {
            input1.min = el.Cur_DateStart.slice(0,10)
            input1.max = el.Cur_DateEnd.slice(0,10)
            input2.min = el.Cur_DateStart.slice(0,10)
            input2.max = el.Cur_DateEnd.slice(0,10)
            count = el.Cur_QuotName
        }
    }
    if(input1.value&&input2.value) {
    fetch(`https://www.nbrb.by/api/exrates/rates/dynamics/${select.value}?startdate=${input1.value}&enddate=${input2.value}`)
    .then((response) => response.json()) 
    .then(function aaa(json) {
        val = select.value;
        for(i=0; i<json.length; i++) {
            if(json[i].Date&&json[i].Cur_OfficialRate) {
        createTr(`${json[i].Date.slice(0,10)}`, `${count} ` + ` ${json[i].Cur_OfficialRate} ` + `BYN`)
            } else {
                   createTr(`no data`, `no data`)} //не работает
        }
        })
    }
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

function deleteTr() {
    let tr = document.querySelectorAll('td');
    tr.forEach( e => e.remove('tr'))
}

function period(n, m) {
    deleteTr()
    let today = dayjs().format('YYYY-MM-DD')
    let before = dayjs().add(n, m).format('YYYY-MM-DD')
    fetch(`https://www.nbrb.by/api/exrates/rates/dynamics/${select.value}?startdate=${before}&enddate=${today}`)
    .then((response) => response.json()) 
    .then(function aaa(json) {
        for(i=0; i<json.length; i++) {
        createTr(`${json[i].Date.slice(0,10)}`, `${count} ` + ` ${json[i].Cur_OfficialRate} ` + `BYN`)
        }
        })
}
