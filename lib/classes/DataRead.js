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
Object.defineProperty(exports, "__esModule", { value: true });
const canvas_1 = require("@napi-rs/canvas");
const Data_1 = require("./Data");
class DataRead extends Data_1.default {
    constructor(Data) {
        super();
        for (const property in Data)
            this[property] = Data[property];
    }
    image() {
        return __awaiter(this, void 0, void 0, function* () {
            const canvas = (0, canvas_1.createCanvas)(300, 450);
            const ctx = canvas.getContext("2d");
            yield this.drawCard(ctx, 0, 0);
            return yield canvas.encode('png');
        });
    }
    drawCard(ctx, x, y) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.drawCharacter(ctx, x, y);
            yield this.drawFrame(ctx, x, y);
            this.write(ctx, x, 232, y, 360, String(this.print), "arial", 13, "#ffffff");
            this.write(ctx, x, 150, y, 33, this.name, "arial", 40, "#ffffff");
            this.write(ctx, x, 150, y, 417, this.series, "arial", 40, "#ffffff");
        });
    }
    drawCharacter(ctx, x, y) {
        return __awaiter(this, void 0, void 0, function* () {
            const character = yield (0, canvas_1.loadImage)(`./images/characters/${this.name}.png`);
            ctx.drawImage(character, x, y, 300, 450);
        });
    }
    drawFrame(ctx, x, y) {
        return __awaiter(this, void 0, void 0, function* () {
            const frame = yield (0, canvas_1.loadImage)(`./images/frames/frame.png`);
            ctx.drawImage(frame, x, y, 300, 450);
        });
    }
    write(ctx, x, xOff, y, yOff, text, font, size, color) {
        return __awaiter(this, void 0, void 0, function* () {
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = color;
            const { width: maxWidth } = ctx.measureText("MMMMMM");
            size = this.getPixelFit(ctx, text, font, size, maxWidth);
            ctx.font = `${size}px ${font}`;
            if (ctx.measureText(text).width > maxWidth + 10)
                this.wrapText(ctx, text, x + xOff, y + yOff);
            else
                ctx.fillText(text, x + xOff, y + yOff);
        });
    }
    getPixelFit(ctx, text, font, size, maxWidth) {
        const minSize = size - 20;
        ctx.font = `${size}px ${font}`;
        let { width } = ctx.measureText(text);
        while (width > maxWidth) {
            size--;
            ctx.font = `${size}px ${font}`;
            width = ctx.measureText(text).width;
            if (size == minSize)
                return minSize;
        }
        return size;
    }
    wrapText(ctx, text, x, y) {
        const texts = text.split(' ');
        const div = Math.floor(texts.length / 2);
        const top = texts.slice(0, div).join(' ');
        const bottom = texts.slice(div, texts.length).join(' ');
        ctx.fillText(top, x, y, y - 12);
        ctx.fillText(bottom, x, y + 12);
    }
}
exports.default = DataRead;
//# sourceMappingURL=DataRead.js.map