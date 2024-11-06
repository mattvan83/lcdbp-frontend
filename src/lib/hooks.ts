// import { useDispatch, useSelector, useStore } from "react-redux";
// import type { RootState, AppDispatch, AppStore } from "./store";
import type { RootState, AppDispatch } from "./store";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";

// // Use throughout your app instead of plain `useDispatch` and `useSelector`
// export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
// export const useAppSelector = useSelector.withTypes<RootState>();
// export const useAppStore = useStore.withTypes<AppStore>();

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
