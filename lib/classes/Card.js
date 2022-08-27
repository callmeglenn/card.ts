"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Data_1 = require("./Data");
const DataRead_1 = require("./DataRead");
class Card {
    constructor(params) {
        var _a;
        this.name = params.name;
        this.collection = (_a = params === null || params === void 0 ? void 0 : params.collection) !== null && _a !== void 0 ? _a : new Map();
    }
    set(...cards) {
        this.collection = new Map(cards.map(c => [c.id, c]));
        return this;
    }
    create() {
        const card = new Data_1.default().create();
        this.collection.set(card.id, card);
        return card;
    }
    get(id) {
        var _a;
        let result = null;
        const _data = (_a = this.collection.get(id)) !== null && _a !== void 0 ? _a : null;
        if (_data) {
            const data = new DataRead_1.default(_data);
            data.name = this.name;
            data.print = [...this.collection.keys()].indexOf(id) + 1;
            result = data;
        }
        return result;
    }
}
exports.default = Card;
//# sourceMappingURL=Card.js.map