import Gallery from '@/components/Gallery/Gallery';
import { galleryData } from '@/data/galleryData';

export default function Home() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Image Gallery</h1>
            <div className="w-full max-w-6xl my-[1200px]">
                <Gallery slides={galleryData} />
            </div>
        </main>
    );
} 
