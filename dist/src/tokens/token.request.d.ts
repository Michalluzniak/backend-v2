export declare enum TokenRequestStrategy {
    refreshToken = "refreshToken",
    userCredentials = "userCredentials"
}
export declare class TokenRequest {
    readonly strategy: TokenRequestStrategy;
}
