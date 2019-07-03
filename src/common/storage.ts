/**
 * Created by ylf on 2017/4/10.
 */
const globalObj: any = {}

class WebStorage {
    storage: any
    constructor(storage: any) {
        this.storage = storage
    }
    get(key: any) {
        const valueStr = this.storage.getItem(key)
        try {
            return JSON.parse(valueStr)
        } catch (e) {
            return valueStr
        }
    }
    set(key: any, value: any) {
        const valueStr =
            typeof value === 'string' ? value : JSON.stringify(value)
        return this.storage.setItem(key, valueStr)
    }
    remove(key: any) {
        this.storage.removeItem(key)
    }
    removeAll() {
        this.storage.clear()
    }
}

const storage = {
    local: new WebStorage(window.localStorage),
    session: new WebStorage(window.sessionStorage),
    memory: {
        get(key: any) {
            return globalObj[key]
        },
        set(key: any, value: any) {
            globalObj[key] = value
        },
        remove(key: any) {
            globalObj[key] = undefined
        },
        removeAll() {
            Object.keys(globalObj).forEach(key => {
                globalObj[key] = undefined
            })
        }
    }
}

export default storage
