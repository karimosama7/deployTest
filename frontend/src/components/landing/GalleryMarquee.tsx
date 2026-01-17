import React from 'react'
import { motion } from 'framer-motion'

// Import images
import HeroImage from '../../assets/landing/hero.jpg';
import Feature1 from '../../assets/landing/feature1.jpg';
import Feature2 from '../../assets/landing/feature2.jpg';
import Feature3 from '../../assets/landing/feature3.jpg';
import Feature4 from '../../assets/landing/feature4.jpg';

const images = [HeroImage, Feature1, Feature2, Feature3, Feature4, HeroImage, Feature1, Feature2]; // Duplicate for seamless loop

export function GalleryMarquee() {
    return (
        <section className="py-10 bg-blue-50/50 overflow-hidden border-y border-blue-100">
            <div className="flex">
                <motion.div
                    className="flex gap-8 px-4"
                    animate={{
                        x: ["0%", "-50%"],
                    }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 20, // Adjust speed
                            ease: "linear",
                        },
                    }}
                    style={{ width: "fit-content" }}
                >
                    {images.map((img, index) => (
                        <div
                            key={index}
                            className="w-64 h-40 shrink-0 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow border-2 border-white"
                        >
                            <img
                                src={img}
                                alt={`Gallery ${index}`}
                                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                            />
                        </div>
                    ))}
                    {/* Double the images to ensure no gaps during the loop reset if needed, 
              but the array above already has duplicates. 
              Ideally, we'd map the original array twice here for a pure CSS-like marquee structure. 
          */}
                    {images.map((img, index) => (
                        <div
                            key={`dup-${index}`}
                            className="w-64 h-40 shrink-0 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow border-2 border-white"
                        >
                            <img
                                src={img}
                                alt={`Gallery Duplicate ${index}`}
                                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                            />
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
