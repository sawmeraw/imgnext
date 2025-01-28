//Data in the file.
export default interface VersionData{
    version: string,
}


export interface VersionAPIRequest{
    version: string,
}

export interface VersionAPIResponse{
    version: string,
    error?: string
}