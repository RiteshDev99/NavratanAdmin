import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View, Text, ScrollView } from "react-native";
import { Feather, FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import DashboardCard, { DashboardCardProps } from "@/src/components/ui/dashboardCard";
import menuService from "@/src/appwrite/menuService";

const dashboardCards: DashboardCardProps[] = [
    {
        title: "Orders",
        icon: <Feather size={25} name="shopping-cart" color={"#fff"} />,
        number: "150",
        backgroundColor: "#487efa",
    },
    {
        title: "Revenue",
        icon: <FontAwesome size={25} name="rupee" color={"#fff"} />,
        number: "₹2,345",
        backgroundColor: "#4bad7a",
    },
    {
        title: "Reserved",
        icon: <FontAwesome size={25} name="calendar-check-o" color={"#fff"} />,
        number: "56",
        backgroundColor: "#f28f61",
    },
    {
        title: "Delivered",
        icon: <FontAwesome6 size={25} name="bell-concierge" color={"#fff"} />,
        number: "110",
        backgroundColor: "#7063e6",
    },
];

export default function Index() {
    const [payments, setPayments] = useState<any[]>([]);

    useEffect(() => {
        menuService.getPayments().then((res) => {
            setPayments(res.documents);
        });

        const unsubscribe = menuService.subscribeToPayments((newPayment: any) => {
            console.log("New payment received:", newPayment);
            setPayments((prev) => [newPayment, ...prev]);
        });

        return () => unsubscribe();
    }, []);

    return (
        <ScrollView style={styles.dashboard}>
            {/* Dashboard Cards */}
            <FlatList
                data={dashboardCards}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2}
                columnWrapperStyle={styles.row}
                contentContainerStyle={styles.listContainer}
                renderItem={({ item }) => (
                    <DashboardCard
                        title={item.title}
                        icon={item.icon}
                        number={item.number}
                        backgroundColor={item.backgroundColor}
                    />
                )}
                scrollEnabled={false}
            />

            {/* Payments Section */}
            <View style={styles.container}>
                <Text style={styles.title}>Payments</Text>
                {payments.map((item) => (
                    <View key={item.$id} style={styles.paymentItem}>
                        <Text style={styles.paymentText}>
                            {item.name} — ₹{item.amount} — {item.status}
                        </Text>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    dashboard: {
        flex: 1,
    },
    listContainer: {
        paddingHorizontal: 10,
        paddingBottom: 20,
    },
    row: {
        justifyContent: "space-evenly",
        marginBottom: 15,
    },
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 12,
    },
    paymentItem: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    paymentText: {
        fontSize: 16,
    },
});
