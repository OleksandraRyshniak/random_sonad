// Sõnapaarid hajusrakenduste teemal: et = eesti keel, ru = vene keel
const words = [
    { et: 'server', ru: 'сервер' },
    { et: 'klient', ru: 'клиент' },
    { et: 'andmebaas', ru: 'база данных' },
    { et: 'päring', ru: 'запрос' },
    { et: 'vastus', ru: 'ответ' },
    { et: 'võrk', ru: 'сеть' },
    { et: 'protokoll', ru: 'протокол' },
    { et: 'sõnum', ru: 'сообщение' },
    { et: 'liides', ru: 'интерфейс' },
    { et: 'vahemälu', ru: 'кэш' },
    { et: 'skaleeruvus', ru: 'масштабируемость' },
    { et: 'autentimine', ru: 'аутентификация' },
    { et: 'koormuse jaotus', ru: 'балансировка нагрузки' },
    { et: 'tõrketaluvus', ru: 'отказоустойчивость' },
    { et: 'hajussüsteem', ru: 'распределённая система' },
];

let current;

// Valib massiivist juhusliku sõna ja kuvab selle lehel
function newWord() {
    current = words[Math.floor(Math.random() * words.length)];
    document.getElementById('word').textContent = current.et;
    document.getElementById('answer').value = '';
    document.getElementById('result').textContent = '';
}

// Võrdleb kasutaja vastust õige tõlkega
function check() {
    const answer = document.getElementById('answer').value.trim();
    document.getElementById('result').textContent =
        answer === current.ru ? 'Õige!' : 'Vale. Õige vastus: ' + current.ru;
}

document.getElementById('check').addEventListener('click', check);
document.getElementById('next').addEventListener('click', newWord);
newWord();
