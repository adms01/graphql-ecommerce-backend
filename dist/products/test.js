"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const typeorm_1 = require("@nestjs/typeorm");
const cat_entity_1 = require("./cat.entity");
const cat_service_1 = require("./cat.service");
const testCat1 = 'Test Cat 1';
const testBreed1 = 'Test Breed 1';
const catArray = [new cat_entity_1.Cat(testCat1, testBreed1, 4), new cat_entity_1.Cat('Test Cat 2', 'Test Breed 2', 3), new cat_entity_1.Cat('Test Cat 3', 'Test Breed 3', 2)];
const oneCat = new cat_entity_1.Cat(testCat1, testBreed1, 4);
describe('CatService', () => {
    let service;
    let repo;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                cat_service_1.CatService,
                {
                    provide: typeorm_1.getRepositoryToken(cat_entity_1.Cat),
                    useValue: {
                        find: jest.fn().mockResolvedValue(catArray),
                        findOneOrFail: jest.fn().mockResolvedValue(oneCat),
                        create: jest.fn().mockReturnValue(oneCat),
                        save: jest.fn(),
                        update: jest.fn().mockResolvedValue(true),
                        delete: jest.fn().mockResolvedValue(true),
                    },
                },
            ],
        }).compile();
        service = module.get(cat_service_1.CatService);
        repo = module.get(typeorm_1.getRepositoryToken(cat_entity_1.Cat));
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    describe('getAll', () => {
        it('should return an array of cats', async () => {
            const cats = await service.getAll();
            expect(cats).toEqual(catArray);
        });
    });
    describe('getOne', () => {
        it('should get a single cat', () => {
            const repoSpy = jest.spyOn(repo, 'findOneOrFail');
            expect(service.getOne('a uuid')).resolves.toEqual(oneCat);
            expect(repoSpy).toBeCalledWith({ id: 'a uuid' });
        });
    });
    describe('getOneByName', () => {
        it('should get one cat', () => {
            const repoSpy = jest.spyOn(repo, 'findOneOrFail');
            expect(service.getOneByName(testCat1)).resolves.toEqual(oneCat);
            expect(repoSpy).toBeCalledWith({ name: testCat1 });
        });
    });
    describe('insertOne', () => {
        it('should successfully insert a cat', () => {
            expect(service.insertOne({
                name: testCat1,
                breed: testBreed1,
                age: 4,
            })).resolves.toEqual(oneCat);
            expect(repo.create).toBeCalledTimes(1);
            expect(repo.create).toBeCalledWith({
                name: testCat1,
                breed: testBreed1,
                age: 4,
            });
            expect(repo.save).toBeCalledTimes(1);
        });
    });
    describe('updateOne', () => {
        it('should call the update method', async () => {
            const cat = await service.updateOne({
                name: testCat1,
                breed: testBreed1,
                age: 4,
                id: 'a uuid',
            });
            expect(cat).toEqual(oneCat);
            expect(repo.update).toBeCalledTimes(1);
            expect(repo.update).toBeCalledWith({ id: 'a uuid' }, { name: testCat1, breed: testBreed1, age: 4, id: 'a uuid' });
        });
    });
    describe('deleteOne', () => {
        it('should return {deleted: true}', () => {
            expect(service.deleteOne('a uuid')).resolves.toEqual({ deleted: true });
        });
        it('should return {deleted: false, message: err.message}', () => {
            const repoSpy = jest.spyOn(repo, 'delete').mockRejectedValueOnce(new Error('Bad Delete Method.'));
            expect(service.deleteOne('a bad uuid')).resolves.toEqual({
                deleted: false,
                message: 'Bad Delete Method.',
            });
            expect(repoSpy).toBeCalledWith({ id: 'a bad uuid' });
            expect(repoSpy).toBeCalledTimes(1);
        });
    });
});
//# sourceMappingURL=test.js.map