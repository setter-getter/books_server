import Mn from 'backbone.marionette'
import ViewTemlate from './template/main.hbs'
import {ContentView} from '../content/index'
import {MenuView} from "../menu/index"




export class View_ extends Mn.View {
    constructor() {
        super({
            tagName: 'p',
            className: 'container_view',
            template: ViewTemlate,
            regions: {
                menu: '.container_1',
                content_space: '.container_2'
            },
            childViewTriggers: {
                'openLib': 'showBook',
                'openMain': 'Render',
            },
            childViewEvents: {
                'addModel': 'addModel',
                "search": "search"
            }
        });
    }

    search(options) {
        let view = this.getChildView('content_space');
        let collectionView = view.getChildView('content');
        collectionView.collection.fetch({
            url: collectionView.collection.url() + `?search=${options.text}`
        })
    }

    addModel(model){
        let view = this.getChildView('content_space');
        view.addModel(model)
    }

    onRender() {
        this.showChildView('menu', new MenuView());
        this.showChildView('content_space', new ContentView());
    }

    onShowBook() {
        let _view = this.getChildView('content_space');
         _view.openView('book_lib')
    }
}