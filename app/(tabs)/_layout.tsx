import { Tabs } from 'expo-router';
import {AntDesign, EvilIcons,  MaterialIcons} from "@expo/vector-icons";
import CustomHeader from "@/src/components/customHeader";

export default function TabLayout() {

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: '#FF6347',
                header: () => <CustomHeader />,
                tabBarStyle: {
                    height: 80,
                    backgroundColor:'#F8FAFC',
                    shadowRadius: 5

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
                    title: 'Menu',
                    tabBarIcon: ({ color }) => <MaterialIcons size={25} name="restaurant-menu" color={color} />,
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
