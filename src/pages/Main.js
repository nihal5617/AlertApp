import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Vibration,
  Linking,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Torch from 'react-native-torch';
import SendSMS from 'react-native-sms';
import Geolocation from '@react-native-community/geolocation';

export default function Main({navigation}) {
  const handleAlert = () => {
    Vibration.vibrate([1000, 2000, 3000], true);
    Torch.switchState(true);
    AsyncStorage.getItem('contactNumber').then(value => {
      Geolocation.getCurrentPosition(
        info => {
          SendSMS.send(
            {
              body: 'SOS! Latitude: ' + info.coords.latitude + ' Longitude: ' + info.coords.longitude,
              recipients: ['9833256433', value],
              successTypes: ['sent', 'queued'],
              allowAndroidSendWithoutReadPermission: true,
            },
            (completed, cancelled, error) => {
              console.log(
                'SMS Callback: completed: ' +
                  completed +
                  ' cancelled: ' +
                  cancelled +
                  ' error: ' +
                  error,
              );
            },
          );
        },
        error => console.log('error', error),
      );
      Linking.openURL('tel:' + value);
    });
  };

  const handleCancel = () => {
    Vibration.cancel();
    Torch.switchState(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}>Alert App</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Settings')}>
          <Text style={styles.buttonText}>Settings</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <TouchableOpacity style={styles.alertButton} onPress={handleAlert}>
          <Text style={styles.alertButtonText}>Alert</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flex: 1,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: '5%',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  button: {
    backgroundColor: 'green',
    borderRadius: 10,
    padding: 10,
    marginLeft: 10,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff',
  },
  body: {
    flex: 9,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertButton: {
    backgroundColor: 'red',
    width: '90%',
    height: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    padding: 10,
  },
  alertButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  cancelButton: {
    marginTop: 10,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    padding: 10,
  },
  cancelButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
});
