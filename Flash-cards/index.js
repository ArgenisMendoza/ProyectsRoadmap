const Questions = [
    {question: "What is JavaScript, what does it look like and what can it do?", answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id perspiciatis ullam delectus itaque libero a eum, illum quaerat est tempora expedita, culpa enim vitae fuga earum ipsum facere optio quod.1"},
    {question: "What is the diference between var, let and const?.1", answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id perspiciatis ullam delectus itaque libero a eum, illum quaerat est tempora expedita, culpa enim vitae fuga earum ipsum facere optio quod.2"},
    {question: "What is the diference between var, let and const?.2", answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id perspiciatis ullam delectus itaque libero a eum, illum quaerat est tempora expedita, culpa enim vitae fuga earum ipsum facere optio quod.3"},
    {question: "What is the diference between var, let and const?.3", answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id perspiciatis ullam delectus itaque libero a eum, illum quaerat est tempora expedita, culpa enim vitae fuga earum ipsum facere optio quod.4"},
    {question: "What is the diference between var, let and const?.4", answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id perspiciatis ullam delectus itaque libero a eum, illum quaerat est tempora expedita, culpa enim vitae fuga earum ipsum facere optio quod.5"},
    {question: "What is the diference between var, let and const?.5", answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id perspiciatis ullam delectus itaque libero a eum, illum quaerat est tempora expedita, culpa enim vitae fuga earum ipsum facere optio quod.6"},
    {question: "What is the diference between var, let and const?.6", answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id perspiciatis ullam delectus itaque libero a eum, illum quaerat est tempora expedita, culpa enim vitae fuga earum ipsum facere optio quod.7"},
    {question: "What is the diference between var, let and const?.7", answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id perspiciatis ullam delectus itaque libero a eum, illum quaerat est tempora expedita, culpa enim vitae fuga earum ipsum facere optio quod.8"},
    {question: "What is the diference between var, let and const?.8", answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id perspiciatis ullam delectus itaque libero a eum, illum quaerat est tempora expedita, culpa enim vitae fuga earum ipsum facere optio quod.9"},
    {question: "What is the diference between var, let and const?.9", answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id perspiciatis ullam delectus itaque libero a eum, illum quaerat est tempora expedita, culpa enim vitae fuga earum ipsum facere optio quod.10"},
    {question: "What is the diference between var, let and const?.10", answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id perspiciatis ullam delectus itaque libero a eum, illum quaerat est tempora expedita, culpa enim vitae fuga earum ipsum facere optio quod.11"},
    {question: "What is the diference between var, let and const?.11", answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id perspiciatis ullam delectus itaque libero a eum, illum quaerat est tempora expedita, culpa enim vitae fuga earum ipsum facere optio quod.12"},
    {question: "What is the diference between var, let and const?.12", answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id perspiciatis ullam delectus itaque libero a eum, illum quaerat est tempora expedita, culpa enim vitae fuga earum ipsum facere optio quod.13"},
    {question: "What is the diference between var, let and const?.13", answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id perspiciatis ullam delectus itaque libero a eum, illum quaerat est tempora expedita, culpa enim vitae fuga earum ipsum facere optio quod.14"},
    {question: "What is the diference between var, let and const?.14", answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id perspiciatis ullam delectus itaque libero a eum, illum quaerat est tempora expedita, culpa enim vitae fuga earum ipsum facere optio quod.15"},
    {question: "What is the diference between var, let and const?.15", answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id perspiciatis ullam delectus itaque libero a eum, illum quaerat est tempora expedita, culpa enim vitae fuga earum ipsum facere optio quod.16"},
    {question: "What is the diference between var, let and const?.16", answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id perspiciatis ullam delectus itaque libero a eum, illum quaerat est tempora expedita, culpa enim vitae fuga earum ipsum facere optio quod.17"},
    {question: "What is the diference between var, let and const?.17", answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id perspiciatis ullam delectus itaque libero a eum, illum quaerat est tempora expedita, culpa enim vitae fuga earum ipsum facere optio quod.18"},
    {question: "What is the diference between var, let and const?.18", answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id perspiciatis ullam delectus itaque libero a eum, illum quaerat est tempora expedita, culpa enim vitae fuga earum ipsum facere optio quod.19"},
    {question: "What is the diference between var, let and const?.19", answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id perspiciatis ullam delectus itaque libero a eum, illum quaerat est tempora expedita, culpa enim vitae fuga earum ipsum facere optio quod.20"},
];
let progress, perc, counter, questions, current = 0, showAnswer = false;
function updateCard() {
    const question = Questions[current];
    questions = document.getElementById('question');
    if (showAnswer) {
        questions.innerText = question.answer;
        questions.style.fontSize = "14px";
    } else {
        questions.innerText = question.question;
        questions.style.fontSize = "18px";
    }
    progress = document.getElementById('progress');
    const percent = ((current + 1) / Questions.length) * 100;
    progress.style.width = `${percent}%`;
    const count = current + 1;
    counter = document.getElementById('counter');
    counter.innerHTML = count + " of " + Questions.length;
    perc = document.getElementById('percent');
    perc.innerHTML = percent + "%";
}

function Next() {
    if (current < Questions.length - 1) {
        current++;
        showAnswer = false;
        updateCard();
    }
}
function Prev() {
    if (current > 0) {
        current--;
        showAnswer = false;
        updateCard();
    }
}
function Show() {
    showAnswer = !showAnswer;
    updateCard();
}

updateCard();
