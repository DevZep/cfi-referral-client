import { Storage } from 'aws-amplify'

export async function s3Upload (file: any) {
  const filename = `${Date.now()}-${file.info.name}`

  const stored: any = await Storage.vault.put(filename, file.dataUrl, {
    contentType: file.type
  })

  return stored.key
}
