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

// Loob ühe kontrollivormi. prefix on HTML-elementide id algus (nt "et"),
// questionKey on keel, mida küsitakse, answerKey on keel, mida oodatakse vastuseks
function createQuiz(prefix, questionKey, answerKey) {
    const wordEl = document.getElementById(prefix + '-word');
    const answerEl = document.getElementById(prefix + '-answer');
    const resultEl = document.getElementById(prefix + '-result');
    let current;

    // Valib massiivist juhusliku sõna ja kuvab selle lehel
    function newWord() {
        current = words[Math.floor(Math.random() * words.length)];
        wordEl.textContent = current[questionKey];
        answerEl.value = '';
        resultEl.textContent = '';
    }

    // Võrdleb kasutaja vastust õige tõlkega
    function check() {
        const answer = answerEl.value.trim();
        resultEl.textContent =
            answer === current[answerKey] ? 'Õige!' : 'Vale. Õige vastus: ' + current[answerKey];
    }

    document.getElementById(prefix + '-check').addEventListener('click', check);
    document.getElementById(prefix + '-next').addEventListener('click', newWord);
    newWord();
}

// Olemasolev variant: eestikeelne sõna, vastus vene keeles
createQuiz('et', 'et', 'ru');

// Vastupidine variant: venekeelne sõna, vastus eesti keeles
createQuiz('ru', 'ru', 'et');
