import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Boora !</Text>

        <Text style={styles.description}>
          Toda semana um novo desafio pra você se movimentar, acumular pontos e
          subir no ranking da turma!
        </Text>

        <TouchableOpacity
          style={[styles.button, styles.createButton]}
          onPress={() => router.push("/signup")}
        >
          <Text style={styles.loginButtonText}>Criar conta</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.loginButton]}
          onPress={() => router.push("/login")}
        >
          <Text style={styles.loginButtonText}>Já tenho conta</Text>
        </TouchableOpacity>

        <Image
          source={require("@/assets/images/people.jpg")}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 24,
    marginTop: 80,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FF9800",
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    color: "#FF9800",
    marginBottom: 32,
  },
  button: {
    width: "80%",
    paddingVertical: 14,
    borderRadius: 8,
    marginVertical: 8,
    alignItems: "center",
  },
  createButton: {
    backgroundColor: "#4CAF4F",
  },
  createButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  loginButton: {
    backgroundColor: "#FF9800",
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  image: {
    marginTop: 40,
    width: "100%",
    height: 200,
  },
});
