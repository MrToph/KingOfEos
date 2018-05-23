const imageHostRequestUrl = `https://43it5oum3a.execute-api.eu-central-1.amazonaws.com/prod/requestUploadURL`

export default function fileUpload(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => {
            fetch(imageHostRequestUrl, {
                method: `POST`,
                headers: {
                    'Content-Type': `application/json`,
                },
                body: JSON.stringify({
                    name: file.name,
                    type: file.type,
                }),
            })
                .then(response => response.json())
                .then(json => {
                    if (json.error) throw new Error(json.error)
                    return fetch(json.uploadURL, {
                        method: `PUT`,
                        body: new Blob([reader.result], { type: file.type }),
                    }).then(() => json.fileName)
                })
                .then(uploadedFileName => {
                    resolve(
                        `https://s3.eu-central-1.amazonaws.com/image-hoster/${uploadedFileName}`,
                    )
                })
                .catch(err => reject(err))
        }
        reader.onabort = () => reject(new Error(`file reading was aborted`))
        reader.onerror = () => reject(new Error(`file reading has failed`))

        reader.readAsArrayBuffer(file)
    })
}
