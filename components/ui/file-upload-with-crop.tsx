"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    FileUpload,
    FileUploadDropzone,
    FileUploadItem,
    FileUploadItemDelete,
    FileUploadItemMetadata,
    FileUploadItemPreview,
    FileUploadList,
    FileUploadTrigger,
} from "@/components/ui/file-upload";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
    Cropper,
    CropperArea,
    type CropperProps,
    CropperImage,
} from "@/components/ui/cropper";
import { CloudUpload, CropIcon, X } from "lucide-react";
import { useImageCrop } from "@/hooks/useImageCrop";
import type { ReactNode } from "react";

interface FileUploadWithCropProps {
    value?: File[];
    onValueChange: (files: File[]) => void;
    maxSize?: number;
    accept?: string;
    onFileReject?: (file: File, message: string) => void;
    label?: string;
    description?: ReactNode;
    aspectRatio?: number;
    shape?: "rectangle" | "circle";
    maxFiles?: number;
}

export function FileUploadWithCrop({
    value = [],
    onValueChange,
    maxSize = 5 * 1024 * 1024,
    accept = "image/*",
    onFileReject,
    label = "Choisir le fichier",
    description = "Glisser-déposer ou",
    aspectRatio = 1,
    shape = "circle",
    maxFiles = 1,
}: FileUploadWithCropProps) {
    const {
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
    } = useImageCrop();

    const onCropAreaChange: NonNullable<CropperProps["onCropAreaChange"]> = (
        _,
        croppedAreaPixels
    ) => {
        setCroppedArea(croppedAreaPixels);
    };

    const onCropComplete: NonNullable<CropperProps["onCropComplete"]> = (
        _,
        croppedAreaPixels
    ) => {
        setCroppedArea(croppedAreaPixels);
    };

    const handleFilesUpdate = (newFiles: File[]) => {
        handleFilesChange(newFiles);
        onValueChange(newFiles);
    };

    const handleCropApply = async () => {
        await applyCrop((croppedFile) => {
            const updatedFiles = value.map((f) =>
                f.name === selectedFile?.name ? croppedFile : f
            );
            onValueChange(updatedFiles);
        });
    };

    return (
        <>
            <FileUpload
                value={value}
                onValueChange={handleFilesUpdate}
                maxSize={maxSize}
                accept={accept}
                maxFiles={maxFiles}
                onFileReject={onFileReject}
            >
                <FileUploadDropzone className="flex-row flex-wrap border-dotted text-center">
                    <CloudUpload className="size-4" />
                    {description}
                    <FileUploadTrigger asChild>
                        <Button variant="link" size="sm" className="p-0">
                            {label}
                        </Button>
                    </FileUploadTrigger>
                    pour téléverser
                </FileUploadDropzone>
                <FileUploadList>
                    {value?.map((file, index) => {
                        const fileWithCrop = filesWithCrops.get(file.name);

                        return (
                            <FileUploadItem key={index} value={file}>
                                <FileUploadItemPreview
                                    render={(originalFile, fallback) => {
                                        if (
                                            fileWithCrop?.cropped &&
                                            originalFile.type.startsWith("image/")
                                        ) {
                                            const url = URL.createObjectURL(fileWithCrop.cropped);
                                            return (
                                                <img
                                                src={url}
                                                alt={originalFile.name}
                                                className="size-full object-cover"
                                                />
                                            );
                                        }
                                        return fallback();
                                    }}
                                />
                                <FileUploadItemMetadata />
                                <div className="flex gap-1">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="size-8"
                                        onClick={() => openCropDialog(file)}
                                    >
                                        <CropIcon />
                                    </Button>
                                    <FileUploadItemDelete asChild>
                                        <Button variant="ghost" size="icon" className="size-7">
                                            <X />
                                            <span className="sr-only">Supprimer</span>
                                        </Button>
                                    </FileUploadItemDelete>
                                </div>
                            </FileUploadItem>
                        );
                    })}
                </FileUploadList>
            </FileUpload>

            <Dialog open={showCropDialog} onOpenChange={handleDialogOpenChange}>
                <DialogContent className="max-w-4xl">
                    <DialogHeader>
                        <DialogTitle>Rogner l'image</DialogTitle>
                        <DialogDescription>
                            Ajustez la zone de rognage et le niveau de zoom pour{" "}
                            {selectedFile?.name}
                        </DialogDescription>
                    </DialogHeader>
                    {selectedFile && selectedImageUrl && (
                        <div className="flex flex-col gap-4">
                            <Cropper
                                aspectRatio={aspectRatio}
                                shape={shape}
                                crop={crop}
                                onCropChange={setCrop}
                                zoom={zoom}
                                onZoomChange={setZoom}
                                onCropAreaChange={onCropAreaChange}
                                onCropComplete={onCropComplete}
                                className="h-96"
                            >
                                <CropperImage
                                    src={selectedImageUrl}
                                    alt={selectedFile.name}
                                    crossOrigin="anonymous"
                                />
                                <CropperArea />
                            </Cropper>
                            <div className="flex flex-col gap-2">
                                <Label className="text-sm">
                                    Zoom: {zoom.toFixed(2)}
                                </Label>
                                <Slider
                                    value={[zoom]}
                                    onValueChange={(value) => setZoom(value[0] ?? 1)}
                                    min={1}
                                    max={3}
                                    step={0.1}
                                    className="w-full"
                                />
                            </div>
                        </div>
                    )}
                    <DialogFooter>
                        <Button onClick={resetCrop} variant="outline">
                            Réinitialiser
                        </Button>
                        <Button onClick={handleCropApply} disabled={!croppedArea}>
                            Rogner
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
