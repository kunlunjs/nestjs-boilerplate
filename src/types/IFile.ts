export interface IFile {
  encoding: string
  buffer: Buffer
  size: number
  mimeType: string
  fieldName: string
  originalName: string
}
