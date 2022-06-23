import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Card, Title, Paragraph } from 'react-native-paper'
import Button from './Button'
import { theme } from './../core/theme'
import Apptext from './AppText'

const AppList = ({ amount, date, time, Type }) => {
  if (Type === 'withdrawal') {
    styles.transactionType = {
      color: theme.colors.error,
      fontSize: 15,
      fontWeight: '500',
      marginTop: -10,
    }
  } else {
    styles.transactionType = {
      color: theme.colors.primary,
      fontSize: 15,
      fontWeight: '500',
      marginTop: -10,
    }
  }

  return (
    <View style={styles.Card}>
      <Card style={styles.container} mode="elevated">
        <Card.Content style={styles.content}>
          <View style={styles.amountType}>
            <Title style={styles.title} titleNumberOfLines={1}>
              ${amount}
            </Title>
            <Title style={styles.transactionType} titleNumberOfLines={1}>
              {Type}
            </Title>
          </View>
          <View style={styles.dateTime}>
            <Paragraph style={styles.description} numberOfLines={1}>
              {date}
            </Paragraph>
            <Paragraph style={styles.description} numberOfLines={1}>
              {time}
            </Paragraph>
          </View>
        </Card.Content>
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    borderRadius: 2,
  },
  Card: {
    marginHorizontal: 5,
    borderBottomColor:theme.colors.medium,
    borderBottomWidth:1,
    marginVertical:7,
    borderRadius:8
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: -10,
  },
  description: {
    fontSize: 14,
    color: theme.colors.medium,
    fontWeight: '600',
  },
  content: {
    height: 70,
    alignContent: 'center',
  },
  dateTime: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  amountType: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})

export default AppList
