// ?web speech API - MDN --> speech synthesis --full browser support


// ?select DOM elements
const main = document.querySelector('main');
const voicesSelect = document.getElementById('voices');
const textarea = document.getElementById('text');
const readBtn = document.getElementById('read');
const toggleBtn = document.getElementById('toggle');
const closeBtn = document.getElementById('close');

// ? vectorul data contine 1 obiect cu diferite valori: poza+text

const data = [
  {
    image: './img/drink.jpg',
    text: "I'm Thirsty"
  },
  {
    image: './img/food.jpg',
    text: "I'm Hungry"
  },
  {
    image: './img/tired.jpg',
    text: "I'm Tired"
  },
  {
    image: './img/hurt.jpg',
    text: "I'm Hurt"
  },
  {
    image: './img/happy.jpg',
    text: "I'm Happy"
  },
  {
    image: './img/angry.jpg',
    text: "I'm Angry"
  },
  {
    image: './img/sad.jpg',
    text: "I'm Sad"
  },
  {
    image: './img/scared.jpg',
    text: "I'm Scared"
  },
  {
    image: './img/outside.jpg',
    text: 'I Want To Go Outside'
  },
  {
    image: './img/home.jpg',
    text: 'I Want To Go Home'
  },
  {
    image: './img/school.jpg',
    text: 'I Want To Go To School'
  },
  {
    image: './img/grandma.jpg',
    text: 'I Want To Go To Grandmas'
  }
];

data.forEach(createBox);

//? Create speech boxes
function createBox(item){
  //* console.log(item);

  // ?creez divul care tine fiecare obiect din array direct din js
  // ? la fiecare iteratie in array se va crea un div
  const box = document.createElement('div');

  // ? destructuring --> destructurez obiectul si iau image si text din el
  const {image, text} = item;

  // ? adaug dinamic clasa box
  box.classList.add('box');

  //?modific continutul clasei box: adaug pozele si textul
  box.innerHTML = `
    <img src="${image}" alt="${text}" />
    <p class="info">${text}</p>
  `;

  // ?speak event --> sa se auda textul de sub poze( din obj data)
  box.addEventListener('click', ()=>{
    // ?apelez functiile create mai joc
    setTextMessage(text);
    speakText();

    // ?adaug clasa .active
    box.classList.add('active');
    // ? dupa 8 secunde/ 800milisecs --> se scoate clasa adugta
    setTimeout(() => box.classList.remove('active'), 800);
  });

  // ?pt fiecare iteratie in vector trebuie sa adaugam cutia --appendChild
  main.appendChild(box);
}

// ? --> trebuie initializat speech synth ca sa se auda vocile --> init speech synt
const message = new SpeechSynthesisUtterance();

// ?creez vectorul care stocheaza vocile
let voices = [];

function getVoices(){
  // ?metoda getVoices() ia vocile din API si le stocheaza in vectorul creat
  voices = speechSynthesis.getVoices();


  /*
  ?1. parcurg vectorul ci voci si pt fiecare voce(forEach) creez un element/ o optiune-->createElement(option)
  ?2.elementul/ obtinea creata are 2 valori: numume si limba(limba este adaugata interactiv cu innerText)
  ?3. adaugam vocile din API in vector cu .appendChild(option)
   */
  voices.forEach(voice => {
    const option = document.createElement('option');

    option.value = voice.name;
    option.innerText = `${voice.name} ${voice.lang}`;

    voicesSelect.appendChild(option);
  });
}
// ?set text creare functie
function setTextMessage(text){
  // ?pe obj message apelez metoda text si setez valoarea text din obiect
  message.text = text;
}

// ?vorbeste textul
function speakText(){
  speechSynthesis.speak(message);
}

// ? Set voice --> functia care permite alegerea unei voci diferite
function setVoice(e){
  message.voice = voices.find(voice => voice.name === e.target.value);
}



// ? Voices changed
speechSynthesis.addEventListener('voiceschanged', getVoices);


// ? Toggle text box
/*
?1. adaug event listener pe butonul cu id toggle --> toggleBtn
?2. eventListener are 2 parametrii: actiunea click si o functie care adauga clasa show la elemetul cu id text-box --> cutia in care se scrie text
?3. prima data selectam elementul --> document.getElementById('text-box')
?4. apoi adauga clasa show --> classList.toggle('show')
?5 se adauga cu toggle nu cu add --> daca apas din nou pe btn dispare cutia cu scrie --> are efect de toggle, nu e clasa statica
*/
toggleBtn.addEventListener('click', ()=> document.getElementById('text-box').classList.toggle('show')
);

// ? Close button --> scot clasa show a.i butonul X - sa inchida caseta cu text
/*
? pasii sunt asemanatori cu cei anteriori
*/
closeBtn.addEventListener('click', ()=> document.getElementById('text-box').classList.remove('show')
);



// ?Change voice --> sa pot alege voci diferite din lista
voicesSelect.addEventListener('change', setVoice);

// ?Read text button -- citeste text in caseta in care se scrie textul
readBtn.addEventListener('click', ()=>{
  setTextMessage(textarea.value);
  speakText();
});

getVoices();




