import FormInput from "@/components/FormInput";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function LoginScreen() {
  const router = useRouter();

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Boora !</Text>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.subtitle}>Cadastrar Aluno</Text>

        <View style={styles.form}>
          <FormInput
            label="Nome do Aluno"
            placeholder="Digite o nome do aluno"
          />
          <FormInput
            label="Matrícula"
            placeholder="Digite a matrícula do aluno"
          />
          <FormInput
            label="Data de Nascimento"
            placeholder="Selecione a data de nascimento"
          />
          <FormInput label="Turma" placeholder="Selecione a turma" />
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.replace("/login")}
        >
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  headerContainer: {
    paddingTop: 24,
    alignItems: "flex-start",
  },
  header: {
    fontSize: 32,
    fontFamily: "JosefinSans_700Bold",
    color: "#FF9800",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  subtitle: {
    fontSize: 18,
    fontFamily: "JosefinSans_400Regular",
    marginBottom: 20,
    textAlign: "center",
  },
  form: {
    width: "100%",
    marginBottom: 24,
  },
  button: {
    backgroundColor: "#F7941E",
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: "center",
    marginBottom: 16,
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "JosefinSans_700Bold",
  },
  link: {
    color: "#1976D2",
    textAlign: "center",
    fontSize: 14,
    fontFamily: "JosefinSans_400Regular",
  },
});
