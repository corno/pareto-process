import * as pa from "pareto-api-core"


export type Call_Data = string

export type Call_Interface<T> = {
    onResult: (stdout: string) => pa.IAsync<T>,
    onError: (stderr: string, exitCode?: number) => pa.IAsync<T>,
}

export type Call_ReturnValue<T> = pa.IAsync<T> 

export type Call = <T>(
    $d: Call_Data,
    $i: Call_Interface<T>
) => Call_ReturnValue<T>

export type API = {
    call: Call
}