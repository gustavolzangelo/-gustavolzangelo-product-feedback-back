import * as _ from 'lodash'
import * as bcrypt from 'bcrypt'
import * as dayjs from 'dayjs'
import * as dayjsUtc from 'dayjs/plugin/utc'

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
