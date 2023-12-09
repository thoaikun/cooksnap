import { Colors, FontSize } from '@/Theme/Variables'
import { Dimensions, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        marginTop: Dimensions.get('window').height * 0.20,
        marginHorizontal: 20,
        justifyContent: 'center',
        rowGap: 20,
    },
    title: {
        fontSize: FontSize.LARGE,
        fontWeight: 'bold',
    },
    step: {
        fontSize: FontSize.SMALL,
        color: Colors.SECONDARY_TEXT
    },
    inputContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        alignItems: 'center',
        marginBottom: 15,
    },
    button: {
        width: '100%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    description: {
        fontSize: FontSize.SMALL
    },

    sendAgain: {
        display: 'flex',
        flexDirection: 'row',
    },
    error: {
        color: Colors.ERROR,
        fontSize: FontSize.SMALL,
    }
})

export default styles
