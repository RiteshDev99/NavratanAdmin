import { View, Text, StyleSheet } from 'react-native';

export default function MenuTab() {
    return (
        <View style={styles.container}>
            <Text>Menu Item.....</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
