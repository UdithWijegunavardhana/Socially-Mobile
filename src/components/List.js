import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Card, Title, Paragraph } from 'react-native-paper'
import Button from './Button'
import { theme } from './../core/theme'
import Apptext from './AppText'

const AppList = ({ amount, date, time }) => {
  return (
    <View style={styles.Card}>
      <Card style={styles.container} mode="elevated">
        {/* <Card.Cover source={image} style={styles.image} /> */}
        <Card.Content style={styles.content}>
          <Title style={styles.title} titleNumberOfLines={1}>
            {amount}
          </Title>
          <View style={styles.dateTime}>
            <Paragraph style={styles.description} numberOfLines={2}>
              {date}
            </Paragraph>
            <Paragraph style={styles.description} numberOfLines={2}>
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
    backgroundColor: '#F8F9FA',
    borderRadius: 2,
    marginBottom: 2,
    marginTop: 8,
    elevation: 20,
    borderRadius: 5,
    borderBottomColor: theme.colors.primary,
    borderBottomWidth: 6,
    shadowOffset: { width: 0, height: 50 },
  },
  Card: {
    marginHorizontal: 10,
  },
  image: {
    height: 100,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
  description: {
    fontSize: 15,
    color: theme.colors.medium,
    fontWeight: '600',
  },
  content: {
    height: 85,
    alignContent: 'center',
  },
  dateTime: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})

export default AppList
