"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const short_unique_id_1 = __importDefault(require("short-unique-id"));
const uuid = new short_unique_id_1.default({ length: 5 });
uuid.setDictionary('alphanum_lower');
class Data {
    constructor(params) {
        var _a;
        this.id = (_a = params === null || params === void 0 ? void 0 : params.id) !== null && _a !== void 0 ? _a : null;
    }
    create() {
        this.id = uuid();
        return this;
    }
}
exports.default = Data;
//# sourceMappingURL=Data.js.map