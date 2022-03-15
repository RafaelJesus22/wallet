import uuid from 'react-native-uuid';

import { StorageKey } from "../enums/StorageKey";
import { HistoryItemProps, PocketProps } from "../types";
import { getItem, setItem } from "../utils";
import { HistoryService } from "./History";

export interface GetPocketsResponse {
  success: boolean;
  data: PocketProps[],
  error: any,
} 

export class PocketService {
  private historyService = new HistoryService();

  async getPockets(): Promise<GetPocketsResponse> {
    const res = await getItem(StorageKey.POCKETS);
  
    if (res.success) {
      return {
        success: true,
        data: res.data,
        error: null,
      };
    }
  
    return {
      success: false,
      data: [],
      error: res.error,
    };
  }

  async addNewPocket(pocket: PocketProps) {
    const storagedPockets = await this.getPockets();
  
    if (storagedPockets.error) {
      return {success: false, error: 'Houve um erro ao adicionar sua carteira'};
    }
  
    const newPockets = [...storagedPockets.data, pocket];
    const addedPocket = await setItem(StorageKey.POCKETS, newPockets);
  
    if (addedPocket.success) {
      const historyItemToAdd: HistoryItemProps = {
        id: uuid.v4().toString(),
        pocketId: pocket.id,
        date: new Date(),
        value: pocket.value,
        type: 'creation',
      };

      const addedToHistory = await this.historyService.addToHistory(historyItemToAdd);

      console.log({success: true, data: newPockets, addedToHistory});
      return {success: true, data: newPockets, addedToHistory};
    }
  
    return {success: false, error: 'Houve um erro ao adicionar sua carteira'};
  }

  async updatePocket(pocket: PocketProps) {
    const storagedPockets = await this.getPockets();
  
    if (storagedPockets.error) {
      return {success: false, error: 'Houve um erro ao atualizar sua carteira'};
    }
  
    const updatedPockets = storagedPockets?.data?.map((p: PocketProps) => {
      if (p.id === pocket.id) {
        return pocket;
      }
  
      return p;
    });
  
    const updatedPocket = await setItem(StorageKey.POCKETS, updatedPockets);
  
    if (updatedPocket.success) {
      return {success: true, data: updatedPockets};
    }
  
    return {success: false, error: 'Houve um erro ao atualizar sua carteira'};
  }

  async deletePocket(pocket: PocketProps) {
    const storagedPockets = await this.getPockets();
  
    if (storagedPockets.error) {
      return {success: false, error: 'Houve um erro ao deletar sua carteira'};
    }
  
    const remainingPockets = storagedPockets?.data?.filter((p: PocketProps) => p.id !== pocket.id);
  
    const deletedPocket = await setItem(StorageKey.POCKETS, remainingPockets);
  
    if (deletedPocket.success) {
      return {success: true, data: remainingPockets};
    }
  
    return {success: false, error: 'Houve um erro ao deletar sua carteira'};
  }
}
