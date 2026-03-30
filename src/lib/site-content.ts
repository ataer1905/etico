"use client";

import { useSyncExternalStore } from "react";

export type HomepageBlogPost = {
  id: number;
  imageSrc: string;
  imageAlt: string;
  title: string;
  excerpt: string;
  date: string;
};

export type HomepageContent = {
  utilityLinks: string[];
  categories: string[];
  heroBanners: string[];
  blogPosts: HomepageBlogPost[];
  dealerSection: {
    eyebrow: string;
    title: string;
    description: string;
  };
  footer: {
    supportTitle: string;
    phone: string;
    companyTitle: string;
    companyLinks: string[];
    securityTitle: string;
    securityLinks: string[];
    socialTitle: string;
    newsletterPlaceholder: string;
    newsletterText: string;
    copyright: string;
    bottomBandText: string;
  };
};

const SITE_CONTENT_KEY = "etico_homepage_content";
const SITE_CONTENT_EVENT = "etico-homepage-content";

export const defaultHomepageContent: HomepageContent = {
  utilityLinks: [
    "Siparis Takibi",
    "Kampanyalar",
    "Markalar",
    "Magaza Sanal Tur",
  ],
  categories: [
    "VANALAR",
    "BORU EKLEME VE ASKILAMA",
    "YANGIN MALZEMELERI",
    "KOMPANSATORLER",
    "TANK ve POMPALAR",
    "PVC",
    "KAMPANYALAR",
  ],
  heroBanners: ["/banners/trakya-dokum-banner.jpg", "/banners/duyarbanner.jpg"],
  blogPosts: [
    {
      id: 1,
      imageSrc: "/products/blog/blog-1.jpg",
      imageAlt: "Blog gorseli 1",
      title: "Hobi Urunleri Rehberi: Ahsap Isciliginden Kamp Malzemelerine, Iskarpeladan Rendeye Her Sey",
      excerpt:
        "Hobi urunleri, ahsap isciliginden kamp malzemelerine kadar uzanan genis bir alani kapsar. Bu rehberde urun secimi ve kullanim detaylarini bulabilirsiniz.",
      date: "11.03.2026",
    },
    {
      id: 2,
      imageSrc: "/products/blog/blog-2.webp",
      imageAlt: "Blog gorseli 2",
      title: "Dekorasyon Rehberi: Dolap Ici Aksesuardan LED Aydinlatmaya, Hijyen Sistemlerinden Mutfaga",
      excerpt:
        "Dekorasyon urunleri bir evin hem islevselligini hem de yasam kalitesini belirleyen detaylardir. Rehberde dogru urun secimine odaklandik.",
      date: "11.03.2026",
    },
    {
      id: 3,
      imageSrc: "/products/blog/blog-3.png",
      imageAlt: "Blog gorseli 3",
      title: "Hirdavat Malzemeleri Rehberi: Vidadan Silikona, Dubelden Sprey Boyaya Her Sey",
      excerpt:
        "Hirdavat malzemeleri proje kalitesini ve uygulama hizini dogrudan etkiler. Bu rehberde en kritik urun gruplarini ozetledik.",
      date: "11.03.2026",
    },
  ],
  dealerSection: {
    eyebrow: "Guvenilir Is Ortaklari",
    title: "Markalar",
    description: "Sektorun lider markalariyla guclu tedarik zinciri",
  },
  footer: {
    supportTitle: "Musteri Hizmetleri",
    phone: "0322 334 19 66",
    companyTitle: "Cagdasisi.com",
    companyLinks: [
      "Hakkimizda",
      "Sik Sorulan Sorular",
      "Odeme ve Teslimat",
      "Havale/EFT Bilgileri",
      "Iletisim",
    ],
    securityTitle: "Guvenlik",
    securityLinks: [
      "Cerez (Cookie) Politikasi",
      "Uyelik Iptal Talebi",
      "Mesafeli Satis Sozlesmesi",
      "Uyelik Sozlesmesi",
      "Garanti Iade ve Iptal",
      "KVK Politikasi",
      "KVKK Kapsaminda Aydinlatma Metni",
      "On Bilgilendirme Formu",
      "Gizlilik ve Guvenlik Politikasi",
    ],
    socialTitle: "Takip Edin",
    newsletterPlaceholder: "E-Mail Adresiniz",
    newsletterText: "Kampanyalari ve indirimlerinizi sizinle paylasalim mi?",
    copyright: "Copyright (c) cagdasisi.com",
    bottomBandText:
      "Bu yapi, Cagdasisi Dijital Ticaret Altyapisi ile guvenli ve hizli satin alma deneyimi sunmak icin hazirlanmistir.",
  },
};

let cachedRaw: string | null = null;
let cachedSnapshot: HomepageContent = defaultHomepageContent;

function parseSnapshot(raw: string | null): HomepageContent {
  if (!raw) {
    return defaultHomepageContent;
  }

  try {
    const parsed = JSON.parse(raw) as Partial<HomepageContent>;
    return {
      ...defaultHomepageContent,
      ...parsed,
      utilityLinks: parsed.utilityLinks ?? defaultHomepageContent.utilityLinks,
      categories: parsed.categories ?? defaultHomepageContent.categories,
      heroBanners: parsed.heroBanners ?? defaultHomepageContent.heroBanners,
      blogPosts: parsed.blogPosts ?? defaultHomepageContent.blogPosts,
      dealerSection: {
        ...defaultHomepageContent.dealerSection,
        ...parsed.dealerSection,
      },
      footer: {
        ...defaultHomepageContent.footer,
        ...parsed.footer,
        companyLinks:
          parsed.footer?.companyLinks ?? defaultHomepageContent.footer.companyLinks,
        securityLinks:
          parsed.footer?.securityLinks ?? defaultHomepageContent.footer.securityLinks,
      },
    };
  } catch {
    return defaultHomepageContent;
  }
}

function subscribeToSiteContent(onStoreChange: () => void) {
  if (typeof window === "undefined") return () => undefined;

  const handleChange = () => onStoreChange();
  window.addEventListener("storage", handleChange);
  window.addEventListener(SITE_CONTENT_EVENT, handleChange);

  return () => {
    window.removeEventListener("storage", handleChange);
    window.removeEventListener(SITE_CONTENT_EVENT, handleChange);
  };
}

function getClientSnapshot() {
  if (typeof window === "undefined") return defaultHomepageContent;

  const raw = window.localStorage.getItem(SITE_CONTENT_KEY);
  if (raw === cachedRaw) {
    return cachedSnapshot;
  }

  cachedRaw = raw;
  cachedSnapshot = parseSnapshot(raw);
  return cachedSnapshot;
}

function getServerSnapshot() {
  return defaultHomepageContent;
}

export function useHomepageContent() {
  return useSyncExternalStore(
    subscribeToSiteContent,
    getClientSnapshot,
    getServerSnapshot,
  );
}

export function saveHomepageContent(nextContent: HomepageContent) {
  if (typeof window === "undefined") return;
  const raw = JSON.stringify(nextContent);
  cachedRaw = raw;
  cachedSnapshot = nextContent;
  window.localStorage.setItem(SITE_CONTENT_KEY, raw);
  window.dispatchEvent(new Event(SITE_CONTENT_EVENT));
}

export function resetHomepageContent() {
  if (typeof window === "undefined") return;
  cachedRaw = null;
  cachedSnapshot = defaultHomepageContent;
  window.localStorage.removeItem(SITE_CONTENT_KEY);
  window.dispatchEvent(new Event(SITE_CONTENT_EVENT));
}
