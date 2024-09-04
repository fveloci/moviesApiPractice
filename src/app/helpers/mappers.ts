import { error } from "console"

export function parseErrorsFromApi(response: any): string[] {
    const result: string[] = []
    if(response.error) {
        if(typeof response.error === 'string') {
            result.push(response.error)
        } else if (Array.isArray(response.error)) {
            response.error.forEach((value: any) => result.push(value.description))
        } else {
            const mapErrors = response.error.errors
            const entries = Object.entries(mapErrors)
            entries.forEach((array: any[]) => {
                const propertie = array[0]
                array[1].forEach((errorMessage: string) => {
                    result.push(`${propertie}: ${errorMessage}`)
                });
            })
        }
    }
    return result
}