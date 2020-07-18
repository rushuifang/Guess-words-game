let catagories = [
    ["baseball", "basketball", "swimming", "running", "frisbee"],
    ["it", "alien", "jaws", "knives out"],
    ["binghamton", "london", "beijing", "tokyo", "lima"],
];
let randCatagory = catagories[Math.floor(Math.random() * catagories.length)];
let randWord = randCatagory[Math.floor(Math.random() * randCatagory.length)];
let myLives = 5;
let showCatagoryName = document.getElementById("catagoryName");
let showLives = document.getElementById("lives");
let showHolder = document.getElementById("lettersholder");
let letterDash;
let guess;
let counter = 0;
let guesses = [];
let correct = document.createElement("ul");
let space = 0; // number of spaces in the word

let imgContainer = document.getElementById("img-container");
let block1 = document.createElement("DIV");
let block2 = document.createElement("DIV");
let block3 = document.createElement("DIV");
let block4 = document.createElement("DIV");
let block5 = document.createElement("DIV");
let imgIt = document.createElement("IMG");

imgIt.setAttribute("src", "pennywise.jpg");
imgIt.setAttribute("id", "img-Pennywise");
block1.setAttribute("id", "test-block1");
block2.setAttribute("id", "test-block2");
block3.setAttribute("id", "test-block3");
block4.setAttribute("id", "test-block4");
block5.setAttribute("id", "test-block5");
imgContainer.appendChild(imgIt);
imgContainer.appendChild(block1);
imgContainer.appendChild(block2);
imgContainer.appendChild(block3);
imgContainer.appendChild(block4);
imgContainer.appendChild(block5);

if (randCatagory == catagories[0]) {
    showCatagoryName.innerHTML = "This random catagory is about sports";
} else if (randCatagory == catagories[1]) {
    showCatagoryName.innerHTML = "This random catagory is about films";
} else if (randCatagory == catagories[2]) {
    showCatagoryName.innerHTML = "This random catagory is about cities";
}

let holderInit = function () {
    for (let i = 0; i < randWord.length; i++) {
        correct.setAttribute("id", "my-word");
        letterDash = document.createElement("li");
        letterDash.setAttribute("class", "letterDash");
        if (randWord[i] === " ") {
            letterDash.innerHTML = " ";
            space += 1;
        } else {
            letterDash.innerHTML = "_";
        }
        guesses.push(letterDash);
        showHolder.appendChild(correct);
        correct.appendChild(letterDash);
    }
};

let lifeStatus = function () {
    showLives.innerHTML = "❤️  :  " + myLives + " left";
    if (myLives < 1) {
        showLives.innerHTML = "Game Over!";
    }
    for (let i = 0; i < guesses.length; i++) {
        if (counter + space === guesses.length) {
            showLives.innerHTML = "You Won!";
            imgIt.setAttribute("src", "celebration.gif");
            imgIt.style.zIndex = 100;
        }
    }
};
holderInit();
lifeStatus();

const Keyboard = {
    elements: {
        main: null,
        keysContainer: null,
        keys: [],
    },

    eventHandlers: {
        oninput: null,
        onclose: null,
    },

    properties: {
        value: "",
        capsLock: false,
    },

    init() {
        // Create main elements
        this.elements.main = document.createElement("div");
        this.elements.keysContainer = document.createElement("div");

        // Setup main elements
        this.elements.main.classList.add("keyboard", "keyboard--hidden");
        this.elements.keysContainer.classList.add("keyboard__keys");
        this.elements.keysContainer.appendChild(this._createKeys());

        this.elements.keys = this.elements.keysContainer.querySelectorAll(
            ".keyboard__key"
        );

        // Add to DOM
        this.elements.main.appendChild(this.elements.keysContainer);
        document.body.appendChild(this.elements.main);
    },

    _createKeys() {
        const fragment = document.createDocumentFragment();
        const keyLayout = [
            "q",
            "w",
            "e",
            "r",
            "t",
            "y",
            "u",
            "i",
            "o",
            "p",
            "a",
            "s",
            "d",
            "f",
            "g",
            "h",
            "j",
            "k",
            "l",
            "z",
            "x",
            "c",
            "v",
            "b",
            "n",
            "m",
        ];

        // Creates HTML for an icon
        const createIconHTML = (icon_name) => {
            return `<i class="material-icons">${icon_name}</i>`;
        };

        keyLayout.forEach((key) => {
            const keyElement = document.createElement("button");
            const insertLineBreak = ["p", "l", "m"].indexOf(key) !== -1;

            // Add attributes/classes
            keyElement.setAttribute("type", "button");
            keyElement.classList.add("keyboard__key");

            keyElement.textContent = key.toLowerCase();

            keyElement.addEventListener("click", () => {
                this.properties.value += this.properties.capsLock
                    ? key.toUpperCase()
                    : key.toLowerCase();
                this._triggerEvent("oninput");
                // Check if players' selected letter is in the random word
                // alert(keyElement.innerHTML);
                for (let i = 0; i < randWord.length; i++) {
                    if (randWord[i] === keyElement.innerHTML) {
                        guesses[i].innerHTML = keyElement.innerHTML;
                        counter += 1;
                        lifeStatus();
                    }
                }
                if (randWord.indexOf(keyElement.innerHTML) == -1) {
                    myLives -= 1;
                    lifeStatus();
                }
                switch (myLives) {
                    case 4:
                        block5.classList.add("block-hidden");
                        break;
                    case 3:
                        block4.classList.add("block-hidden");
                        break;
                    case 2:
                        block3.classList.add("block-hidden");
                        break;
                    case 1:
                        block2.classList.add("block-hidden");
                        break;
                    case 0:
                        block1.classList.add("block-hidden");
                        break;
                }
                keyElement.classList.add("disable-key");
            });

            fragment.appendChild(keyElement);

            if (insertLineBreak) {
                fragment.appendChild(document.createElement("br"));
            }
        });
        return fragment;
    },

    _triggerEvent(handlerName) {
        if (typeof this.eventHandlers[handlerName] == "function") {
            this.eventHandlers[handlerName](this.properties.value);
        }
    },
};

window.addEventListener("DOMContentLoaded", function () {
    Keyboard.init();
});
