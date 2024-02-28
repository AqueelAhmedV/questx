import { flushSync } from "react-dom";

export function tryViewTransition<T>(func: (...params: T[]) => void, ...params: T[]) {
    if (document.startViewTransition) {
        document.startViewTransition(() => flushSync(() => {
            func(...params)
        }))
    }
}