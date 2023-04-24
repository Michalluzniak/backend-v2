"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const package_json_1 = require("../package.json");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: true });
    const config = new swagger_1.DocumentBuilder()
        .setTitle(package_json_1.name)
        .setDescription(package_json_1.description)
        .setVersion(package_json_1.version)
        .addSecurity('User Credentials', { type: 'http', scheme: 'basic' })
        .addSecurity('Access Token', { type: 'http', scheme: 'bearer' })
        .addSecurity('Refresh Token', { type: 'http', scheme: 'bearer' })
        .build();
    swagger_1.SwaggerModule.setup('/docs', app, swagger_1.SwaggerModule.createDocument(app, config));
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        forbidUnknownValues: true,
        transform: true,
    }));
    await app.listen(process.env.PORT || 8000);
}
bootstrap();
//# sourceMappingURL=main.js.map