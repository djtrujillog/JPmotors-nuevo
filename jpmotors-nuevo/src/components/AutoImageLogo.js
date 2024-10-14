import React, { useState, useEffect } from 'react';
import { Buffer } from 'buffer';

function AutoImage({ longBlobData, alt, style }) { // 'style' como prop
    const [imgSrc, setImgSrc] = useState('');

    useEffect(() => {
        if (longBlobData) {
            try {
                const imgData = `data:image/png;base64,${Buffer.from(longBlobData).toString('base64')}`;
                setImgSrc(imgData);
            } catch (error) {
                console.error('Error converting longBlobData to base64:', error);
            }
        }
    }, [longBlobData]);

    const handleImageClick = () => {
        console.log('Implementar lógica de zoom aquí');
    };

    return (
        <div className="text-center mb-3">
            {imgSrc ? (
                <img
                    src={imgSrc}
                    alt={alt}
                    style={{ ...style, cursor: 'pointer' }} // Aplicar el estilo recibido
                    onClick={handleImageClick}
                />
            ) : (
                <div>No hay logo</div>
            )}
        </div>
    );
}

export default AutoImage;
