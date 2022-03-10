import { StorageKey } from "../enums/StorageKey";
import { getItem, setItem } from "../utils";

export async function getShowUserInfo() {
  const res = await getItem(StorageKey.SHOW_USER_DATA);
  console.log('getShowUserInfo', res);

  if (res.data) {
    return res.data;
  }

  return false;
}

export async function toggleShowUserInfo(show: boolean) {
  const res = await setItem(StorageKey.SHOW_USER_DATA, show);
  console.log('toggleShowUserInfo', res);

  if (res.success) {
    return res.success;
  }

  return res;
}