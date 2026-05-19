import React, { useCallback, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useNavigate, useParams, useLocation } from 'react-router-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CameraView, useCameraPermissions } from 'expo-camera';

const DARK = '#171717';
const DARK_CARD = '#242424';
const GRAY = '#666666';
const BRACKET_LEN = 22;
const BRACKET_THICK = 3;

export function PhotographReceiptPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { top } = useSafeAreaInsets();
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);

  const existingPhotos: string[] =
    (location.state as { photos?: string[] } | null)?.photos ?? [];

  const handleClose = useCallback(() => {
    navigate(`/tab/${id}`);
  }, [navigate, id]);

  const handleCapture = useCallback(async () => {
    const photo = await cameraRef.current?.takePictureAsync();
    if (photo) {
      // TODO: uploading photos to the BE will be handled as a separate task
      navigate(`/tab/${id}/confirm-payment`, {
        state: { photos: [...existingPhotos, photo.uri] },
      });
    }
  }, [navigate, id, existingPhotos]);

  const renderViewfinderContent = () => {
    if (!permission) {
      return <ActivityIndicator color={GRAY} />;
    }
    if (!permission.granted) {
      return (
        <View style={styles.permissionContent}>
          <Text style={styles.permissionText}>Camera access required</Text>
          <TouchableOpacity
            onPress={requestPermission}
            style={styles.permissionButton}
          >
            <Text style={styles.permissionButtonText}>Enable Camera</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return (
      <CameraView
        ref={cameraRef}
        style={StyleSheet.absoluteFill}
        facing="back"
      />
    );
  };

  const cameraReady = permission?.granted;

  return (
    <View style={styles.screen}>
      <View style={[styles.header, { height: 60 + top, paddingTop: top }]}>
        <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Photograph Receipt</Text>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.viewfinderWrapper}>
        <View style={styles.viewfinder}>
          {renderViewfinderContent()}

          <View style={[styles.bracketH, styles.tlH]} />
          <View style={[styles.bracketV, styles.tlV]} />
          <View style={[styles.bracketH, styles.trH]} />
          <View style={[styles.bracketV, styles.trV]} />
          <View style={[styles.bracketH, styles.blH]} />
          <View style={[styles.bracketV, styles.blV]} />
          <View style={[styles.bracketH, styles.brH]} />
          <View style={[styles.bracketV, styles.brV]} />

          {!cameraReady && <View style={styles.receiptIcon} />}
        </View>
      </View>

      <Text style={styles.instruction}>Position receipt within frame</Text>

      <View style={styles.captureArea}>
        <TouchableOpacity
          onPress={handleCapture}
          style={styles.captureOuter}
          disabled={!cameraReady}
        >
          <View
            style={[
              styles.captureInner,
              !cameraReady && styles.captureInnerDisabled,
            ]}
          />
        </TouchableOpacity>
        <Text style={styles.captureLabel}>Tap to capture</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: DARK,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 22,
  },
  closeButton: {
    width: 32,
    justifyContent: 'center',
  },
  closeText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 18,
    lineHeight: 22,
    color: '#FFFFFF',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontFamily: 'CormorantGaramond_700Bold',
    fontSize: 20,
    lineHeight: 24,
    color: '#FFFFFF',
  },
  headerSpacer: {
    width: 32,
  },
  viewfinderWrapper: {
    paddingHorizontal: 31.5,
    marginTop: 26,
  },
  viewfinder: {
    width: '100%',
    aspectRatio: 327 / 460,
    backgroundColor: DARK_CARD,
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  permissionContent: {
    alignItems: 'center',
    gap: 16,
  },
  permissionText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    lineHeight: 16,
    color: GRAY,
    textAlign: 'center',
  },
  permissionButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: 4,
  },
  permissionButtonText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    lineHeight: 16,
    color: '#FFFFFF',
  },
  bracketH: {
    position: 'absolute',
    width: BRACKET_LEN,
    height: BRACKET_THICK,
    backgroundColor: '#FFFFFF',
    borderRadius: 1,
  },
  bracketV: {
    position: 'absolute',
    width: BRACKET_THICK,
    height: BRACKET_LEN,
    backgroundColor: '#FFFFFF',
    borderRadius: 1,
  },
  tlH: { top: 0, left: 0 },
  tlV: { top: 0, left: 0 },
  trH: { top: 0, right: 0 },
  trV: { top: 0, right: 0 },
  blH: { bottom: 0, left: 0 },
  blV: { bottom: 0, left: 0 },
  brH: { bottom: 0, right: 0 },
  brV: { bottom: 0, right: 0 },
  receiptIcon: {
    width: 56,
    height: 76,
    borderWidth: 1.5,
    borderColor: GRAY,
  },
  instruction: {
    marginTop: 18,
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    lineHeight: 15,
    color: GRAY,
    textAlign: 'center',
  },
  captureArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 32,
  },
  captureOuter: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureInner: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#FFFFFF',
  },
  captureInnerDisabled: {
    backgroundColor: GRAY,
  },
  captureLabel: {
    marginTop: 8,
    fontFamily: 'Inter_400Regular',
    fontSize: 11,
    lineHeight: 13,
    color: GRAY,
  },
});
