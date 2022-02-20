import { NewProductInput } from './newProduct.input';
import { Product } from './product.entity';
import { ProductsService } from './products.service';
import { ProductPage } from './productPage.model';
import { PaginationArgs } from '../common/pagination.args';
export declare class ProductsResolver {
    private readonly productsService;
    constructor(productsService: ProductsService);
    product(id: string): Promise<Product>;
    products(paginationArgs: PaginationArgs): Promise<ProductPage>;
    createProduct(newProductData: NewProductInput): Promise<Product>;
}
