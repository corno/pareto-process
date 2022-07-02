
import * as api from "pareto-process-api"
import { call } from "./etc/process"

export function init(): api.API {
    return {
        call: call
    }
}