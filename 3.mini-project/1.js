const expenses = [
    {
        title: "Food",
        amount: 200
    },
    {
        title: "Travel",
        amount: 500
    }
];

console.table(expenses);

const formattedexpenses = expenses.map(({title , amount}) => `${title} : ${amount}`);

const filteration = expenses.filter(expense => expense.title == "Food");

const total = expenses.reduce((sum, { amount }) => sum + amount, 0);

const getexpense = async () => {
    try {
        const response = await fetch("/expnses");

        if (!response.ok) {
            throw new error("Failed to fetch expenses");
        }
    } catch (error) {
        console.error("Error fetching expenses:", error);
    }

    const data = await response.json();
    console.log(data);
}

const [{ title, amount }] = expenses;