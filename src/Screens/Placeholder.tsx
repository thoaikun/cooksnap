import { RootStackParamList } from "@/Navigation"
import { BottomTabsParamList } from "@/Navigation/Main"
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import { CompositeScreenProps } from "@react-navigation/native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { useEffect } from "react"
import { MainScreens, RootScreens } from "."
import { View } from "react-native"

type PlaceholderScreenNavigatorProps =  CompositeScreenProps<
    BottomTabScreenProps<BottomTabsParamList, MainScreens.SNAP_PLACEHOLDER>,
    NativeStackScreenProps<RootStackParamList>
>;

const Placeholder = ({ navigation }: PlaceholderScreenNavigatorProps) => {
    useEffect(() => {
        const handleNavigateToCamera = (e: any) => {
            if (e.data.state.index === 2) {
                navigation.navigate(RootScreens.SNAP)
            }
        }

        navigation.addListener('state', handleNavigateToCamera)

        return () => navigation.removeListener('state', handleNavigateToCamera)
    }, [])

    return <View></View>
}

export default Placeholder