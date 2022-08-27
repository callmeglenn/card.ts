"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
}
exports.default = Collection;
//# sourceMappingURL=Collection.js.map