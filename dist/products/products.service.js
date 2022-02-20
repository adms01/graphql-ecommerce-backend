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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const product_entity_1 = require("../typeorm_entity_defs/product.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let ProductsService = class ProductsService {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    async save(product) {
        return this.productRepository.save(product);
    }
    async findOneById(id) {
        const product = await this.productRepository.findOne(id);
        if (!product) {
            throw new common_1.HttpException(`Product with id: ${id} not found`, common_1.HttpStatus.NOT_FOUND);
        }
        return product;
    }
    async deleteProductById(id) {
        try {
            const product = await this.findOneById(id);
            await this.productRepository.remove(product);
            return true;
        }
        catch (err) {
            return false;
        }
    }
    async createProduct(createProductInput) {
        const newProduct = new product_entity_1.Product();
        newProduct.name = createProductInput.name;
        newProduct.description = createProductInput.description;
        newProduct.price = createProductInput.price;
        newProduct.images = createProductInput.images[0];
        return await this.save(newProduct);
    }
    async findAll(paginationArgs) {
        var _a;
        const [results, total] = await this.productRepository.findAndCount({
            order: { createdAt: `${(_a = paginationArgs.order) !== null && _a !== void 0 ? _a : 'DESC'}` },
            take: paginationArgs.take,
            skip: paginationArgs.skip,
        });
        return {
            nodes: results,
            totalRows: total,
        };
    }
};
ProductsService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProductsService);
exports.ProductsService = ProductsService;
//# sourceMappingURL=products.service.js.map