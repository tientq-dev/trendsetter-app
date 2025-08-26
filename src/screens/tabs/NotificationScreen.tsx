// screens/Notification/NotificationScreen.js
import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { AuthContext } from "../../contexts/AuthContext";
import CustomButton from "../../components/button/CustomButton";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

export default function NotificationScreen({ navigation }) {
  const { user } = useContext(AuthContext);

  const activities = [
        {
            id: 1,
            title: "Giao dịch Sản phẩm Nike Air Zoom đã đặt thành công",
            time: "Ngày 30 tháng 4 năm 2025 1:01 PM",
        },
        {
            id: 2,
            title: "Giao dịch Nike Air Zoom Pegasus 36 Miami đang chờ giao hàng",
            time: "Ngày 30 tháng 4 năm 2025 1:01 PM",
        },
        {
            id: 3,
            title: "Giao dịch Nike Air Max đã giao thành công",
            time: "Ngày 30 tháng 4 năm 2025 1:01 PM",
        },
    ];

  if (!user) {
    return (
      <View style={styles.scroll}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Trung tâm thông báo</Text>
        </View>
        <Text style={styles.title}>Thử ngay!</Text>
        <Text style={styles.subtitle}>
          Nhận thông báo đơn hàng và sản phẩm bạn theo dõi — hãy đăng nhập hoặc
          đăng ký.
        </Text>
        <View style={styles.authContainer}>
          <CustomButton
            title="Đăng ký"
            onPress={() => navigation.navigate("SignUp")}
          />
          <CustomButton
            title="Đăng nhập"
            outline
            onPress={() => navigation.navigate("Login")}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerTitle}>Hoạt động</Text>
                </View>
    
                <ScrollView>
                    {activities.map((item) => (
                        <TouchableOpacity style={styles.item} key={item.id}>
                            <View style={styles.textContainer}>
                                <Text style={styles.title}>{item.title}</Text>
                                <Text style={styles.time}>{item.time}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  scroll: { flex: 1, padding: 16, backgroundColor: "#ffffff" },
  title: { fontSize: 22, fontWeight: "600", marginBottom: 10 },
  subtitle: { fontSize: 14, color: "#555", marginBottom: 20 },
  authContainer: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    paddingHorizontal: 18,
  },
  headerContainer: { paddingVertical: 20, paddingHorizontal: 18 },
  headerTitle: {
    fontWeight: "bold",
    fontStyle: "italic",
    fontSize: 20,
    color: "#006340",
    textAlign: "center",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  itemText: { flex: 1,  marginLeft: 12, fontSize: 16, color: "#000" },
  badge: {
    backgroundColor: "#ff3b30",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  badgeText: { color: "#fff", fontSize: 13, fontWeight: "600" },
  textContainer: { marginLeft: 12, flex: 1 },
  time: { fontSize: 13, color: "#555", marginTop: 4 },
});
