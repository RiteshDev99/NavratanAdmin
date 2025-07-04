import { Tabs } from 'expo-router';
import {AntDesign, EvilIcons, MaterialCommunityIcons} from "@expo/vector-icons";
import CustomHeader from "@/src/components/customHeader";

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: '#FF6347',
                header: () => <CustomHeader />,
                tabBarStyle: {
                    height: 80,
                    backgroundColor:'#F8FAFC'
                },
        }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Dashboard',
                    tabBarIcon: ({ color }) => <AntDesign size={22} name="home" color={color} />,
                }}
            />
            <Tabs.Screen
                name="menu"
                options={{
                    title: 'Menu-Edit',
                    tabBarIcon: ({ color }) => <MaterialCommunityIcons  size={22} name="clipboard-edit-outline" color={color} />,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color }) => <EvilIcons size={32} name="user" color={color} />,
                }}
            />
        </Tabs>
    );
}
