import { RootStackParamList } from "@/Navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootScreens } from "..";
import DishDetail from "./DishDetail";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Modal, TouchableOpacity, View, Text, StyleSheet, Pressable } from "react-native";
import { faHeart, faAdd } from "@fortawesome/free-solid-svg-icons";
import { Colors, FontSize } from "@/Theme/Variables";

type SnapScreenNavigatorProps = NativeStackScreenProps<
  RootStackParamList,
  RootScreens.DISH_DETAIL
>; 

export const DishDetailContainer = ({ navigation }: SnapScreenNavigatorProps) => {
  const [isModalVisible, setModalVisible] = useState<boolean>(false);

  const onNavigate = (screen: RootScreens, params?: any) => {
    navigation.navigate(screen, params);
  }
  
  useEffect(() => {
    navigation.setOptions({
      title: 'Dish Detail',
      headerRight: () => (
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
        >
          <FontAwesomeIcon icon={faHeart} size={20} color={Colors.BACKGROUND} />
        </TouchableOpacity>
      )
    })
  }, [])

  return (
    <>
      <Modal animationType="fade" transparent visible={isModalVisible}>
        <View style={styles.modalContainer}>
          <Pressable onPress={() => setModalVisible(false)} style={styles.overlay} />
          <View style={styles.content}>
            <View style={styles.listItem}>
              <Text style={styles.listItemText}>
                My favorite
              </Text>
              <TouchableOpacity>
                <FontAwesomeIcon icon={faAdd} size={16} color={Colors.BLACK} />
              </TouchableOpacity>
            </View>

            <View style={styles.listItem}>
              <Text style={styles.listItemText}>
                My favorite
              </Text>
              <TouchableOpacity>
                <FontAwesomeIcon icon={faAdd} size={16} color={Colors.BLACK} />
              </TouchableOpacity>
            </View>

            <View style={styles.listItem}>
              <Text style={styles.listItemText}>
                My favorite
              </Text>
              <TouchableOpacity>
                <FontAwesomeIcon icon={faAdd} size={16} color={Colors.BLACK} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <DishDetail />
    </>
  )
}

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
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 5
  },
  listItemText: {
    fontWeight: '500',
    fontSize: FontSize.SMALL
  }
})

export default DishDetailContainer