import { FlatList, Text } from "react-native";
import ExpenseItem from "./ExpenseItem";

function renderExpenseitem(itemData){
    return <ExpenseItem {...itemData.item}/>
}

function ExpensesList({expenses}){
    return(
    <FlatList 
    data={expenses} 
    renderItem={renderExpenseitem}
    keyExtractor={(item) => item.id}
    />
    );
}

export default ExpensesList;