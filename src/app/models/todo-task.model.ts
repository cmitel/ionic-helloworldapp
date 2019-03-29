export class TodoTask {

  // the full content typed by the user
  private content: String;

  // the creation date of the todo task
  private createDate: Date;

  constructor(
    content: String = '',
    createDate: Date = new Date()
  ) {
    this.content = content;
    this.createDate = createDate;
  }

  /**
   * createDate getter
   */
  public getDate(): Date {
    return this.createDate;
  }

  /**
   * Returns the full todo task content to display
   */
  public toString(): String {
    return this.content;
  }

  /**
   * Returns a preview of the todo task content
   */
  public toExcerpt(): String {
    return this.content.substr(0, 15);
  }

}
