import React, { useState } from 'react';
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
    Alert,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/src/components';
import { showToast } from '@/src/utils/toastConfig';
import Logo from '@/src/components/ui/Logo';

export default function AddMenuItemForm() {
    const [modalVisible, setModalVisible] = useState(true);
    const [imageUri, setImageUri] = useState(null);

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: '',
            price: '',
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

    const onSubmit = (data) => {
        if (!imageUri) {
            Alert.alert('Please select an image');
            return;
        }

        const menuItem = {
            ...data,
            image: imageUri,
        };

        console.log('Menu Item:', menuItem);
        showToast('success', 'Menu item added successfully!');
        handleClose();
    };

    const handleClose = () => {
        reset();
        setImageUri(null);
        setModalVisible(false);
    };

    return (
        <Modal visible={modalVisible} animationType="slide" transparent onRequestClose={handleClose}>
            <SafeAreaView style={styles.overlay}>
                <View style={styles.container}>
                    <TouchableOpacity style={styles.closeIcon} onPress={handleClose}>
                        <Ionicons name="close" size={28} color="#333" />
                    </TouchableOpacity>

                    <ScrollView contentContainerStyle={{ padding: 20 }} keyboardShouldPersistTaps="handled">
                        <View style={styles.logoContainer}>
                            <Logo />
                        </View>

                        {/* Name of Dish */}
                        <Controller
                            control={control}
                            name="name"
                            rules={{ required: 'Name is required' }}
                            render={({ field: { onChange, value } }) => (
                                <TextInput
                                    style={styles.input}
                                    placeholder="Food Name"
                                    placeholderTextColor="#888"
                                    value={value}
                                    onChangeText={onChange}
                                />
                            )}
                        />
                        {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}

                        {/* Price */}
                        <Controller
                            control={control}
                            name="price"
                            rules={{ required: 'Price is required' }}
                            render={({ field: { onChange, value } }) => (
                                <TextInput
                                    style={styles.input}
                                    placeholder="Price"
                                    placeholderTextColor="#888"
                                    keyboardType="numeric"
                                    value={value}
                                    onChangeText={onChange}
                                />
                            )}
                        />
                        {errors.price && <Text style={styles.error}>{errors.price.message}</Text>}

                        {/* Image Picker */}
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

                        {/* Submit Button */}
                        <Button style={{ marginTop: 10, paddingVertical: 13 }} onPress={handleSubmit(onSubmit)}>
                            Add Item
                        </Button>
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
    logoContainer: {
        alignItems: 'center',
        marginBottom: 10,
    },
});
