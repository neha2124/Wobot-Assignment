export interface ApiResponse {
        message:string,
        data:cameraDto[]
}
export interface cameraDto {
    current_status: string
     hasWarning: boolean
     health: { cloud: string, device: string, _id: string, id: string }
     id: number
     location: string
    name: string
    recorder: string
    status: string
    tasks: string
    _id: string
}

