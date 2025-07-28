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
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import {Button} from "@/src/components";

export default function PostForm() {
    const[title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [price, setPrice] = useState('');
    const [featuredImage, setFeaturedImage] = useState('');
    const [modalVisible, setModalVisible] = useState(true);

    const handleImagePick = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled && result.assets.length > 0) {
            setFeaturedImage(result.assets[0].uri);
        }
    };

    const handleSubmit = () => {
        if (!title || !price || !featuredImage) {
            Alert.alert('Please fill all fields');
            return;
        }

        const formData = {
            title,
            price,
            featuredImage,
        };

        console.log('Form Data:', formData);
        handleClose();
    };

    const handleClose = () => {
        setModalVisible(false);
        setPrice('');
        setFeaturedImage('');
    };

    return (
        <Modal
            visible={modalVisible}
            animationType="slide"
            transparent
            onRequestClose={handleClose}
        >
            <SafeAreaView style={styles.overlay}>
                <View style={styles.container}>
                    {/* Close Icon */}
                    <TouchableOpacity style={styles.closeIcon} onPress={handleClose}>
                        <Ionicons name="close" size={28} color="#333" />
                    </TouchableOpacity>

                    <ScrollView
                        contentContainerStyle={{ padding: 20 }}
                        keyboardShouldPersistTaps="handled"
                        showsVerticalScrollIndicator={false}
                    >
                        <Text style={styles.heading}>Add Food</Text>

                        <TextInput
                            style={styles.input}
                            placeholder="Title"
                            placeholderTextColor="#888"
                            value={title}
                            onChangeText={setTitle}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Slug Id"
                            placeholderTextColor="#888"
                            value={slug}
                            onChangeText={setSlug}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Price"
                            placeholderTextColor="#888"
                            value={price}
                            onChangeText={setPrice}
                            keyboardType="numeric"
                        />

                        <TouchableOpacity style={styles.imagePicker} onPress={handleImagePick}>
                            {featuredImage ? (
                                <Image source={{ uri: featuredImage }} style={styles.image} />
                            ) : (
                                <View style={styles.imagePlaceholder}>
                                    <Ionicons name="camera" size={40} color="#ccc" />
                                    <Text style={styles.imageText}>Pick an image</Text>
                                </View>
                            )}
                        </TouchableOpacity>

                        <Button
                            style={{ marginTop: 10, paddingVertical:15 }}
                            onPress={handleSubmit}
                        >
                            Submit
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
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 12,
        marginBottom: 16,
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
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageText: {
        color: '#888',
        fontSize: 16,
        marginTop: 8,
    },
    submitButton: {
        backgroundColor: '#007BFF',
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 10,
    },
    submitText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
