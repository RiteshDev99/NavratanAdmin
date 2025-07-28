import {StyleSheet, View, TouchableOpacity, StatusBar,  Pressable} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import {useRouter} from "expo-router";
import React from "react";
import {useSelector} from "react-redux";
import Logo from "@/src/components/ui/Logo";

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
                        <Logo style={{height: 80,}} />
                    </Pressable>

                    <TouchableOpacity style={styles.profile}
                     onPress={()=> router.push("/profile")}
                    >
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
