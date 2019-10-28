import { Component, Vue } from 'vue-property-decorator'
import DefaultLayout from '@/components/Layouts/Default'
import Row, { IRow } from '@/components/PokemonLookup/Row'
import Search from '@/components/PokemonLookup/Search'
import { EventBus } from '@/utils/eventbus'


@Component
export default class Home extends Vue {
  private docId = '1DMR-tndc0n6b4chuuk8rMLOSlen7JULcYRSsUxcyQds'
  private rows: String[][] = []

  private mounted() {
    // @ts-ignore
    this.$getGapiClient().then(gapi => {
      gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: this.docId,
        range: 'A2:I'
      }).then( (res: object) => {
        // @ts-ignore
        this.rows = res.result.values
      })
    })
  }

  private headerFill(header: string) {
    EventBus.$emit('headerClick', `${header}:`)
  }

  private render(h: any) {
    let toRender: JSX.Element[] = []

    const renderRows = this.rows.map( (row) => {
      // @ts-ignore
      return {
        id: row[0],
        name: row[1],
        nature: row[2],
        held: row[3],
        move: [row[4], row[5], row[6], row[7]],
        ev: row[8],
      } as IRow
    }).filter((row) => {
      const filters: string[] = this.$store.getters.GETFILTERS

      if (filters.length === 0) { return false } 

      const found = filters.map( (filter: string) => {
        const parts = filter.split(':')
        const col = parts[0].trim()
        const search = parts[1].trim().toLowerCase()

        // @ts-ignore
        if (_.isArray(row[col])) {
          // @ts-ignore
          const idx = row[col].findIndex( (move) => move.toLowerCase().includes(search) )
          return idx > -1
        } else { 
          // @ts-ignore
          return row[col].toLowerCase().includes(search)
        }
      })
      // OR intersection
      //return found.includes(true)
      
      // AND intersection
      const andResult = found.filter((r) => { return r }).length === filters.length
      return andResult

    }).map( (row) => {
      return (<Row data={row}></Row>)
    })

    if (renderRows.length) {
      toRender = renderRows
    } else {
      toRender.push( 
        <tr>
          <td colspan='9' style='text-align:center;'>Add a filter to start finding your Pokemon</td>
        </tr> 
      )
    }

    return (
      <DefaultLayout>
        <div slot='navigation'>
          <Search></Search>
        </div>
        <div>
          <table>
            <tr>
              <th onClick={this.headerFill.bind(this, 'id')}>id</th>
              <th onClick={this.headerFill.bind(this, 'name')}>name</th>
              <th onClick={this.headerFill.bind(this, 'nature')}>nature</th>
              <th onClick={this.headerFill.bind(this, 'held')}>held</th>
              <th onClick={this.headerFill.bind(this, 'move')}>move</th>
              <th onClick={this.headerFill.bind(this, 'move')}>move</th>
              <th onClick={this.headerFill.bind(this, 'move')}>move</th>
              <th onClick={this.headerFill.bind(this, 'move')}>move</th>
              <th onClick={this.headerFill.bind(this, 'ev')}>ev</th>
            </tr>
            {toRender}
          </table>
        </div>
      </DefaultLayout>
    );
  }
}
