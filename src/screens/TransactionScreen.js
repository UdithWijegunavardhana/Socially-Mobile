import React, { useState } from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { theme } from './../core/theme'
import AppList from '../components/List'

const Transactions = [
  {
    id: 'T001',
    amount: '$190.00',
    date: '2nd January 2020',
    time: '8:00 AM',
  },
  {
    id: 'T002',
    amount: '$240.00',
    date: '4th February 2020',
    time: '2:00 PM',
  },
  {
    id: 'T003',
    amount: '$345.00',
    date: '10th March 2020',
    time: '1:00 PM',
  },
  {
    id: 'T004',
    amount: '$100.00',
    date: '4th April 2020',
    time: '9:00 AM',
  },
  {
    id: 'T005',
    amount: '$120.00',
    date: '1st May 2020',
    time: '11:00 PM',
  },
  {
    id: 'T006',
    amount: '$32.00',
    date: '5th June 2020',
    time: '11:00 PM',
  },
  {
    id: 'T007',
    amount: '$32.00',
    date: '1st July 2020',
    time: '11:00 PM',
  },
  {
    id: 'T008',
    amount: '$180.00',
    date: '1th June 2020',
    time: '11:00 PM',
  },
]

const TransactionScreen = ({ navigation }) => {
  const [data, setData] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()

  return (
    <SafeAreaView style={{ backgroundColor: theme.colors.white }}>
      <View style={{ marginTop: 5, backgroundColor: theme.colors.white }}>

        <FlatList
          data={Transactions}
          keyExtractor={(Transactions) => Transactions.id.toString()}
          style={{
            shadowColor: theme.colors.medium,
            shadowOpacity: 0.6,
            shadowOffset: { height: 5, width: 0 },
          }}
          renderItem={({ item }) => (
            <AppList 
            amount={item.amount} 
            date={item.date} 
            time={item.time} 
            />
          )}
        />
      </View>
    </SafeAreaView>
  )
}

export default TransactionScreen

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    textAlign: 'left',
    marginBottom: 10,
    marginLeft: 11,
    fontWeight: 'bold',
    color: theme.colors.dark,
  },
})
