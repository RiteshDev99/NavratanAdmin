import { StyleSheet, View, TouchableOpacity, StatusBar } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";

const CustomHeader = () => {
    return (
        <>
            <StatusBar backgroundColor="#1E293B" barStyle="dark-content" />
            <SafeAreaView>
                <View style={styles.topBar}>
                    <Image
                        source={require('@/assets/icons/Navratan_Logo.png')}
                        style={styles.appImage}
                    />
                    <TouchableOpacity style={styles.profile}>
                        <FontAwesome5 size={26} name="user" color={'#FF6347'} />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: "#F8FAFC",
        alignItems: 'center',
        height: 80,
        width: '100%',
        paddingHorizontal: 10,
    },
    appImage: {
        height: 100,
        width: 100,
        resizeMode: 'contain',
    },
    profile: {
        width: 50,
        height: 50,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#dcd9d9',
    },
});

export default CustomHeader;
