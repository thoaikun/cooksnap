import FilledButton from "@/Components/Button/FilledButton";
import TextButton from "@/Components/Button/TextButton";
import FavoriteCard, { FavoriteType } from "@/Components/FavoriteCard/FavoriteCard";
import Input from "@/Components/Input/Input";
import useInputController from "@/Components/Input/useInputController";
import { FontSize } from "@/Theme/Variables";
import React, { useState } from "react";
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { RootScreens } from "..";

interface IProps {
  onNavigate: (string: RootScreens, params?: any) => void;
}

const Favorite = ({ onNavigate }: IProps) => {
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const listNameController = useInputController();

  const handleOpenModal = () => {
    setModalVisible(true);
  }

  const handleCloseModal = () => {
    setModalVisible(false);
  }


  return (
    <ScrollView contentContainerStyle={{ paddingHorizontal: 10 }}>
      <FavoriteCard
        type={FavoriteType.FAVORITE}
        title="My favorite"
      />
      <FavoriteCard 
        type={FavoriteType.YOUR_LIST}
        title="My list"
        onPress={() => onNavigate(RootScreens.FAVORITE_DETAIL)}
      />
      <FavoriteCard 
        type={FavoriteType.ADD}
        title="Add"
        onPress={handleOpenModal}
      />

      <Modal animationType="fade" transparent visible={isModalVisible}>
        <View style={styles.modalContainer}>
          <Pressable onPress={handleCloseModal} style={styles.overlay} />
          <View style={styles.content}>
            <Text style={styles.modalTitle}>Tạo danh sách mới</Text>
            <Input 
              controller={listNameController}
              label="Tên danh sách"
              autoFocus
            />
            <View style={styles.modalButtonContainer}>
              <TextButton
                title="Hủy"
                onPress={handleCloseModal}
              />
              <FilledButton
                title="Tạo"
                onPress={handleCloseModal}
              />
            </View>
          </View> 
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  content: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 5,
    rowGap: 10
  },
  modalTitle: {
    fontSize: FontSize.REGULAR,
    fontWeight: 'bold',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    columnGap: 10,
  }
});

export default Favorite