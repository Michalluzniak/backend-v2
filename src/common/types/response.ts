import { ApiProperty } from '@nestjs/swagger';

export class Pagination {
  @ApiProperty({ format: 'int' })
  readonly totalResults: number;
  @ApiProperty({ format: 'int' })
  readonly totalPages: number;
  @ApiProperty({ format: 'int' })
  readonly currentPage: number;
  @ApiProperty({ format: 'int' })
  readonly resultsPerPage: number;
  @ApiProperty({ format: 'int', nullable: true })
  readonly nextPage: number | null;
  @ApiProperty({ format: 'int', nullable: true })
  readonly previousPage: number | null;

  constructor(model: Pagination) {
    this.totalResults = model.totalResults;
    this.totalPages = model.totalPages;
    this.currentPage = model.currentPage;
    this.resultsPerPage = model.resultsPerPage;
    this.nextPage = model.nextPage;
    this.previousPage = model.previousPage;
  }

  static ofTotalResults(options: { totalResults: number; page?: number; resultsPerPage?: number }) {
    const resultsPerPage = options.resultsPerPage || options.totalResults || 1;
    const totalPages = Math.ceil(options.totalResults / resultsPerPage) || 1;
    const currentPage = options.page > totalPages ? totalPages : options.page < 1 ? 1 : options.page || 1;

    return new Pagination({
      totalResults: options.totalResults,
      totalPages: totalPages,
      currentPage: currentPage,
      resultsPerPage: resultsPerPage,
      nextPage: currentPage < totalPages ? currentPage + 1 : null,
      previousPage: currentPage > 1 ? currentPage - 1 : null,
    });
  }

  static calculateOffset(options: { page?: number; resultsPerPage?: number }): {
    offset?: number;
    limit?: number;
  } {
    const currentPage = options.page < 1 ? 1 : options.page || 1;

    if (!options.resultsPerPage) {
      return { offset: 0, limit: undefined };
    }

    return {
      offset: (currentPage - 1) * options.resultsPerPage,
      limit: options.resultsPerPage,
    };
  }
}

export class SuccessResponse<T> {
  constructor(readonly data: T) {}
}

export class SuccessResponsePaginated<T> extends SuccessResponse<T> {
  readonly pagination: Pagination;

  constructor(data: T, pagination: Pagination) {
    super(data);

    this.pagination = pagination;
  }
}
