import express from "express"
import unidid from "uniqid"
import { getMedia, writeMedia } from "../../lib/fs-tools.js"


const mediaRouter = express.Router()

mediaRouter.get("/", async (req, res, next) => {
    try {
        const media = await getMedia()
        res.send(media)
    } catch (error) {
        next(error)
    }
})

export default mediaRouter