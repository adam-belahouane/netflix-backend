import fs from "fs-extra"
import { fileURLToPath } from "url"
import { dirname, join } from "path"

const { readJSON, writeJSON } = fs
const dataFolderPath = join(dirname(fileURLToPath(import.meta.url)), "../data")

const mediaJSONPath = join(dataFolderPath, "media.json")

export const getMedia = () => readJSON(mediaJSONPath)
export const writeMedia = () => writeJSON(mediaJSONPath)