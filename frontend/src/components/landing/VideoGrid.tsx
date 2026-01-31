import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, User, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

// Custom thumbnails
import VideoThumb1 from '../../assets/video-thumb-1.jpg';
import VideoThumb2 from '../../assets/video-thumb-2.jpg';

interface Video {
    id: string;
    youtubeId: string;
    teacherName: string;
    subject: string;
    thumbnail: string;
}

const videos: Video[] = [
    {
        id: '1',
        youtubeId: 'XEJwsdKBAxk',
        teacherName: 'أ/ إيمان حسن',
        subject: 'اللغة الإنجليزية',
        thumbnail: VideoThumb1,
    },
    {
        id: '2',
        youtubeId: 'E57-xye8wFI',
        teacherName: 'أ/ إيمان حسن',
        subject: 'اللغة الإنجليزية',
        thumbnail: VideoThumb2,
    },
];

export const VideoGrid: React.FC = () => {
    const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);



    // Auto-rotate
    useEffect(() => {
        if (isHovered || selectedVideo) return;

        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % videos.length);
        }, 3500);

        return () => clearInterval(interval);
    }, [isHovered, selectedVideo]);

    const nextSlide = () => setActiveIndex((prev) => (prev + 1) % videos.length);
    const prevSlide = () => setActiveIndex((prev) => (prev - 1 + videos.length) % videos.length);

    return (
        <section className="py-20 bg-gradient-to-b from-white to-blue-50/50 overflow-hidden relative" dir="rtl">
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-purple-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            <div className="max-w-5xl mx-auto px-6 relative z-10">
                {/* Header */}
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <motion.div
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full border border-blue-200 mb-6"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring' }}
                        viewport={{ once: true }}
                    >
                        <Sparkles className="w-4 h-4 text-yellow-500" />
                        <span className="text-gray-700 text-sm font-medium">أفضل اللحظات</span>
                        <Sparkles className="w-4 h-4 text-yellow-500" />
                    </motion.div>

                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                            شاهد إبداع معلمينا
                        </span>
                    </h2>
                    <p className="text-gray-600 max-w-xl mx-auto">
                        لحظات مميزة من شرح أفضل المعلمين
                    </p>
                </motion.div>

                {/* Gallery Showcase */}
                <div
                    className="relative"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {/* Main Display */}
                    <div className="relative max-w-2xl mx-auto">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIndex}
                                initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
                                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                                exit={{ opacity: 0, scale: 0.9, rotateY: 10 }}
                                transition={{ duration: 0.5, ease: 'easeOut' }}
                                className="relative rounded-2xl overflow-hidden shadow-xl shadow-blue-200/50 cursor-pointer group"
                                onClick={() => setSelectedVideo(videos[activeIndex])}
                            >
                                {/* Video Thumbnail */}
                                <div className="aspect-video relative">
                                    <img
                                        src={videos[activeIndex].thumbnail}
                                        alt={videos[activeIndex].teacherName}
                                        className="w-full h-full object-cover"
                                    />

                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                                    {/* Animated Border */}
                                    <div className="absolute inset-0 rounded-3xl border-2 border-white/10 group-hover:border-blue-400/50 transition-colors" />

                                    {/* Play Button */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <motion.div
                                            animate={{
                                                scale: [1, 1.1, 1],
                                                boxShadow: [
                                                    '0 0 0 0 rgba(59, 130, 246, 0.4)',
                                                    '0 0 0 20px rgba(59, 130, 246, 0)',
                                                    '0 0 0 0 rgba(59, 130, 246, 0)',
                                                ],
                                            }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                            className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center backdrop-blur-sm"
                                        >
                                            <Play className="w-8 h-8 text-blue-600 mr-[-4px]" fill="currentColor" />
                                        </motion.div>
                                    </div>

                                    {/* Teacher Info Overlay */}
                                    <motion.div
                                        className="absolute bottom-0 left-0 right-0 p-6"
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center ring-4 ring-white/20">
                                                <User className="w-7 h-7 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="text-white text-xl font-bold">{videos[activeIndex].teacherName}</h3>
                                                <p className="text-gray-300">{videos[activeIndex].subject}</p>
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* Video Counter */}
                                    <div className="absolute top-6 left-6 px-4 py-2 bg-black/50 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                                        {activeIndex + 1} / {videos.length}
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Navigation Arrows */}
                        <motion.button
                            whileHover={{ scale: 1.1, x: -5 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={prevSlide}
                            className="absolute right-[-20px] md:right-[-40px] top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-50 transition-colors border border-gray-200"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.1, x: 5 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={nextSlide}
                            className="absolute left-[-20px] md:left-[-40px] top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-50 transition-colors border border-gray-200"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </motion.button>
                    </div>

                    {/* Thumbnail Strip */}
                    <div className="flex justify-center gap-4 mt-8">
                        {videos.map((video, index) => (
                            <motion.button
                                key={video.id}
                                onClick={() => setActiveIndex(index)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`relative rounded-xl overflow-hidden transition-all duration-300 ${index === activeIndex
                                    ? 'ring-2 ring-blue-500 ring-offset-2 ring-offset-white'
                                    : 'opacity-60 hover:opacity-90'
                                    }`}
                            >
                                <img
                                    src={video.thumbnail}
                                    alt={video.teacherName}
                                    className="w-24 h-16 object-cover"
                                />
                                {index === activeIndex && (
                                    <motion.div
                                        layoutId="activeThumb"
                                        className="absolute inset-0 bg-blue-500/20"
                                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                    />
                                )}
                            </motion.button>
                        ))}
                    </div>

                    {/* Progress Bar */}
                    <div className="max-w-md mx-auto mt-6">
                        <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                                initial={{ width: '0%' }}
                                animate={{ width: '100%' }}
                                transition={{ duration: 3.5, ease: 'linear' }}
                                key={activeIndex}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedVideo && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
                        onClick={() => setSelectedVideo(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: 'spring', damping: 25 }}
                            className="relative w-full max-w-5xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <motion.button
                                onClick={() => setSelectedVideo(null)}
                                className="absolute -top-14 left-0 text-white/80 hover:text-white transition-colors flex items-center gap-2 text-lg"
                                whileHover={{ scale: 1.05 }}
                            >
                                <X className="w-6 h-6" />
                                <span>إغلاق</span>
                            </motion.button>

                            {/* Video Player */}
                            <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">
                                <iframe
                                    src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1&rel=0`}
                                    title={`شرح ${selectedVideo.teacherName}`}
                                    className="w-full h-full"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>

                            {/* Video Info */}
                            <motion.div
                                className="mt-6 text-center"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <h3 className="text-2xl font-bold text-white">{selectedVideo.teacherName}</h3>
                                <p className="text-gray-400 text-lg">{selectedVideo.subject}</p>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};
