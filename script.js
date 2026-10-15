'use strict';
const questions = [
    'JavaScript',
    'document',
    'window',
    'getElementById',
    'getElementsByClassName',
    'addEventListener'
];
const entered = document.getElementById('entered');
const remained = document.getElementById('remained');
const inputText = document.getElementById('inputText');
const game = document.getElementById('game');
const message = document.getElementById('message');
const replayBtn = document.getElementById('replayBtn');
let remainedTextWords = remained.textContent.split('');
let enteredTextWords = [];
let currentKey;
let currentText;
// 新しい問題文をランダムにセットする関数
const setQuestion = () => {
    currentKey = Math.floor(Math.random() * questions.length);
    currentText = questions[currentKey];
    // 一度選ばれた問題は配列から削除
    questions.splice(currentKey, 1);
    entered.textContent = '';
    remained.textContent = currentText;
    inputText.value = '';
    enteredTextWords = [];
    remainedTextWords = currentText.split('');
};
setQuestion();
document.addEventListener('input', (e) => {
    const { data } = e;
    if (data && remainedTextWords[0].toLowerCase() === data.toLowerCase()) {
        enteredTextWords.push(remainedTextWords[0]);
        remainedTextWords.shift();
        entered.textContent = enteredTextWords.join('');
        remained.textContent = remainedTextWords.join('');
        if (remainedTextWords.length <= 0) {
            if (questions.length <= 0) {
                game.classList.add('hidden');
                message.classList.remove('hidden');
            }
            else {
                setQuestion();
            }
        }
    }
});
replayBtn.addEventListener('click', () => {
    window.location.reload();
});
