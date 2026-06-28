const operators = ["+", "-", "*"];

const randomNum = () =>
    Math.floor(Math.random() * 10) + 1;

const randomOperator = () =>
    operators[
    Math.floor(Math.random() * operators.length)
    ];

const shuffle = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
};

export const getQuestion = () => {
    try {

        let expression = "";

        // 30% chance to create a bracket expression
        if (Math.random() < 0.3) {

            expression =
                `(${randomNum()} ${randomOperator()} ${randomNum()}) ` +
                `${randomOperator()} ${randomNum()} ` +
                `${randomOperator()} ${randomNum()}`;

        } else {

            expression = `${randomNum()}`;

            for (let i = 0; i < 4; i++) {
                expression += ` ${randomOperator()} ${randomNum()}`;
            }

        }

        // BODMAS evaluation
        const correctAnswer = Math.round(
            Function(`return (${expression})`)()
        );

        const optionSet = new Set();

        optionSet.add(correctAnswer);

        while (optionSet.size < 4) {

            const diff =
                Math.floor(Math.random() * 11) - 5;

            const value =
                correctAnswer +
                (diff === 0 ? 3 : diff);

            if (value >= 0) {
                optionSet.add(value);
            }

        }

        const options = [...optionSet];

        shuffle(options);

        return {

            question: `${expression} = ?`,

            options: options.map(String),

            answer: options.indexOf(correctAnswer)

        };

    } catch (error) {

        console.error(error);

        return {

            question: "(4 + 6) × 2 - 3 = ?",

            options: [
                "17",
                "20",
                "16",
                "19"
            ],

            answer: 0

        };

    }
};