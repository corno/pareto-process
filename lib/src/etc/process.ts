import * as cp from "child_process"
import * as asyncAPI from "pareto-async-api"


export type Call_Data = string

export type Call_Interface<T> = {
    onResult: (stdout: string) => asyncAPI.IAsync<T>,
    onError: (stderr: string) => asyncAPI.IAsync<T>,

}

export type Call = <T>(
    $d: Call_Data,
    $i: Call_Interface<T>
) => asyncAPI.IAsync<T> 

export type API = {
    call: Call
}

export function call<T>(
    $d: Call_Data,
    $i: Call_Interface<T>
): asyncAPI.IAsync<T> {
    return {
        execute: (cb) => {
            cp.exec(
                $d,
                (err, stdout, stderr) => {
                    if (err !== null) {
                        console.error("CHILD PROCESS CALL ERROR, ERROR INFO IS MISSING")
                        $i.onError(stderr).execute(cb)
                    } else {
                        $i.onResult(stdout).execute(cb)
                    }
                }
            )
        }
    }
}

export const $: API = {
    call: call
}