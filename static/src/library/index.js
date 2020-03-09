import Mn from 'backbone.marionette'
import BooksTemplate from './templates/libraly.hbs'
import Bb from 'backbone'
import _ from 'underscore'
import "block-ui/jquery.blockUI"
import BooksViewTemplate from "./templates/search.hbs"


export class BooksView extends Mn.CollectionView {
    constructor() {
        super({
            template: BooksViewTemplate,
            childView: Books,
            collection: new BooksCollection(),
            childViewEvents: {
                'clickBook': 'clickBook1'
            },
            events: {
                'keypress .search-line': 'clickSearch',
                'click #add-book': 'openAddBook'
            }
        });
    }

    clickSearch(e) {
        if (e.keyCode !== 13) return;
        this.search($('.search-line').val())
    }

    search(text) {
        this.collection.fetch({
            url: this.collection.url() + `?search=${text}`
        })
    }

    clickBook1(view) {
        this.trigger('clickBook2', {
            model: view.model
        })
    }

    onRender() {
        this.collection.fetch();
    }

    openAddBook() {
        $.blockUI({
            message: `<ul class="blockUI-form" >
                       <li><input class="form author-add" placeholder="Автор"/></li>
                       <li><input class="form title-add" placeholder="Название"/></li>
                       <li><textarea class="form form__description description-add"></textarea></li>
                       <button class="exit-add">Назад</button>
                       <button class="save-book">Сохранить</button>
                       </ul>`
        });
        $('.save-book').click(() => {
            let model = new BookAdd();
            model.set('author', $('.author-add').val());
            model.set('title', $('.title-add').val());
            model.set('description', $('.description-add').val());
            model.save(null, {
                url: model.url() + '/',
                post: true,
                success: () => {
                    this.collection.unshift(model);
                    $.unblockUI();
                },
                error: (e) => console.log(e)
            });
        });
        $('.exit-add').click(() => {
            $.unblockUI()
        })
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
class BookAdd extends Bb.Model {
    url(){
        if(this.get('id')) {
            return 'book/books/' + this.get('id') + '/'
        }
        return 'book/books'
    }
}