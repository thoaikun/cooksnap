import FilledButton from '@/Components/Button/FilledButton';
import Card, { CardDirection } from '@/Components/Card/Card';
import Divider from '@/Components/Divider/Divider';
import { Recipe } from '@/Model/foodRecommendation';
import foodApi from '@/Services/food';
import { Colors } from '@/Theme/Variables';
import { getImageExtension } from '@/Utils';
import { useMutation } from '@tanstack/react-query';
import { Camera, CameraCapturedPicture, CameraPictureOptions, CameraType } from 'expo-camera';
import { SaveFormat, manipulateAsync } from 'expo-image-manipulator';
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Button, Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RootScreens } from '..';
import { FlatList } from 'native-base';
import { LocalizationKey, i18n } from '@/Localization';

interface IProps {
  onNavigate: (screen: RootScreens, params?: any) => void;
}

const Snap = ({ onNavigate }: IProps) => {
  const [type, setType] = useState(CameraType.back);
  const [photo, setPhoto] = useState<CameraCapturedPicture | undefined>(undefined);
  const [photoExtension, setPhotoExtensions] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [shownRecipes, setShownRecipes] = useState<Recipe[]>([]);
  const [page, setPage] = useState<number>(1);

  const [permission, requestPermission] = Camera.useCameraPermissions();
  const cameraRef = useRef<Camera>(null);

  const foodRecommendationMutation = useMutation({
    mutationFn: async (payload: FormData) => {
      return await foodApi.getRecommendationFromImage(payload)
    },
    onSuccess: (res) => {
      setRecipes(res)
      setShownRecipes(res.slice(0, page * 10))
    },
    onError: (err) => {
      console.log(err)
    }
  })

  const compressPhoto = async (photo: CameraCapturedPicture | undefined) => {
    if (!photo) return
    const manipResult = await manipulateAsync(
      photo.uri,
      [{ resize: { width: 1080 } }],
      { compress: 0.7, format: SaveFormat.JPEG }
    );
    return manipResult
  }

  const handleTakePhoto = async () => {
    setLoading(true);
    let options: CameraPictureOptions = {
      quality: 1,
      base64: true,
      exif: true,
    }

    let snappedPhoto = await cameraRef?.current?.takePictureAsync(options);
    snappedPhoto = await compressPhoto(snappedPhoto);
    setPhoto(snappedPhoto);
    setPhotoExtensions(getImageExtension(snappedPhoto?.uri) ?? '');
    setLoading(false);
  }

  const handleLoadMore = () => {
    if (page <= 0)
      return
    if (page > Math.ceil(recipes.length / 10))  
      return
    setPage(page + 1)
  }

  useEffect(() => {
    if (!photo || !photoExtension) return
    const formData = new FormData()
    // @ts-ignore
    formData.append(
      'image',
      {
        uri: photo?.uri,
        name: `photo.${photoExtension}`,
        type: `image/${photoExtension}`,
      }
    )
    foodRecommendationMutation.mutate(formData)
  }, [photo, photoExtension])

  useEffect(() => {
    if (page === 1) return
    setShownRecipes(recipes.slice(0, page * 10))
  }, [page])


  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={[styles.container, { flex: 1, justifyContent: 'center', alignItems: 'center', rowGap: 20, paddingHorizontal: 20}]}>
        <Text style={{ textAlign: 'center' }}>{i18n.t(LocalizationKey.GRANT_PERMISSION_QUOTE)}</Text>
        <FilledButton onPress={requestPermission} title={i18n.t(LocalizationKey.GRANT_PERMISSION)} style={{ alignSelf: 'center' }}/>
      </View>
    );
  }

  if (photo) {
    return (
      <View>
        
        <View style={styles.resultImageContainer}>
          <Image source={{ uri: photo.uri }} style={styles.resultImage} resizeMode='cover'/>
          <FilledButton 
            title='Snap again'
            style={styles.snapAgainBtn}
            onPress={() => {
              setPhoto(undefined)
              setPhotoExtensions('')
              setPage(1)
            }}
          />
        </View>

        <View>
          {foodRecommendationMutation.isPending ? 
            <View style={{ height: 400, justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator size='large' color={Colors.PRIMARY} />
            </View>
            :
            <FlatList
              style={styles.listDishContainer}
              data={shownRecipes}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <Card 
                  imageUrl={item.image}
                  title={item.label}
                  subtitle={item.healthLabels.slice(0, 5).join(', ')}
                  direction={CardDirection.ROW} 
                  onPress={() => onNavigate(RootScreens.DISH_DETAIL, { dish: item })}
                />
              )}
              onEndReached={handleLoadMore}
              onEndReachedThreshold={0.1}
              ListFooterComponent={() => 
                page < Math.ceil(recipes.length / 10) ?
                  <View style={{ height: 100, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size='large' color={Colors.PRIMARY} />
                  </View>
                  :
                  null
              }
              ItemSeparatorComponent={() => <Divider />}
              showsVerticalScrollIndicator={false}
            />
          }
        </View>

      </View>
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
    marginHorizontal: 15,
    height: Dimensions.get('window').height - 350,
  }
});

export default Snap;