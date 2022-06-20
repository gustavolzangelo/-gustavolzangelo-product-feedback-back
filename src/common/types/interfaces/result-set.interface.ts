import { IPagination } from '@common/types/interfaces/pagination.interface'

export interface IResultsSet<T> {
  pagination?: IPagination
  items: T[]
}
