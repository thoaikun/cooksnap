import FilledButton from "@/Components/Button/FilledButton";
import TextButton from "@/Components/Button/TextButton";
import FavoriteCard, { FavoriteType } from "@/Components/FavoriteCard/FavoriteCard";
import Input from "@/Components/Input/Input";
import useInputController from "@/Components/Input/useInputController";
import useFavorite from "@/Hooks/useFavorite";
import { LocalizationKey, i18n } from "@/Localization";
import { Colors, FontSize } from "@/Theme/Variables";
import React, { useState } from "react";
import { ActivityIndicator, Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
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
  
  const {
    error,
    favorites,
    isLoading,
    favoriteMutation,
  } = useFavorite(listNameController, handleCloseModal)


  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' color={Colors.PRIMARY} />
      </View>
    )
  }

  return (
    <ScrollView contentContainerStyle={{ paddingHorizontal: 10 }}>
      {favorites?.map((favorite, index) => (
        <FavoriteCard
          key={index}
          type={FavoriteType.YOUR_LIST}
          title={favorite.listName}
          onPress={() => onNavigate(RootScreens.FAVORITE_DETAIL, { favoriteId: favorite.id, favoriteName: favorite.listName })}
        />
      ))}
      <FavoriteCard 
        type={FavoriteType.ADD}
        title={i18n.t(LocalizationKey.ADD_NEW_LIST)}
        onPress={handleOpenModal}
      />

      <Modal animationType="fade" transparent visible={isModalVisible}>
        <View style={styles.modalContainer}>
          <Pressable onPress={handleCloseModal} style={styles.overlay} />
          <View style={styles.content}>
            <Text style={styles.modalTitle}>{i18n.t(LocalizationKey.ADD_NEW_LIST)}</Text>
            <Input 
              controller={listNameController}
              label={i18n.t(LocalizationKey.YOUR_LIST_NAME)}
              autoFocus
              postfix={favoriteMutation.isPending ? <ActivityIndicator size='large' color={Colors.PRIMARY} /> : undefined}
            />
            <View style={{ alignItems: 'flex-start' }}>
              {error && <Text style={{ color: Colors.ERROR }}>{error}</Text>}
            </View>
            <View style={styles.modalButtonContainer}>
              <TextButton
                title={i18n.t(LocalizationKey.CANCEL)}
                onPress={handleCloseModal}
              />
              <FilledButton
                title={i18n.t(LocalizationKey.CREATE)}
                onPress={() => {
                  favoriteMutation.mutate({ listName: listNameController.value })
                }}
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
  },
});

export default Favorite