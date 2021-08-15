import * as R from 'ramda';

export class Book {
    constructor(data = {}) {
        this.id = R.is(Number, data.id) ? data.id : null;
        this.title = R.is(String, data.title) ? data.title : null;
        this.excerpt = R.is(String, data.excerpt) ? data.excerpt : null;
        this.content = R.is(String, data.content) ? data.content : null;
        this.tags = R.is(Array, data.tags) ? data.tags : null;
        this.author_id = R.is(Number, data.author_id) ? data.author_id : null;
        this.author = R.is(Object, data.author) ? new Author(data.author) : null;

        this.rating = R.is(Number, data.rating) ? data.rating : null;
        this.release_year = R.is(Number, data.release_year) ? data.release_year : null;
        this.links = R.is(Array, data.links) ? data.links : null;

        this.amazon_link = R.is(String, data.amazon_link) ? data.amazon_link : null;
        this.play_store_link = R.is(String, data.play_store_link) ? data.play_store_link : null;
        this.ibooks_link = R.is(String, data.ibooks_link) ? data.ibooks_link : null;
        
        this.expanded = false
        this.cover = R.is(String, data.cover) ? data.cover : 'cover.jpg'
    }

    get display_rating() {
        return this.rating/10
    }
}

export class Author {
    constructor(data = {}) {
        this.id = R.is(Number, data.id) ? data.id : null;
        this.first_name = R.is(String, data.first_name) ? data.first_name : null;
        this.last_name = R.is(String, data.last_name) ? data.last_name : null;

        this.user_id = R.is(Number, data.user_id) ? data.user_id : null;
        this.user = R.is(Object, data.user) ? new User(data.user) : null;
    }

    get display_name() {
        return this.first_name + " " + this.last_name
    }
}

export class User {
    constructor(data = {}) {
        this.id = R.is(Number, data.id) ? data.id : null;
        this.username = R.is(String, data.username) ? data.username : null;
        this.password = R.is(String, data.password) ? data.password : null;
        this.created_at = R.is(String, data.created_at) ? data.created_at : null;

        this.author = R.is(Object, data.author) ? new Author(data.author) : null;
    }
}