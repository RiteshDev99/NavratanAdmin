import React, { useEffect, useState } from "react";
import {FlatList, StyleSheet, View, Text, ScrollView} from "react-native";
import { Feather, FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import DashboardCard, { DashboardCardProps } from "@/src/components/ui/dashboardCard";
import menuService from "@/src/appwrite/menuService";
import OrdersReceivedCard from "@/src/components/ui/OrdersReceivedCard";
import ShimmerEffectCard from "@/src/components/ui/shimmerEffectCard";

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
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const arr = Array.from({ length: 5 });
    useEffect(() => {
        menuService.getOrders().then((res) => {
            setOrders(res.documents);
            setLoading(false);
        });

        const unsubscribe = menuService.subscribeToOrders((newOrder: any) => {
            console.log("New payment received:", newOrder);
            setOrders((prev) => [newOrder, ...prev]);
        });

        return () => unsubscribe();
    }, []);

    return (
        <ScrollView style={styles.dashboard}>
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

            <View style={styles.container}>
                {loading ? (
                        <View>
                            {arr.map((_, index) => (
                                <ShimmerEffectCard key={index}/>
                            ))}

                        </View>

                ) : (
                    <View>
                        {orders.length > 0 ? (
                            orders.map((item) => (
                                <View key={item.$id} style={styles.paymentItem}>
                                    <OrdersReceivedCard key={item.$id} item={item} />

                                </View>
                            ))
                        ) : (
                            <Text style={{ textAlign: "center", marginTop: 20 }}>
                                No orders found
                            </Text>
                        )}
                    </View>
                )}
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
        // backgroundColor: "#fff",
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginHorizontal:40
    },
    paymentItem: {

    },
    paymentText: {
        fontSize: 16,
    },
});
