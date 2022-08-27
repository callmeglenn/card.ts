import shortUniqueId from 'short-unique-id'
import { DataParam } from '../typings/types'
const uuid = new shortUniqueId({ length: 5 })
uuid.setDictionary('alphanum_lower')
class Data {
	public id: string | null
	constructor(params?: DataParam) {
		this.id = params?.id ?? null
	}
	create(): this {
		this.id = uuid()
		return this
	}
}
export default Data
