"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const PORT = process.env.PORT || 8080;
app_1.default.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    console.log(`📊 Health check disponible en http://localhost:${PORT}/health`);
    console.log(`👥 API de usuarios disponible en http://localhost:${PORT}/users`);
});
//# sourceMappingURL=server.js.map