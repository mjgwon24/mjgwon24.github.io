'use client';

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface Images {
    src: string;
    alt: string;
    width: number;
    height: number;
}

interface Props {
    images: Images[];
    fixedHeight?: number;
    boxMaxWidth?: number;
    imageGap?: number;
}

const DEFAULT_HEIGHT = 200;
const DEFAULT_MAX_WIDTH = 760;
const DEFAULT_IMAGE_GAP = 16;

export default function Slider({
                                            images,
                                            fixedHeight = DEFAULT_HEIGHT,
                                            boxMaxWidth = DEFAULT_MAX_WIDTH,
                                            imageGap = DEFAULT_IMAGE_GAP,
                                        }: Props) {
    const [slideBoxWidth, setSlideBoxWidth] = useState(0);
    const trackRef = useRef<HTMLDivElement>(null);

    const resizedImages = images.map(img => {
        const aspectRatio = img.width / img.height;
        return {
            ...img,
            displayHeight: fixedHeight,
            displayWidth: Math.round(fixedHeight * aspectRatio),
        };
    });

    const totalTrackWidth = resizedImages.reduce(
        (sum, img, idx) => sum + img.displayWidth + (idx < resizedImages.length - 1 ? imageGap : 0),
        0
    );

    useEffect(() => {
        function updateWidth() {
            const vw = window.innerWidth;
            setSlideBoxWidth(Math.max(320, Math.min(vw * 0.9, boxMaxWidth)));
        }
        updateWidth();
        window.addEventListener('resize', updateWidth);
        return () => window.removeEventListener('resize', updateWidth);
    }, [boxMaxWidth]);

    useEffect(() => {
        const start = Date.now();
        let animationFrameId: number;
        let current = 0;
        function animate() {
            const now = Date.now();
            const elapsed = now - start;
            current = (elapsed * 0.07) % totalTrackWidth;
            if (trackRef.current) {
                trackRef.current.style.transform = `translateX(-${current}px)`;
            }
            animationFrameId = requestAnimationFrame(animate);
        }
        animationFrameId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrameId);
    }, [totalTrackWidth]);

    return (
        <div
            className="relative overflow-hidden flex items-center rounded-xl shadow-lg border border-gray-700 bg-gray-900 my-6"
            style={{
                width: slideBoxWidth,
                height: fixedHeight,
                minWidth: 320,
                maxWidth: boxMaxWidth,
                margin: '0 auto',
            }}
        >
            <div
                ref={trackRef}
                className="flex"
                style={{
                    width: totalTrackWidth * 2,
                }}
            >
                {[...resizedImages, ...resizedImages].map((img, idx, arr) => (
                    <div
                        key={idx}
                        style={{
                            width: img.displayWidth,
                            height: img.displayHeight,
                            display: 'flex',
                            alignItems: 'center',
                            flexShrink: 0,
                            marginRight: idx !== arr.length - 1 ? imageGap : 0,
                        }}
                    >
                        <Image
                            src={img.src}
                            alt={img.alt}
                            width={img.displayWidth}
                            height={img.displayHeight}
                            style={{ display: 'block', borderRadius: '12px', objectFit: 'cover' }}
                            priority={idx === 0}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
