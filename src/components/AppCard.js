import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Card, Title, Paragraph } from 'react-native-paper'
import Button from './Button'
import { theme } from './../core/theme'
import Apptext from './AppText'
// import { ShareService } from './../services/ShareService'
import { onShare } from './../services/ShareService'

const AppCard = ({ image, title, description, paymentInformation }) => {
  const onShared = () => {
    const url = 'https://youtu.be/D6xkbGLQesk'
    onShare('My App', 'Hello check this amazing discount!', url)
  }
  return (
    <Card style={styles.container} mode="elevated">
      <Card.Cover source={image} style={styles.image} />
      <Card.Content style={styles.content}>
        <Title style={styles.title} titleNumberOfLines={1}>
          {title}
        </Title>
        <Paragraph style={styles.description} numberOfLines={2}>
          {description}
        </Paragraph>
      </Card.Content>
      <Card.Actions style={styles.actionContainer}>
        <View style={styles.paymentTag}>
          <Apptext style={styles.paymentTagText}>{paymentInformation}</Apptext>
        </View>
        <Button
          mode="contained"
          icon="share"
          uppercase={false}
          style={styles.shareButton}
          labelStyle={{ fontSize: 22, lineHeight: 15 }}
          onPress={onShared}
        >
          <Text style={{ fontSize: 14 }}>Share</Text>
        </Button>
      </Card.Actions>
    </Card>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.light,
    borderRadius: 2,
    marginBottom: 10,
    elevation: 20,
  },
  image: {
    height: 130,
  },
  shareButton: {
    width: 94,
    height: 35,
    paddingVertical: 0,
  },
  paymentTag: {
    backgroundColor: 'red',
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  paymentTagText: {
    paddingHorizontal: 10,
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.colors.white,
  },
  actionContainer: {
    justifyContent: 'space-between',
    height: 65,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
  },
  description: {
    fontSize: 12,
    color: theme.colors.medium,
  },
  content: {
    height: 70,
  },
})

export default AppCard
