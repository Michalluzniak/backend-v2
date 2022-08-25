import { Injectable } from '@nestjs/common';

@Injectable()
export class RefreshTokensPersistence {
  private readonly tokens = new Set<string>();

  create(tokenId: string) {
    this.tokens.add(tokenId);
  }

  exists(tokenId: string): boolean {
    return this.tokens.has(tokenId);
  }

  destroy(tokenId: string) {
    this.tokens.delete(tokenId);
  }
}
