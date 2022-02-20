import { CreateProductInput } from './dto/input/create-product.input';
import { Product } from '../typeorm_entity_defs/product.entity';
import { ProductsService } from './products.service';
import { ProductPage } from './models/productPage.model';
import { PaginationArgs } from '../common/pagination.args';
import { DeleteProductInput } from './dto/input/delete-product.input';
export declare class ProductsResolver {
    private productsService;
    constructor(productsService: ProductsService);
    getSingleProduct(id: string): Promise<Product>;
    getProducts(paginationArgs: PaginationArgs): Promise<ProductPage>;
    deleteProduct({ id }: DeleteProductInput): Promise<Boolean>;
    createProduct(createProductInput: CreateProductInput): Promise<Product>;
}
