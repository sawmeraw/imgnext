export const getBackgroundColor = (data: Uint8ClampedArray, canvasWidth: number) => {
    const pixelIndex = 0;
    const r = data[pixelIndex];
    const g = data[pixelIndex + 1];
    const b = data[pixelIndex + 2];

    return { r, g, b };
};

// Process an image (crop, resize, etc.)
export const processImage = async (file: File): Promise<File> => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = URL.createObjectURL(file);

        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            if (!ctx) {
                reject(new Error('Canvas context not available'));
                return;
            }

            const canvasWidth = img.width;
            const canvasHeight = img.height;
            canvas.width = canvasWidth;
            canvas.height = canvasHeight;

            // ctx.fillStyle = 'white'
            // ctx.fillRect(0, 0, canvasWidth, canvasHeight)
            ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);

            const imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
            const data = imageData.data;

            const backgroundColor = getBackgroundColor(data, canvasWidth);
            // console.log(`bgcolor: ${backgroundColor.r}, ${backgroundColor.g}, ${backgroundColor.b}`);

            const topPadding = calculateTopPadding(data, canvasWidth, canvasHeight, backgroundColor);
            const bottomPadding = calculateBottomPadding(data, canvasWidth, canvasHeight, backgroundColor);
            const { leftStart, rightEnd } = findEdges(data, canvasWidth, canvasHeight, backgroundColor);

            const maxWhitespace = 5;

            const newTop = Math.max(0, topPadding - maxWhitespace);
            const newBottom = Math.min(canvasHeight, canvasHeight - bottomPadding + maxWhitespace);
            const newHeight = newBottom - newTop;

            const adjustedLeftPadding = Math.max(0, leftStart - maxWhitespace);
            const adjustedRightPadding = Math.min(canvasWidth, rightEnd + maxWhitespace);
            const newWidth = adjustedRightPadding - adjustedLeftPadding;

            const maxDimension = Math.max(newWidth, newHeight);

            const finalCanvas = document.createElement('canvas');
            finalCanvas.width = maxDimension;
            finalCanvas.height = maxDimension;
            const finalCtx = finalCanvas.getContext('2d');

            if (!finalCtx) {
                reject(new Error('Final canvas context not available'));
                return;
            }

            finalCtx.fillStyle = `rgb(${backgroundColor.r}, ${backgroundColor.g}, ${backgroundColor.b})`;
            finalCtx.fillRect(0, 0, maxDimension, maxDimension);


            const x = (maxDimension - newWidth) / 2;
            const y = (maxDimension - newHeight) / 2;

            finalCtx.drawImage(
                canvas,
                adjustedLeftPadding,
                newTop,
                newWidth,
                newHeight,
                x,
                y,
                newWidth,
                newHeight
            );

            finalCanvas.toBlob((blob) => {
                if (!blob) {
                    reject(new Error('Failed to create blob'));
                    return;
                }
                //create a file from the blob with metadata
                const processedFile = new File([blob], file.name, { type: 'image/png' });
                resolve(processedFile);
            }, 'image/png');
        };

        img.onerror = () => {
            reject(new Error('Failed to load image'));
        };
    });
};

//return the top edge of the object in the image
export const calculateTopPadding = (
    data: Uint8ClampedArray,
    canvasWidth: number,
    canvasHeight: number,
    backgroundColor: { r: number; g: number; b: number }
) => {
    for (let y = 0; y < canvasHeight; y++) {
        for (let x = 0; x < canvasWidth; x++) {
            const pixelIndex = (y * canvasWidth + x) * 4;
            const r = data[pixelIndex];
            const g = data[pixelIndex + 1];
            const b = data[pixelIndex + 2];

            if (r !== backgroundColor.r || g !== backgroundColor.g || b !== backgroundColor.b) {
                return y;
            }
        }
    }
    return canvasHeight; // If no padding found, return full height
};


export const calculateBottomPadding = (
    data: Uint8ClampedArray,
    canvasWidth: number,
    canvasHeight: number,
    backgroundColor: { r: number; g: number; b: number }
) => {
    for (let y = canvasHeight - 1; y >= 0; y--) {
        for (let x = 0; x < canvasWidth; x++) {
            const pixelIndex = (y * canvasWidth + x) * 4;
            const r = data[pixelIndex];
            const g = data[pixelIndex + 1];
            const b = data[pixelIndex + 2];

            if (r !== backgroundColor.r || g !== backgroundColor.g || b !== backgroundColor.b) {
                return canvasHeight - y - 1;
            }
        }
    }
    return canvasHeight;
};

//find the edges on the sides of the object
export const findEdges = (
    data: Uint8ClampedArray,
    canvasWidth: number,
    canvasHeight: number,
    backgroundColor: { r: number; g: number; b: number }
) => {
    let leftStart = canvasWidth;
    let rightEnd = 0;

    for (let y = 0; y < canvasHeight; y++) {
        for (let x = 0; x < canvasWidth; x++) {
            const pixelIndex = (y * canvasWidth + x) * 4;
            const r = data[pixelIndex];
            const g = data[pixelIndex + 1];
            const b = data[pixelIndex + 2];

            if (r !== backgroundColor.r || g !== backgroundColor.g || b !== backgroundColor.b) {
                if (x < leftStart) leftStart = x;
                if (x > rightEnd) rightEnd = x;
            }
        }
    }

    return { leftStart, rightEnd };
};