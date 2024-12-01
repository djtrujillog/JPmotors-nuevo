import React from 'react';

function AutoImage({ imageUrl, alt }) {
    const handleImageClick = () => {
        // Implementar aquí la lógica para mostrar un modal o overlay con zoom
        console.log('Implementar lógica de zoom aquí');
    };

    return (
        <div className="text-center mb-3"> {/* Centrar la imagen */}
            {imageUrl && (
                <img
                    src={imageUrl}  // Usar la URL proporcionada en lugar de la conversión a base64
                    alt={alt}
                    style={{ maxWidth: '100%', height: 'auto', cursor: 'pointer' }}
                    onClick={handleImageClick}
                />
            )}
        </div>
    );
}

export default AutoImage;
