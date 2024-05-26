import { Text, View } from "react-native";
import { Button, Input } from "../components";
import { useCoreStorage } from "@expo-bridge/core-storage";
import { useForm } from "react-hook-form";

export const StorageSection = () => {
  const { setJSON, getJSON } = useCoreStorage();

  const { control, getValues } = useForm<{ key: string; value: string }>();
  return (
    <View style={{ flexDirection: "column", gap: 20 }}>
      <View style={{ flexDirection: "column", gap: 10 }}>
        <Text
          style={{
            fontSize: 15,
            fontWeight: "700",
          }}
        >
          CoreStorage.setJSON
        </Text>
        <Input
          style={{ flexGrow: 1 }}
          placeholder="Key"
          defaultValue="sample-key-1"
          control={control}
          name="key"
        />
        <Input
          style={{ flexGrow: 1 }}
          placeholder="Value"
          defaultValue="sample-value-1"
          control={control}
          name="value"
        />
        <Button
          text="Set"
          onClick={() => {
            setJSON(getValues("key"), getValues("value"));
            alert("Saved!");
          }}
        />
      </View>
      <View style={{ flexDirection: "column", gap: 10 }}>
        <Text
          style={{
            fontSize: 15,
            fontWeight: "700",
          }}
        >
          CoreStorage.getJSON
        </Text>
        <Input
          style={{ flexGrow: 1 }}
          placeholder="Key"
          defaultValue="sample-key-1"
          control={control}
          name="key"
        />
        <Button
          text="Get"
          onClick={async () => {
            const value = await getJSON(getValues("key"));
            alert(JSON.stringify(value));
          }}
        />
      </View>
    </View>
  );
};
