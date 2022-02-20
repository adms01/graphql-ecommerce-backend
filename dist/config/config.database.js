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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseConfigService = exports.DatabaseConfigSchema = void 0;
const Joi = require("joi");
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
exports.DatabaseConfigSchema = {
    DATABASE_HOST: Joi.string().hostname(),
    DATABASE_PORT: Joi.number().port(),
    DATABASE_SCHEMA: Joi.string(),
    DATABASE_USER: Joi.string(),
    DATABASE_PASSWORD: Joi.string(),
    DATABASE_ENTITY_DIR: Joi.string(),
};
let DatabaseConfigService = class DatabaseConfigService {
    constructor(configService) {
        this.configService = configService;
    }
    get configuration() {
        return {
            type: 'postgres',
            host: this.configService.get('DATABASE_HOST'),
            port: this.configService.get('DATABASE_PORT'),
            database: this.configService.get('DATABASE_SCHEMA'),
            username: this.configService.get('DATABASE_USER'),
            password: this.configService.get('DATABASE_PASSWORD'),
            entities: [this.configService.get('DATABASE_ENTITY_DIR')],
            autoLoadEntities: true,
            logging: true,
            synchronize: true,
        };
    }
};
DatabaseConfigService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], DatabaseConfigService);
exports.DatabaseConfigService = DatabaseConfigService;
//# sourceMappingURL=config.database.js.map