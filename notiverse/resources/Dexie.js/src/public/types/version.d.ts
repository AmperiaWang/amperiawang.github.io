import { Transaction } from "./transaction";

export interface Version {
  stores(schema: { [tableName: string]: string | null }): Version;
  upgrade(fn: (trans: Transaction) => void): Version;
}
