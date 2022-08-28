"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const random_1 = require("random");
class Collection {
    constructor(...series) {
        this.series = new Map(series.map(s => [s.name, s]));
    }
    create(series, card) {
        const _series = this.series.get(series);
        if (!_series)
            throw Error(`There is no series with the name: ${series}`);
        const { id } = _series.create(card);
        const data = this.get(id);
        return data;
    }
    get(id) {
        let result = null;
        for (const series of [...this.series.values()]) {
            const data = series.get(id);
            if (data) {
                result = data;
                break;
            }
        }
        return result;
    }
    /** Retrieve newly created card(s) by random */
    random(number) {
        const result = [];
        const seriesNames = [...this.series.keys()];
        while (result.length < number) {
            const series = seriesNames[random_1.default.int(0, seriesNames.length - 1)];
            const cardNames = [...this.series.get(series).cards.keys()].filter(name => !result.map(c => c.name).includes(name));
            if (!cardNames.length)
                throw Error("Not enough cards in the collection.");
            const card = cardNames[random_1.default.int(0, cardNames.length - 1)];
            result.push(this.create(series, card));
        }
        return result.length > 1 ? result : result[0];
    }
}
exports.default = Collection;
//# sourceMappingURL=Collection.js.map