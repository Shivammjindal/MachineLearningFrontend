"use client"

import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props"
import React, { useRef } from "react"


interface FileUplaodProps{
    onSuccess: (res: IKUploadResponse) => void
    onProgress?: (progress: number) => void
    fileType?: "image" | "video"
}