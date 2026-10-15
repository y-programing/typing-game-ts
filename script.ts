'use strict';

const questions: string[] = [
    'JavaScript',
    'document',
    'window',
    'getElementById',
    'getElementsByClassName',
    'addEventListener'
];

const entered = document.getElementById('entered') as HTMLSpanElement;
const remained = document.getElementById('remained') as HTMLSpanElement;
const inputText = document.getElementById('inputText') as HTMLInputElement;
const game = document.getElementById('game') as HTMLDivElement;
const message = document.getElementById('message') as HTMLDivElement;
const replayBtn = document.getElementById('replayBtn') as HTMLButtonElement;

let remainedTextWords: string[] = remained.textContent!.split('');
let enteredTextWords: string[] = [];
let currentKey: number;
let currentText: string;

// 新しい問題文をランダムにセットする関数
const setQuestion = (): void => {
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

document.addEventListener('input', (e: Event) => {
    const { data } = e as InputEvent;

    if (data && remainedTextWords[0].toLowerCase() === data.toLowerCase()) {
        enteredTextWords.push(remainedTextWords[0]);
        remainedTextWords.shift();

        entered.textContent = enteredTextWords.join('');
        remained.textContent = remainedTextWords.join('');

        if (remainedTextWords.length <= 0) {
            if (questions.length <= 0) {
                game.classList.add('hidden');
                message.classList.remove('hidden');
            } else {
                setQuestion();
            }
        }
    }
});

replayBtn.addEventListener('click', () => {
    window.location.reload();
});