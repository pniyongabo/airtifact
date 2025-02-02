import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const imagesDirectory = path.join(process.cwd(), 'content/images')
const textDirectory = path.join(process.cwd(), 'content/text')

export function getSortedImagesData() {
  // Get file names under /content/images
  const fileNames = fs.readdirSync(imagesDirectory)
  const allImagesData = fileNames.map(fileName => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md\$/, '')

    // Read markdown file as string
    const fullPath = path.join(imagesDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Combine the data with the id
    return {
      id,
      ...matterResult.data
    }
  })

  // Sort posts by date
  return allImagesData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export function getSortedTextData() {
  // Similar function for text content
  const fileNames = fs.readdirSync(textDirectory)
  const allTextData = fileNames.map(fileName => {
    const id = fileName.replace(/\.md\$/, '')
    const fullPath = path.join(textDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)

    return {
      id,
      ...matterResult.data,
      content: matterResult.content
    }
  })

  return allTextData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

