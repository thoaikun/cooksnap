import FilledButton from '@/Components/Button/FilledButton';
import Card, { CardDirection } from '@/Components/Card/Card';
import Divider from '@/Components/Divider/Divider';
import { Colors } from '@/Theme/Variables';
import { Camera, CameraCapturedPicture, CameraPictureOptions, CameraType } from 'expo-camera';
import { useRef, useState } from 'react';
import { Button, Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RootScreens } from '..';

interface IProps {
  onNavigate: (screen: RootScreens, params?: any) => void;
}

const Snap = ({ onNavigate }: IProps) => {
  const [type, setType] = useState(CameraType.back);
  const [photo, setPhoto] = useState<CameraCapturedPicture | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const cameraRef = useRef<Camera>(null);

  const handleTakePhoto = async () => {
    setLoading(true);
    let options: CameraPictureOptions = {
      quality: 1,
      base64: true,
      exif: true,
    }

    let snappedPhoto = await cameraRef?.current?.takePictureAsync(options);
    setPhoto(snappedPhoto);
    setLoading(false);
  }

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  if (photo) {
    return (
      <ScrollView>
        <View style={styles.resultImageContainer}>
          <Image source={{ uri: photo.uri }} style={styles.resultImage} resizeMode='cover'/>
          <FilledButton 
            title='Snap again'
            style={styles.snapAgainBtn}
          />
        </View>
        <View style={styles.listDishContainer}>
          <Card 
            imageUrl="https://images.unsplash.com/photo-1602253057119-44d745d9b860?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGlzaHxlbnwwfHwwfHx8MA%3D%3D"
            title='Tên món ăn ở đây'
            subtitle="Mô tả món ăn ở đây nha, có handle overflow text òi nên không cần lo nữa ạ"
            direction={CardDirection.ROW}
          />
          <Divider />
          <Card 
            imageUrl="https://images.unsplash.com/photo-1602253057119-44d745d9b860?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGlzaHxlbnwwfHwwfHx8MA%3D%3D"
            title='Tên món ăn ở đây'
            subtitle="Mô tả món ăn ở đây nha, có handle overflow text òi nên không cần lo nữa ạ"
            direction={CardDirection.ROW}
          />
          <Divider />
          <Card 
            imageUrl="https://images.unsplash.com/photo-1602253057119-44d745d9b860?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGlzaHxlbnwwfHwwfHx8MA%3D%3D"
            title='Tên món ăn ở đây'
            subtitle="Mô tả món ăn ở đây nha, có handle overflow text òi nên không cần lo nữa ạ"
            direction={CardDirection.ROW}
          />
          <Divider />
          <Card 
            imageUrl="https://images.unsplash.com/photo-1602253057119-44d745d9b860?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGlzaHxlbnwwfHwwfHx8MA%3D%3D"
            title='Tên món ăn ở đây'
            subtitle="Mô tả món ăn ở đây nha, có handle overflow text òi nên không cần lo nữa ạ"
            direction={CardDirection.ROW}
          />
          <Divider />
          <Card 
            imageUrl="https://images.unsplash.com/photo-1602253057119-44d745d9b860?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGlzaHxlbnwwfHwwfHx8MA%3D%3D"
            title='Tên món ăn ở đây'
            subtitle="Mô tả món ăn ở đây nha, có handle overflow text òi nên không cần lo nữa ạ"
            direction={CardDirection.ROW}
          />
        </View>
      </ScrollView>
    )
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} ref={cameraRef}>
      </Camera>
      <TouchableOpacity style={styles.button} onPress={handleTakePhoto}>
        <View style={styles.snapBtn}></View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  camera: {
    width: '100%',
    height:'85%'
  },
  button: {
    position: 'absolute',
    bottom: 25,
    left: '50%',
    marginLeft: -32,
  },
  snapBtn: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.PRIMARY,
  },
  resultContainer: {
  },
  resultImageContainer: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden',
  },
  resultImage: {
    width: Dimensions.get('window').width,
    height: 350,
    transform: [{ rotate: '270deg' }]
  },
  snapAgainBtn: {
    position: 'absolute',
    opacity: 1,
    bottom: 25,
    left: '35%',
    elevation: 5,
  },

  listDishContainer: {
    marginTop: 15,
  }
});

export default Snap;