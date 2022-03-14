import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { PocketService } from '../services/pockets';
import { HistoryService } from '../services/History';
import { getShowUserInfo, toggleShowUserInfo } from '../services/user';
import {HistoryItemProps, PocketProps} from '../types';

interface AppContextData {
  total: number;
  pockets: PocketProps[];
  selectedPocket?: PocketProps;
  isShowingUserInfo: boolean;
  loading: boolean;
  updateLoading: () => void;
  updateIsShowingUserInfo(): Promise<void>;
  updatePocket(pocket: PocketProps): Promise<void>;
  updateSelectedPocket(pocket: PocketProps): void;
  addPocket(pocket: PocketProps): Promise<void>;
  deletePocket(pocket: PocketProps): Promise<void>;
  getPocketHistory(): Promise<HistoryItemProps[]>;
}

const AppContext = createContext<AppContextData>({} as AppContextData);

export const AppProvider: React.FC = ({children}) => {
  const [total, setTotal] = useState(0);
  const [loading, setloading] = useState(false);
  const [pockets, setPockets] = useState<PocketProps[]>([]);
  const [selectedPocket, setSelectedPocket] = useState<PocketProps>({} as PocketProps);
  const [isShowingUserInfo, setIsShowingUserInfo] = useState(false);
  const pocketService = new PocketService();
  const historyService = new HistoryService();

  const getStoragedIsShowingUserInfo = useCallback(async () => {
    const isShowingUserInfo = await getShowUserInfo();
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
    const res = await toggleShowUserInfo(!isShowingUserInfo);

    if (res) {
      await getStoragedIsShowingUserInfo();
    }
  }

  const updateLoading = () => {
    setloading(!loading);
  };

  const handleUpdateTotal = async () => {
    setTotal(pockets.reduce((acc, curr) => acc + curr.value, 0));
  };

  async function updatePocket(pocket: PocketProps) {
    const updatedPocket = await pocketService.updatePocket(pocket);

    if (updatedPocket.success) {
      await getStoragedPockets();

      const updatedPocket = pockets.find(p => p.id === pocket.id);

      if (updatedPocket) {
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

    return pocketHistory;
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
        loading,
        updateLoading,
        updateIsShowingUserInfo,
        addPocket,
        updatePocket,
        deletePocket,
        updateSelectedPocket,
        getPocketHistory,
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
  };
};
