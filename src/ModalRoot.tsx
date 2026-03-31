import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Color } from '@/styles';
import { useAppSelector } from '@/state-management/providerHooks';
import { useLayoutActions } from '@/state-management/layout';
import { ModalId } from '@/state-management/layout/enums';
import { useCreateTabActions } from '@/state-management/createTab';
import { CurrencyModal } from '@/components/modals/CurrencyModal';

const SHEET_HEIGHT = Dimensions.get('window').height * 0.75;
const DURATION = 240;

export function ModalRoot() {
  const activeModal = useAppSelector((state) => state.layout.activeModal);
  const currency = useAppSelector((state) => state.createTab.currency);
  const { setCurrency } = useCreateTabActions();
  const { hideModal } = useLayoutActions();

  // renderedModal trails activeModal so the closing animation fully plays
  // before the content is unmounted. The ref mirrors the state so the effect
  // can read the current value without it appearing in the deps array (which
  // would cause a double-fire on every state update).
  const [renderedModal, setRenderedModal] = useState<ModalId | null>(null);
  const renderedModalRef = useRef<ModalId | null>(null);

  const translateY = useRef(new Animated.Value(SHEET_HEIGHT)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;

  const animateIn = useCallback(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: DURATION,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(overlayOpacity, {
        toValue: 0.6,
        duration: DURATION,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();
  }, [translateY, overlayOpacity]);

  const animateOut = useCallback(
    (onDone: () => void) => {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: SHEET_HEIGHT,
          duration: DURATION,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 0,
          duration: DURATION,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start(onDone);
    },
    [translateY, overlayOpacity],
  );

  useEffect(() => {
    if (activeModal !== null) {
      translateY.setValue(SHEET_HEIGHT);
      overlayOpacity.setValue(0);
      renderedModalRef.current = activeModal;
      setRenderedModal(activeModal);
      animateIn();
    } else if (renderedModalRef.current !== null) {
      animateOut(() => {
        renderedModalRef.current = null;
        setRenderedModal(null);
      });
    }
  }, [activeModal, animateIn, animateOut, translateY, overlayOpacity]);

  if (renderedModal === null) {
    return null;
  }

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
      {/* Overlay */}
      <TouchableWithoutFeedback onPress={hideModal}>
        <Animated.View style={[styles.overlay, { opacity: overlayOpacity }]} />
      </TouchableWithoutFeedback>

      {/* Sheet */}
      <Animated.View style={[styles.sheet, { transform: [{ translateY }] }]}>
        <View style={styles.handle} />
        {renderContent(renderedModal, hideModal, currency, setCurrency)}
      </Animated.View>
    </View>
  );
}

function renderContent(
  modalId: ModalId,
  onDone: () => void,
  currency: { code: string; name: string },
  onSelectCurrency: (code: string, name: string) => void,
): React.ReactNode {
  switch (modalId) {
    case ModalId.CurrencyPicker: {
      return (
        <CurrencyModal
          selectedCode={currency.code}
          onSelect={onSelectCurrency}
          onDone={onDone}
        />
      );
    }
  }
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Color.Black,
  },
  sheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: SHEET_HEIGHT,
    backgroundColor: Color.Ivory,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: Color.Sand,
    alignSelf: 'center',
    marginTop: 10,
  },
});
