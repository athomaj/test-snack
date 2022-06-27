import AsyncStorage from "@react-native-async-storage/async-storage"

export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value)
  } catch (e) {
    // saving error
  }
}

export const storeDataObject = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem(key, jsonValue)
  } catch (e) {
    // saving error
  }
}

export const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key)
    if (value !== null) {
      return value
    }
  } catch (e) {
    // error reading value
  }
}

export const getDataObject = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key)
    if (jsonValue !== null) {
      return JSON.parse(jsonValue)
    }
  } catch (e) {
    // error reading value
  }
}

export const deleteData = async (key) => {
  try {
    await AsyncStorage.removeItem(key)
  } catch (e) {
    // saving error
  }
}