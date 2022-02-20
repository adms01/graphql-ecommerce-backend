import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PaginationArgs } from '../common/pagination.args';
import { Product } from '../typeorm_entity_defs/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductPage } from './models/productPage.model';
import { CreateProductInput } from './dto/input/create-product.input';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async save(product: Product): Promise<Product> {
    return this.productRepository.save(product);
  }

  async findOneById(id: string): Promise<Product> {
    const product = await this.productRepository.findOne(id);

    if (!product) {
      throw new HttpException(`Product with id: ${id} not found`, HttpStatus.NOT_FOUND);
    }

    return product;
  }

  async deleteProductById(id: string): Promise<Boolean> {
    try {
      const product = await this.findOneById(id);
      await this.productRepository.remove(product);
      return true;
    } catch (err) {
      return false;
    }
  }

  async createProduct(createProductInput: CreateProductInput): Promise<Product> {
    const newProduct: Product = new Product();
    newProduct.name = createProductInput.name;
    newProduct.description = createProductInput.description;
    newProduct.price = createProductInput.price;
    newProduct.images = createProductInput.images[0];

    return await this.save(newProduct);
  }

  async findAll(paginationArgs: PaginationArgs): Promise<ProductPage> {
    const [results, total] = await this.productRepository.findAndCount({
      order: { createdAt: `${paginationArgs.order ?? 'DESC'}` },
      take: paginationArgs.take,
      skip: paginationArgs.skip,
    });

    return {
      nodes: results,
      totalRows: total,
    };
  }
}
