import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import {PocketProps} from '../types';

interface AppContextData {
  total: number;
  pockets: PocketProps[];
  selectedPocket?: PocketProps;
  isShowingUserInfo: boolean;
  updateIsShowingUserInfo(): Promise<void>;
  updateTotal(value: number): Promise<void>;
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

  async function updateIsShowingUserInfo() {
    setIsShowingUserInfo(!isShowingUserInfo);
  }

  const handleUpdateTotal = useCallback(async () => {
    setTotal(pockets.reduce((acc, curr) => acc + curr.value, 0));
  }, [pockets]);

  async function updateTotal(value: number) {
    setTotal(value);
  }

  async function updatePocket(pocket: PocketProps) {
    const index = pockets.findIndex(p => p.name === pocket.name);
    const newPockets = [...pockets];
    newPockets[index] = pocket;
    setPockets(newPockets);
  }

  async function addPocket(pocket: PocketProps) {
    setPockets([...pockets, pocket]);
  }

  async function deletePocket(pocket: PocketProps) {
    const index = pockets.findIndex(p => p.name === pocket.name);
    const newPockets = [...pockets];
    newPockets.splice(index, 1);
    setPockets(newPockets);
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
        updateTotal,
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
    updateTotal,
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
    updateTotal,
    addPocket,
    updatePocket,
    deletePocket,
    updateSelectedPocket,
  };
};
