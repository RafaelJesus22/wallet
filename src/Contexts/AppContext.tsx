import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import uuid from 'react-native-uuid';
import { PocketService } from '../services/pockets';
import { HistoryService } from '../services/History';
import { UserService } from '../services/user';
import {HistoryItemProps, PocketProps, TransactionType} from '../types';

interface AppContextData {
  total: number;
  pockets: PocketProps[];
  selectedPocket?: PocketProps;
  isShowingUserInfo: boolean;
  updateIsShowingUserInfo(): Promise<void>;
  updatePocket(pocket: PocketProps, type: TransactionType): Promise<void>;
  updateSelectedPocket(pocket: PocketProps): void;
  addPocket(pocket: PocketProps): Promise<void>;
  deletePocket(pocket: PocketProps): Promise<void>;
  getPocketHistory(): Promise<void>;
  pocketHistory: HistoryItemProps[];
}

const AppContext = createContext<AppContextData>({} as AppContextData);

export const AppProvider: React.FC = ({children}) => {
  const [total, setTotal] = useState(0);
  const [pockets, setPockets] = useState<PocketProps[]>([]);
  const [selectedPocket, setSelectedPocket] = useState<PocketProps>({} as PocketProps);
  const [isShowingUserInfo, setIsShowingUserInfo] = useState(false);
  const [pocketHistory, setPocketHistory] = useState<HistoryItemProps[]>([]);
  const userService = new UserService();
  const pocketService = new PocketService();
  const historyService = new HistoryService();

  const getStoragedIsShowingUserInfo = useCallback(async () => {
    const isShowingUserInfo = await userService.getShowUserInfo();
    setIsShowingUserInfo(isShowingUserInfo);
  }, []);

  const getStoragedPockets = async () => {
    const { success, data } = await pocketService.getPockets();

    if (success && data) {
      return setPockets(data);
    }

    return setPockets([]);
  };

  useEffect(() => {
    const getStorageData = async () => {
      await getStoragedIsShowingUserInfo();
      await getStoragedPockets();
    };
    getStorageData();
  }, [])

  async function updateIsShowingUserInfo() {
    const res = await userService.toggleShowUserInfo(!isShowingUserInfo);

    if (res) {
      await getStoragedIsShowingUserInfo();
    }
  }


  const handleUpdateTotal = async () => {
    setTotal(pockets.reduce((acc, curr) => acc + curr.value, 0));
  };

  async function updatePocket(pocket: PocketProps, type: TransactionType) {
    const updatedPocket = await pocketService.updatePocket(pocket);
    const value = type === 'save'
      ? pocket.value - selectedPocket.value
      : selectedPocket.value - pocket.value;

    if (updatedPocket.success) {
      await getStoragedPockets();

      const updatedPocket = pockets.find(p => p.id === pocket.id);
      
      if (updatedPocket) {
        const historyItem: HistoryItemProps = {
          id: uuid.v4().toString(),
          pocketId: pocket.id,
          date: new Date(),
          value,
          type,
        };

        await historyService.addToHistory(historyItem);
        await getPocketHistory();
        return setSelectedPocket(updatedPocket);
      }
    }

    if (updatedPocket.error) {
      return console.log('Erro ao atualizar a carteira');
    }
  }

  async function addPocket(pocket: PocketProps) {
    const { success, data, error } = await pocketService.addNewPocket(pocket);

    if (success && data) {
      await getStoragedPockets();
    }

    if (error) {
      return;
    }
  }

  async function deletePocket(pocket: PocketProps) {
    const { success } = await pocketService.deletePocket(pocket);

    if (success) {
      await getStoragedPockets();
    }
  }

  function updateSelectedPocket(pocket: PocketProps) {
    console.log('recebi', pocket);
    setSelectedPocket(pocket);
  }

  async function getPocketHistory() {
    const pocketHistory = await historyService.getPockethistory(selectedPocket.id);

    setPocketHistory(pocketHistory);
  }

  useEffect(() => {
    (async () => await handleUpdateTotal())();
  }, [handleUpdateTotal, pockets]);

  return (
    <AppContext.Provider
      value={{
        total,
        pockets,
        selectedPocket,
        isShowingUserInfo,
        updateIsShowingUserInfo,
        addPocket,
        updatePocket,
        deletePocket,
        updateSelectedPocket,
        getPocketHistory,
        pocketHistory,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const {
    total,
    pockets,
    selectedPocket,
    isShowingUserInfo,
    updateIsShowingUserInfo,
    addPocket,
    updatePocket,
    deletePocket,
    updateSelectedPocket,
    getPocketHistory,
    pocketHistory,
  } = useContext(AppContext);

  return {
    total,
    pockets,
    selectedPocket,
    isShowingUserInfo,
    updateIsShowingUserInfo,
    addPocket,
    updatePocket,
    deletePocket,
    updateSelectedPocket,
    getPocketHistory,
    pocketHistory,
  };
};
