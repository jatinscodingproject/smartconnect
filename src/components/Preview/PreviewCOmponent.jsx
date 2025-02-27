'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function CardPreview({ frontImage, backImage }) {
    const [isFlipped, setIsFlipped] = useState(false);

    const flipCard = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <div className="flex items-center justify-center bg-gray-100 p-4">
            <div className="relative w-full max-w-md aspect-[1.586/1] cursor-pointer perspective-1000" onClick={flipCard}>
                <motion.div
                    className="relative w-full h-full"
                    initial={false}
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                    style={{ transformStyle: 'preserve-3d' }}
                >
                    {/* Front Image */}
                    <div
                        className="absolute w-full h-full rounded-lg shadow-lg"
                        style={{
                            backfaceVisibility: 'hidden',
                        }}
                    >
                        {frontImage && (
                            <img
                                src={frontImage}
                                alt="Business Card Front"
                                className="w-full h-full rounded-lg object-cover"
                            />
                        )}
                    </div>

                    {/* Back Image */}
                    <div
                        className="absolute w-full h-full rounded-lg shadow-lg"
                        style={{
                            transform: 'rotateY(180deg)',
                            backfaceVisibility: 'hidden',
                        }}
                    >
                        {backImage && (
                            <img
                                src={backImage}
                                alt="Business Card Back"
                                className="w-full h-full rounded-lg object-cover"
                            />
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
