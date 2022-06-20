import { Platform } from 'react-native'

export const API ={
   host :  Platform.OS == 'android' ? 'https://uom-socially-api.herokuapp.com/':'http://locallhost:3000'
}
