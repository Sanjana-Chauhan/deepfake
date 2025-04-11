// components/UploadCard.tsx
"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, Upload, RefreshCw } from "lucide-react";
// import Outputcard from '@/components/outputcard';

import { useRouter } from "next/navigation";



export default function ImageUploader() {
  const router = useRouter();
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  }, []);

  const removeImage = () => {
    setImage(null);
    setPreview(null);
  };

  const handleSubmit = async () => {
    if (!image) return alert("No image selected!");

    setIsUploading(true);

    try {
      const reader = new FileReader();

      reader.onloadend = async () => {
        try {
          const base64 = (reader.result as string).split(",")[1];

          const response = await fetch(
            "https://api.detectdeepfake.xyz/predict",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ image: base64 }),
            }
          );

          const data = await response.json();

          const queryParams = new URLSearchParams({
            prediction: data.prediction,
            confidence: data.confidence.toString(),
            real: data.probabilities.real.toString(),
            fake: data.probabilities.fake.toString(),
          });

          router.push(`/verify/output?${queryParams.toString()}`);
        } catch (error) {
          console.error("API call error:", error);
          alert("Something went wrong with the API call.");
        } finally {
          setIsUploading(false);
        }
      };

      reader.readAsDataURL(image);
    } catch (error) {
      console.error("Submission error:", error);
      alert("Something went wrong.");
      setIsUploading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    noClick: true,
    noKeyboard: true,
    multiple: false,
  });

  return (
    <>
      {
        <Card className="bg-none border-0 text-white rounded-xl">
          <CardHeader>
            <CardTitle className="text-white">Upload Image</CardTitle>
            <CardDescription className="text-white">
              Drag and drop an image or click below to select one.
            </CardDescription>
          </CardHeader>

          <CardContent>
            {!preview ? (
              <div
                {...getRootProps()}
                className="flex flex-col items-center justify-center border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-lg p-10 cursor-pointer hover:bg-zinc-700/40 dark:hover:bg-zinc-800 transition"
              >
                <input {...getInputProps()} />
                <CloudUploadIcon className="w-12 h-12 text-zinc-500 mb-4" />
                <p className="text-zinc-500">
                  {isDragActive
                    ? "Drop the image here..."
                    : "Click or drag image here to upload"}
                </p>
                <Button
                  size="lg"
                  className="bg-purple-600 hover:bg-purple-700 text-white px-8 mt-3 py-1"
                  onClick={open}
                >
                  Browse Images
                </Button>
              </div>
            ) : (
              <div className="relative">
                <div className="w-full flex justify-center">
                  <Image
                    src={preview}
                    alt="Preview"
                    width={150}
                    height={50}
                    className="rounded-md border shadow object-contain"
                  />
                </div>

                <Button
                  variant="destructive"
                  size="sm"
                  onClick={removeImage}
                  className="absolute top-2 right-2 p-1 rounded-full"
                >
                  <X className="w-4 h-4" />
                </Button>
                <div className="flex justify-end gap-2 mt-4">
                  <Button
                    variant="secondary"
                    onClick={open}
                    className="flex items-center gap-1 bg-zinc-500 hover:bg-zinc-700"
                  >
                    <RefreshCw className="w-4 h-4" /> Change
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    className="flex items-center gap-1 bg-zinc-500 hover:bg-zinc-700"
                    disabled={isUploading} // Disable button while uploading
                  >
                    <Upload className="w-4 h-4" />
                    {isUploading ? "Uploading..." : "Submit"}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      }
    </>
  );
}

function CloudUploadIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 14.9A7 7 0 1 1 15.7 8h1.8a4.5 4.5 0 0 1 2.5 8.2" />
      <path d="M12 12v9" />
      <path d="m16 16-4-4-4 4" />
    </svg>
  );
}
