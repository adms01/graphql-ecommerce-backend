import { PaginationArgs } from '../common/pagination.args';
import { Product } from '../typeorm_entity_defs/product.entity';
import { Repository } from 'typeorm';
import { ProductPage } from './models/productPage.model';
import { CreateProductInput } from './dto/input/create-product.input';
export declare class ProductsService {
    private readonly productRepository;
    constructor(productRepository: Repository<Product>);
    save(product: Product): Promise<Product>;
    findOneById(id: string): Promise<Product>;
    deleteProductById(id: string): Promise<Boolean>;
    createProduct(createProductInput: CreateProductInput): Promise<Product>;
    findAll(paginationArgs: PaginationArgs): Promise<ProductPage>;
}
