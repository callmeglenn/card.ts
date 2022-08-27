"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Series {
    constructor(name) {
        this.name = name;
        this.cards = new Map();
    }
    set(...cards) {
        this.cards = new Map(cards.map(c => [c.name, c]));
        return this;
    }
    create(name) {
        const card = this.cards.get(name);
        if (!card)
            throw Error(`There is no card with the name: ${name}`);
        return card.create();
    }
    get(id) {
        let result = null;
        for (const card of [...this.cards.values()]) {
            const data = card.get(id);
            if (data) {
                data.series = this.name;
                result = data;
                break;
            }
        }
        return result;
    }
}
exports.default = Series;
//# sourceMappingURL=Series.js.map