const imageHostRequestUrl = `https://43it5oum3a.execute-api.eu-central-1.amazonaws.com/prod/requestUploadURL`

export function getImageUrl(imageId) {
    if (!imageId) return ``
    return `https://s3.eu-central-1.amazonaws.com/image-hoster/${imageId}`
}

export default function fileUpload(file) {
    const reader = new FileReader()
    return new Promise((resolve, reject) => {
        reader.onload = () => {
            resolve()
        }
        reader.onabort = () => reject(new Error(`file reading was aborted`))
        reader.onerror = () => reject(new Error(`file reading has failed`))

        reader.readAsArrayBuffer(file)
    })
        .then(() =>
            fetch(imageHostRequestUrl, {
                method: `POST`,
                headers: {
                    'Content-Type': `application/json`,
                },
                body: JSON.stringify({
                    name: file.name,
                    type: file.type,
                }),
            }),
        )
        .then(response => response.json())
        .then(json => {
            if (json.error) throw new Error(json.error)
            return fetch(json.uploadURL, {
                method: `PUT`,
                body: new Blob([reader.result], { type: file.type }),
            }).then(() => json.fileName)
        })
}
