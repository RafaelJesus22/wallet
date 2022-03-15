import { StorageKey } from "../enums/StorageKey";
import { HistoryItemProps } from "../types";
import { getItem, setItem } from "../utils";

export class HistoryService {
  async getHistory() {
    const { data } = await getItem(StorageKey.HISTORY);

    if (!data || data === []) {
      return [];
    }

    return data;
  }

  private async setHistory(history: HistoryItemProps[]) {
    const { success, error } = await setItem(StorageKey.HISTORY, history);

    if (!success) {
      return { success, error };
    }

    return { success };
  }

  async getPockethistory(pocketId: string): Promise<HistoryItemProps[]> {
    const { data } = await getItem(StorageKey.HISTORY);

    if (!data || data === []) {
      return [];
    }

    const pocketHistory = data.filter(
      (history: HistoryItemProps) => history.pocketId === pocketId
    );

    return pocketHistory;
  }

  async addToHistory(historyItem: HistoryItemProps) {
    const history = await this.getHistory();
    const newHistory = [historyItem, ...history];

    return await this.setHistory(newHistory);
  }
}
