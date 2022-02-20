"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configSchema = void 0;
const Joi = require("joi");
const config_database_1 = require("./config.database");
exports.configSchema = Joi.object(Object.assign({}, config_database_1.DatabaseConfigSchema));
//# sourceMappingURL=config.schema.js.map