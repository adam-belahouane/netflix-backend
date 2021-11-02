import express from "express"
import unidid from "uniqid"
import { getMedia, writeMedia } from "../../lib/fs-tools.js"
import multer from "multer"

import { CloudinaryStorage} from "multer-storage-cloudinary"
import { v2 as cloudinary } from "cloudinary"


const mediaRouter = express.Router()

const cloudinaryStorage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "Media-Folder"
    }
})

mediaRouter.post("/", async (req, res, next) => {
    try {
        const newMedia = { ...req.body, imbdID: unidid(), reviews: [] }
        const media = await getMedia()
        media.push(newMedia)
        await writeMedia(media)
        res.status(201).send({ newMedia })
    } catch (error) {
        next(error)
    }
})

mediaRouter.post("/:mediaId/poster", multer({storage: cloudinaryStorage}).single("Poster") , async(req, res, next) => {
    try {
        console.log(req.file)
        const media = await getMedia()
        const indexMedia = media.findIndex((m) => m.imdbID === req.params.mediaId);
        media[indexMedia].Poster = req.file.path
        await writeMedia(media)
        res.status(200).send(media[indexMedia])
    } catch (error) {
        next(error)
    }

})

mediaRouter.get("/", async (req, res, next) => {
    try {
        const media = await getMedia()
        res.send(media)
    } catch (error) {
        next(error)
    }
})

mediaRouter.get("/:mediaId", async (req, res, next) => {
    try {
        const media = await getMedia()
        const singleMedia = media.find((m) => m.imbdID === req.params.mediaId)
        res.send(singleMedia)
    } catch (error) {
        next(error)
    }
})

mediaRouter.put("/:mediaId", async (req, res, next) => {
    try {
        const media = await getMedia()
        const index = media.findIndex((m) => m.imbdID === req.params.mediaId)
        const updatedMedia = { ...media[index], ...req.body}
        media[index] = updatedMedia
        await writeMedia(media)
        res.send(updatedMedia)
    } catch (error) {
        next(error)
    }
})

mediaRouter.delete("/:mediaId", async (req, res, next) => {
    try {
        const media = await getMedia()
        const remainingMedia = media.filter( m => m.imbdID !== req.params.mediaId)
        await writeMedia(remainingMedia)
        res.status(204).send()
    } catch (error) {
        next(error)
    }
})

export default mediaRouter