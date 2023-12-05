import { Colors, FontSize } from "@/Theme/Variables";
import { faSlackHash } from "@fortawesome/free-brands-svg-icons/faSlackHash";
import { faHeart } from '@fortawesome/free-solid-svg-icons/faHeart';
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Pressable, StyleSheet, Text, View } from "react-native";

export enum FavoriteType {
    FAVORITE = 'favorite',
    YOUR_LIST = 'your list',
    ADD = 'add',
}

interface IProps {
    type: FavoriteType,
    title?: string,
    onPress?: () => void
}

const FavoriteCard = ({ type, title, onPress }: IProps) => {
    return (
        <Pressable style={styles.holderContainer} onPress={onPress}>
            <View
                style={[
                    styles.icon,
                    type === FavoriteType.FAVORITE
                        ? styles.iconFavorite
                        : type === FavoriteType.YOUR_LIST
                        ? styles.iconMyList
                        : styles.iconAdd,
                ]}
            >
                {type === FavoriteType.FAVORITE ? (
                    <FontAwesomeIcon icon={faHeart} color={Colors.WHITE} size={22}/>
                ) : type === FavoriteType.YOUR_LIST ? (
                    <FontAwesomeIcon icon={faSlackHash}  color={Colors.WHITE} size={22}/>
                ) : (
                    <FontAwesomeIcon icon={faPlus} color={Colors.WHITE} size={22}/>
                )}
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.text}>
                    {title ?? 'My list'}
                </Text>
            </View>
        </Pressable>
    )
}


const styles = StyleSheet.create({
    holderContainer: {
        height: 100,
        paddingVertical: 10,
        paddingHorizontal: 10,
        columnGap: 20,

        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: 80,
        height: 80,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconFavorite: {
        backgroundColor: Colors.ERROR
    },
    iconMyList: {
        backgroundColor: Colors.PRIMARY
    },
    iconAdd: {
        backgroundColor: Colors.SECONDARY_TEXT,
    },
    textContainer: {
        flex: 1,
        alignItems: 'flex-start',
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold'
    },
})

export default FavoriteCard;