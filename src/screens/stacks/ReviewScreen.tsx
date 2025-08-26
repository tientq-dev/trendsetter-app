import React, { useEffect } from "react";
import { View, Text, FlatList, StyleSheet, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchReviewsByProductId } from "@/redux/features/review/GetReviewSlice";
import { Review } from "@/types";
import { RatingStars, ScreenHeader } from "@/components";

export default function ReviewScreen({ route }: { route: any }) {
  const { reviews, reviewStatus, reviewError } = useSelector(
    (state: RootState) => state.review2
  );
  const { productId } = route.params;
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchReviewsByProductId({ productId }));
  }, [dispatch, productId]);

  const renderItem = ({ item }: { item: Review }) => {
    const avatarUri =
      item.user?.avatar ||
      "https://cdn-icons-png.flaticon.com/512/149/149071.png";

    return (
      <View style={styles.card}>
        <View style={styles.headerRow}>
          <Image source={{ uri: avatarUri }} style={styles.avatar} />
          <View style={{ flex: 1 }}>
            <Text style={styles.username}>
              {item.user?.username || "Người dùng ẩn danh"}
            </Text>

            {item.rating && <RatingStars rating={item.rating} />}
          </View>
        </View>

        <Text style={styles.content}>
          Màu: {item.orderItem.color} — Size: {item.orderItem.size?.size}
        </Text>

        <Text style={styles.content}>
          {item.content && item.content.trim() !== ""
            ? item.content
            : "Không có nội dung"}
        </Text>

        <Text style={styles.date}>
          {new Date(item.createdAt).toLocaleDateString("vi-VN")}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScreenHeader title="Đánh giá sản phẩm" />
      <FlatList
        data={reviews || []}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 12 },
  card: {
    backgroundColor: "#f9f9f9",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: "#ddd",
  },
  username: { fontWeight: "bold", fontSize: 14 },
  content: { fontSize: 14, marginVertical: 4 },
  date: { color: "gray", fontSize: 12, marginTop: 4 },
});
