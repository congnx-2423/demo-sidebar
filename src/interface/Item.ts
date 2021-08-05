export default interface Item {
    id: Number,
    name: string,
    children?: Item[] | undefined,
    marked: boolean,
}
