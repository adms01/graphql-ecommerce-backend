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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const input_1 = require("./input");
const product_entity_1 = require("../typeorm_entity_defs/product.entity");
const products_service_1 = require("./products.service");
const productPage_model_1 = require("./productPage.model");
const pagination_args_1 = require("../common/pagination.args");
let ProductsResolver = class ProductsResolver {
    constructor(productsService) {
        this.productsService = productsService;
    }
    async getSingleProduct(id) {
        const product = await this.productsService.findOneById(id);
        return product;
    }
    async getProducts(paginationArgs) {
        return await this.productsService.findAll(paginationArgs);
    }
    async createProduct(createProductInput) {
        return await this.productsService.createProduct(createProductInput);
    }
    async deleteProduct(id) {
        return await this.productsService.deleteProductById(id);
    }
};
__decorate([
    graphql_1.Query(() => product_entity_1.Product),
    __param(0, graphql_1.Args('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsResolver.prototype, "getSingleProduct", null);
__decorate([
    graphql_1.Query(() => productPage_model_1.ProductPage),
    __param(0, graphql_1.Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof pagination_args_1.PaginationArgs !== "undefined" && pagination_args_1.PaginationArgs) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], ProductsResolver.prototype, "getProducts", null);
__decorate([
    graphql_1.Mutation(() => product_entity_1.Product),
    __param(0, graphql_1.Args('createProductInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [input_1.CreateProductInput]),
    __metadata("design:returntype", Promise)
], ProductsResolver.prototype, "createProduct", null);
__decorate([
    graphql_1.Mutation(() => product_entity_1.Product),
    __param(0, graphql_1.Args('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsResolver.prototype, "deleteProduct", null);
ProductsResolver = __decorate([
    graphql_1.Resolver(() => product_entity_1.Product),
    __metadata("design:paramtypes", [products_service_1.ProductsService])
], ProductsResolver);
exports.ProductsResolver = ProductsResolver;
//# sourceMappingURL=products.resolver.js.map