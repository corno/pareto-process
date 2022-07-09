import * as cp from "child_process"
import * as api from "pareto-process-api"
import * as pa from "pareto-api-core"

export function call<T>(
    $d: api.Call_Data,
    $i: api.Call_Interface<T>
): pa.IAsync<T> {
    return {
        execute: (cb) => {
            cp.exec(
                $d,
                (err, stdout, stderr) => {
                    if (err !== null) {
                        $i.onError(stderr, err.code).execute(cb)
                    } else {
                        $i.onResult(stdout).execute(cb)
                    }
                }
            )
        }
    }
}

export const $: api.API = {
    call: call
}