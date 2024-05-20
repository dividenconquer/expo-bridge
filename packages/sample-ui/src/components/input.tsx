import { LegacyRef, forwardRef } from "react";
import {
  Control,
  FieldPath,
  FieldValues,
  Path,
  PathValue,
  useController,
} from "react-hook-form";
import { StyleSheet, TextInputProps, TextInput } from "react-native";

export const Input = <T extends FieldValues>(
  props: TextInputProps & { control: Control<T>; name: Path<T> }
) => {
  const { field } = useController<T>({
    control: props.control,
    name: props.name,
    defaultValue: props.defaultValue as PathValue<T, FieldPath<T>>,
  });

  return (
    <TextInput
      placeholderTextColor={"rgba(0,0,0,.4)"}
      ref={field.ref}
      onChangeText={field.onChange}
      onBlur={field.onBlur}
      value={field.value}
      {...props}
      style={[props.style, styles.input]}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    borderColor: "rgba(0, 0, 0, 0.1)",
    borderWidth: 1,
  },
});
