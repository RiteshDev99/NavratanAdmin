import { View, Text, StyleSheet } from 'react-native';
import {Login} from '@/src/components/index'

export default function SettingTab() {
    return (
        <View style={styles.container}>
            <Login/>
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
