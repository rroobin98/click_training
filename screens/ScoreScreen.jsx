import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, TextInput } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const ScoreScreen = () => {
  const [countdown, setCountdown] = useState(5);
  const [timerRunning, setTimerRunning] = useState(false);
  const [progressColor, setProgressColor] = useState('#FF0000'); // Red color initially
  const [displayText, setDisplayText] = useState('Get ready'); // Initial display text
  const [duration, setDuration] = useState('5'); // Initial duration as string
  const [inputValue, setInputValue] = useState('5'); // Input value for duration
  const [showResetButton, setShowResetButton] = useState(false); // Flag to show reset button
  const [errorMessage, setErrorMessage] = useState(''); // Error message for exceeding max time

  let countdownInterval;

  useEffect(() => {
    return () => clearInterval(countdownInterval);
  }, []);

  const startTimer = () => {
    const parsedDuration = parseInt(duration);
    if (isNaN(parsedDuration) || parsedDuration <= 0) {
      // Handle invalid duration
      return;
    }

    setCountdown(parsedDuration);
    clearInterval(countdownInterval);
    countdownInterval = setInterval(() => {
      setCountdown(prevCountdown => {
        if (prevCountdown === 1) {
          clearInterval(countdownInterval);
          setProgressColor('#00FF00'); // Change color to green when countdown finishes
          setDisplayText('Shoot!'); // Change display text when countdown finishes
          setTimerRunning(false); // Stop the timer when countdown hits 0
          setShowResetButton(true); // Show reset button when countdown hits 0
          return 0;
        } else if (prevCountdown > 0) {
          return prevCountdown - 1;
        }
        return prevCountdown;
      });
    }, 1000);
    setTimerRunning(true);
  };

  const stopTimer = () => {
    clearInterval(countdownInterval);
    setTimerRunning(false);
  };

  const resetTimer = () => {
    clearInterval(countdownInterval);
    setCountdown(parseInt(duration));
    setTimerRunning(false);
    setProgressColor('#FF0000'); // Reset color to red when timer is reset
    setDisplayText('Get ready'); // Reset display text
    setShowResetButton(false); // Hide reset button when timer is reset
  };

  const handleSave = () => {
    const parsedInputValue = parseInt(inputValue);
    if (parsedInputValue <= 0 || parsedInputValue > 20 || isNaN(parsedInputValue)) {
      // Handle invalid input value (less than or equal to 0, greater than 20, or not a number)
      setErrorMessage('Sorry, the max time is 20 seconds');
      return;
    }
    setErrorMessage('');
    setDuration(inputValue);
    setCountdown(parsedInputValue);
    if (!timerRunning) {
      setProgressColor('#FF0000'); // Reset color to red when timer is reset
      setDisplayText('Get ready'); // Reset display text
    }
  };

  const handleStartStop = () => {
    if (timerRunning) {
      stopTimer();
    } else {
      startTimer();
    }
  };

  return (
    <ImageBackground source={require('../assets/background2.jpeg')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>{displayText}</Text>
        <View style={styles.timerContainer}>
          <AnimatedCircularProgress
            size={200}
            width={15}
            fill={(countdown / parseInt(duration)) * 100} // Percentage filled based on the countdown
            tintColor={progressColor} // Color changes based on countdown
            backgroundColor="#CCCCCC"
            arcSweepAngle={360}
            rotation={0}
            lineCap="round"
            duration={1000} // Smooth animation duration in milliseconds
          >
            {() => (
              <View style={styles.timerInner}>
                <Text style={styles.timerInnerText}>{countdown}</Text>
              </View>
            )}
          </AnimatedCircularProgress>
        </View>
        <TextInput
          style={styles.input}
          onChangeText={text => setInputValue(text)}
          value={inputValue}
          keyboardType="numeric"
          placeholder="Enter duration (seconds)"
        />
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Save Duration</Text>
        </TouchableOpacity>
        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
        {!timerRunning && !showResetButton && (
          <TouchableOpacity style={[styles.button, { backgroundColor: '#008000' }]} onPress={handleStartStop}>
            <Text style={styles.buttonText}>Start Timer</Text>
          </TouchableOpacity>
        )}
        {timerRunning && (
          <TouchableOpacity style={[styles.button, { backgroundColor: '#FF0000' }]} onPress={handleStartStop}>
            <Text style={styles.buttonText}>Stop Timer</Text>
          </TouchableOpacity>
        )}
        {showResetButton && (
          <TouchableOpacity style={[styles.button, { backgroundColor: '#FF0000' }]} onPress={resetTimer}>
            <Text style={styles.buttonText}>Reset Timer</Text>
          </TouchableOpacity>
        )}
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
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 120, // Increased margin bottom to add more space
    color: '#ffffff',
    textShadowColor: '#000000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 50,
  },
  timerInner: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerInnerText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 10, // Added margin top to space out buttons
    marginBottom: 10, // Added margin bottom to space out buttons
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    width: '50%',
    backgroundColor: '#FFFFFF', // White background color
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  errorText: {
    color: '#FF0000',
    fontSize: 16,
    marginBottom: 10,
  },
});

export default ScoreScreen;
