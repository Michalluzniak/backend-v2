export declare class RefreshTokensPersistence {
    private readonly tokens;
    create(tokenId: string): void;
    exists(tokenId: string): boolean;
    destroy(tokenId: string): void;
}
