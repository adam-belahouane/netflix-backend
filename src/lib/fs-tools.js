import fs from "fs-extra"
import { fileURLToPath } from "url"
import { dirname, join } from "path"

const { readJSON, writeJSON, writeFile } = fs
const dataFolderPath = join(dirname(fileURLToPath(import.meta.url)), "../data")
const mediaPublicFolderPath = join(process.cwd(), "./public/img/media")

const mediaJSONPath = join(dataFolderPath, "media.json")

export const getMedia = () => readJSON(mediaJSONPath)
export const writeMedia = content => writeJSON(mediaJSONPath, content)
export const saveMediaPoster = (fileName, contentAsBuffer) => writeFile(join(mediaPublicFolderPath, fileName), contentAsBuffer)