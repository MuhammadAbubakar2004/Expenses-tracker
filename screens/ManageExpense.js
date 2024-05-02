import { useContext, useLayoutEffect, useState } from "react";
import {StyleSheet, View } from "react-native";

import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import Button from "../components/UI/Button";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { deleteExpense, storeExpense, updateExpense } from "../util/http";
import { setUpTests } from "react-native-reanimated";
import LoadingOverlay from "../components/UI/LoadingOverlay";

function ManageExpense({route, navigation}){
    const [isSubmitting, setIsSubmitting] = useState(false);
    const expensesCtx = useContext(ExpensesContext);

    const editExpenseId = route.params?.expenseId;
    const isEditing = !!editExpenseId;

    const selectedExpense = expensesCtx.expenses.find(
        expense => expense.id === editExpenseId);

    useLayoutEffect(() => {

        navigation.setOptions({
            title : isEditing? 'Edit Expense':"Add Expense",
        });

    },[navigation,isEditing]);

    async function deleteHandler(){
        setIsSubmitting(true);
        await deleteExpense(editExpenseId);
        expensesCtx.deleteExpense(editExpenseId);
        navigation.goBack();
    }
    function cancelHandler(){
        navigation.goBack();
    }
    async function confirmHandler(expenseData){
        setIsSubmitting(true);
        if(isEditing){
            expensesCtx.updateExpense(editExpenseId ,expenseData);
            await updateExpense(editExpenseId, expenseData);
        } else {
            const id = await storeExpense(expenseData);
            expensesCtx.addExpense({...expenseData , id: id});
        }
        navigation.goBack();
    }

    if(isSubmitting) {
        return <LoadingOverlay />
    }
    
    return (
        <View style={styles.container}>
            <ExpenseForm 
             submitButtonLabel={isEditing ? 'Update': 'Add'}
             onSubmit={confirmHandler}
             onCancel={cancelHandler}
             defaultValues={selectedExpense}/>
             
            {isEditing && (
                <View style={styles.deleteContainer}>
                <IconButton icon="trash" color={GlobalStyles.colors.error500} size={36} onPress={deleteHandler}/>
                </View>
            )}
        </View>
    )
}
export default ManageExpense;
const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:24,
        backgroundColor:GlobalStyles.colors.primary800,
    },
    deleteContainer:{
        marginTop:16,
        paddingTop:8,
        borderTopWidth:2,
        borderTopColor:GlobalStyles.colors.primary200,
        alignItems:'center',
    },
});
