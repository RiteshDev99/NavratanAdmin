import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import menuService from '@/src/appwrite/menuService';

export default function MenuCard({ item, onPress }) {
    const imageUrl = menuService.getImagePreview(item.image);

    return (
        <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: imageUrl.href }}
                    style={styles.image}
                    resizeMode="cover"
                />
            </View>
            <View style={styles.content}>
                <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
                <Text style={styles.price}>₹{item.price}</Text>
            </View>
        </TouchableOpacity>

    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        height: 190,
        width: 175,
        borderRadius: 12,
        marginHorizontal: 7,
        marginVertical: 7,
        shadowRadius: 8,
        elevation: 4,
        overflow: 'hidden',
    },
    imageContainer: {
        height: 140,
        width: '100%',
        backgroundColor: '#f5f5f5',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    content: {
        flexDirection: 'row',
        padding:10,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    name: {
        fontSize: 14,
        fontWeight: '600',
        color: '#2c3e50',
        marginBottom: 8,
        lineHeight: 20,
    },
    price: {
        fontSize: 15,
        fontWeight: '700',
        color: '#27ae60',
    },
});
