export type Url = {

    idUrl: number,
    originalUrl: string,
    titulo: string,
    slug: string,
    fechaModificacion: string,
    vecesAccedido: number
}

export type ActualizarUrlRequest = {
    url: string,
    titulo: string,
    cambiarSlug: boolean,
    esClicked: boolean
}