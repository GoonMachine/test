import { useLocalStorage } from '@jup-ag/wallet-adapter';
import classNames from 'classnames';
import React, { useCallback, useEffect, useState } from 'react';
import CloseIcon from 'src/icons/CloseIcon';
import { V2_FEATURE_BUTTON_ID } from '../V2FeatureButton';

let shouldHide = false; // indicate that user close it once for the session, we dont need to show it again.

const TopBanner = () => {
  // Perps beta banner
  const [closeCount, setCloseCount] = useLocalStorage(`perpetual-beta-`, 0);
  const [close, setClose] = useState(true);
  useEffect(() => {
    if (shouldHide) {
      return;
    }
    if (closeCount && closeCount >= 1) {
      setClose(true);
    } else {
      setClose(false);
    }
  }, [closeCount]);

  const handleClose = () => {
    shouldHide = true;
    setClose(true);
    setCloseCount((prev) => (prev ? prev + 1 : 1));
  };

  const openV2Feature = useCallback(() => {
    if (typeof window === 'undefined') return;
    document.getElementById(V2_FEATURE_BUTTON_ID)?.click();
  }, [])


  return (
    <>

    </>
  );
};

export default TopBanner;
