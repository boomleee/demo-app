
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Modal, StyleSheet, Pressable, Text, TouchableOpacity } from 'react-native';
import DateTimePicker from "@react-native-community/datetimepicker"
const MemberModal = ({ isVisible, onClose, onAdd, onUpdate, isUpdate, memberToEdit }) => {
  const [newMember, setNewMember] = useState({
    name: '',
    phone: '',
    bd: ''
  });
  const [isPhoneValid, setPhoneValid] = useState(true);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    resetModalState();
  }, [isVisible]);

  const resetModalState = () => {
    if (isUpdate) {
      setNewMember(memberToEdit);
      setSelectedDate(new Date(memberToEdit.bd));
    } else {
      setNewMember({
        name: '',
        phone: '',
        bd: ''
      });
      setSelectedDate(new Date());
    }
  };

  const handleAction = () => {
    if (isUpdate) {
      onUpdate(newMember);
    } else {
      onAdd(newMember);
    }
    onClose();
  };
   const isValidPhoneNumber = (text) => {
    const phoneNumberRegex = /^0\d{9}$/;
    return phoneNumberRegex.test(text);
  };

  const handlePhoneChange = (text) => {
    setPhoneValid(isValidPhoneNumber(text));
    setNewMember({ ...newMember, phone: text });
  };

  const handlePhoneBlur = () => {
    setPhoneTouched(true);
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setSelectedDate(selectedDate);
      setNewMember({ ...newMember, bd: selectedDate.toISOString() });
    }
  };

  const showDatePickerModal = () => {
    setShowDatePicker(true);
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={newMember.name}
            onChangeText={(text) => setNewMember({ ...newMember, name: text })}
          />
          <TextInput
            style={[styles.input, !isPhoneValid && styles.invalidInput]}
            placeholder="Phone"
            value={newMember.phone}
            onChangeText={handlePhoneChange}
            onBlur={handlePhoneBlur}
          />
          {isUpdate ? (
            <TouchableOpacity onPress={showDatePickerModal}>
            <Text style={styles.input}>{newMember.bd ? new Date(newMember.bd).toLocaleDateString() : ''}</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={showDatePickerModal}>
            <Text style={styles.input}>{selectedDate.toLocaleDateString()}</Text>
          </TouchableOpacity>
          )}

          {showDatePicker && (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={handleDateChange}
            />
          )}

          <Pressable
            style={({ pressed }) => [
              styles.actionButton,
              { backgroundColor: (pressed || !isPhoneValid) ? '#9caaad' : '#2980b9' }
            ]}
            onPress={isPhoneValid ? handleAction : null}
            disabled={!isPhoneValid}
          >
            <Text style={styles.buttonText}>{isUpdate ? 'Update' : 'Add'}</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.actionButton,
              { backgroundColor: pressed ? '#e74c3c' : '#c0392b' }
            ]}
            onPress={onClose}
          >
            <Text style={styles.buttonText}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%'
  },
  input: {
    width: '100%',
    marginBottom: 16,
    marginVertical: 8, 
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  actionButton: {
    backgroundColor: '#2980b9',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  invalidInput: {
    borderColor: 'red',
  },
});

export default MemberModal;
