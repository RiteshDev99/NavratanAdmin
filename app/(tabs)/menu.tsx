import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import FloatingButton from '@/src/components/ui/FloatingButton';
import PostForm from '@/src/components/postForm/PostForm';

export default function MenuTab() {
    const [showForm, setShowForm] = useState(false);

    const handleFabClick = () => {
        setShowForm((prev) => !prev);
    };

    return (
        <View style={styles.container}>
            {showForm ? (
                <ScrollView>
                    <PostForm/>
                </ScrollView>
            ) : (
                <Text style={styles.header}>Click the + to add a new post</Text>
            )}

            <FloatingButton onPress={handleFabClick} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        fontSize: 20,
        textAlign: 'center',
    },
});
