import React from 'react';
import { StyleSheet, Text, View } from "react-native";

export interface DashboardCardProps {
    title: string;
    icon: React.ReactNode;
    number: string;
    backgroundColor: string;
}

const DashboardCard = ({ title, icon, number, backgroundColor }: DashboardCardProps) => {
    return (
        <View style={[styles.container, { backgroundColor }]}>
            <View style={styles.innerContainer}>
                {icon}
                <Text style={styles.title}>{title}</Text>
            </View>
            <View style={styles.numContainer}>
                <Text style={styles.numbers}>{number}</Text>
            </View>
        </View>
    );
};

export default DashboardCard;

const styles = StyleSheet.create({
    container: {
        height: 105,
        width: 170,
        borderRadius: 12,
        padding: 5,
    },
    innerContainer: {
        height: 60,
        width: '100%',
        flexDirection: "row",
        justifyContent: 'center',
        gap: 10,
        alignItems: 'center',
    },
    title: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '400',
    },
    numContainer: {
        flex: 1,
        alignItems: 'center',
    },
    numbers: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
});
