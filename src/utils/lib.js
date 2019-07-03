/**
 * 常用工具函数
 */
import cloneDeep from 'lodash/cloneDeep'
import sortBy from 'lodash/sortBy'
import reverse from 'lodash/reverse'
import concat from 'lodash/concat'
import max from 'lodash/max'
import assign from 'lodash/assign'
import isString from 'lodash/isString'
import isObject from 'lodash/isObject'
import groupBy from 'lodash/groupBy'

export const isFunction = obj => {
    return typeof obj === 'function'
}

export const isArray = obj => {
    return Array.isArray(obj)
}
export const isStrings = obj => {
    return isString(obj)
}
export const isObjects = obj => {
    return isObject(obj)
}
export const cloneDeeps = obj => {
    return cloneDeep(obj)
}
export const sortBys = (arr1, arr2) => {
    return sortBy(arr1, arr2)
}
export const reverses = obj => {
    return reverse(obj)
}
export const concats = (arr1, arr2) => {
    return concat(arr1, arr2)
}
export const maxs = obj => {
    return max(obj)
}
export const assigns = (arr1, arr2) => {
    return assign(arr1, arr2)
}
export const groupBys = (arr1, arr2) => {
    return groupBy(arr1, arr2)
}
