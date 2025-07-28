import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type FloatingButtonProps = {
    onPress: () => void;
};

const FloatingButton: React.FC<FloatingButtonProps> = ({ onPress }) => {
    return (
        <TouchableOpacity style={styles.fab} onPress={onPress}>
            <Ionicons name="add" size={28} color="#fff" />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        bottom: 30,
        right: 25,
        backgroundColor: '#eb7724',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
});

export default FloatingButton;
