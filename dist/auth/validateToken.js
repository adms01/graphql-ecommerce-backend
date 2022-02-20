"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = void 0;
const common_1 = require("@nestjs/common");
const jwt = require("jsonwebtoken");
const validateToken = async (auth) => {
    if (auth.split(' ')[0] !== 'Bearer') {
        throw new common_1.HttpException('Invalid token', common_1.HttpStatus.UNAUTHORIZED);
    }
    const token = auth.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.LOGIN_PRIVATE_KEY);
        return decoded;
    }
    catch (err) {
        const message = 'Token error: ' + (err.message || err.name);
        throw new common_1.HttpException(message, common_1.HttpStatus.UNAUTHORIZED);
    }
};
exports.validateToken = validateToken;
//# sourceMappingURL=validateToken.js.map