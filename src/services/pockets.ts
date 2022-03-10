import { StorageKey } from "../enums/StorageKey";
import { PocketProps } from "../types";
import { getItem, setItem } from "../utils";

export async function getStoragedPockets() {
  const res =  await getItem(StorageKey.POCKETS);
  
  if (res.success) {
    return res.data;
  }

  return res.error;
}

export async function addNewPocket(pocket: PocketProps) {
  const storagedPockets = await getStoragedPockets();

  if (storagedPockets.error) {
    return {success: false, error: 'Houve um erro ao adicionar sua carteira'};
  }

  const newPockets = [...storagedPockets, pocket];
  const addedPocket = await setItem(StorageKey.POCKETS, newPockets);

  if (addedPocket.success) {
    return {success: true, data: newPockets};
  }

  return {success: false, error: 'Houve um erro ao adicionar sua carteira'};
}

export async function updatePocket(pocket: PocketProps) {
  const storagedPockets = await getStoragedPockets();

  if (storagedPockets.error) {
    return {success: false, error: 'Houve um erro ao atualizar sua carteira'};
  }

  const updatedPockets = storagedPockets.map((p: PocketProps) => {
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
