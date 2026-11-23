import { createSlice } from "@reduxjs/toolkit";
import photos from "./photos.data.js";

const initialState = {
  photos,
};

const options = {
  name: "photos",
  initialState,
  reducers: {
    addPhoto: (state, action) => {
      const nextPhotos = [...state.photos];
      nextPhotos.unshift(action.payload);
      state.photos = nextPhotos;
    },
    removePhoto: (state, action) => {
      const nextPhotos = [...state.photos];
      const index = nextPhotos.findIndex((photo) => photo.id === action.payload);
      if (index !== -1) {
        state.photos.splice(index, 1);
      }
    },
    selectFilteredPhotos: (state, action) => {
      const searchTerm = action?.payload?.toLowerCase();
      return state.photos.filter((photo) =>
        photo?.caption?.toLowerCase().includes(searchTerm)
      );
    },
    toggleFavorite: (state, action) => {
      const photo = state.photos.find((photo) => photo.id === action.payload);  
      if (photo) {
        photo.isFavorite = !photo.isFavorite;
      }
    },
    editPhotoCaption: (state, action) => {
      const { id, newCaption } = action.payload;
      const photo = state.photos.find((photo) => photo.id === id);
      if (photo) {
        photo.caption = newCaption;
      }
    },
 
  },
};

const photosSlice = createSlice(options);

export const { addPhoto, removePhoto, toggleFavorite, editPhotoCaption } = photosSlice.actions;

export default photosSlice.reducer;

export const selectAllPhotos = (state) => state.photos.photos;
export const selectFilteredPhotos = (state) => {
   const searchTerm = state.search.searchTerm?.toLowerCase();
  return state.photos.photos.filter((photo) =>
    photo?.caption?.toLowerCase().includes(searchTerm)
  );    
};
