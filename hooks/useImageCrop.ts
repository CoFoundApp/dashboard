"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import type { CropperAreaData, CropperPoint } from "@/components/ui/cropper";
import { toast } from "sonner";

interface FileWithCrop {
    original: File;
    cropped?: File;
}

async function createCroppedImage(
    imageSrc: string,
    cropData: CropperAreaData,
    fileName: string
): Promise<File> {
    const image = new Image();
    image.crossOrigin = "anonymous";

    return new Promise((resolve, reject) => {
        image.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            if (!ctx) {
                reject(new Error("Impossible d'obtenir le contexte du canvas"));
                return;
            }

            canvas.width = cropData.width;
            canvas.height = cropData.height;

            ctx.drawImage(
                image,
                cropData.x,
                cropData.y,
                cropData.width,
                cropData.height,
                0,
                0,
                cropData.width,
                cropData.height
            );

            canvas.toBlob((blob) => {
                if (!blob) {
                    reject(new Error("Le canvas est vide"));
                    return;
                }

                const croppedFile = new File([blob], `cropped-${fileName}`, {
                    type: "image/png",
                });
                resolve(croppedFile);
            }, "image/png");
        };

        image.onerror = () => reject(new Error("Échec du chargement de l'image"));
        image.src = imageSrc;
    });
}

export function useImageCrop() {
    const [filesWithCrops, setFilesWithCrops] = useState<Map<string, FileWithCrop>>(
        new Map()
    );
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [crop, setCrop] = useState<CropperPoint>({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedArea, setCroppedArea] = useState<CropperAreaData | null>(null);
    const [showCropDialog, setShowCropDialog] = useState(false);

    const selectedImageUrl = useMemo(() => {
        if (!selectedFile) return null;
        return URL.createObjectURL(selectedFile);
    }, [selectedFile]);

    useEffect(() => {
        return () => {
            if (selectedImageUrl) {
                URL.revokeObjectURL(selectedImageUrl);
            }
        };
    }, [selectedImageUrl]);

    const handleFilesChange = useCallback((newFiles: File[]) => {
        setFilesWithCrops((prevFilesWithCrops) => {
            const updatedFilesWithCrops = new Map(prevFilesWithCrops);

            for (const file of newFiles) {
                if (!updatedFilesWithCrops.has(file.name)) {
                    updatedFilesWithCrops.set(file.name, { original: file });
                }
            }

            const fileNames = new Set(newFiles.map((f) => f.name));
            for (const [fileName] of updatedFilesWithCrops) {
                if (!fileNames.has(fileName)) {
                    updatedFilesWithCrops.delete(fileName);
                }
            }

            return updatedFilesWithCrops;
        });
    }, []);

    const openCropDialog = useCallback(
        (file: File) => {
            const fileWithCrop = filesWithCrops.get(file.name);
            const originalFile = fileWithCrop?.original ?? file;

            setSelectedFile(originalFile);
            setCrop({ x: 0, y: 0 });
            setZoom(1);
            setCroppedArea(null);
            setShowCropDialog(true);
        },
        [filesWithCrops]
    );

    const handleDialogOpenChange = useCallback((open: boolean) => {
        setShowCropDialog(open);
        if (!open) {
            setCrop({ x: 0, y: 0 });
            setZoom(1);
            setCroppedArea(null);
            setSelectedFile(null);
        }
    }, []);

    const resetCrop = useCallback(() => {
        setCrop({ x: 0, y: 0 });
        setZoom(1);
        setCroppedArea(null);
    }, []);

    const applyCrop = useCallback(
        async (onSuccess?: (croppedFile: File) => void) => {
            if (!selectedFile || !croppedArea || !selectedImageUrl) return;

            try {
                const croppedFile = await createCroppedImage(
                    selectedImageUrl,
                    croppedArea,
                    selectedFile.name
                );

                const newFilesWithCrops = new Map(filesWithCrops);
                const existing = newFilesWithCrops.get(selectedFile.name);
                if (existing) {
                    newFilesWithCrops.set(selectedFile.name, {
                        ...existing,
                        cropped: croppedFile,
                    });
                    setFilesWithCrops(newFilesWithCrops);
                }

                setShowCropDialog(false);
                toast.success("Image rognée avec succès");
                
                if (onSuccess) {
                    onSuccess(croppedFile);
                }
            } catch (error) {
                toast.error(
                    error instanceof Error ? error.message : "Échec du rognage de l'image"
                );
            }
        },
        [selectedFile, croppedArea, selectedImageUrl, filesWithCrops]
    );

    return {
        filesWithCrops,
        selectedFile,
        selectedImageUrl,
        crop,
        setCrop,
        zoom,
        setZoom,
        croppedArea,
        setCroppedArea,
        showCropDialog,
        handleFilesChange,
        openCropDialog,
        handleDialogOpenChange,
        resetCrop,
        applyCrop,
    };
}
