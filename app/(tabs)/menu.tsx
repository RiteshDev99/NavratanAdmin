import { View, Text, StyleSheet } from 'react-native';
import {Signup} from '@/src/components/index'
export default function MenuTab() {
    return (
        <View style={styles.container}>
<Signup/>
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
