import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../typeorm_entity_defs/product.entity';
import { ProductsService } from './products.service';

const testId = '1bbfd9af-49ff-4715-96e4-11b252025f3b';

// const productArray = [new Product('Amazon', 'desc', 2.0, 'http://image.com')];
const oneProduct = new Product('Keyboard', 'desc', 120.99, 'http');

describe('Product Service', () => {
  let service: ProductsService;
  let repo: Repository<Product>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useValue: {
            // findAndCount: jest.fn().mockResolvedValue(productArray),
            findOne: jest.fn().mockResolvedValue(oneProduct),
            // create: jest.fn().mockReturnValue(oneProduct),
            save: jest.fn(),
            remove: jest.fn().mockReturnValue(true),
           
          },
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    repo = module.get<Repository<Product>>(getRepositoryToken(Product));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOneById', () => {
    it('should return productId', () => {
      const repoSpy = jest.spyOn(repo, 'findOne');
      expect(service.findOneById(testId)).resolves.toEqual(oneProduct);
      expect(repoSpy).toBeCalledWith(testId);
    });
  });

  describe('deleteProductById', () => {
    it('should delete product by id and return true', () => {
      const repoSpy = jest.spyOn(repo, 'remove');
      expect(service.deleteProductById(testId)).resolves.toEqual(true);
      expect(repoSpy).toBeTruthy;
    });

    //Edge case required
  });

  // describe('Create product', () => {
  //   it('should successfully insert a product', () => {
  //     expect(
  //       service.createProduct({
  //         name: 'Keyboard',
  //         description: 'desc',
  //         price: 120.99,
  //         images: ['http'],
  //       }),
  //     ).resolves.toEqual(oneProduct);
  //     expect(repo.create).toBeCalledTimes(1);
  //     expect(repo.create).toBeCalledWith({
  //       name: 'Keyboard',
  //       description: 'desc',
  //       price: 120.99,
  //       images: ['http'],
  //     });
  //     expect(repo.save).toBeCalledTimes(1);
  //   });
  // });
});
