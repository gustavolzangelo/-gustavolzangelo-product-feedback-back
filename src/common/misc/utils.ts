import * as _ from 'lodash'
import * as bcrypt from 'bcrypt'
import * as dayjs from 'dayjs'
import * as dayjsUtc from 'dayjs/plugin/utc'
import { IPagination } from '@common/types/interfaces/pagination.interface'

dayjs.extend(dayjsUtc)

export const _get = (params: { obj: any; path: any; or: any }): any => {
  const { obj, path, or } = params

  return _.get(obj, path, or)
}

export const _getCurrentDate = (): any => {
  return dayjs.utc().format()
}

export const _createHash = (params: {
  text: string
  saltOrRounds?: string | number
}): string => {
  const { text, saltOrRounds } = params

  return bcrypt.hashSync(text, saltOrRounds || 8)
}

export const _compareHash = (params: {
  text: string
  hash: string
}): boolean => {
  const { text, hash } = params

  return bcrypt.compareSync(text || 'text', hash || 'hash')
}

export const _isArray = (params: { obj: any }): boolean => {
  return _.isArray(params.obj)
}

export const _calcLimitAndOffset = (params: {
  pageNumber?: number
  itemsPerPage?: number
}): { skip: number; page: number; limit: number } => {
  const { pageNumber, itemsPerPage } = params

  const page = (pageNumber ?? 0) <= 0 ? 0 : Math.max(pageNumber - 1, 0)
  const limit = itemsPerPage ? Math.min(itemsPerPage, 10) : 10

  const skip = page * limit

  return { skip, limit, page }
}

export const _pagination = (params: {
  itemsInPage: number
  limit: number
  page: number
  totalItems: number
}): IPagination => {
  const { itemsInPage, limit, page, totalItems } = params

  const totalPages = Math.ceil(totalItems / limit)

  return {
    page: page + 1,
    totalPages,
    itemsInPage,
    totalItems,
    itemsPerPage: limit,
  }
}
