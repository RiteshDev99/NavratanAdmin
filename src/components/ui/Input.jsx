import React, { forwardRef } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

const Input = forwardRef(({ label, type, style, ...props }, ref) => {
  return (
    <View style={styles.container}>
      {label ? <Text style={styles.label}>{label}</Text> : null}

      <TextInput
        ref={ref}
        secureTextEntry={type === "password"}
        style={[styles.input, style]}
        {...props}
      />
    </View>
  );
});

export default Input;

const styles = StyleSheet.create({
  container: { width: "100%" },
  label: { marginBottom: 4, color: "#000" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
  },
});
