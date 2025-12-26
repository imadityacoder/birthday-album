import { ScrollControls, Scroll, Image as DreiImage, Text, useScroll } from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";
import confetti from "canvas-confetti";

interface SlideData {
    image?: string;
    title: string;
    caption: string;
}

const slides: SlideData[] = [
    {
        image: "https://picsum.photos/id/1011/800/1200",
        title: "Charming ",
        caption: "Your smile lights up every room you walk into.",
    },
    {
        image: "https://picsum.photos/id/1027/800/1200",
        title: "Elegant",
        caption: "Grace in every step, kindness in every word.",
    },
    {
        image: "https://picsum.photos/id/1015/800/1200",
        title: "Adventurous",
        caption: "Always ready to explore the world with us.",
    },
    {
        image: "https://picsum.photos/id/1016/800/1200",
        title: "Inspiring",
        caption: "The role model I've looked up to all my life.",
    },
    {
        title: "Happy Birthday!",
        caption: "We love you so much! Here's to another amazing year.",
    },
];

export const Album = () => {
    const { width } = useThree((state) => state.viewport);
    const xW = width > 5 ? width / 3.5 : width / 1.5;

    return (
        <ScrollControls pages={slides.length} damping={0.4} horizontal infinite={false}>
            <AlbumContent width={xW} />
        </ScrollControls>
    );
};

const AlbumContent = ({ width }: { width: number }) => {
    const scroll = useScroll();

    // Trigger confetti on the last slide
    useFrame(() => {
        // scroll.offset is 0..1. The last slide is at offset ~1.
        if (scroll.offset > 0.95) {
            if (Math.random() > 0.98) {
                confetti({
                    particleCount: 50,
                    spread: 50,
                    origin: { y: 0.6 }
                });
            }
        }
    });

    return (
        <Scroll>
            {slides.map((slide, i) => (
                <Slide
                    key={i}
                    data={slide}
                    index={i}
                    width={width}
                />
            ))}
        </Scroll>
    );
};

interface SlideProps {
    data: SlideData;
    index: number;
    width: number;
}

const Slide = ({ data, index, width }: SlideProps) => {
    const gap = 0.5;
    const x = (width + gap) * index;

    return (
        <group position={[x, 0, 0]}>
            {data.image && (
                <DreiImage
                    url={data.image}
                    scale={[width, width * 1.5]}
                    transparent
                />
            )}

            {/* Title with Parallax feel (slightly in front) */}
            <Text
                position={[0, -width * 0.75 - 0.3, 0.2]}
                fontSize={width * 0.15}
                font="https://fonts.gstatic.com/s/playfairdisplay/v30/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKdFvXDXbtM.woff2"
                color="#fff"
                anchorX="center"
                anchorY="top"
                maxWidth={width}
                textAlign="center"
            >
                {data.title}
            </Text>

            {/* Caption */}
            <Text
                position={[0, -width * 0.75 - 1.0, 0.2]}
                fontSize={width * 0.08}
                color="rgba(255, 255, 255, 0.8)"
                anchorX="center"
                anchorY="top"
                maxWidth={width * 1.2}
                textAlign="center"
                font="https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff2"
            >
                {data.caption}
            </Text>
        </group>
    );
};
