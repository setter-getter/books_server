import Mn from 'backbone.marionette'
import BooksTemplate from './templates/libraly.hbs'
import Bb from 'backbone'
import _ from 'underscore'
import "block-ui/jquery.blockUI"



export class BooksView extends Mn.CollectionView {
    constructor() {
        super({
            template: false,
            childView: Books,
            collection: new BooksCollection(),
            childViewEvents: {
                'clickBook': 'clickBook1'
            },
        });
    }

    clickBook1(view) {
        this.trigger('clickBook2', {
            model: view.model
        })
    }

    onRender() {
        this.collection.fetch();
    }
}

class BooksCollection extends Bb.Collection {
    url() {
        return '/book/books/'
    }

    parse(response) {
        return response.results
    }
}

export class Books extends Mn.View {
    constructor(option = {}) {
        _.defaults(option, {
            template: BooksTemplate,
            triggers: {
                'click .book-title': 'clickBook'
            }
        });
        super(option);
    }

    templateContext() {
        return {
            author_book: this.model.get('author'),
            title_book: this.model.get('title'),
        }
    }
}
