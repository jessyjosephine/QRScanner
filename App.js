/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {CameraKitCameraScreen} from 'react-native-camera-kit';

export default function App() {
  const [QRText, setQRText] = useState('');
  const [isCamScanning, setCamScanning] = useState(false);

  const openLink = () => {
    Linking.openURL(QRText);
  };

  const handleScan = QRCode => {
    setQRText(QRCode);
    setCamScanning(false);
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.header}>
            <Text style={styles.title}> QR Scanner</Text>
            <Text style={styles.subtitle}> with React Native</Text>
          </View>
          <View style={styles.contentContainer}>
            {QRText && !isCamScanning ? (
              <View style={styles.scanResult}>
                <Text style={styles.scanResultLabel}>{'Scanned QR Code:'}</Text>
                <Text style={styles.scanResultText}>{QRText}</Text>
                {(QRText.includes('http') || QRText.includes('www')) && (
                  <TouchableOpacity
                    onPress={openLink}
                    style={[styles.scanButton, {backgroundColor: '#235D9F'}]}>
                    <Text style={styles.scanButtonText}>Open Link</Text>
                  </TouchableOpacity>
                )}
              </View>
            ) : null}
            {isCamScanning && (
              <View style={styles.scanner}>
                <CameraKitCameraScreen
                  showFrame={isCamScanning}
                  scanBarcode={true}
                  laserColor={'#FF3D00'}
                  frameColor={'#00C853'}
                  colorForScannerFrame={'black'}
                  heightForScannerFrame={300}
                  onReadCode={event =>
                    handleScan(event.nativeEvent.codeStringValue)
                  }
                />
              </View>
            )}
            <TouchableOpacity
              onPress={() => setCamScanning(!isCamScanning)}
              style={[styles.scanButton, {backgroundColor: '#f96d01'}]}>
              <Text style={styles.scanButtonText}>
                {isCamScanning ? 'Close QR Scanner' : 'Open QR Scanner'}
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.footer}>
            Copyright &copy; 2019 {'\nPayment Web Engineer'}
          </Text>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    fontFamily: 'Courier-Bold',
    backgroundColor: '#e6eaed',
    height: '100%',
  },
  contentContainer: {
    flex: 1,
    margin: 16,
    padding: 30,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'transparent',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: '#fff',
    top: -80,
  },
  header: {
    margin: 'auto',
    paddingTop: 40,
    paddingBottom: 100,
    backgroundColor: '#1ba0e2',
  },
  title: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 5,
    textAlign: 'center',
  },
  scanResult: {
    width: '100%',
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
  },
  scanResultText: {
    fontSize: 20,
    color: '#1ba0e2',
    fontWeight: 'normal',
    textAlign: 'center',
    letterSpacing: 1,
    marginBottom: 30,
  },
  scanResultLabel: {
    fontSize: 14,
    color: '#434343',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    textAlign: 'center',
    marginBottom: 4,
  },
  scanButtonText: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  scanButton: {
    padding: 10,
    margin: 8,
    width: 300,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  scanner: {
    width: 300,
    height: 300,
    margin: 20,
    marginTop: 8,
  },
  headerImage: {
    width: '100%',
    height: 'auto',
  },
  footer: {
    fontSize: 10,
    color: 'grey',
    textAlign: 'center',
    position: 'relative',
    top: -80,
  },
});
