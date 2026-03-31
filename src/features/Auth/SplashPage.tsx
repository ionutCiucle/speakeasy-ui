import React, { useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigate, Link } from 'react-router-native';
import { Color, flex } from '@/styles';
import { BracketContainer, Button, Logo } from '@/components';

export function SplashPage() {
  const navigate = useNavigate();

  const handleGetStarted = useCallback(() => {
    navigate('/register');
  }, [navigate]);

  return (
    <BracketContainer>
      <View style={styles.content}>
        <Logo marginBottom={16} />

        <Text style={styles.brandName}>SPEAKEASY</Text>
        <View style={styles.brandUnderline} />

        <Text style={styles.tagline}>Never lose track of the night</Text>

        <View style={styles.ornament}>
          <View style={styles.ornamentLine} />
          <View style={styles.ornamentSquare} />
          <View style={styles.ornamentLine} />
        </View>

        <Button
          label="Get Started"
          onPress={handleGetStarted}
          style={styles.button}
        />

        <Link to="/login">
          <Text style={styles.signInText}>Already a member? Sign In</Text>
        </Link>
      </View>
    </BracketContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 31.5,
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
