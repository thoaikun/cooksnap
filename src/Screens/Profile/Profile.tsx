import FilledButton from "@/Components/Button/FilledButton";
import { LocalizationKey, i18n } from "@/Localization";
import { Colors, FontSize } from "@/Theme/Variables";
import { Text, View, StyleSheet, ScrollView, Image } from "react-native";

export const Profile = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <Image
            source={{
                uri: `https://api.dicebear.com/7.x/thumbs/png?seed=Callie`,
            }}
            style={styles.avatar}
        />
        <View>
          <Text style={[styles.username]}>
              ThoaiLe
          </Text>
          <Text style={styles.email}>
              email
          </Text>
        </View>
      </View>

      <View style={{ rowGap: 10 }}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>
              Name:
          </Text>
          <Text style={styles.text}>
              name
          </Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>
              Day of Birth:
          </Text>
          <Text style={styles.text}>20/09/2002</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <FilledButton
          title={i18n.t(LocalizationKey.LOGOUT)}
          onPress={() => {}}
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
    fontSize: FontSize.REGULAR,
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
