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
  
        fontFamily: 'SF-Pro-Rounded_bold',
        fontSize: 14,
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
        fontFamily: 'SF-Pro-Rounded_semibold',
        fontSize: 20,
    },
  
    section: {
        marginVertical: 10,
    },
    sectionTitle: {
        fontFamily: 'SF-Pro-Rounded_bold',
        fontSize: 20,
    },
    sectionText: {
        fontFamily: 'SF-Pro-Rounded_regular',
        fontSize: 17,
    },
    sectionContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
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
        borderRadius: 10,
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
})

export default styles