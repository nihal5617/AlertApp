import React, {useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Settings() {
  const data = {
    contactNumber: '',
  };
  useEffect(() => {
    getfromLocalStorage();
  }, []);
  const getfromLocalStorage = async () => {
    try {
      const value = await AsyncStorage.getItem('contactNumber');
      if (value !== null) {
        data.contactNumber = value;
      }
    } catch (e) {
      console.log(e);
    }
  };
  const onSave = () => {
    alert('Saved!');
    console.log(data);
    AsyncStorage.setItem('contactNumber', data.contactNumber);
  };
  return (
    <View>
      <Text style={styles.heading}>Enter your Emergency Contact Details</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Contact Number"
        onChangeText={text => (data.contactNumber = text)}
        defaultValue={data.contactNumber}
      />
      <TouchableOpacity style={styles.button} onPress={onSave}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 12,
    color: '#000',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    color: '#000',
  },
  button: {
    backgroundColor: 'green',
    borderRadius: 10,
    padding: 10,
    margin: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
