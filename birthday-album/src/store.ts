import { create } from 'zustand';

export interface SlideData {
    image?: string;
    title: string;
    caption: string;
}

export const slides: SlideData[] = [
    {
        image: "/img1.jpg",
        title: "Charming ",
        caption: "Your smile lights up every room.",
    },
    {
        image: "/img2.jpg",
        title: "Elegant",
        caption: "Grace in every step.",
    },
    {
        image: "/img3.jpg",
        title: "Adventurous",
        caption: "Always ready to explore.",
    },
    {
        image: "/img4.jpg",
        title: "Inspiring",
        caption: "The role model I look up to.",
    },
    {
        title: "Happy Birthday!",
        caption: "We love you so much!",
    },
];

interface AppState {
    activeSlide: number;
    setSlide: (index: number) => void;
}

export const useStore = create<AppState>((set) => ({
    activeSlide: 0,
    setSlide: (index) => set({ activeSlide: index }),
}));
