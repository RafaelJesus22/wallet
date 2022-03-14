import { StorageKey } from "../enums/StorageKey";
import { getItem, setItem } from "../utils";

export class UserService {
  async getShowUserInfo() {
    const res = await getItem(StorageKey.SHOW_USER_DATA);
  
    if (res.data) {
      return res.data;
    }
  
    return false;
  }
  
  async toggleShowUserInfo(show: boolean) {
    const res = await setItem(StorageKey.SHOW_USER_DATA, show);
  
    if (res.success) {
      return res.success;
    }
  
    return res;
  }
}