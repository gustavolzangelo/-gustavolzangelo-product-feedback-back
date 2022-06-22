import { IProductFeedbackEntity } from '@modules/product-feedback/types/interfaces/product-feedback-entity.interface'

export class ProductFeedbackEntity implements IProductFeedbackEntity {
  id: string
  title: string
  category: string
  updateStatus: string
  detail: string
  userId: string
  createdAt: Date
  modifiedAt: Date
}
