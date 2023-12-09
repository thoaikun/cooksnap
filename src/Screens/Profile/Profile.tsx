import FilledButton from "@/Components/Button/FilledButton";
import { LocalizationKey, i18n } from "@/Localization";
import { IProfile } from "@/Model/profile";
import { profileSelector } from "@/Store/selector";
import { Colors, FontSize } from "@/Theme/Variables";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text, View, StyleSheet, ScrollView, Image } from "react-native";
import { useSelector } from "react-redux";
import { RootScreens } from "..";

interface IProps {  
  onNavigate: (string: RootScreens, params?: any) => void;
}

export const Profile = ({ onNavigate }: IProps) => {
  const profile: IProfile = useSelector(profileSelector)

  const handleLogout = async () => {
    // remove local storage
    await AsyncStorage.removeItem('accessToken')
    await AsyncStorage.removeItem('firstTimeOpenApp')
    onNavigate(RootScreens.LOGIN)
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <Image
            source={{
                uri: `https://api.dicebear.com/7.x/thumbs/png?seed=${profile?.email}`,
            }}
            style={styles.avatar}
        />
        <View>
          <Text style={[styles.username]}>
              ThoaiLe
          </Text>
          <Text style={styles.email} numberOfLines={1} ellipsizeMode='tail'>
              {profile?.email ?? 'Không rõ'}
          </Text>
        </View>
      </View>

      <View style={{ rowGap: 10 }}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>
              Name:
          </Text>
          <Text style={styles.text}>
              {profile?.fullName ?? 'Không rõ'}
          </Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>
              Day of Birth:
          </Text>
          <Text style={styles.text}>{profile?.dayOfBirth ?? 'Không rõ'}</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <FilledButton
          title={i18n.t(LocalizationKey.LOGOUT)}
          onPress={handleLogout}
          style={{ backgroundColor: Colors.ERROR }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  headerContainer: {
    marginTop: 30,
    marginBottom: 40,
    paddingHorizontal: 10,

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 20
  },
  avatar: {
      width: 100,
      height: 100,
      borderRadius: 100,
  },
  username: {
    fontSize: FontSize.LARGE,
    fontWeight: 'bold',
  },
  email: {
    maxWidth: 220,
    fontSize: FontSize.SMALL,
    color: Colors.SECONDARY_TEXT
  },
  text: {
    fontSize: FontSize.SMALL,
  },
  textContainer: {
    flexDirection: 'row',
    gap: 10
  },
  buttonContainer: {
    marginTop: 20,

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
})
