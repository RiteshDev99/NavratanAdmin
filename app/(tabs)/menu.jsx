import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList, Text, ActivityIndicator, RefreshControl} from 'react-native';


import {useDispatch} from "react-redux";

import MenuCard from "../../src/components/ui/MenuCard";
import MenuItemForm from "../../src/components/menuItems/MenuForm";
import {setMenuItems} from "../../src/store/feature/menuItems/menuSlice";
import menuService from "../../src/appwrite/menuService";
import FloatingButton from "../../src/components/ui/FloatingButton";

 function MenuTab() {
    const dispatch = useDispatch();
    const [showForm, setShowForm] = useState(false);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleFabClick = () => {
        setShowForm((prev) => !prev);
        setSelectedItem(null);
    };

    const handleCardClick = (item) => {
        setSelectedItem({ ...item, _ts: Date.now() });
        if (item){
            setShowForm(prev => !prev);
        }
    };

    const fetchMenuItems = async (isRefresh = false) => {
        try {
            if (isRefresh) setRefreshing(true);
            else setLoading(true);

            setError(null);
            const res = await menuService.getMenuItems();

            if (res) {
                dispatch(setMenuItems(res.documents));
                setItems(res.documents);
            }
        } catch (err) {
            setError('Failed to load menu items');
            console.error('Error fetching menu items:', err);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const onRefresh = () => {
        fetchMenuItems(true);
    };

    useEffect(() => {
        fetchMenuItems(true)
    }, []);

    const renderEmptyState = () => (
        <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No menu items found</Text>
            <Text style={styles.emptySubtext}>Tap the + button to add your first item</Text>
        </View>
    );

    const renderError = () => (
        <View style={styles.errorState}>
            <Text style={styles.errorText}>{error}</Text>
            <Text style={styles.errorSubtext}>Pull down to refresh</Text>
        </View>
    );

    if (loading && !refreshing) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#4CAF50" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={items}
                keyExtractor={(item) => item.$id}
                renderItem={({ item }) =>  <MenuCard item={item} onPress={() => handleCardClick(item)} />}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[
                    styles.flatListContainer,
                    items.length === 0 && styles.emptyContainer
                ]}
                columnWrapperStyle={items.length > 0 ? styles.row : null}
                ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
                ListEmptyComponent={error ? renderError() : renderEmptyState()}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={['#4CAF50']}
                        tintColor="#4CAF50"
                    />
                }
            />

            {showForm && (
                <View style={styles.modalOverlay}>
                    <MenuItemForm
                        item={selectedItem} // pass the data of selected card
                        onClose={() => {
                            setShowForm(false);
                            setSelectedItem(null);
                            fetchMenuItems();
                        }}
                    />
                </View>
            )}

            <FloatingButton onPress={handleFabClick} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    flatListContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    row: {
        justifyContent: 'space-between',
        paddingHorizontal: 8,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
    },
    emptyState: {
        alignItems: 'center',
        paddingVertical: 40,
    },
    emptyText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    emptySubtext: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
    },
    errorState: {
        alignItems: 'center',
        paddingVertical: 40,
    },
    errorText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#e74c3c',
        marginBottom: 8,
    },
    errorSubtext: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
    },
});

export default MenuTab;
