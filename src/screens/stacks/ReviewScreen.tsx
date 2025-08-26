import React, { useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchReviewsByProductId } from "@/redux/features/review/GetReviewSlice";
import { Review } from "@/types";
import { RatingStars } from "@/components";
import { ObjectId, Rating } from "@/types";

type HeaderProps = {
  rating: Rating;
  handleOnClick: () => void;
};
export default function ReviewScreen({ route }: { route: any }) {
  const { reviews, reviewStatus, reviewError } = useSelector(
    (state: RootState) => state.review2
  );
  const {productId}= route.params;
  const dispatch = useDispatch<AppDispatch>();

  // Có thể lấy productId từ route.params, tạm fix cứng
  // const productId = "686e65c09d70cd16504feea9";
  // const rating = "4";

  useEffect(() => {
    dispatch(fetchReviewsByProductId({ productId }));
  }, [dispatch, productId]);

  const renderItem = ({ item }: { item: Review }) => (
    <View style={styles.card}>
      <Text style={styles.username}>
        👤 {item.user?.name || "Người dùng ẩn danh"}
      </Text>

      <RatingStars rating={Number.parseInt(rating.average || "0")} />

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

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Đánh giá sản phẩm</Text>
      </View>
      <Text style={styles.title}>Đánh giá sản phẩm</Text>
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
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 12 },
  card: {
    backgroundColor: "#f9f9f9",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  username: { fontWeight: "bold", fontSize: 14 },
  rating: { color: "#f39c12", marginVertical: 4 },
  content: { fontSize: 14, marginVertical: 4 },
  date: { color: "gray", fontSize: 12, marginVertical: 4 },
  like: { color: "blue", fontSize: 12, marginTop: 4 },
  headerContainer: { paddingVertical: 20, paddingHorizontal: 18 },
  headerTitle: {
    fontWeight: "bold",
    fontStyle: "italic",
    fontSize: 20,
    color: "#006340",
    textAlign: "center",
  },
});
