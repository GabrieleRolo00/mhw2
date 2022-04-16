/* TODO: inserite il codice JavaScript necessario a completare il MHW! */


function spunta(event) {
    const image = event.currentTarget;
    image.src = 'images/checked.png';

    const divSelezionato = image.parentNode;

    const sect = divSelezionato.parentNode;
    const listDiv = sect.querySelectorAll('div');
    for(let div of listDiv) {

        if (div.dataset.choiceId !== divSelezionato.dataset.choiceId) {
            div.classList.add('nonSelezionato');
            div.classList.remove('selezionato');
            div.querySelector('.checkbox').src = 'images/unchecked.png';
        } else {
            div.classList.add('selezionato');
            div.classList.remove('nonSelezionato');
        }
    }

    controllo(divSelezionato);
}


function controllo(divSelezionato)
{
    if(divSelezionato.dataset.questionId==='one') {
        r1=true;
        vRisposte[0] = divSelezionato.dataset.choiceId;

    } else if(divSelezionato.dataset.questionId==='two'){
        r2=true;
        vRisposte[1] = divSelezionato.dataset.choiceId;

    } else {
        r3 = true;
        vRisposte[2] = divSelezionato.dataset.choiceId;

    } 

    if(r1 && r2 && r3) risultato();
}

function risultato()
{
    if(vRisposte[0]!= vRisposte[1] && vRisposte[1]!= vRisposte[2]) ris = vRisposte[0];
    else if(vRisposte[0] === vRisposte[1]) ris = vRisposte[0];
    else if(vRisposte[0] === vRisposte[2]) ris = vRisposte[0];
    else ris = vRisposte[1];

    riempiDiv(ris);
}

function riempiDiv(ris) {

    const div = document.querySelector("#risultato");
    const title = document.querySelector("#risultato h1");
    const paragrafo = document.querySelector("#risultato p");


    title.textContent = RESULTS_MAP[ris].title;
    paragrafo.textContent = RESULTS_MAP[ris].contents;

    div.classList.remove('hidden');


    //rimuovo listener

    listenerCheck(0);
}


function restart() {

    const div = document.querySelector("#risultato");
    div.classList.add('hidden');

    listenerCheck(1);

    //reset variabili
    vRisposte.splice(0, vRisposte.length);
    r1 = false;
    r2 = false;
    r3 = false;

    //reset grafico

    for (let sect of listSect) {

        const listDiv = sect.querySelectorAll('div');

        for (let div of listDiv) {
            div.classList.remove('selezionato');
            div.classList.remove('nonSelezionato');
            div.querySelector('.checkbox').src = 'images/unchecked.png';
        }
    }


}

function listenerCheck(mode) {

    // 1 add 0 remove
    if(mode===1)
        for (let sect of listSect) {

            const listDiv = sect.querySelectorAll('div');

            for (let box of listDiv) {
                box.querySelector('.checkbox').addEventListener('click', spunta);
            }
        }
    else
        for (let sect of listSect) {

            const listDiv = sect.querySelectorAll('div');

            for (let box of listDiv) {
                box.querySelector('.checkbox').removeEventListener('click', spunta);
            }
        }
}

let ris; // risultato test
let r1,r2,r3; // controllo risposte domande
let vRisposte = []; //per salvare le scelte

let listSect = document.querySelectorAll('#sect1,#sect2,#sect3');

//listener

listenerCheck(1);

const btnRestart = document.querySelector('.button');
btnRestart.addEventListener('click', restart);
