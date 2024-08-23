import { Injectable } from '@nestjs/common';

@Injectable()
export class FormatPagingService {
  skip: number;

  formatPaging(take: number, page: number) {
    if (page == 0) {
      page = 1;
    }
    this.skip = (page - 1) * take;
  }
}
