import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { format } from 'date-fns';
import MemberModal from './memberModal';
import { UseGetAll, UseAdd, UseDelete, UseUpdate } from '../service/dummyService';

const HomeScreen = () => {
  const { data, isLoading } = UseGetAll();
  const { addNewItem, isLoading: isAdding } = UseAdd();
  const { deleteItemById, isLoading: isDeleting } = UseDelete();
  const { updateItemById, isLoading: isUpdating } = UseUpdate();

  const [members, setMembers] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isUpdate, setUpdate] = useState(false);
  const [memberToEdit, setMemberToEdit] = useState(null);

  useEffect(() => {
    if (data) {
      setMembers(data);
    }
  }, [data]);

  const toggleModal = () => {
    setUpdate(false);
    setMemberToEdit(null);
    setModalVisible(!isModalVisible);
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
    deleteItemById(memberToDelete.id);
  };

  const addMember = (newMember) => {
    addNewItem(newMember);
  };

  const updateMember = (updatedMember) => {
    updateItemById(updatedMember.id, updatedMember);
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
                <Text>{format(new Date(item.dob), 'MM/dd/yyyy')}</Text>
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
