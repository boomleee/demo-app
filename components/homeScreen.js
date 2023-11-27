// HomeScreen.js

import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert  } from 'react-native';
import { format } from 'date-fns';
import MemberModal from './memberModal';

const HomeScreen = () => {
  const [members, setMembers] = useState([
    {
      "name": "Tuan Anh",
      "phone": "0834161202",
      "bd": "2002-12-16T00:00:00.000Z"
    },
    
  ]);

  const [isModalVisible, setModalVisible] = useState(false);
  const [isUpdate, setUpdate] = useState(false);
  const [memberToEdit, setMemberToEdit] = useState(null);

  const toggleModal = () => {
    setUpdate(false);
    setMemberToEdit(null);
    setModalVisible(!isModalVisible);
   
  };

  const addMember = (newMember) => {
    setMembers([...members, newMember]);
  };

  const updateMember = (updatedMember) => {
    const updatedMembers = members.map((member) =>
      member === memberToEdit ? { ...member, ...updatedMember } : member
    );
    setMembers(updatedMembers);
  };

  const handleEdit = (member) => {
    setMemberToEdit(member);
    setUpdate(true);
    setModalVisible(true);
  };
  const handleDelete = (member) => {
    Alert.alert(
      'Confirm',
      'Do you want to delete this member?',
      [
        { text: 'No', style: 'cancel' },
        { text: 'Yes', onPress: () => deleteMember(member) }
      ]
    );
  };
  const deleteMember = (memberToDelete) => {
    const updatedMembers = members.filter((member) => member !== memberToDelete);
    setMembers(updatedMembers);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={members}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.memberContainer}>
          <TouchableOpacity onPress={() => handleEdit(item)}>
            <View style={styles.memberItem}>
              <Text>{item.name}</Text>
              <Text>{item.phone}</Text>
              <Text>{format(new Date(item.bd), 'dd/MM/yyyy')}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDelete(item)}>
            <View style={styles.deleteButton}>
              <Text style={styles.deleteButtonText}>Delete</Text>
            </View>
          </TouchableOpacity>
        </View>
        )}
      />

      <TouchableOpacity style={styles.addButton} onPress={toggleModal}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>

      <MemberModal
        isVisible={isModalVisible}
        onClose={toggleModal}
        onAdd={addMember}
        onUpdate={updateMember}
        isUpdate={isUpdate}
        memberToEdit={memberToEdit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
    backgroundColor: '#F5F5F5',
  },
  memberContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  memberItem: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    flex: 1
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    padding: 16,
    borderRadius: 8,
    marginLeft: 8,
  },
  deleteButtonText: {
    color: 'white',
  },
  addButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: '#3498db',
    padding: 16,
    borderRadius: 50,
  },
  addButtonText: {
    color: 'white',
    fontSize: 24,
  },
});


export default HomeScreen;
