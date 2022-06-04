import React, { useState, useEffect } from 'react'
import { View, StyleSheet, SafeAreaView, FlatList } from 'react-native'
import Constants from 'expo-constants'
import { filter } from 'lodash'
import { Searchbar, IconButton, Menu, Divider } from 'react-native-paper'
import { AuthContext } from '../helpers/Utils'
import { theme } from './../core/theme'
import AppCard from '../components/AppCard'

// const advertisements = [
//   {
//     id: 1,
//     title: 'Up to 50% off !',
//     description:
//       'This is description of the first advertisements. It is more long and long. Only two lines wil display to the user. Then there is a end',
//     image: require('../assets/singer.png'),
//     paymentInformation: '$20.0/ Per Sale',
//   },
//   {
//     id: 2,
//     title: 'Daraz.lk Fashion week',
//     description: 'This is description of the second advertisement',
//     image: require('../assets/daraz.jpg'),
//     paymentInformation: '$5.0/ Per Sale',
//   },
//   {
//     id: 3,
//     title: 'Up to 50% off !',
//     description: 'This is description of the first advertisement',
//     image: require('../assets/singer.png'),
//     paymentInformation: '$20.0/ Per Sale',
//   },
//   {
//     id: 4,
//     title: 'Up to 50% off !',
//     description: 'This is description of the first advertisement',
//     image: require('../assets/singer.png'),
//     paymentInformation: '$20.0/ Per Sale',
//   },
//   {
//     id: 5,
//     title: 'Daraz.lk Fashion week',
//     description: 'This is description of the second advertisement',
//     image: require('../assets/daraz.jpg'),
//     paymentInformation: '$5.0/ Per Sale',
//   },
// ]

export default function ViewAdsScreen({ navigation }) {
  const [data, setData] = useState()
  //const [image, setImage] = useState()
  const [searchQuery, setSearchQuery] = useState('')
  const [visible, setVisible] = useState(false)

  //API Connection - creative data
  var axios = require('axios')
  var config = {
    method: 'get',
    url: 'http://10.0.2.2:3000/creative',
    headers: {},
  }

  useEffect(() => {
    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data))
        setData(response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  }, [])

  // var delay = 15000
  // setTimeout(() => {
  // }, delay)

  const openMenu = () => setVisible(true)

  const closeMenu = () => setVisible(false)

  const onChangeSearch = (searchQuery) => {
    if (searchQuery) {
      const formatedData = searchQuery.toLowerCase()
      const filterData = filter(data, (creative) => {
        return contains(creative, formatedData)
      })
      setData(filterData)
      setSearchQuery(formatedData)
    } else {
      setData(data)
    }
  }

  const contains = ({ creativeHeading, creativeDescription }, searchQuery) => {
    if (
      creativeHeading.toLowerCase().includes(searchQuery) ||
      creativeDescription.toLowerCase().includes(searchQuery)
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
        keyExtractor={(data) => data.creativeId.toString()}
        contentContainerStyle={{ paddingBottom: 60 }}
        style={{
          shadowColor: theme.colors.medium,
          shadowOpacity: 0.7,
          shadowOffset: { height: 5, width: 0 },
        }}
        renderItem={({ item }) => (
          <AppCard
            image={item.image}
            title={item.creativeHeading}
            description={item.creativeDescription}
            paymentInformation={'$ ' + item.costPerSale + ' / Per Sale'}
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
