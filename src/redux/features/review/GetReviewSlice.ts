import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "@/api/apiClient";
import { Review } from "@/types";

// ================= REVIEWS =================
export const fetchReviewsByProductId = createAsyncThunk<
    Review[],                        // kiểu dữ liệu trả về
    { productId: string },           // kiểu tham số đầu vào
    { rejectValue: string }          // kiểu reject
>(
    "reviews/fetchByProductId",
    async ({ productId }, { rejectWithValue }) => {
        try {
            const res = await apiClient.get(`/products/${productId}/reviews`);
            return res.data.data as Review[];
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || "Failed to fetch reviews");
        }
    }
);

type ReviewSliceState = {
    reviews: Review[] | null;
    reviewStatus: "idle" | "loading" | "succeeded" | "failed";
    reviewError: string | null;
};

const initialState: ReviewSliceState = {
    reviews: null,
    reviewStatus: "idle",
    reviewError: null,
};

const GetReViewSlice = createSlice({
    name: "reviews",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchReviewsByProductId.pending, (state) => {
                state.reviewStatus = "loading";
            })
            .addCase(fetchReviewsByProductId.fulfilled, (state, action) => {
                state.reviewStatus = "succeeded";
                state.reviews = action.payload;
            })
            .addCase(fetchReviewsByProductId.rejected, (state, action) => {
                state.reviewStatus = "failed";
                state.reviewError = action.payload as string;
            });
    },
});

export default GetReViewSlice.reducer;
