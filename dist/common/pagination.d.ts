import { Type } from '@nestjs/common';
interface IEdgeType<T> {
    cursor: string;
    node: T;
}
export interface IPaginatedType<T> {
    edges: IEdgeType<T>[];
    nodes: T[];
    totalCount: number;
    hasNextPage: boolean;
}
export declare function Paginated<T>(classRef: Type<T>): Type<IPaginatedType<T>>;
export {};
