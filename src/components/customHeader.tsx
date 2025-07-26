import {StyleSheet, View, TouchableOpacity, StatusBar,  Pressable, Text} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import {useRouter} from "expo-router";
import React from "react";
import {useSelector} from "react-redux";

const CustomHeader = () => {
    const router = useRouter();
    const userData  = useSelector((state:any) => state.auth.userData);

    return (
        <>
            <StatusBar backgroundColor="#1E293B" barStyle="dark-content" />
            <SafeAreaView>
                <View style={styles.topBar}>
                    <Pressable
                        onPress={()=> router.push("/")}
                    >
                        <Image
                            source={require('@/assets/icons/Navratan_Logo.png')}
                            style={styles.appImage}
                        />

                        </Pressable>

                    <TouchableOpacity style={styles.profile}
                     onPress={()=> router.push("/profile")}
                    >
                        {/*<FontAwesome5 size={26} name="user" color={'#FF6347'} />*/}
                        <Image
                            source={{
                                uri: userData?.avatarUrl || "https://i.pravatar.cc/150?img=12",
                            }}
                            style={styles.profileImage}
                        />
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
        flexDirection: 'row',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#dcd9d9',
    },
    profileImage: {
        width: '100%',
        height: '100%',
        borderRadius: 60,
        borderWidth: 3,
        borderColor: "#4CAF50",
    },
});

export default CustomHeader;
