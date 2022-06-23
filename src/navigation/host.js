import { Platform } from 'react-native'

export const API ={
   host :  Platform.OS == 'android' ? 'https://uom-socially-api.herokuapp.com/':'http://localhost:3000/'
}

// uom-socially-api.herokuapp.com
