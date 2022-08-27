import { CardParam } from '../typings/types';
import Data from './Data';
import DataRead from './DataRead';
declare class Card {
    name: string;
    collection: Map<string, Data>;
    constructor(params: CardParam);
    set(...cards: Array<Data>): this;
    create(): Data;
    get(id: string): DataRead | null;
}
export default Card;
