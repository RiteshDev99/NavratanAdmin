import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Image,
    SafeAreaView,
    Modal,
    ScrollView,
    Switch, ActivityIndicator, Alert,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/src/components';
import { showToast } from '@/src/utils/toastConfig';
import Logo from '@/src/components/ui/Logo';
import menuService from '../../appwrite/menuService';
import {useDispatch} from 'react-redux';
import {addMenuItem, deleteMenuItem as deleteMenuCard} from "../../store/feature/menuItems/menuSlice";



export default function MenuItemForm({item }) {
    const [modalVisible, setModalVisible] = useState(true);
    const [imageUri, setImageUri] = useState(null);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);


    const {
        control,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: '',
            image: '',
            price: '',
            category: '',
            isFeatured: false,
        },
    });

    const handleImagePick = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled && result.assets.length > 0) {
            setImageUri(result.assets[0].uri);
        }
    };


    const handleClose = () => {
        reset();
        setImageUri(null);
        setModalVisible(false);
    };


    const onSubmit = async (data) => {
        try {
            setLoading(true);
            let uploadedImage = null;

            if (imageUri) {
                const file = {
                    uri: imageUri,
                    name: `menu-${Date.now()}.jpg`,
                    type: 'image/jpeg',
                };
                uploadedImage = await menuService.uploadFile(file);
                console.log('Image ID:', uploadedImage?.$id);
                console.log('Image URL:', uploadedImage?.url);


                const payload = {
                    ...data,
                    image: uploadedImage ? uploadedImage.$id : '',
                    price: data.price,
                    createdAt: new Date().toISOString(),
                };

                const result = await menuService.createMenuItem(payload);
                console.log(payload);

                if (result) {
                    dispatch(addMenuItem(result));
                    showToast('success', 'Success', 'Menu item added!');
                    reset();
                    setImageUri(null);
                    setModalVisible(false);
                }
            }else{
                showToast('info', 'No Image', 'Please select an image');
                Alert.alert('No Image', 'Please select an image')
            }
        } catch (error) {
            console.error('Error creating item:', error);
            showToast('error', 'Error', error.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };



    const DeleteCard = async (id) => {
        try {
            const success = await menuService.deleteMenuItem(id);

            if (success) {
                dispatch(deleteMenuCard(id));
                setModalVisible(false);
                showToast("success", "Menu item deleted!");
            } else {
                showToast("error", "Failed to delete menu item");
            }
        } catch (error) {
            console.error("Error deleting item:", error);
            showToast("error", "Something went wrong while deleting");
        }
    };

    useEffect(() => {
        if (item) {
            setValue('name', item.name);
            setValue('category', item.category);
            setValue('price', item.price);
            setImageUri(item.imageUrl);
        }
    }, [item]);

    return (
        <Modal visible={modalVisible} animationType="slide" transparent onRequestClose={handleClose}>
            <SafeAreaView style={styles.overlay}>
                <View style={styles.container}>
                    <TouchableOpacity style={styles.closeIcon} onPress={handleClose}>
                        <Ionicons name="close" size={28} color="#333" />
                    </TouchableOpacity>

                    <ScrollView contentContainerStyle={{ padding: 20, gap:5, }} keyboardShouldPersistTaps="handled">
                        <View style={styles.logoContainer}>
                            <Logo />
                            <Text style={styles.title}>{item ? "Update Menu Item" : " Add New Menu Item"}</Text>
                        </View>
                        <Controller
                            control={control}
                            name="name"
                            rules={{ required: 'Name is required' }}
                            render={({ field: { onChange, value } }) => (
                                <TextInput
                                    style={styles.input}
                                    placeholder="Food Name"
                                    value={value}
                                    onChangeText={onChange}
                                />
                            )}
                        />
                        {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}

                        <Controller
                            control={control}
                            name="price"
                            rules={{ required: 'Price is required' }}
                            render={({ field: { onChange, value } }) => (
                                <TextInput
                                    style={styles.input}
                                    placeholder="Price"
                                    keyboardType="numeric"
                                    value={value}
                                    onChangeText={onChange}
                                />
                            )}
                        />
                        {errors.price && <Text style={styles.error}>{errors.price.message}</Text>}

                        <Controller
                            control={control}
                            name="category"
                            render={({ field: { onChange, value } }) => (
                                <TextInput
                                    style={styles.input}
                                    placeholder="Category"
                                    value={value}
                                    onChangeText={onChange}
                                />
                            )}
                        />

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                            <Text>Featured</Text>
                            <Controller
                                control={control}
                                name="isFeatured"
                                render={({ field: { onChange, value } }) => (
                                    <Switch value={value} onValueChange={onChange} style={{ marginLeft: 10 }} />
                                )}
                            />
                        </View>

                        <TouchableOpacity style={styles.imagePicker} onPress={handleImagePick}>
                            {imageUri ? (
                                <Image source={{ uri: imageUri }} style={styles.image} />
                            ) : (
                                <View style={styles.imagePlaceholder}>
                                    <Ionicons name="camera" size={40} color="#ccc" />
                                    <Text style={styles.imageText}>Pick an image</Text>
                                </View>
                            )}
                        </TouchableOpacity>

                        <Button style={{ marginTop: 10, paddingVertical: 13 }} onPress={handleSubmit(onSubmit)}>
                            {loading ?   <ActivityIndicator size="small" color={'#fff'} /> : item ? "Update" : "Add menu"}
                        </Button>
                        {item ? (
                            <Button
                                style={{ marginTop: 10, paddingVertical: 13, backgroundColor: '#FF5252' }}
                                onPress={() => DeleteCard(item.$id)}
                            >
                                {loading ?  <ActivityIndicator size="small" color={'#fff'} /> : 'Delete Card' }
                            </Button>
                        ) : null}

                    </ScrollView>
                </View>
            </SafeAreaView>
        </Modal>
    );
}


const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        width: '90%',
        maxHeight: '90%',
        backgroundColor: '#fff',
        borderRadius: 16,
        overflow: 'hidden',
        position: 'relative',
    },
    closeIcon: {
        position: 'absolute',
        top: 12,
        right: 12,
        zIndex: 1,
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        marginTop: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 12,
        marginBottom: 10,
        fontSize: 16,
    },
    imagePicker: {
        height: 150,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
        resizeMode: 'cover',
    },
    imagePlaceholder: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageText: {
        color: '#888',
        fontSize: 16,
        marginTop: 8,
    },
    error: {
        color: 'red',
        marginBottom: 10,
        fontSize: 14,
    },
});
