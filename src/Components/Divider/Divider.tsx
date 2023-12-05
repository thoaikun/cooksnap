import { Colors } from "@/Theme/Variables"
import { View } from "react-native"

interface IProps {
    width?: number
    thickness?: number
    color?: string
}

const Divider = ({ width, thickness, color }: IProps) => {
    return <View style={{
        height: thickness ?? 1,
        backgroundColor: color ?? Colors.BACKGROUND,
        marginVertical: 10
    }}></View>
}

export default Divider