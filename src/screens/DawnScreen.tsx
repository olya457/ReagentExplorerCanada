import React, { useEffect, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  Platform,
} from 'react-native';
import { WebView } from 'react-native-webview';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Dawn'>;

const dawnBackdrop = require('../assets/images/veil_land.png');
const centerEmblem = require('../assets/images/orbit_seed.png');

export default function DawnScreen({ navigation }: Props) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Prelude');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigation]);

  const hourglassHtml = useMemo(
    () => `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<meta
  name="viewport"
  content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
/>
<style>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: transparent;
  }

  body {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .hourglassBackground {
    position: relative;
    background-color: rgba(255, 255, 255, 0.10);
    height: 130px;
    width: 130px;
    border-radius: 50%;
    margin: 0 auto;
    border: 1px solid rgba(255,255,255,0.14);
  }

  .hourglassContainer {
    position: absolute;
    top: 30px;
    left: 40px;
    width: 50px;
    height: 70px;
    animation: hourglassRotate 2s ease-in 0s infinite;
    transform-style: preserve-3d;
    perspective: 1000px;
  }

  .hourglassContainer div,
  .hourglassContainer div:before,
  .hourglassContainer div:after {
    transform-style: preserve-3d;
  }

  @keyframes hourglassRotate {
    0% {
      transform: rotateX(0deg);
    }

    50% {
      transform: rotateX(180deg);
    }

    100% {
      transform: rotateX(180deg);
    }
  }

  .hourglassCapTop {
    top: 0;
  }

  .hourglassCapTop:before {
    top: -25px;
  }

  .hourglassCapTop:after {
    top: -20px;
  }

  .hourglassCapBottom {
    bottom: 0;
  }

  .hourglassCapBottom:before {
    bottom: -25px;
  }

  .hourglassCapBottom:after {
    bottom: -20px;
  }

  .hourglassGlassTop {
    transform: rotateX(90deg);
    position: absolute;
    top: -16px;
    left: 3px;
    border-radius: 50%;
    width: 44px;
    height: 44px;
    background-color: rgba(220, 226, 232, 0.70);
  }

  .hourglassGlass {
    perspective: 100px;
    position: absolute;
    top: 32px;
    left: 20px;
    width: 10px;
    height: 6px;
    background-color: rgba(220, 226, 232, 0.70);
    opacity: 0.5;
  }

  .hourglassGlass:before,
  .hourglassGlass:after {
    content: '';
    display: block;
    position: absolute;
    background-color: rgba(220, 226, 232, 0.70);
    left: -17px;
    width: 44px;
    height: 28px;
  }

  .hourglassGlass:before {
    top: -27px;
    border-radius: 0 0 25px 25px;
  }

  .hourglassGlass:after {
    bottom: -27px;
    border-radius: 25px 25px 0 0;
  }

  .hourglassCurves:before,
  .hourglassCurves:after {
    content: '';
    display: block;
    position: absolute;
    top: 32px;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: rgba(44, 48, 56, 0.92);
    animation: hideCurves 2s ease-in 0s infinite;
  }

  .hourglassCurves:before {
    left: 15px;
  }

  .hourglassCurves:after {
    left: 29px;
  }

  @keyframes hideCurves {
    0% {
      opacity: 1;
    }

    25% {
      opacity: 0;
    }

    30% {
      opacity: 0;
    }

    40% {
      opacity: 1;
    }

    100% {
      opacity: 1;
    }
  }

  .hourglassSandStream:before {
    content: '';
    display: block;
    position: absolute;
    left: 24px;
    width: 3px;
    background-color: #F7E7B4;
    animation: sandStream1 2s ease-in 0s infinite;
  }

  .hourglassSandStream:after {
    content: '';
    display: block;
    position: absolute;
    top: 36px;
    left: 19px;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-bottom: 6px solid #F7E7B4;
    animation: sandStream2 2s ease-in 0s infinite;
  }

  @keyframes sandStream1 {
    0% {
      height: 0;
      top: 35px;
    }

    50% {
      height: 0;
      top: 45px;
    }

    60% {
      height: 35px;
      top: 8px;
    }

    85% {
      height: 35px;
      top: 8px;
    }

    100% {
      height: 0;
      top: 8px;
    }
  }

  @keyframes sandStream2 {
    0% {
      opacity: 0;
    }

    50% {
      opacity: 0;
    }

    51% {
      opacity: 1;
    }

    90% {
      opacity: 1;
    }

    91% {
      opacity: 0;
    }

    100% {
      opacity: 0;
    }
  }

  .hourglassSand:before,
  .hourglassSand:after {
    content: '';
    display: block;
    position: absolute;
    left: 6px;
    background-color: #F7E7B4;
    perspective: 500px;
  }

  .hourglassSand:before {
    top: 8px;
    width: 39px;
    border-radius: 3px 3px 30px 30px;
    animation: sandFillup 2s ease-in 0s infinite;
  }

  .hourglassSand:after {
    border-radius: 30px 30px 3px 3px;
    animation: sandDeplete 2s ease-in 0s infinite;
  }

  @keyframes sandFillup {
    0% {
      opacity: 0;
      height: 0;
    }

    60% {
      opacity: 1;
      height: 0;
    }

    100% {
      opacity: 1;
      height: 17px;
    }
  }

  @keyframes sandDeplete {
    0% {
      opacity: 0;
      top: 45px;
      height: 17px;
      width: 38px;
      left: 6px;
    }

    1% {
      opacity: 1;
      top: 45px;
      height: 17px;
      width: 38px;
      left: 6px;
    }

    24% {
      opacity: 1;
      top: 45px;
      height: 17px;
      width: 38px;
      left: 6px;
    }

    25% {
      opacity: 1;
      top: 41px;
      height: 17px;
      width: 38px;
      left: 6px;
    }

    50% {
      opacity: 1;
      top: 41px;
      height: 17px;
      width: 38px;
      left: 6px;
    }

    90% {
      opacity: 1;
      top: 41px;
      height: 0;
      width: 10px;
      left: 20px;
    }

    100% {
      opacity: 0;
      top: 41px;
      height: 0;
      width: 10px;
      left: 20px;
    }
  }
</style>
</head>
<body>
  <div class="hourglassBackground">
    <div class="hourglassContainer">
      <div class="hourglassCurves"></div>
      <div class="hourglassCapTop"></div>
      <div class="hourglassGlassTop"></div>
      <div class="hourglassSand"></div>
      <div class="hourglassSandStream"></div>
      <div class="hourglassCapBottom"></div>
      <div class="hourglassGlass"></div>
    </div>
  </div>
</body>
</html>
`,
    [],
  );

  return (
    <ImageBackground
      source={dawnBackdrop}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.centerWrap}>
          <Image
            source={centerEmblem}
            style={styles.centerImage}
            resizeMode="contain"
          />

          <View style={styles.webShell}>
            <WebView
              originWhitelist={['*']}
              source={{ html: hourglassHtml }}
              style={styles.webView}
              scrollEnabled={false}
              bounces={false}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              overScrollMode="never"
              androidLayerType="hardware"
              javaScriptEnabled
              domStorageEnabled
              automaticallyAdjustContentInsets={false}
            />
          </View>

          <Text style={styles.loadingText}>Loading route…</Text>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(7, 10, 14, 0.34)',
  },
  centerWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  centerImage: {
    width: 220,
    height: 220,
    marginBottom: 18,
  },
  webShell: {
    width: 160,
    height: 160,
    backgroundColor: 'transparent',
    marginBottom: 10,
  },
  webView: {
    flex: 1,
    backgroundColor: 'transparent',
    opacity: Platform.OS === 'android' ? 0.99 : 1,
  },
  loadingText: {
    marginTop: 4,
    fontSize: 15,
    fontWeight: '600',
    color: '#F3F6FA',
    letterSpacing: 0.4,
  },
});