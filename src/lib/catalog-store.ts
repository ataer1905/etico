"use client";

import { useSyncExternalStore } from "react";
import {
  adminCategories,
  adminProducts,
  type AdminCategory,
  type AdminProduct,
} from "@/lib/admin-data";

const PRODUCTS_KEY = "etico_admin_products";
const CATEGORIES_KEY = "etico_admin_categories";
const CATALOG_EVENT = "etico-catalog-store";

let cachedProductsRaw: string | null = null;
let cachedProductsSnapshot: AdminProduct[] = adminProducts;
let cachedCategoriesRaw: string | null = null;
let cachedCategoriesSnapshot: AdminCategory[] = adminCategories;

function subscribeToCatalog(onStoreChange: () => void) {
  if (typeof window === "undefined") return () => undefined;

  const handleChange = () => onStoreChange();
  window.addEventListener("storage", handleChange);
  window.addEventListener(CATALOG_EVENT, handleChange);

  return () => {
    window.removeEventListener("storage", handleChange);
    window.removeEventListener(CATALOG_EVENT, handleChange);
  };
}

function getProductsClientSnapshot() {
  if (typeof window === "undefined") return adminProducts;

  const raw = window.localStorage.getItem(PRODUCTS_KEY);
  if (raw === cachedProductsRaw) {
    return cachedProductsSnapshot;
  }

  cachedProductsRaw = raw;
  cachedProductsSnapshot = raw
    ? (JSON.parse(raw) as AdminProduct[])
    : adminProducts;

  return cachedProductsSnapshot;
}

function getCategoriesClientSnapshot() {
  if (typeof window === "undefined") return adminCategories;

  const raw = window.localStorage.getItem(CATEGORIES_KEY);
  if (raw === cachedCategoriesRaw) {
    return cachedCategoriesSnapshot;
  }

  cachedCategoriesRaw = raw;
  cachedCategoriesSnapshot = raw
    ? (JSON.parse(raw) as AdminCategory[])
    : adminCategories;

  return cachedCategoriesSnapshot;
}

export function useCatalogStore() {
  const products = useSyncExternalStore(
    subscribeToCatalog,
    getProductsClientSnapshot,
    () => adminProducts,
  );
  const categories = useSyncExternalStore(
    subscribeToCatalog,
    getCategoriesClientSnapshot,
    () => adminCategories,
  );

  return { products, categories };
}

export function saveCatalogProducts(nextProducts: AdminProduct[]) {
  if (typeof window === "undefined") return;
  const raw = JSON.stringify(nextProducts);
  cachedProductsRaw = raw;
  cachedProductsSnapshot = nextProducts;
  window.localStorage.setItem(PRODUCTS_KEY, raw);
  window.dispatchEvent(new Event(CATALOG_EVENT));
}

export function saveCatalogCategories(nextCategories: AdminCategory[]) {
  if (typeof window === "undefined") return;
  const raw = JSON.stringify(nextCategories);
  cachedCategoriesRaw = raw;
  cachedCategoriesSnapshot = nextCategories;
  window.localStorage.setItem(CATEGORIES_KEY, raw);
  window.dispatchEvent(new Event(CATALOG_EVENT));
}
