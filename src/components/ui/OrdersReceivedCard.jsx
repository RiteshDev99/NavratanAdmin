import React, { useState, useRef, useEffect } from "react";
import { Animated, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Button from '@/src/components/ui/Button';

const OrdersReceivedCard = ({ item }) => {
    const [expanded, setExpanded] = useState(false);
    const [completedItems, setCompletedItems] = useState(new Set());
    const animatedHeight = useRef(new Animated.Value(0)).current; // start closed

    const toggleExpand = () => setExpanded(!expanded);

    const toggleItemCompletion = (index) => {
        setCompletedItems(prev => {
            const newSet = new Set(prev);
            if (newSet.has(index)) {
                newSet.delete(index);
            } else {
                newSet.add(index);
            }
            return newSet;
        });
    };

    useEffect(() => {
        Animated.timing(animatedHeight, {
            toValue: expanded ? 1 : 0,
            duration: 200,
            useNativeDriver: false,
        }).start();
    }, [expanded]);

    return (
        <View style={styles.card}>
            <Pressable style={styles.inner} onPress={toggleExpand}>
                <View style={styles.info}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.payment}>₹{item.totalAmount}</Text>
                </View>
                <Button style={styles.button}>Done</Button>
            </Pressable>

            <Animated.View
                style={[
                    styles.expandable,
                    {
                        maxHeight: animatedHeight.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, 300],
                        }),
                        opacity: animatedHeight,
                    },
                ]}
            >
                {item.items && item.items.length > 0 && (
                    <>
                        <View style={[styles.row, styles.headerRow]}>
                            <View style={styles.itemCell}>
                                <Text style={[styles.cell, styles.headerText]}>Item</Text>
                            </View>
                            <View style={styles.qtyCell}>
                                <Text style={[styles.cell, styles.headerText, styles.centerText]}>Qty</Text>
                            </View>
                            <View style={styles.amountCell}>
                                <Text style={[styles.cell, styles.headerText, styles.rightText]}>Amount</Text>
                            </View>
                            <View style={styles.statusCell}>
                                <Text style={[styles.cell, styles.headerText, styles.centerText]}>Status</Text>
                            </View>
                        </View>

                        {item.items.map((productString, index) => {
                            const product = JSON.parse(productString);
                            const isCompleted = completedItems.has(index);

                            return (
                                <View key={index} style={[styles.row, isCompleted && styles.completedRow]}>
                                    <View style={styles.itemCell}>
                                        <Text style={[styles.cell, isCompleted && styles.completedText]} numberOfLines={1}>
                                            {product.name}
                                        </Text>
                                    </View>
                                    <View style={styles.qtyCell}>
                                        <Text style={[styles.cell, styles.centerText, isCompleted && styles.completedText]}>
                                            {product.quantity}
                                        </Text>
                                    </View>
                                    <View style={styles.amountCell}>
                                        <Text style={[styles.cell, styles.rightText, isCompleted && styles.completedText]}>
                                            ₹{product.price}
                                        </Text>
                                    </View>
                                    <View style={styles.statusCell}>
                                        <TouchableOpacity
                                            style={[styles.checkbox, isCompleted ? styles.checkedBox : styles.uncheckedBox]}
                                            onPress={() => toggleItemCompletion(index)}
                                        >
                                            {isCompleted && <Text style={styles.checkmark}>✓</Text>}
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            );
                        })}
                    </>
                )}
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        marginVertical: 10,
        marginHorizontal: 16,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        overflow: "hidden",
    },
    inner: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 15,
    },
    info: {
        flexDirection: "column",
    },
    name: {
        fontSize: 16,
        fontWeight: "600",
        color: "#333",
    },
    payment: {
        fontSize: 17,
        fontWeight: "500",
        color: "#1ca671",
        marginTop: 4,
    },
    button: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
        backgroundColor: "#1ca671",
    },
    expandable: {
        overflow: "hidden",
        borderTopWidth: 1,
        borderTopColor: "#eee",
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderBottomWidth: 0.5,
        borderColor: "#eee",
    },
    headerRow: {
        backgroundColor: "#f9f9f9",
    },
    cell: {
        fontSize: 14,
        color: "#444",
    },
    headerText: {
        fontWeight: "700",
        color: "#333",
    },
    // Column-specific widths and alignments
    itemCell: {
        flex: 3,
        justifyContent: 'center',
        paddingRight: 8,
    },
    qtyCell: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 50,
    },
    amountCell: {
        flex: 1.5,
        alignItems: 'flex-end',
        justifyContent: 'center',
        minWidth: 70,
    },
    statusCell: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 60,
    },
    // Text alignments
    centerText: {
        textAlign: 'center',
    },
    rightText: {
        textAlign: 'right',
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderRadius: 4,
        alignItems: "center",
        justifyContent: "center",
    },
    uncheckedBox: {
        backgroundColor: "transparent",
        borderColor: "#ccc",
    },
    checkedBox: {
        backgroundColor: "#4caf50",
        borderColor: "#4caf50",
    },
    checkmark: {
        color: "white",
        fontSize: 14,
        fontWeight: "bold",
    },
    // Completed item styles
    completedRow: {
        backgroundColor: "#f8f8f8",
        opacity: 0.7,
    },
    completedText: {
        textDecorationLine: 'line-through',
        color: "#999",
    },
});

export default OrdersReceivedCard;
