import { Component, Vue } from 'vue-property-decorator';
import DefaultLayout from '@/components/Layouts/Default';

@Component
export default class Page404 extends Vue {
  private render(h: any) {
    return (
        <DefaultLayout>
            <div>
                <div>
                    <h1>
                    404
                    </h1>
                </div>
                <div>
                    The Requested path could not be found!&nbsp;
                    <router-link to='/home'>Home</router-link>
                </div>
            </div>
        </DefaultLayout>
    );
  }
}
