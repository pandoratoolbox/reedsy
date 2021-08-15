<template>
  <div class="container">
    <div class="window">
      <div class="content">
        <div class="title">Most popular books of all time</div>
        <div class="table">
          <div class="list">
            <div class="header">
              <div class="header-section-title">
                Title
              </div>
              <div class="header-section">
                Published
              </div>
              <div class="header-section">
                Rating
              </div>
              <div class="header-section">
                Buy on
              </div>
            </div>
            <div class="list-items">
              <div
                class="list-item"
                v-for="(book, index) in display_books"
                :key="index"
                @click="
                  display_books[index].expanded = !display_books[index].expanded
                "
              >
                <div class="list-item-sections">
                  <div class="list-item-section-title">
                    <div class="book-information">
                      <div
                        class="cover"
                        :style="{
                          'background-image':
                            'url(' + require(`../assets/${book.cover}`) + ')',
                        }"
                      ></div>
                      <div class="book-text">
                        <div class="book-title">
                          {{ book.title }}
                        </div>
                        <div class="book-author">
                          {{ book.author.display_name }}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="list-item-section">
                    {{ book.release_year }}
                  </div>
                  <div class="list-item-section">
                    {{ book.display_rating }}/10
                  </div>
                  <div class="list-item-section" @click.stop>
                    <div class="book-link" v-if="book.amazon_link">
                      <a :href="book.amazon_link" target="_blank">Amazon</a>
                    </div>
                    <div class="book-link" v-if="book.ibooks_link">
                      <a :href="book.ibooks_link" target="_blank">iBooks</a>
                    </div>
                    <div class="book-link" v-if="book.play_store_link">
                      <a :href="book.play_store_link" target="_blank"
                        >Play Store</a
                      >
                    </div>
                  </div>
                </div>
                <div class="list-item-content" v-if="book.expanded">
                  Each page should display 5 books; A few pages should be
                  available in order for pagination to work; Book entries should
                  be clickable and expand/collapse to show/hide more information
                  about the selected book; Book store links should only be
                  displayed when the respective URL is available; make different
                  entries as represented on the images above so different store
                  availability scenarios are represented; Improve the UI as you
                  think works best.
                </div>
              </div>
            </div>
          </div>
          <div class="footer">
            <div class="nav left" @click="changePage(-1)">
              <img src="../assets/left.png" />
            </div>
            <div class="pages">Page {{ page }} of {{ page_count }}</div>
            <div class="nav right" @click="changePage(1)">
              <img src="../assets/right.png" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Book } from "../models/book";
export default {
  watch: {
    page: function(n) {
      let end = n * 5;
      let start = end - 5;
      if (end > this.books.length) {
        end = this.books.length;
      }
      this.display_books = this.books.slice(start, end);
    },
  },
  methods: {
    changePage(i) {
      if (this.page + i > this.page_count) {
        this.page = 1;
        return;
      }
      if (this.page + i < 1) {
        this.page = this.page_count;
        return;
      }
      this.page += i;
    },
  },
  created() {
    for (let i = 0; i < 102; i++) {
      let a_link = Math.floor(Math.random() * 10);
      let p_link = Math.floor(Math.random() * 10);
      let i_link = Math.floor(Math.random() * 10);
      this.books.push(
        new Book({
          cover: "cover.jpg",
          title: "Moby Dick",
          author: { first_name: "Herman", last_name: "Melville" },
          rating: 93,
          release_year: 1851,
          amazon_link: a_link > 5 ? "https://amazon.com" : null,
          play_store_link: p_link > 5 ? "https://play.google.com" : null,
          ibooks_link: i_link > 5 ? "https://apps.apple.com" : null,
        })
      );
    }
    let end = this.page * 5;
    let start = end - 5;
    if (end > this.books.length) {
      end = this.books.length;
    }
    this.display_books = this.books.slice(start, end);
  },
  name: "PageIndex",
  computed: {
    page_count() {
      return Math.ceil(this.books.length / 5);
    },
  },
  data() {
    return {
      page: 1,
      display_books: [],
      books: [],
    };
  },
};
</script>

<style lang="scss">
$primary: rgb(42, 42, 42);
$secondary: rgb(155, 155, 155);
$accent: rgb(192, 212, 143);

$dark: rgb(42, 42, 42);

$positive: #21ba45;
$negative: #c10015;
$info: #31ccec;
$warning: #f2c037;

$tb1: rgb(250, 249, 247);
$tb2: white;
$nav: rgb(162, 162, 162);
$reedsy-bg: rgb(244, 241, 327);

body {
    background-color: $reedsy-bg;
}

a {
  color: $accent !important;
  text-decoration: none;
}

.list-item-content {
  display: flex;
  flex-direction: row;
  margin-top: 16px;
  font-weight: 500;
}
.list-item-sections {
  display: flex;
  flex-direction: row;
}
.nav {
  cursor: pointer;
}
.book-link {
  color: lime;
}
.container {
  display: flex;
  flex-direction: column;
  padding: 24px 24px 24px 24px;

  .window {
    align-self: center;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    background-color: white;
    padding-left: 10px;
    padding-right: 10px;
    width: 750px;
    .content {
      display: flex;
      flex-direction: column;

      .title {
        margin-left: 16px;
        justify-content: left;
        display: flex;
        flex-direction: row;
        font-weight: bold;
        margin-top: 30px;
        margin-bottom: 8px;
        font-size: 24px;
      }
    }
  }
}
.header {
  display: flex;
  flex-direction: row;
  padding-top: 16px;
  padding-bottom: 16px;
  padding-left: 16px;
  padding-right: 16px;
  width: 100%;
  font-weight: 500;
  color: $secondary;
  .header-section {
    display: flex;
    flex-direction: column;
    text-transform: uppercase;
    width: 150px;
    align-items: center;
    &:last-child {
      width: initial;
      align-items: center;
      flex-grow: 2;
    }
    &-title {
      display: flex;
      flex-direction: column;
      text-transform: uppercase;
      width: 300px;
    }
  }
}
.table {
  display: flex;
  flex-direction: column;

  .footer {
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding-top: 16px;
    padding-bottom: 16px;
    .pages {
      font-weight: 600;
      margin-left: 16px;
      margin-right: 16px;
    }
  }

  .list {
    justify-content: center;
    display: flex;
    flex-direction: column;
    .list-items {
      display: flex;
      flex-direction: column;
      .list-item {
        &:nth-child(even) {
          background-color: $tb2;
        }
        cursor: pointer;
        font-weight: bold;
        display: flex;
        flex-direction: column;
        padding: 16px 16px 16px 16px;
        background-color: $tb1;
        .list-item-section {
          &:last-child {
            width: initial;
            align-items: center;
            flex-grow: 2;
          }
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 150px;
          &-title {
            width: 300px;
            .book-information {
              display: flex;
              flex-direction: row;
              .book-text {
                margin-top: 4px;
                display: flex;
                flex-direction: column;
                .book-title {
                  font-size: 16px;
                  font-weight: bold;
                  color: black;
                  margin-bottom: 4px;
                }
                .book-author {
                  font-weight: 500;
                  color: grey;
                }
              }
              .cover {
                display: flex;
                flex-direction: column;
                margin-right: 16px;
                height: 128px;
                width: 80px;
                border-radius: 8px;
                background-image: url("~@/assets/cover.jpg");
                background-size: cover;
              }
            }
          }
        }
      }
    }
  }
}
</style>
