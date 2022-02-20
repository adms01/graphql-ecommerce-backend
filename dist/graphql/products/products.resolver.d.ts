import { CreateProductInput } from './input';
import { Product } from '../typeorm_entity_defs/product.entity';
import { ProductsService } from './products.service';
import { ProductPage } from './productPage.model';
import { PaginationArgs } from '../common/pagination.args';
export declare class ProductsResolver {
    private productsService;
    constructor(productsService: ProductsService);
    getSingleProduct(id: string): Promise<Product>;
    getProducts(paginationArgs: PaginationArgs): Promise<ProductPage>;
    createProduct(createProductInput: CreateProductInput): Promise<Product>;
    deleteProduct(id: string): Promise<string>;
}
