import { Expose } from 'class-transformer'

export class UserDTO {
  @Expose() id: string
  @Expose() email: string
  @Expose() username: string
  @Expose() name: string
  @Expose() surname: string
  @Expose() createdAt: Date
}
