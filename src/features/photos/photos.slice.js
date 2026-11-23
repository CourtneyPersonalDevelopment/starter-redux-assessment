import { createSlice } from "@reduxjs/toolkit";
//import { selectSearchTerm } from "../search/search.slice";
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
    // Task 1: Create an `addPhoto()` case reducer that adds a photo to state.photos.
    // Task 1 Hint: You can use state.photos.unshift()
    // `unshift()` documentation: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift
    // Task 6: Create an `removePhoto()` case reducer that removes a photo from state.photos
    // Task 6 Hint: You can use state.photos.splice()
    // `splice()` documentation: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
    // Task 22: Create a `toggleFavorite()` case reducer that toggles the isFavorite property of a photo
    // Task 22 Hint: Find the photo by id in state.photos and toggle its isFavorite boolean value
    // The action payload will contain the id of the photo to toggle

    // Task 26: Create an `editPhotoCaption()` case reducer that updates the caption of a photo
    // Task 26 Hint: Find the photo by id in state.photos and update its caption property
    // The action payload will contain an object with { id, newCaption }
  },
};

const photosSlice = createSlice(options);

// Task 22 & 26: Export the `toggleFavorite()` and `editPhotoCaption()` action creators once you implement their reducers above
export const { addPhoto, removePhoto, toggleFavorite, editPhotoCaption } = photosSlice.actions;

export default photosSlice.reducer;

export const selectAllPhotos = (state) => state.photos.photos;
export const selectFilteredPhotos = (state) => {
   const searchTerm = state.search.searchTerm?.toLowerCase();
  return state.photos.photos.filter((photo) =>
    photo?.caption?.toLowerCase().includes(searchTerm)
  );    
  // Task 12: Complete `selectFilteredPhotos()` selector to return a filtered list of photos whose captions match the user's search term
};
