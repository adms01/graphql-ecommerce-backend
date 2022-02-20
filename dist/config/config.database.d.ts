import * as Joi from 'joi';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
export declare const DatabaseConfigSchema: {
    DATABASE_HOST: Joi.StringSchema;
    DATABASE_PORT: Joi.NumberSchema;
    DATABASE_SCHEMA: Joi.StringSchema;
    DATABASE_USER: Joi.StringSchema;
    DATABASE_PASSWORD: Joi.StringSchema;
    DATABASE_ENTITY_DIR: Joi.StringSchema;
};
export declare class DatabaseConfigService {
    private readonly configService;
    constructor(configService: ConfigService<typeof DatabaseConfigSchema>);
    get configuration(): TypeOrmModuleOptions;
}
