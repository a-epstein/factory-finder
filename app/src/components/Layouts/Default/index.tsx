import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class DefaultLayout extends Vue {
  constructor(props: any) {
    super(props);
  }
  private hasSlot(slotName: string) {
    if (typeof slotName === 'undefined') {
      slotName = 'default';
    }
    return !!this.$slots[slotName];
  }

  private async created() {
    
  }

  private render(h: any): any {
    let navigation = null;
    if (this.hasSlot('navigation')) {
      navigation = (
        <div class='navigation'>
          <div>
            {this.$slots.navigation}
          </div>
        </div>
      );
    }

    return (
      <section fluid>
        {navigation}
        <div class={ this.hasSlot('navigation') ? 'hasNav' : '' }>
          <div>
            {this.$slots.default}
          </div>
        </div>
      </section>
    );
  }
}
