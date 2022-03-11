import React, { useCallback } from 'react';
import { View, StyleSheet,  TouchableOpacity } from 'react-native';
import { PocketAmount } from '../atoms/PocketAmount';
import { PocketTitle } from '../atoms/PocketTitle';
import { PocketGoal } from '../atoms/PocketGoal';
import { PocketProps } from '../../types';
import { useAppContext } from '../../Contexts/AppContext';
import { useNavigation } from '@react-navigation/native';
import { Screens } from '../../enums/Screens';

interface PocketItemProps {
  pocket: PocketProps;
}

export const PocketItem: React.FC<PocketItemProps> = ({  pocket }) => {
  const { updateSelectedPocket } = useAppContext();
  const navigation = useNavigation();

  const handlePress = useCallback(() => {
    updateSelectedPocket(pocket);
    navigation.navigate(Screens.POCKET_DETAILS, {
      pocket,
    });
  }, []);

  return (
    <TouchableOpacity onPress={handlePress} style={styles.container} activeOpacity={0.9}>
      <View style={styles.pocketInfo}>
        <PocketTitle>{pocket.name}</PocketTitle>
        <PocketAmount>
          R$ {Number(pocket.value).toFixed(2).replace('.', ',')}
        </PocketAmount>
        {pocket.goal && <PocketGoal goal={pocket.goal} />}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  pocketInfo: { padding: 16, paddingBottom: 16, marginTop: 12 },
});