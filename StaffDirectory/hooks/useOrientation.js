import { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';

export default function useOrientation() {
  const [orientation, setOrientation] = useState(
    Dimensions.get('window').width > Dimensions.get('window').height 
      ? 'LANDSCAPE' 
      : 'PORTRAIT'
  );

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setOrientation(window.width > window.height ? 'LANDSCAPE' : 'PORTRAIT');
    });

    return () => {
      // clean up subscription when component unmounts
      subscription.remove();
    };
  }, []);

  return orientation;
}