import { NativeRouter, Route, Routes } from 'react-router-native';
import { NavigationContainer } from '@react-navigation/native';

export const Root = () => {
  return (
    <NavigationContainer>
      <NativeRouter>
        <Routes>
          {/* Add routes here */}
        </Routes>
      </NativeRouter>
    </NavigationContainer>
  );
};
