// src/components/AutoImage.js
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

    return (
        <div>
            {imgSrc && (
                <img
                    src={imgSrc}
                    alt={alt}
                    style={{ width: '200px', height: 'auto' }}
                />
            )}
        </div>
    );
}

export default AutoImage;
