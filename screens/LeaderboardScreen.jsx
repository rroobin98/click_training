import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ImageBackground, TouchableOpacity, TextInput, Alert } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStar, faTrash } from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LeaderboardScreen = ({ navigation }) => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [name, setName] = useState('');
  const [score, setScore] = useState('');

  useEffect(() => {
    loadLeaderboardData();
  }, []);

  const loadLeaderboardData = async () => {
    try {
      const leaderboardDataString = await AsyncStorage.getItem('@leaderboardData');
      if (leaderboardDataString !== null) {
        setLeaderboardData(JSON.parse(leaderboardDataString).sort((a, b) => b.score - a.score));
      }
    } catch (error) {
      console.error('Error loading leaderboard data:', error);
    }
  };

  const saveLeaderboardData = async (data) => {
    try {
      await AsyncStorage.setItem('@leaderboardData', JSON.stringify(data));
    } catch (error) {
      console.error('Error saving leaderboard data:', error);
    }
  };

  const renderLeaderboardItem = ({ item }) => (
    <View style={styles.leaderboardItem}>
      <Text style={styles.playerName}>{item.name}</Text>
      <Text style={styles.date}>{item.date}</Text>
      <View style={styles.scoreContainer}>
        <Text style={styles.playerScore}>{item.score}</Text>
        <FontAwesomeIcon icon={faStar} size={24} style={styles.starIcon} />
        <TouchableOpacity onPress={() => removeScore(item.id)}>
          <FontAwesomeIcon icon={faTrash} size={24} style={styles.trashIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const addScore = () => {
    if (name && score) {
      if (parseInt(score) <= 10000) {
        const date = new Date().toISOString().split('T')[0]; // Get today's date
        const newScore = { id: Date.now().toString(), name, score: parseInt(score), date };
        const updatedLeaderboardData = [...leaderboardData, newScore];
        setLeaderboardData(updatedLeaderboardData.sort((a, b) => b.score - a.score));
        saveLeaderboardData(updatedLeaderboardData);
        setName('');
        setScore('');
      } else {
        Alert.alert('Error', 'Sorry, 10000 is the maximum score.');
      }
    } else {
      Alert.alert('Error', 'Please enter your name and score.');
    }
  };

  const removeScore = (id) => {
    const updatedLeaderboardData = leaderboardData.filter(item => item.id !== id);
    setLeaderboardData(updatedLeaderboardData);
    saveLeaderboardData(updatedLeaderboardData);
  };

  return (
    <ImageBackground source={require('../assets/background6.jpeg')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.leaderboardTitle}>Leaderboard</Text>
        <FlatList
          data={leaderboardData}
          renderItem={renderLeaderboardItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter your score"
            value={score}
            onChangeText={(text) => setScore(text)}
            keyboardType="numeric"
          />
          <TouchableOpacity
            style={styles.button}
            onPress={addScore}
          >
            <Text style={styles.buttonText}>Add My Score</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.buttonText}>Go to Home</Text>
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
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Semi-transparent white background
    paddingTop: 171,
  },
  leaderboardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 10,
    color: '#ffffff',
    textShadowColor: '#000000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
  },
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  playerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    textShadowColor: '#000000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
  },
  date: {
    fontSize: 16,
    alignSelf: 'center',
    color: '#ffffff',
    textShadowColor: '#000000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
  },
  
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playerScore: {
    fontSize: 16,
    marginRight: 5,
    color: '#ffffff',
    textShadowColor: '#000000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
  },
  starIcon: {
    color: 'gold', // Customize the color as needed
  },
  trashIcon: {
    color: 'red', // Customize the color as needed
  },
  listContainer: {
    paddingBottom: 20,
  },
  button: {
    backgroundColor: '#008000', // Green color
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 20,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  inputContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  input: {
    backgroundColor: 'white',
    width: '80%',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default LeaderboardScreen;
