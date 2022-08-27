import Series from './Series';
import DataRead from './DataRead';
declare class Collection {
    series: Map<string, Series>;
    constructor(...series: Array<Series>);
    create(series: string, card: string): DataRead;
    get(id: string): DataRead | null;
}
export default Collection;
