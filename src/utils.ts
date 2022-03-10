import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageKey } from './enums/StorageKey';

export async function getItem(storageKey: StorageKey) {
  try {
    const value = await AsyncStorage.getItem(storageKey);
    return {success: true, data: JSON.parse(value || '{}')};
  } catch (error) {
    return {success: false, error};
  }
}

export async function setItem(storageKey: StorageKey, value: any) {
  try {
    await AsyncStorage.setItem(storageKey, JSON.stringify(value));
    return {success: true};
  } catch (error) {
    return {success: false, error};
  }
}

export function removeDots(text: string) {
  return text.replace(/\./g, '');
}

export function delay(s: number) {
  return new Promise(resolve => setTimeout(resolve, s * 1000));
}