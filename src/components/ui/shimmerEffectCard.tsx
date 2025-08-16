import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View, Easing } from "react-native";
const ShimmerEffectCard = () => {
    const shimmerAnim = useRef(new Animated.Value(-1)).current;

    useEffect(() => {
        Animated.loop(
            Animated.timing(shimmerAnim, {
                toValue: 1,
                duration: 1200,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start();
    }, []);

    const translateX = shimmerAnim.interpolate({
        inputRange: [-1, 1],
        outputRange: [-300, 300], 
    });

    return (
        <View style={styles.card}>
            <View style={styles.info}>
                <View style={styles.shimmerName}>
                    <Animated.View
                        style={[
                            styles.shimmerGradient,
                            { transform: [{ translateX }] },
                        ]}
                    />
                </View>
                <View style={styles.shimmerPayment}>
                    <Animated.View
                        style={[
                            styles.shimmerGradient,
                            { transform: [{ translateX }] },
                        ]}
                    />
                </View>
            </View>
            <View style={styles.shimmerButton}>
                <Animated.View
                    style={[
                        styles.shimmerGradient,
                        { transform: [{ translateX }] },
                    ]}
                />
            </View>
        </View>
    );
};

export default ShimmerEffectCard;

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 15,
        marginVertical: 10,
        marginHorizontal: 20,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    info: {
        flexDirection: "column",
    },
    shimmerName: {
        width: 120,
        height: 20,
        borderRadius: 4,
        marginBottom: 5,
        backgroundColor: "#eee",
        overflow: "hidden",
    },
    shimmerPayment: {
        width: 60,
        height: 16,
        borderRadius: 4,
        backgroundColor: "#eee",
        overflow: "hidden",
    },
    shimmerButton: {
        width: 60,
        height: 30,
        borderRadius: 8,
        backgroundColor: "#eee",
        overflow: "hidden",
    },
    shimmerGradient: {
        width: 300,
        height: "100%",
        backgroundColor: "#ddd",
        opacity: 0.7,
    },
});
