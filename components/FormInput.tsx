import { StyleSheet, Text, TextInput, TextInputProps, View } from "react-native";

interface FormInputProps extends TextInputProps {
    label: string;
}

export default function FormInput({ label, ...props }: FormInputProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={styles.input}
                placeholderTextColor="#999"
                {...props}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    label: {
        fontFamily: "JosefinSans_700Bold",
        fontSize: 16,
        marginBottom: 6,
        color: "#000",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 6,
        paddingVertical: 10,
        paddingHorizontal: 14,
        fontSize: 16,
        fontFamily: "JosefinSans_400Regular",
        color: "#000",
    },
});
