import React from 'react';
import { Play } from 'lucide-react';

interface VideoItem {
    id: string;
    title: string;
    teacher: string;
    subject: string;
    youtubeUrl: string;
    thumbnailUrl: string;
}

const videos: VideoItem[] = [
    {
        id: '1',
        title: 'درس رياضيات',
        teacher: 'المعلمة مريم',
        subject: 'رياضيات',
        youtubeUrl: 'https://youtu.be/6LTqLL3ohh0',
        thumbnailUrl: 'https://img.youtube.com/vi/6LTqLL3ohh0/maxresdefault.jpg',
    },
];

// Extract video ID from YouTube URL
const getYouTubeVideoId = (url: string): string => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/);
    return match ? match[1] : '';
};

export function VideoSection() {
    const [playingVideo, setPlayingVideo] = React.useState<string | null>(null);

    return (
        <section className="py-20 bg-gradient-to-b from-blue-50/50 to-white" dir="rtl">
            <div className="max-w-7xl mx-auto px-6">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        شاهد دروسنا
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        تعرف على أسلوب التدريس المميز لمعلمينا من خلال نماذج من الدروس
                    </p>
                </div>

                {/* Videos Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {videos.map((video) => {
                        const videoId = getYouTubeVideoId(video.youtubeUrl);
                        const isPlaying = playingVideo === video.id;

                        return (
                            <div
                                key={video.id}
                                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                            >
                                {/* Video Player / Thumbnail */}
                                <div className="relative aspect-video bg-gray-900">
                                    {isPlaying ? (
                                        <iframe
                                            className="absolute inset-0 w-full h-full"
                                            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                                            title={video.title}
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        />
                                    ) : (
                                        <>
                                            <img
                                                src={video.thumbnailUrl}
                                                alt={video.title}
                                                className="absolute inset-0 w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                                <button
                                                    onClick={() => setPlayingVideo(video.id)}
                                                    className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors shadow-2xl hover:scale-110 transform duration-200"
                                                >
                                                    <Play className="w-10 h-10 text-white fill-white mr-[-4px]" />
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>

                                {/* Video Info */}
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                                        {video.title}
                                    </h3>
                                    <div className="flex items-center gap-4 text-gray-600">
                                        <span className="flex items-center gap-1">
                                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                            {video.teacher}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                            {video.subject}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
