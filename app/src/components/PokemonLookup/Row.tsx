import { Component, Vue, Prop } from 'vue-property-decorator';

export interface IRow {
  id: number,
  name: string,
  nature: string,
  held: string,
  move: string[],
  ev: string,
}

@Component
export default class Row extends Vue {
  @Prop() data: IRow;

  private render(h: any): any {
    return (
      <tr>
        <td>{this.data.id}</td>
        <td>{this.data.name}</td>
        <td>{this.data.nature}</td>
        <td>{this.data.held}</td>
        <td>{this.data.move[0]}</td>
        <td>{this.data.move[1]}</td>
        <td>{this.data.move[2]}</td>
        <td>{this.data.move[3]}</td>
        <td>{this.data.ev}</td>
      </tr>
    );
  }
}
