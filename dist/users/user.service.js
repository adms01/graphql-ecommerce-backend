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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../typeorm_entity_defs/user.entity");
const typeorm_2 = require("typeorm");
const bcryptjs_1 = require("bcryptjs");
const jwt = require("jsonwebtoken");
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async hashPw(password) {
        return await bcryptjs_1.hash(password, 12);
    }
    async save(user) {
        return this.userRepository.save(user);
    }
    async createUser(createUserInput) {
        const hashedPw = await this.hashPw(createUserInput.password);
        const newUser = new user_entity_1.User();
        newUser.firstName = createUserInput.firstName;
        newUser.lastName = createUserInput.lastName;
        newUser.email = createUserInput.email;
        newUser.password = hashedPw;
        return await this.save(newUser);
    }
    async login(email, password) {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            throw new common_1.HttpException('We cannot find an account with that e-mail address', common_1.HttpStatus.NOT_FOUND);
        }
        const valid = await bcryptjs_1.compare(password, user.password);
        if (!valid) {
            throw new common_1.HttpException('Your password is incorrect', common_1.HttpStatus.FORBIDDEN);
        }
        const payload = { id: user.id, email: user.email };
        const token = jwt.sign(Object.assign({}, payload), process.env.LOGIN_PRIVATE_KEY, { expiresIn: '2h' });
        return {
            accessToken: `Bearer ${token}`,
            user: user,
        };
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map