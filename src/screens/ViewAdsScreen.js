import React, { useState } from 'react'
import { View, StyleSheet, SafeAreaView, FlatList } from 'react-native'
import Constants from 'expo-constants'
import { filter } from 'lodash'
import { Searchbar, IconButton, Menu, Divider } from 'react-native-paper'

import { theme } from './../core/theme'
import AppCard from '../components/AppCard'

const advertisements = [
  {
    id: 1,
    title: 'Up to 50% off !',
    description:
      'This is description of the first advertisements. It is more long and long. Only two lines wil display to the user. Then there is a end',
    image: require('../assets/singer.png'),
    paymentInformation: '$20.0/ Per Sale',
  },
  {
    id: 2,
    title: 'Daraz.lk Fashion week',
    description: 'This is description of the second advertisement',
    image: require('../assets/daraz.jpg'),
    paymentInformation: '$5.0/ Per Sale',
  },
  {
    id: 3,
    title: 'Up to 50% off !',
    description: 'This is description of the first advertisement',
    image: require('../assets/singer.png'),
    paymentInformation: '$20.0/ Per Sale',
  },
  {
    id: 4,
    title: 'Up to 50% off !',
    description: 'This is description of the first advertisement',
    image: require('../assets/singer.png'),
    paymentInformation: '$20.0/ Per Sale',
  },
  {
    id: 5,
    title: 'Daraz.lk Fashion week',
    description: 'This is description of the second advertisement',
    image: require('../assets/daraz.jpg'),
    paymentInformation: '$5.0/ Per Sale',
  },
]

const ViewAdsScreen = () => {
  const [data, setData] = useState(advertisements)
  const [searchQuery, setSearchQuery] = useState('')
  const [visible, setVisible] = useState(false)

  const openMenu = () => setVisible(true)

  const closeMenu = () => setVisible(false)

  const onChangeSearch = (searchQuery) => {
    if (searchQuery) {
      const formatedData = searchQuery.toLowerCase()
      const filterData = filter(advertisements, (advertisement) => {
        return contains(advertisement, formatedData)
      })
      setData(filterData)
      setSearchQuery(formatedData)
    } else {
      setData(advertisements)
    }
  }

  const contains = ({ title, description }, searchQuery) => {
    if (
      title.toLowerCase().includes(searchQuery) ||
      description.toLowerCase().includes(searchQuery)
    ) {
      return true
    }
    return false
  }

  return (
    <SafeAreaView style={{ padding: 5, backgroundColor: theme.colors.white }}>
      <View style={styles.searchBarContainer}>
        <Searchbar
          placeholder="Search"
          onChangeText={(searchQuery) => onChangeSearch(searchQuery)}
          autoCapitalize="none"
          style={styles.searchBar}
        />
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <IconButton
              icon="tune-vertical"
              color={theme.colors.medium}
              size={35}
              style={styles.filterIcon}
              onPress={openMenu}
            />
          }
        >
          <Menu.Item onPress={() => {}} title="Best Match" />
          <Divider />
          <Menu.Item onPress={() => {}} title="Ending soonest" />
          <Divider />
          <Menu.Item onPress={() => {}} title="Newly listed" />
        </Menu>
      </View>
      <FlatList
        data={data}
        keyExtractor={(data) => data.id.toString()}
        contentContainerStyle={{ paddingBottom: 60 }}
        style={{
          shadowColor: theme.colors.medium,
          shadowOpacity: 0.7,
          shadowOffset: { height: 5, width: 0 },
        }}
        renderItem={({ item }) => (
          <AppCard
            image={item.image}
            title={item.title}
            description={item.description}
            paymentInformation={item.paymentInformation}
          />
        )}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  searchBarContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    padding: 0,
    margin: 0,
  },
  searchBar: {
    flex: 1,
    marginVertical: 10,
    height: 45,
    fontSize: 18,
  },
  filterIcon: {
    borderWidth: 2,
    borderRadius: 2,
    height: 47,
    width: 47,
    marginVertical: 10,
    borderColor: theme.colors.border,
    borderRadius: 4,
    backgroundColor: theme.colors.white,
    marginLeft: 5,
    marginRight: 0,
    elevation: 5,
  },
})

export default ViewAdsScreen
