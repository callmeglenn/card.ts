import Series from './Series';
import DataRead from './DataRead';
declare class Collection {
    series: Map<string, Series>;
    constructor(...series: Array<Series>);
    create(series: string, card: string): DataRead;
    get(id: string): DataRead | null;
    /** Retrieve newly created card(s) by random */
    random(number: number): DataRead | Array<DataRead>;
}
export default Collection;
