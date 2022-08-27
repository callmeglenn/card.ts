import { CardParam } from '../typings/types'
import Data from './Data'
import DataRead from './DataRead';
class Card {
	public name: string
	public collection: Map<string, Data>
	constructor(params: CardParam) {
		this.name = params.name
		this.collection = params?.collection ?? new Map()
	}
	set(...cards: Array<Data>): this {
		this.collection = new Map(cards.map(c => [c.id as string, c]))
		return this
	}
	create(): Data {
		const card = new Data().create()
		this.collection.set(card.id as string, card)
		return card
	}
	get(id: string): DataRead | null {
		let result: DataRead | null = null
		const _data = this.collection.get(id) ?? null
		if (_data) {
			const data = new DataRead(_data)
			data.name = this.name
			data.print = [...this.collection.keys()].indexOf(id) + 1
			result = data
		}	
		return result
	}
}
export default Card