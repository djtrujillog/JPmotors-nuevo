import React, { useState } from 'react';
import { Buffer } from 'buffer';
function AutoImage({longBlobData, alt}) {
    const img = new Image();
    img.src = `data:image/jpeg;base64,${Buffer.from(longBlobData).toString('base64')}`;

    console.log('aqui estoy' + img);

    return (
        <div>
            {(
                <img
                    src={img.src}
                    alt={alt}
                    style={{width:'200px', height:'auto'}}                   
                />
            )}
        </div>
    );
}

export default AutoImage;
