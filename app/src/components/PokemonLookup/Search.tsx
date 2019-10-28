import { Component, Vue, Prop } from 'vue-property-decorator';
import { EventBus } from '@/utils/eventbus';

@Component
export default class Search extends Vue {

  private filters: string[];

  private created() {
    EventBus.$on('headerClick', (header: string) => {
      // @ts-ignore
      const input = this.$el.querySelector('.add-tag') as HTMLInputElement
      if (input) {
        input.value = header
        input.focus()
      }
    })
  }

  private addFilter(evt: Event) {
    // @ts-ignore
    const filter = evt.target.value
    this.$store.dispatch('ADDFILTER', filter)
    // @ts-ignore
    evt.target.value = ''
  }

  private removeFilter(filter: string) {
    this.$store.dispatch('REMOVEFILTER', filter)
  }

  private render(h: any): any {

    const filters: string[] = this.$store.getters.GETFILTERS

    const tags = filters.map((filter:string) => {
      return (<span class='tag' onClick={this.removeFilter.bind(this, filter)}>{`${filter} ×`}</span>)
    })

    return (
      <div>
        <div>
          <input type='text' autocomplete='off' class='add-tag' onChange={this.addFilter.bind(this)}></input>
          <div class='search-tag'>
            {tags}
          </div>
        </div>
      </div>
    );
  }
}
