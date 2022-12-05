import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import countryList from "country-list";
import { Picker } from '@react-native-picker/picker'
import { useNavigation, useRoute } from '@react-navigation/native';
import Button from '../../components/Button';

const countries = countryList.getData();

const AddressScreen = () => {
  const [country, setCountry] = useState(countries[0].code);
  const [fullname, setFullname] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [addressError, setAddressError] = useState('');
  const [city, setCity] = useState('');
  
  const navigation = useNavigation();
  const route = useRoute();
  const amount = Math.floor(route.params?.totalPrice * 100 || 0);

  const onCheckout = () => {
    if (addressError) {
      Alert.alert("Fix all field errors before submiting");
      return;
    }

    if (!fullname) {
      Alert.alert("Please fill in the fullname field");
      return;
    }

    if (!phone) {
      Alert.alert("Please fill in the phone number field");
      return;
    }

    // handle payments
    Alert.alert("Handle payment")
  };
  const validateAddress = () => {
    if (address.length < 3) {
      setAddressError("Address is too short");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0}
      style={{ flex: 1 }}
    >
      <ScrollView style={styles.root}>
        <View style={{ flex: 1, marginTop: 100 }}>
          <View style={styles.country}>
            <Text style={styles.label}>Choose your country</Text>

            <Picker selectedValue={country} onValueChange={setCountry}>
              {countries.map((country) => (
                <Picker.Item
                  key={country.code}
                  value={country.code}
                  label={country.name}
                />
              ))}
            </Picker>
          </View>
        </View>
        <View style={{flex: 1, marginTop: 70}}>
          <View style={styles.row}>
            <Text style={styles.label}>Full name (First and Last name)</Text>
            <TextInput
              style={styles.input}
              placeholder="Full name"
              value={fullname}
              onChangeText={setFullname}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Phone number</Text>
            <TextInput
              style={styles.input}
              placeholder="Phone number"
              value={phone}
              onChangeText={setPhone}
              keyboardType={"phone-pad"}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Address</Text>
            <TextInput
              style={styles.input}
              placeholder="Address"
              value={address}
              onEndEditing={validateAddress}
              onChangeText={(text) => {
                setAddress(text);
                setAddressError("");
              }}
            />
            {!!addressError && (
              <Text style={styles.errorLabel}>{addressError}</Text>
            )}
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>City</Text>
            <TextInput
              style={styles.input}
              placeholder="City"
              value={city}
              onChangeText={setCity}
            />
          </View>
        </View>
        <Button
          text="Checkout"
          onPress={onCheckout}
          containerStyles={{padding: 15}}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default AddressScreen

const styles = StyleSheet.create({
  root: {
    padding: 10,
    flex: 1
  },
  country: {
    top: 60,
    flex: 1
  },
  row: {
    marginVertical: 5,
  },
  label: {
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "white",
    padding: 5,
    marginVertical: 5,
    height: 40,
    borderWidth: 1,
    borderColor: "lightgrey",
    borderRadius: 2,
  },
  errorLabel: {
    color: "red",
  },
});