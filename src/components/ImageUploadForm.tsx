'use client';

import { useState, useRef, DragEvent, ChangeEvent, FormEvent } from 'react';
import ImagePreview from './UploadPreview';
import { v4 as uuid } from "uuid";
import { toast } from 'react-toastify';

export default function ImageUploadForm() {
    const [files, setFiles] = useState<File[]>([]);
    const [processedFiles, setProcessedFiles] = useState<string[]>([]); // Store processed image URLs
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Handle file selection
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFiles = Array.from(e.target.files);
            setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
        }
    };

    // Handle drag-and-drop
    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFiles = Array.from(e.dataTransfer.files);
        setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
    };

    // Remove a file from the list
    const removeFile = (index: number) => {
        setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    // Process and upload files
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (files.length === 0) {
            toast.warn('No files selected');
            return;
        }

        try {
            const processedFiles = await Promise.all(
                files.map(async (file) => {
                    const processedImage = await processImage(file);
                    return processedImage;
                })
            );

            // Convert processed images to data URLs for display
            const processedImageUrls = await Promise.all(
                processedFiles.map(async (file) => {
                    return await fileToDataUrl(file);
                })
            );

            setProcessedFiles(processedImageUrls); // Store processed image URLs
            toast.success('Files processed successfully!');
        } catch (error) {
            console.error('Error processing files:', error);
        }
    };

    // Convert a File to a data URL
    const fileToDataUrl = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                resolve(reader.result as string);
            };
            reader.onerror = () => {
                reject(new Error('Failed to read file'));
            };
            reader.readAsDataURL(file);
        });
    };

    const getBackgroundColor = (data: Uint8ClampedArray, canvasWidth: number) => {
        const pixelIndex = 0;
        const r = data[pixelIndex];
        const g = data[pixelIndex + 1];
        const b = data[pixelIndex + 2];

        return { r, g, b };
    };

    // Process an image (crop, resize, etc.)
    const processImage = async (file: File): Promise<File> => {
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

                // Find edges
                const topPadding = calculateTopPadding(data, canvasWidth, canvasHeight, backgroundColor);
                const bottomPadding = calculateBottomPadding(data, canvasWidth, canvasHeight, backgroundColor);
                const { leftStart, rightEnd } = findEdges(data, canvasWidth, canvasHeight, backgroundColor);

                // Set maximum whitespace
                const maxWhitespace = 100;

                // Calculate new dimensions with reduced whitespace
                const newTop = Math.max(0, topPadding - maxWhitespace);
                const newBottom = Math.min(canvasHeight, canvasHeight - bottomPadding + maxWhitespace);
                const newHeight = newBottom - newTop;

                const adjustedLeftPadding = Math.max(0, leftStart - maxWhitespace);
                const adjustedRightPadding = Math.min(canvasWidth, rightEnd + maxWhitespace);
                const newWidth = adjustedRightPadding - adjustedLeftPadding;

                // console.log('Original Width:', canvasWidth);
                // console.log('Original Height:', canvasHeight);
                // console.log('Top Padding:', topPadding);
                // console.log('Bottom Padding:', bottomPadding);
                // console.log('Left Start:', leftStart);
                // console.log('Right End:', rightEnd);
                // console.log('New Top:', newTop);
                // console.log('New Bottom:', newBottom);
                // console.log('Adjusted Left Padding:', adjustedLeftPadding);
                // console.log('Adjusted Right Padding:', adjustedRightPadding);
                // console.log('New Width:', newWidth);
                // console.log('New Height:', newHeight);

                const finalCanvas = document.createElement('canvas');
                finalCanvas.width = newWidth;
                finalCanvas.height = newHeight;
                const finalCtx = finalCanvas.getContext('2d');

                if (!finalCtx) {
                    reject(new Error('Final canvas context not available'));
                    return;
                }

                finalCtx.drawImage(
                    canvas,
                    adjustedLeftPadding,
                    newTop,
                    newWidth,
                    newHeight,
                    0,
                    0,
                    newWidth,
                    newHeight
                );

                finalCanvas.toBlob((blob) => {
                    if (!blob) {
                        reject(new Error('Failed to create blob'));
                        return;
                    }
                    const processedFile = new File([blob], file.name, { type: 'image/png' });
                    resolve(processedFile);
                }, 'image/png');
            };

            img.onerror = () => {
                reject(new Error('Failed to load image'));
            };
        });
    };

    // Helper function to calculate top padding
    const calculateTopPadding = (
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


    const calculateBottomPadding = (
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

    const findEdges = (
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

    const downloadImage = (dataUrl: string, fileName: string) => {
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = `imgnext-${uuid().substring(0, 4)}.jpeg`;
        link.click();
    };

    const downloadAllImages = () =>{
        processedFiles.forEach((dataUrl, index)=>{
            downloadImage(dataUrl, `imgnext_edit-${uuid().substring(0,4)}`)
        })
    }

    const clearAllImages = ()=>{
        setFiles([])
        setProcessedFiles([])
    }

    return (
        <>
            <div className="flex w-full">
                <div className="w-1/3 relative bg-white rounded overflow-hidden flex flex-col flex-shrink-0 shadow-lg">
                    <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-md">
                        <div
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            className={`p-6 border-2 border-dashed ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50'
                                } rounded-lg text-center cursor-pointer`}
                        >
                            <p className="text-gray-600">
                                Drag & drop images here or{' '}
                                <button
                                    type="button"
                                    onClick={handleButtonClick}
                                    className="text-blue-500 underline focus:outline-none"
                                >
                                    click to upload
                                </button>
                            </p>
                        </div>

                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            multiple
                            onChange={handleFileChange}
                            accept="image/*"
                        />

                        <div className='flex gap-4'><button
                            type="submit"
                            disabled={files.length === 0}
                            className="w-1/3 mt-6 px-4 py-2 bg-black text-white font-semibold rounded hover:bg-stone-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                        >
                            Process Images
                        </button>
                        <button type='button' onClick={clearAllImages} className=" mt-6 px-4 py-2 bg-black text-white font-semibold rounded hover:bg-stone-600 disabled:bg-gray-300 disabled:cursor-not-allowed">Clear All</button>
                    </div>
                        </form>
                </div>
                <div className="w-2/3">
                    <ImagePreview files={files} onRemove={removeFile} />
                </div>

            </div>

            {processedFiles.length > 0 && (
                <div className="w-full mt-4">
                    <div className='flex gap-8 mb-4'>
                        <h2 className="text-2xl inline font-semibold">Processed Images</h2>
                        <button type='button' onClick={downloadAllImages} className='px-4 py-2 bg-black text-white font-semibold rounded hover:bg-stone-600 disabled:bg-gray-300 disabled:cursor-not-allowed'>Download</button>
                    </div>
                    <div className="flex gap-4">
                        {processedFiles.map((dataUrl, index) => (
                            <div key={index} className="flex flex-col items-center border-2 border-sky-300 rounded">
                                <img
                                    src={dataUrl}
                                    alt={`Processed ${index}`}
                                    className="w-32 h-32 object-contain rounded-lg"
                                />
                                {/* <button
                                    onClick={() => downloadImage(dataUrl, `processed_${index}.png`)}
                                    className="mt-2 p-1 bg-black text-white rounded-sm hover:bg-stone-600 duration-300"
                                >
                                    Download
                                </button> */}
                            </div>
                        ))}
                    </div>
                </div>
            )}

        </>
    );
}