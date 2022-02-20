import { HttpCode, NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateProductInput } from './dto/input/create-product.input';
import { Product } from '../typeorm_entity_defs/product.entity';
import { ProductsService } from './products.service';
import { ProductPage } from './models/productPage.model';
import { PaginationArgs } from '../common/pagination.args';
import { DeleteProductInput } from './dto/input/delete-product.input';
import { AuthGuard } from 'src/auth/auth.guard';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private productsService: ProductsService) {}

  /**
   * //*Get One Product
   */

  @Query(() => Product)
  async getSingleProduct(@Args('id') id: string): Promise<Product> {
    const product = await this.productsService.findOneById(id);

    return product;
  }

  /**
   * //*Get Products Resolver
   */
  @Query(() => ProductPage)
  async getProducts(@Args() paginationArgs: PaginationArgs): Promise<ProductPage> {
    return await this.productsService.findAll(paginationArgs);
  }

  /**
   * //*Delete Product Resolver
   */

  @Mutation(() => Boolean)
  @UseGuards(new AuthGuard())
  async deleteProduct(@Args('id') { id }: DeleteProductInput) {
    return await this.productsService.deleteProductById(id);
  }

  /**
   * //*Create Product Resolver
   */

  @Mutation(() => Product)
  @UseGuards(new AuthGuard())
  async createProduct(@Args('createProductInput') createProductInput: CreateProductInput): Promise<Product> {
    return await this.productsService.createProduct(createProductInput);
  }
}
