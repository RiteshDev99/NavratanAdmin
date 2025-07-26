import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Feather, FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import DashboardCard, { DashboardCardProps } from "@/src/components/ui/dashboardCard";

const dashboardCards: DashboardCardProps[] = [
    {
        title: "Orders",
        icon: <Feather size={32} name="shopping-cart" color={"#fff"} />,
        number: "150",
        backgroundColor: "#487efa",
    },
    {
        title: "Revenue",
        icon: <FontAwesome size={32} name="rupee" color={"#fff"} />,
        number: "₹2,345",
        backgroundColor: "#4bad7a",
    },
    {
        title: "Reserved",
        icon: <FontAwesome size={32} name="calendar-check-o" color={"#fff"} />,
        number: "56",
        backgroundColor: "#f28f61",
    },
    {
        title: "Delivered",
        icon: <FontAwesome6 size={32} name="bell-concierge" color={"#fff"} />,
        number: "110",
        backgroundColor: "#7063e6",
    },
];

export default function Index() {
    return (
        <View style={styles.dashboard}>
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
                showsVerticalScrollIndicator={false} 
            />
        </View>
    );
}

const styles = StyleSheet.create({
    dashboard: {
        flex: 1,
    },
    headerText: {
        fontSize: 27,
        fontWeight: "bold",
        color: "#0f0f0d",
        paddingHorizontal: 20,
        paddingBottom: 10,
    },
    listContainer: {
        paddingHorizontal: 10,
        paddingBottom: 20,
    },
    row: {
        justifyContent: "space-evenly",
        marginBottom: 15,
    },
});
