import { Stack } from 'expo-router';
import { StatusBar, TouchableOpacity } from "react-native";
import AddButton from '../components/addButton';
import DoneButton from '../components/doneButton';
import Feather from '@expo/vector-icons/Feather';
import { useRouter } from 'expo-router';

export default function Layout() {

  const router = useRouter();

  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="default"
      />
      <Stack screenOptions={{
        headerBackVisible: false,
        headerStyle: {
          backgroundColor: "lightblue",
        },
        headerTitleStyle: {
          fontSize: 20,
        },
        headerTintColor: "black",
        headerTitleAlign: "center",
      }}>
        <Stack.Screen
          name="index"
          options={{
            headerTitle: "Todos",
            headerRight: () => <AddButton />,
          }} />
        <Stack.Screen
          name="detail"
          options={({ route }) => ({
            headerTitle: route.params?.title || "Detail",
            headerLeft: () => <TouchableOpacity onPress={() => router.back()}>
              <Feather name="chevron-left" size={24} color="black" />
            </TouchableOpacity>
          })}
        />
        <Stack.Screen
          name="add"
          options={{
            presentation: "modal",
            headerTitle: "New todo",
            headerRight: () => <DoneButton />
          }}
        />
      </Stack>
    </>
  )
}

