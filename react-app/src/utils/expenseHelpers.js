// takes in a list of expenses and returns normalized object, grouping expenses by YYYY-MM
export const groupExpensesByMonth = (expensesList) => {
    const sorted = expensesList.sort((a,b)=>{
        const date1 = new Date(a.expenseDate)
        const date2 = new Date(b.expenseDate)
        return date2.valueOf() - date1.valueOf()
    })

    const groupedByMonthSet = {};

    for (const expense of sorted) {
        const date = new Date(expense.expenseDate);
        const monthYear = `${date.getFullYear()}-${date.getMonth() + 1}`;

        if (!(monthYear in groupedByMonthSet)) {
            groupedByMonthSet[monthYear] = [expense]
        } else {
            groupedByMonthSet[monthYear].push(expense)
        }
    }
    return groupedByMonthSet
}
