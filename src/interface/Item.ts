export default interface Item {
    name: string,
    children?: Item[],
    marked: boolean,
}
