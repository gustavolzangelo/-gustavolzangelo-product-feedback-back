import { PublicRoute } from '@common/decorators/is-public-route.decorator'
import { IResultsSet } from '@common/types/interfaces/result-set.interface'
import { ProductFeedbackIdentifiers } from '@modules/product-feedback/types/consts/product-feedback-identifiers.const'
import { ProductFeedbackCreateDto } from '@modules/product-feedback/types/dto/product-feedback-create.dto'
import { ProductFeedbackFilterDto } from '@modules/product-feedback/types/dto/product-feedback-filter.dto'
import { ProductFeedbackUpdateDto } from '@modules/product-feedback/types/dto/product-feedback-update.dto'
import { ProductFeedbackDto } from '@modules/product-feedback/types/dto/product-feedback.dto'
import { IProductFeedbackService } from '@modules/product-feedback/types/interfaces/product-feedback-service.interface.dto'
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  Res,
} from '@nestjs/common'
import { Response } from 'express'

@Controller('product-feedbacks')
export class ProductFeedbackController {
  constructor(
    @Inject(ProductFeedbackIdentifiers.IProductFeedbackService)
    private productFeedbackService: IProductFeedbackService
  ) {}

  @PublicRoute()
  @Post()
  async create(
    @Body() createProductFeedbackDto: ProductFeedbackCreateDto
  ): Promise<ProductFeedbackDto> {
    return this.productFeedbackService.create({
      productFeedbackCreateDto: createProductFeedbackDto,
    })
  }

  @PublicRoute()
  @Get()
  async findAll(
    @Query() productFeedbackFilterDto: ProductFeedbackFilterDto
  ): Promise<IResultsSet<ProductFeedbackDto>> {
    return this.productFeedbackService.findAll({
      productFeedbackFilterDTO: productFeedbackFilterDto,
    })
  }

  @Patch(':id')
  async update(
    @Res({ passthrough: true }) res: Response,
    @Param('id') id: string,
    @Body() productFeedbackUpdateDto: ProductFeedbackUpdateDto
  ): Promise<ProductFeedbackDto> {
    const productFeedback = await this.productFeedbackService.updateOne({
      productFeedbackId: id,
      productFeedbackUpdateDto,
    })

    if (!productFeedback) {
      res.status(HttpStatus.NOT_FOUND)
      return
    }

    res.status(HttpStatus.OK)
    return productFeedback
  }

  @Delete(':id')
  async remove(
    @Res({ passthrough: true }) res: Response,
    @Param('id') id: string
  ) {
    const productFeedback = await this.productFeedbackService.deleteOne({
      productFeedbackId: id,
    })
    if (!productFeedback) {
      res.status(HttpStatus.NOT_FOUND)
      return
    }
    res.status(HttpStatus.OK)
  }
}
