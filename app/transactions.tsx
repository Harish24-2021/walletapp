import React, { useState } from "react";
import { Button, FlatList, Text, View } from "react-native";

interface Transaction {
  id: string;
  date: string;
  merchant: string;
  amount: string;
}

export default function TransactionsScreen() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [token, setToken] = useState<string | null>(null); // Make sure this is passed from login

  const fetchEmails = async () => {
    if (!token) return;

    const response = await fetch(
      "https://www.googleapis.com/gmail/v1/users/me/messages?q=from:alerts@hdfcbank.com",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const data = await response.json();
    console.log("Emails:", data);
  };

  return (
    <View>
      <Button title="Fetch Transactions" onPress={fetchEmails} />
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text>{item.date} - {item.merchant} - ₹{item.amount}</Text>
        )}
      />
    </View>
  );
}
