import React, { createContext, useContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FontSizeContext = createContext();

export function FontSizeProvider({ children }) {
  const [fontSizeMultiplier, setFontSizeMultiplier] = useState(1);

  const increaseFontSize = async () => {
    if (fontSizeMultiplier < 1.5) {
      const newSize = fontSizeMultiplier + 0.1;
      setFontSizeMultiplier(newSize);
      await AsyncStorage.setItem('@font_size', newSize.toString());
    }
  };

  const decreaseFontSize = async () => {
    if (fontSizeMultiplier > 0.8) {
      const newSize = fontSizeMultiplier - 0.1;
      setFontSizeMultiplier(newSize);
      await AsyncStorage.setItem('@font_size', newSize.toString());
    }
  };

  // Load saved font size on app start
  React.useEffect(() => {
    async function loadFontSize() {
      try {
        const savedSize = await AsyncStorage.getItem('@font_size');
        if (savedSize) {
          setFontSizeMultiplier(parseFloat(savedSize));
        }
      } catch (error) {
        console.error('Error loading font size:', error);
      }
    }
    loadFontSize();
  }, []);

  return (
    <FontSizeContext.Provider value={{ fontSizeMultiplier, increaseFontSize, decreaseFontSize }}>
      {children}
    </FontSizeContext.Provider>
  );
}

export function useFontSize() {
  return useContext(FontSizeContext);
}