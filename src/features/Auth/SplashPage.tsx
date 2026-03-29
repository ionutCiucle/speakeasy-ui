import React, { useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigate, Link } from 'react-router-native';
import { Color, flex } from '../../styles';
import { Button } from '../components';

export function SplashPage() {
  const navigate = useNavigate();

  const handleGetStarted = useCallback(() => {
    navigate('/register');
  }, [navigate]);

  return (
    <View style={styles.container}>
      <View style={styles.topBar} />

      <View style={styles.cornerBracketTopLeft} />
      <View style={styles.cornerBracketTopLeftVertical} />
      <View style={styles.cornerBracketTopRight} />
      <View style={styles.cornerBracketTopRightVertical} />

      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>S</Text>
          <View style={styles.dotLarge} />
          <View style={styles.dotMedium} />
          <View style={styles.dotSmall} />
        </View>

        <Text style={styles.brandName}>SPEAKEASY</Text>
        <View style={styles.brandUnderline} />

        <Text style={styles.tagline}>Never lose track of the night</Text>

        <View style={styles.ornament}>
          <View style={styles.ornamentLine} />
          <View style={styles.ornamentSquare} />
          <View style={styles.ornamentLine} />
        </View>

        <Button label="Get Started" onPress={handleGetStarted} style={styles.button} />

        <Link to="/login">
          <Text style={styles.signInText}>Already a member? Sign In</Text>
        </Link>
      </View>

      <View style={styles.bottomBar} />

      <View style={styles.cornerBracketBottomLeft} />
      <View style={styles.cornerBracketBottomLeftVertical} />
      <View style={styles.cornerBracketBottomRight} />
      <View style={styles.cornerBracketBottomRightVertical} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.Cream,
  },
  topBar: {
    height: 4,
    backgroundColor: Color.Gold,
  },
  bottomBar: {
    height: 4,
    backgroundColor: Color.Gold,
  },
  cornerBracketTopLeft: {
    position: 'absolute',
    top: 20,
    left: 20,
    width: 35,
    height: 1.5,
    backgroundColor: Color.Gold,
  },
  cornerBracketTopLeftVertical: {
    position: 'absolute',
    top: 20,
    left: 20,
    width: 1.5,
    height: 35,
    backgroundColor: Color.Gold,
  },
  cornerBracketTopRight: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 35,
    height: 1.5,
    backgroundColor: Color.Gold,
  },
  cornerBracketTopRightVertical: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 1.5,
    height: 35,
    backgroundColor: Color.Gold,
  },
  cornerBracketBottomLeft: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    width: 35,
    height: 1.5,
    backgroundColor: Color.Gold,
  },
  cornerBracketBottomLeftVertical: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    width: 1.5,
    height: 35,
    backgroundColor: Color.Gold,
  },
  cornerBracketBottomRight: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 35,
    height: 1.5,
    backgroundColor: Color.Gold,
  },
  cornerBracketBottomRightVertical: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 1.5,
    height: 35,
    backgroundColor: Color.Gold,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 31.5,
  },
  logoContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  logo: {
    fontFamily: 'CormorantGaramond_700Bold',
    fontSize: 112,
    lineHeight: 136,
    color: Color.Gold,
  },
  dotLarge: {
    position: 'absolute',
    width: 12.32,
    height: 12.32,
    borderRadius: 6.16,
    backgroundColor: Color.Gold,
    top: 23.52,
    left: 41.76,
  },
  dotMedium: {
    position: 'absolute',
    width: 8.38,
    height: 8.38,
    borderRadius: 4.19,
    backgroundColor: Color.Gold,
    top: 13.66,
    left: 60.24,
  },
  dotSmall: {
    position: 'absolute',
    width: 5.17,
    height: 5.17,
    borderRadius: 2.585,
    backgroundColor: Color.Gold,
    top: 5.04,
    left: 73.79,
  },
  brandName: {
    fontFamily: 'CormorantGaramond_600SemiBold',
    fontSize: 34,
    lineHeight: 41,
    letterSpacing: 8,
    color: Color.Espresso,
    marginBottom: 8,
  },
  brandUnderline: {
    width: 150,
    height: 2,
    backgroundColor: Color.Gold,
    marginBottom: 14,
  },
  tagline: {
    fontFamily: 'PlayfairDisplay_400Regular_Italic',
    fontSize: 15,
    lineHeight: 20,
    color: Color.WarmBrown,
    marginBottom: 48,
  },
  ornament: {
    ...flex('row', 'center', 'center'),
    width: '100%',
    marginBottom: 48,
  },
  ornamentLine: {
    flex: 1,
    height: 1,
    backgroundColor: Color.Sand,
  },
  ornamentSquare: {
    width: 16,
    height: 16,
    backgroundColor: Color.Gold,
    marginHorizontal: 12,
  },
  button: {
    marginBottom: 20,
  },
  signInText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    lineHeight: 17,
    color: Color.WarmBrown,
  },
});
