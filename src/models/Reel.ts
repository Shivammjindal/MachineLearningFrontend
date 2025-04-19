import mongoose from "mongoose"

export const Video_Dimentions = {
    width: 1080,
    height: 1920
} as const

interface IVideo{
    _id?: string,
    reelUrl?: string,
    title?: string,
    email: string,
    description ?: string,
    thumbnailUrl?: string,
    controls?: boolean
    transformation : {
        height: number,
        width: number,
        quality?: number
    },
    fileId?: string
    createdAt?: Date,
    updatedAt?: Date
}

const videoSchema = new mongoose.Schema<IVideo>({
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        default: 'Hey This is my reel'
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    reelUrl: {
        type: String,
        required: true,
        unique: true
    },
    thumbnailUrl: {
        type: String,
    },
    fileId: {
        type: String,
        required: true,
    },
    controls:{
        type: Boolean,
        default: true
    },
    transformation:{
        height:{
            type: Number,
            default: Video_Dimentions.height
        },
        width:{
            type: Number,
            default: Video_Dimentions.width
        },
        quality:{
            type: Number,
            min: 1,
            max: 100
        }
    }
},{
    timestamps: true
})

export const Reel = mongoose.models.reels || mongoose.model<IVideo>('reels', videoSchema)