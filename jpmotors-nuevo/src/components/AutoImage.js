import React, { useState, useEffect } from 'react';
import { Buffer } from 'buffer';

function AutoImage({ longBlobData, alt }) {
    const [imgSrc, setImgSrc] = useState('');

    useEffect(() => {
        if (longBlobData) {
            try {
                if (typeof Buffer !== 'undefined') {
                    const imgData = `data:image/jpeg;base64,${Buffer.from(longBlobData).toString('base64')}`;
                    setImgSrc(imgData);
                } else {
                    console.error('Buffer is undefined.');
                }
            } catch (error) {
                console.error('Error converting longBlobData to base64:', error);
            }
        }
    }, [longBlobData]);

    const handleImageClick = () => {
        // Implementar aquí la lógica para mostrar un modal o overlay con zoom
        // console.log('Implementar lógica de zoom aquí');
    };

    return (
        <div className="text-center mb-3"> {/* Centrar la imagen */}
            {imgSrc && (
                <img
                    src={imgSrc}
                    alt={alt}
                    style={{ maxWidth: '100%', height: 'auto', cursor: 'pointer' }}
                    onClick={handleImageClick}
                />
            )}
        </div>
    );
}

export default AutoImage;
