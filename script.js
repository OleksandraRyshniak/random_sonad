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

// Normaliseerib teksti võrdlemiseks: eemaldab tühikud servadest,
// teeb väiketähtedeks ja asendab "ё" tähega "е" (venekeelses vastuses on need samaväärsed)
function normalize(text) {
    return text.trim().toLowerCase().replace(/ё/g, 'е');
}

// Loob ühe kontrollivormi. prefix on HTML-elementide id algus (nt "et"),
// questionKey on keel, mida küsitakse, answerKey on keel, mida oodatakse vastuseks
function createQuiz(prefix, questionKey, answerKey) {
    const wordEl = document.getElementById(prefix + '-word');
    const answerEl = document.getElementById(prefix + '-answer');
    const resultEl = document.getElementById(prefix + '-result');
    const scoreEl = document.getElementById(prefix + '-score');
    let current;
    let answered = false; // kas praegusele sõnale on juba vastatud
    let correct = 0;      // õigete vastuste arv
    let total = 0;        // kõigi vastuste arv

    // Kuvab teate ja lisab sellele klassi (ok / bad / warn), mille järgi CSS värvi valib
    function showResult(text, type) {
        resultEl.textContent = text;
        resultEl.className = 'result ' + (type || '');
    }

    // Valib massiivist juhusliku sõna ja kuvab selle lehel
    function newWord() {
        current = words[Math.floor(Math.random() * words.length)];
        wordEl.textContent = current[questionKey];
        answerEl.value = '';
        showResult('');
        answered = false; // uus sõna, uus katse
    }

    // Võrdleb kasutaja vastust õige tõlkega
    function check() {
        // Tühja vastust ei loeta veaks, vaid palutakse see sisestada
        if (normalize(answerEl.value) === '') {
            showResult('Sisesta vastus.', 'warn');
            return;
        }
        // Sama sõna eest punkte kaks korda ei anta
        if (answered) {
            showResult('Sellele sõnale oled juba vastanud. Vajuta "Uus sõna".', 'warn');
            return;
        }
        answered = true;
        total++;
        const isCorrect = normalize(answerEl.value) === normalize(current[answerKey]);
        if (isCorrect) correct++;
        showResult(isCorrect ? 'Õige!' : 'Vale. Õige vastus: ' + current[answerKey], isCorrect ? 'ok' : 'bad');
        scoreEl.textContent = correct + ' / ' + total;
    }

    document.getElementById(prefix + '-check').addEventListener('click', check);
    document.getElementById(prefix + '-next').addEventListener('click', newWord);
    // Enter-klahv käivitab kontrolli, nii ei pea hiirega nupule klõpsama
    answerEl.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') check();
    });
    newWord();
}

// Olemasolev variant: eestikeelne sõna, vastus vene keeles
createQuiz('et', 'et', 'ru');

// Vastupidine variant: venekeelne sõna, vastus eesti keeles
createQuiz('ru', 'ru', 'et');
