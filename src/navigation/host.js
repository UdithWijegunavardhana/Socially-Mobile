import { Platform } from 'react-native'

export const API ={
   host :  Platform.OS == 'android' ? 'http://10.0.2.2:3000':'http://locallhost:3000'
}
