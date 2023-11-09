import { Button } from "react-native"

interface IProps {
    title: string;
    onPress: () => void
}

const FilledButton = ({ title, onPress }: IProps) => {
    return (
        <Button 
            color='#3DC73A'
            onPress={onPress}
            title={title}
        />
    )
}

export default FilledButton