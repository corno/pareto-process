import * as asyncAPI from "pareto-async-api"


export type Call_Data = string

export type Call_Interface<T> = {
    onResult: (stdout: string) => asyncAPI.IAsync<T>,
    onError: (stderr: string, exitCode: number) => asyncAPI.IAsync<T>,
}

export type Call_ReturnValue<T> = asyncAPI.IAsync<T> 

export type Call = <T>(
    $d: Call_Data,
    $i: Call_Interface<T>
) => Call_ReturnValue<T>

export type API = {
    call: Call
}