import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Feather from '@expo/vector-icons/Feather';

const todosRef = {
  current: [
    { id: '1', title: 'Clean the house', description: 'Vacuum and clean the bathroom', createdAt: '2025-05-25', done: true },
    { id: '2', title: 'Go to the store', description: 'Get milk and bananas', createdAt: '2025-05-27', done: false }
  ]
};

export default function HomeScreen() {
  const [todos, setTodos] = useState(todosRef.current);
  const router = useRouter();
  const params = useLocalSearchParams();

  useEffect(() => {
    setTodos(todosRef.current);
  }, []);

  useEffect(() => {
    if (params?.newTodo) {
      const newItem = JSON.parse(params.newTodo);
      setTodos((prev) => {
        const exists = prev.some((t) => t.id === newItem.id);
        const updated = exists ? prev : [...prev, newItem];
        todosRef.current = updated;
        return updated;
      });
      router.replace('/');
      return;
    }

    if (params?.toggleId) {
      setTodos((prev) => {
        const updated = prev.map((t) =>
          t.id === params.toggleId ? { ...t, done: !t.done } : t
        );
        todosRef.current = updated;
        return updated;
      });
      router.replace('/');
      return;
    }

    if (params?.deleteId) {
      setTodos((prev) => {
        const updated = prev.filter((t) => t.id !== params.deleteId);
        todosRef.current = updated;
        return updated;
      });
      router.replace('/');
      return;
    }
  }, [params]);

  const handlePress = (todo) => {
    router.push({
      pathname: "/detail",
      params: {
        id: todo.id,
        title: todo.title,
        description: todo.description,
        createdAt: todo.createdAt,
        done: todo.done.toString()
      },
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <Text style={[
              styles.todoText,
              item.done && styles.todoTextDone
            ]}>
              {item.title}
            </Text>
            <TouchableOpacity
              style={styles.todoButton}
              onPress={() => handlePress(item)}
            >
              <Feather name="chevron-right" size={24} color="black" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#f8f9fa",
    padding: 40
  },
  todoText: {
    fontSize: 18
  },
  todoTextDone: {
    textDecorationLine: "line-through",
  },
  todoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    borderColor: "lightgray",
    borderWidth: 1,
    padding: 8,
    borderRadius: 5,
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: "white"
  }
});

