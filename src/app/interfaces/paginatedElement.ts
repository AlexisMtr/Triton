export interface PaginatedElement<T>
{
    pageCount: number;
    totalElementCount: number;
    elements: T[];
}