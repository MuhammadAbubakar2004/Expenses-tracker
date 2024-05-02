import { useContext, useEffect, useState } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { getDateminusDAys } from "../util/date";
import { fetchExpenses } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";

function RecentExpenses(){
    const [isFetching, setIsFetching]= useState(true);
    const expensesCtx = useContext(ExpensesContext);
    
    useEffect(() => {
        async function getExpense() {
            setIsFetching(true);
            const expenses = await fetchExpenses();
            setIsFetching(false);
            expensesCtx.setExpense(expenses);
        }
        getExpense();
    },[]);

    if (isFetching) {
        return<LoadingOverlay/>
    }

    const recentExpenses = expensesCtx.expenses.filter((expense) => {
        const today = new Date();
        const date7Days = getDateminusDAys(today, 7);

        return (expense.date >= date7Days) && (expense.date <= today);
    })
    return < ExpensesOutput
     expenses={recentExpenses}
     expensesPeriod="Last 7 days"
     fallbackText="No Expenses registered for last 7 Days."
     />
}
export default RecentExpenses;
