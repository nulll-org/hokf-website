export class Query {
  constructor(query, id) {
    this.id = id;
    this.name = query.name;
    this.message = query.message;
    this.email = query.email;
  }
}