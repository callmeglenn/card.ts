"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const canvas_1 = require("@napi-rs/canvas");
const Data_1 = __importDefault(require("./Data"));
class DataRead extends Data_1.default {
    constructor(Data) {
        super();
        this.canvas = (0, canvas_1.createCanvas)(300, 450);
        this.ctx = this.canvas.getContext("2d");
        for (const property in Data)
            this[property] = Data[property];
    }
    image() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.drawCard();
            return this.canvas;
        });
    }
    drawCard() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.drawCharacter();
            yield this.drawFrame();
            this.write(232, 360, String(this.print), "arial", 13, "#ffffff");
            this.write(150, 35, this.name, "arial", 40, "#ffffff");
            this.write(150, 417, this.series, "arial", 40, "#ffffff");
        });
    }
    drawCharacter() {
        return __awaiter(this, void 0, void 0, function* () {
            const character = yield (0, canvas_1.loadImage)(`./images/characters/${this.name}.png`);
            this.ctx.drawImage(character, 0, 0, this.canvas.width, this.canvas.height);
        });
    }
    drawFrame() {
        return __awaiter(this, void 0, void 0, function* () {
            const frame = yield (0, canvas_1.loadImage)(`./images/frames/frame.png`);
            this.ctx.drawImage(frame, 0, 0, this.canvas.width, this.canvas.height);
        });
    }
    write(x, y, text, font, size, color) {
        return __awaiter(this, void 0, void 0, function* () {
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillStyle = color;
            const { width: maxWidth } = this.ctx.measureText("MMMMMM");
            size = this.getPixelFit(text, font, size, maxWidth);
            this.ctx.font = `${size}px ${font}`;
            if (this.ctx.measureText(text).width > maxWidth + 10)
                this.wrapText(text, x, y);
            else
                this.ctx.fillText(text, x, y);
        });
    }
    getPixelFit(text, font, size, maxWidth) {
        const minSize = size - 15;
        this.ctx.font = `${size}px ${font}`;
        let { width } = this.ctx.measureText(text);
        while (width > maxWidth) {
            size--;
            this.ctx.font = `${size}px ${font}`;
            width = this.ctx.measureText(text).width;
            if (size == minSize)
                return minSize;
        }
        return size;
    }
    wrapText(text, x, y) {
        const texts = text.split(' ');
        const div = Math.floor(texts.length / 2);
        const top = texts.slice(0, div).join(' ');
        const bottom = texts.slice(div, texts.length).join(' ');
        this.ctx.fillText(top, x, y - 13);
        this.ctx.fillText(bottom, x, y + 13);
    }
}
exports.default = DataRead;
//# sourceMappingURL=DataRead.js.map