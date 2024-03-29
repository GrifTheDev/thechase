interface questionListItem {
    question: string,
    answerA: string,
    answerB: string,
    answerC: string,
    correctAnswer: string,
    difficulty: number
}

export const questionList: Array<questionListItem> = [
    {
        question: "Kolika je sada temperatura na Velebitu?",
        answerA: "20 stupnjeva",
        answerB: "5 stupnjeva",
        answerC: "1 stupanj",
        correctAnswer: "C",
        difficulty: 3,
    },
    {
        question: "Kako si?",
        answerA: "dobro",
        answerB: "lose",
        answerC: "ogavno",
        correctAnswer: "B",
        difficulty: 1
    },
    {
        question: "Kako se sada zove prije poznata platforma Twitter?",
        answerA: "Twittr",
        answerB: "Twooter",
        answerC: "X",
        correctAnswer: "C",
        difficulty: 1
    },

]