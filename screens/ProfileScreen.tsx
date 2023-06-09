import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { useNhostClient, useSignOut, useUserId } from "@nhost/react";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
  Alert,
  ActivityIndicator,
} from "react-native";
import pins from "../assets/data/pins";
import MasonryList from "../components/MasonryList";

import { Text, View } from "../components/Themed";
import RemoteImage from "../components/RemoteImage";

interface pin {
  id: string;
  image: string;
  title: string;
  created_at: string;
}
interface user {
  id: string;
  avatarUrl: string;
  displayName: string;
  pins: [pin];
}

const GET_USER_QUERY = `
query MyQuery($id: uuid!) {
  user(id: $id) {
    id
    avatarUrl
    displayName
    pins {
      id
      image
      title
      created_at
    }
  }
}
`;

export default function ProfileScreen() {
  const [user, setUser] = useState<user | null>();

  const { signOut } = useSignOut();
  const nhost = useNhostClient();

  const userId = useUserId();

  const fetchUserData = async () => {
    const result = await nhost.graphql.request(GET_USER_QUERY, { id: userId });
    console.log(result);
    if (result.error) {
      Alert.alert("Error fetching the user");
    } else {
      setUser(result.data.user);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (!user) {
    return <ActivityIndicator />;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.icons}>
          <Entypo
            name="dots-three-horizontal"
            size={24}
            color="black"
            style={styles.icon}
          />
          <Pressable onPress={signOut}>
            <MaterialIcons name="logout" size={24} color="black" />
          </Pressable>
        </View>

        <View style={styles.image}>
          <RemoteImage fileId={user.avatarUrl}></RemoteImage>
        </View>

        {/* <Image
          source={{
            uri: user.avatarUrl,
          }}
          style={styles.image}
        /> */}
        <Text style={styles.title}>{user.displayName}</Text>
        <Text style={styles.subtitle}>123 Followers | 534 Followings</Text>
      </View>

      <MasonryList pins={user.pins} onRefresh={fetchUserData} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 10,
  },
  subtitle: {
    color: "#181818",
    fontWeight: "600",
    margin: 10,
  },
  image: {
    width: 200,
    overflow: "hidden",
    aspectRatio: 1,
    borderRadius: 200,
    marginVertical: 10,
  },
  header: {
    alignItems: "center",
  },
  icons: {
    flexDirection: "row",
    alignSelf: "flex-end",
    padding: 10,
  },
  icon: {
    paddingHorizontal: 10,
  },
});
