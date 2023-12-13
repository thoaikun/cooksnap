import { Colors, FontSize } from "@/Theme/Variables"
import { View, Text, Image, StyleSheet, Pressable } from "react-native"

export enum CardDirection {
    ROW = 'row',
    COLUMN = 'column'
}

interface IProps {
    imageUrl: string,
    title: string,
    subtitle: string,
    direction?: CardDirection
    tail?: JSX.Element
    onPress?: () => void
}

const Card = ({
    imageUrl,
    title,
    subtitle,
    direction,
    tail,
    onPress
}: IProps) => {
    return (
        <Pressable
            style={direction == CardDirection.ROW ?  styles.containerRow : styles.containerColumn}
            onPress={onPress}
        >
            <Image 
                style={direction === CardDirection.ROW ? styles.imageRow : styles.imageColumn}
                source={{
                    uri: imageUrl
                }}
                resizeMode='cover'
            />

            <View 
                style={[
                    styles.content,
                    direction === CardDirection.ROW && { flex: 1 }
                ]}
            >
                <Text
                    style={styles.title}
                    numberOfLines={1}
                    ellipsizeMode='tail'
                >
                    {title}
                </Text>
                <Text
                    style={styles.subtitle}
                    numberOfLines={3}
                    ellipsizeMode='tail'
                >
                    {subtitle}
                </Text>
            </View>

            <View style={styles.tail}>
                {tail}
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    containerRow: { 
        width: '100%',
        elevation: 0, 
    
        backgroundColor: Colors.WHITE,
        
        shadowColor: 'rgba(0, 0, 0, 0.10)',
        shadowOffset: { width: 0.9, height: 0.9 },
        shadowOpacity: 1,
        shadowRadius: 1.8,
        
        display: 'flex',
        flexDirection: 'row',  
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12
    },
    containerColumn: {
        maxWidth: 220,
        borderRadius: 8,
        backgroundColor: Colors.WHITE,

        shadowColor: 'rgba(0, 0, 0, 0.10)',
        shadowOffset: { width: 0.9, height: 0.9 },
        shadowOpacity: 1,
        shadowRadius: 1.8,
        elevation: 20,

        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        gap: 12
    },
    imageColumn: {
        width: '100%',
        height: 200,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8
    },
    imageRow: {
        width: 120,
        height: 120
    },
    content: {
        paddingHorizontal: 16,
        backgroundColor: Colors.WHITE,
        
        display: 'flex',
        flexDirection: 'column',
        gap: 5,
    },
    title: {
        fontWeight: '500',
        fontSize: FontSize.SMALL,
        color: Colors.PRIMARY_TEXT
    },
    subtitle: {
        fontWeight: '400',
        fontSize: 12,
        color: Colors.SECONDARY_TEXT
    },
    tail: {
        paddingHorizontal: 16,
        paddingBottom: 12
    }
})

export default Card
