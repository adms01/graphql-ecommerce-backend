"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const newProduct_input_1 = require("./newProduct.input");
const product_entity_1 = require("./product.entity");
const products_service_1 = require("./products.service");
const productPage_model_1 = require("./productPage.model");
const pagination_args_1 = require("../common/pagination.args");
let ProductsResolver = class ProductsResolver {
    constructor(productsService) {
        this.productsService = productsService;
    }
    async product(id) {
        const product = await this.productsService.findOneById(id);
        if (product) {
            throw new common_1.NotFoundException(id);
        }
        return product;
    }
    async products(paginationArgs) {
        return await this.productsService.findAll(paginationArgs);
    }
    async createProduct(newProductData) {
        const newProduct = new product_entity_1.Product();
        newProduct.name = newProductData.name;
        newProduct.description = newProductData.description;
        newProduct.price = newProductData.price;
        newProduct.images = newProductData.images[0];
        return await this.productsService.save(newProduct);
    }
};
__decorate([
    graphql_1.Query(() => product_entity_1.Product),
    __param(0, graphql_1.Args('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsResolver.prototype, "product", null);
__decorate([
    graphql_1.Query(() => productPage_model_1.ProductPage),
    __param(0, graphql_1.Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_args_1.PaginationArgs]),
    __metadata("design:returntype", Promise)
], ProductsResolver.prototype, "products", null);
__decorate([
    graphql_1.Mutation(() => product_entity_1.Product),
    __param(0, graphql_1.Args('newProductData')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [newProduct_input_1.NewProductInput]),
    __metadata("design:returntype", Promise)
], ProductsResolver.prototype, "createProduct", null);
ProductsResolver = __decorate([
    graphql_1.Resolver(() => product_entity_1.Product),
    __metadata("design:paramtypes", [products_service_1.ProductsService])
], ProductsResolver);
exports.ProductsResolver = ProductsResolver;
//# sourceMappingURL=products.controller.js.map