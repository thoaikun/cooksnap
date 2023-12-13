import { Colors, FontSize } from '@/Theme/Variables'
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    videoContainer: {
        width: '100%',
        height: 270,
    },
    video: {
        width: 400,
        height: 270,
    },
  
    bodyContainer: {
        flex: 1,
    },
  
    tabHeader: {
        width: '50%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    headerText: {
        width: '100%',
        fontSize: FontSize.EXTRA_SMALL,
        fontWeight: 'bold',
        textAlign: 'center',
    },
  
    tabBody: {
        display: 'flex',
        flexDirection: 'column',
        paddingHorizontal: 20,
        marginTop: 10,
    },
    recipe: {
        marginVertical: 10,
    },
    recipeTitle: {
        fontSize: 20,
    },
  
    section: {
        marginVertical: 10,
        gap: 10
    },
    sectionTitle: {
        fontSize: FontSize.REGULAR,
        fontWeight: '500'
    },
    sectionText: {
        fontSize: FontSize.SMALL,
    },
    sectionContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: 10
    },
  
    nutrientElement: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    nutrientElementTitle: {
        flexBasis: '20%',
    },
    progressBar: {
        marginLeft: 20,
        borderRadius: 4,
    },
  
    reviewCardContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
    },
    loadingScreen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    stepContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    stepOutlineBox: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        backgroundColor: Colors.PRIMARY,
    },
    stepInlineBox: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        backgroundColor: Colors.WHITE,
    },
    stepText: {
        color: Colors.BLACK,
        fontWeight: 'bold',
        fontSize: FontSize.EXTRA_SMALL,
    },
    stepContent: {
        fontSize: FontSize.SMALL,
        flex: 1,
    }
})

export default styles