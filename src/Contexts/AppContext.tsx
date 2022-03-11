import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { PocketService } from '../services/pockets';
import { getShowUserInfo, toggleShowUserInfo } from '../services/user';
import {PocketProps} from '../types';

interface AppContextData {
  total: number;
  pockets: PocketProps[];
  selectedPocket?: PocketProps;
  isShowingUserInfo: boolean;
  updateIsShowingUserInfo(): Promise<void>;
  updatePocket(pocket: PocketProps): Promise<void>;
  updateSelectedPocket(pocket: PocketProps): void;
  addPocket(pocket: PocketProps): Promise<void>;
  deletePocket(pocket: PocketProps): Promise<void>;
}

const AppContext = createContext<AppContextData>({} as AppContextData);

export const AppProvider: React.FC = ({children}) => {
  const [total, setTotal] = useState(100.98);
  const [pockets, setPockets] = useState<PocketProps[]>([]);
  const [selectedPocket, setSelectedPocket] = useState<PocketProps>();
  const [isShowingUserInfo, setIsShowingUserInfo] = useState(false);
  const pocketService = new PocketService();

  const getStoragedIsShowingUserInfo = useCallback(async () => {
    const isShowingUserInfo = await getShowUserInfo();
    setIsShowingUserInfo(isShowingUserInfo);
  }, []);

  const getStoragedPockets = useCallback(async () => {
    const { success, data } = await pocketService.getPockets();

    if (success && data) {
      return setPockets(data);
    }

    return setPockets([]);
  }, []);

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

  const handleUpdateTotal = useCallback(async () => {
    setTotal(pockets.reduce((acc, curr) => acc + curr.value, 0));
  }, [pockets]);

  async function updatePocket(pocket: PocketProps) {
    const updatedPocket = await pocketService.updatePocket(pocket);

    if (updatedPocket.success) {
      return await getStoragedPockets();
    }

    if (updatedPocket.error) {
      return;
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
    setSelectedPocket(pocket);
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
  };
};
