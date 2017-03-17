'use strict';

function rnd(n) {
    return Math.floor(Math.random() * (n + 1));
}

var proverb = {};
var counter = {
    success: 0,
    error: 0
};
var nodeText = document.querySelector('.js-proverb-part');
var nodeInput = document.querySelector('.js-proverb-input');
var nodeSubmit = document.querySelector('.js-proverb-submit');
var nodeNext = document.querySelector('.js-proverb-next');
var nodeProverbText = document.querySelector('.js-proverb-text');
var nodeSuccess = document.querySelector('.js-proverb-success');
var nodeError = document.querySelector('.js-proverb-error');

function newRandomProverb() {
    proverb.full = proverbs[rnd(proverbs.length - 1)];

    var middle = Math.round(proverb.full.length / 2);
    proverb.part1 = proverb.full.substr(0, middle);
    proverb.part2 = proverb.full.substr(middle);
    console.log(proverb);
}

function writeProverbPart() {
    newRandomProverb();
    nodeText.innerHTML = proverb.part1 + '...';
}

writeProverbPart();

function hideMessages() {
    nodeSuccess.style.display = 'none';
    nodeError.style.display = 'none';
}

function updateCounter() {
    document.querySelector('.js-counter-success').innerHTML = counter.success;
    document.querySelector('.js-counter-error').innerHTML = counter.error;
}

function checkUserValue() {
    var value = nodeInput.value.toLowerCase().replace(/[^0-9a-zа-яА-ЯёЁ]/gi, '');
    var currentProverb = proverb.full.toLowerCase().replace(/[^0-9a-zа-яА-ЯёЁ]/gi, '');
    var currentProverbPart2 = proverb.part2.toLowerCase().replace(/[^0-9a-zа-яА-ЯёЁ]/gi, '');

    hideMessages();

    if (currentProverb.indexOf(value) != -1 && value.indexOf(currentProverbPart2) != -1) {
        nodeSuccess.style.display = 'block';
        counter.success++;
    } else {
        nodeError.style.display = 'block';
        counter.error++;
    }

    nodeProverbText.innerHTML = proverb.full;
    nodeSubmit.setAttribute('disabled', 'true');
    updateCounter();
}

nodeSubmit.addEventListener('click', checkUserValue);

document.addEventListener("keydown", function(event){
    if (event.code === 'Enter') {
        checkUserValue();
    }
});

nodeNext.addEventListener('click', function() {
    hideMessages();
    nodeProverbText.innerHTML = '';
    nodeInput.value = '';
    nodeInput.focus();
    nodeSubmit.removeAttribute('disabled');
    writeProverbPart();
});
