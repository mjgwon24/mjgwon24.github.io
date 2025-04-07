import React from 'react';

interface ImageModalProps {
    image: {
        src: string;
        alt: string;
        width: number;
        height: number;
    };
}

const ImageModal: React.FC<ImageModalProps> = ({ image }) => {
    const handleImageClick = () => {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm';
        modal.onclick = () => document.body.removeChild(modal);

        const img = document.createElement('img');
        img.src = image.src;
        img.alt = image.alt;
        img.className = 'max-w-full max-h-[90vh] object-contain';

        const closeButton = document.createElement('button');
        closeButton.className = 'absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/70';
        closeButton.innerHTML = '✕';
        closeButton.onclick = (e) => {
            e.stopPropagation();
            document.body.removeChild(modal);
        };

        modal.appendChild(img);
        modal.appendChild(closeButton);
        document.body.appendChild(modal);
    };

    return (
        <figure className="my-8">
            <div
                className="overflow-hidden rounded-xl bg-gradient-to-b from-gray-800/30 to-gray-900/30 shadow-lg border border-gray-700/20 transition-transform hover:shadow-blue-500/10 cursor-pointer"
                onClick={handleImageClick}
            >
                <div className="p-1 relative group">
                    <React.Suspense
                        fallback={
                            <div className="w-full h-48 bg-gray-700 animate-pulse rounded-lg"></div>
                        }
                    >
                        <img
                            src={image.src}
                            alt={image.alt}
                            width={image.width}
                            height={image.height}
                            className="w-full h-auto rounded-lg object-contain mx-auto"
                            style={{ maxHeight: '480px' }}
                            loading="lazy"
                        />
                    </React.Suspense>
                    <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                    <span className="bg-black/50 text-white text-xs font-medium px-2.5 py-1 rounded-md">
                        확대
                    </span>
                    </div>
                </div>
            </div>
            {image.alt && (
                <figcaption className="text-center text-sm text-gray-400/80 mt-3 font-light tracking-wide">
                    {image.alt}
                </figcaption>
            )}
        </figure>
    );
};

export default ImageModal;