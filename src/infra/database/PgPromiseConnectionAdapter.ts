import Connection from "./Connection";
import pgp from "pg-promise";

export default class PgPromiseConnectionAdapter implements Connection {
  pgp: any;
  constructor() {
    this.pgp = pgp()("postgres://postgres:root@localhost:5432/cccat4");
  }
  async query(statement: string, params: any[]): Promise<any> {
    return this.pgp.query(statement, params);
  }
}
