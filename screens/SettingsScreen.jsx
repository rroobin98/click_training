import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

const SettingsScreen = () => {
  const [trainingMode, setTrainingMode] = useState(false);
  const [vibrate, setVibrate] = useState(false);
  const [countUp, setCountUp] = useState(false);
  const [pauseDuration, setPauseDuration] = useState(1);

  const toggleTrainingMode = () => setTrainingMode((prev) => !prev);
  const toggleVibrate = () => setVibrate((prev) => !prev);
  const toggleCountUp = () => setCountUp((prev) => !prev);

  const handlePauseDurationChange = (value) => {
    setPauseDuration(value);
  };

  return (
    <ImageBackground source={require('../assets/background2.jpeg')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Shooting Practice Settings</Text>
        <View style={styles.settingContainer}>
          <Text>Training Mode</Text>
          <Switch value={trainingMode} onValueChange={toggleTrainingMode} />
        </View>
        <View style={styles.settingContainer}>
          <Text>Vibrate</Text>
          <Switch value={vibrate} onValueChange={toggleVibrate} />
        </View>
        <View style={styles.settingContainer}>
          <Text>Count Up</Text>
          <Switch value={countUp} onValueChange={toggleCountUp} />
        </View>
        <View style={styles.sliderContainer}>
          <Text>Pause Before Start: {pauseDuration} sec</Text>
        </View>
        <TouchableOpacity style={styles.saveButton} onPress={() => { /* Logic to save settings */ }}>
          <Text style={styles.saveButtonText}>Save Settings</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // Semi-transparent white background
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 150,
    color: '#ffffff',
    textShadowColor: '#000000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
  },
  settingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
    marginVertical: 10,
  },
  sliderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    marginVertical: 10,
    marginTop: 150,
  },
  saveButton: {
    backgroundColor: '#008000', // Green color
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SettingsScreen;
