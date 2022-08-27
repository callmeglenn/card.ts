import Card from './Card';
import Data from './Data';
import DataRead from './DataRead';
declare class Series {
    name: string;
    cards: Map<string, Card>;
    constructor(name: string);
    set(...cards: Array<Card>): this;
    create(name: string): Data;
    get(id: string): DataRead | null;
}
export default Series;
