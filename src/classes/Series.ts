import Card from './Card';
import Data from './Data';
import DataRead from './DataRead';
class Series {
	public name: string
	public cards: Map<string, Card>
	constructor(name: string) {
		this.name = name
		this.cards = new Map()
	}
	set(...cards: Array<Card>): this {
		this.cards = new Map(cards.map(c => [c.name, c]))
		return this
	}
	create(name: string): Data {
		const card = this.cards.get(name)
		if (!card) throw Error(`There is no card with the name: ${name}`)
		return card.create()
	}
	get(id: string): DataRead | null {
		let result: DataRead | null = null
		for (const card of [...this.cards.values()]) {
			const data = card.get(id)
			if (data) {
				data.series = this.name
				result = data
				break
			}
		}
		return result
	}
}
export default Series