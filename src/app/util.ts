import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import { BLOCKS, MARKS } from '@contentful/rich-text-types'

export const FIRESTORE_COLLECTION_NAME = 'maintenances'

export function blobToString(blob: Blob, type?: string) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result)
        reader.onerror = (event) => reject(event)

        type?.includes('image')
            ? reader.readAsDataURL(blob)
            : reader.readAsText(blob)
    })
}

export function renderUnit(unit: any) {
    if (!unit) return ''

    return documentToHtmlString(unit, {
        renderNode: {
            [BLOCKS.PARAGRAPH]: (node, next) =>
                `<span>${next(node.content)}</span>`,
        },
    })
}
