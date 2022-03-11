import React from 'react';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../config/styles';

interface Props {
  type: 'light' | 'dark';
}

export const ArrowBack: React.FC<Props> = ({
  type,
}) => {
  const navigation = useNavigation();

  return (
    <Entypo
      name="chevron-left"
      color={type === 'light' ? Colors.backGround : Colors.text}
      size={32}
      onPress={() => navigation.goBack()}
    />
  );
};