import React, { Component } from "react"
import { Link } from "react-router-dom";
import SingleBook from "./SingleBook";
import * as BooksApi from './BooksAPI'
import { debounce } from 'lodash';
import PropTypes from 'prop-types'


class SearchBook extends Component {
  state = {
    books: [],
    query: '',
  }
  updateSearch = debounce((query) => {
    this.setState(() => ({
      query: query
    }))

    BooksApi.search(query).then((books) => {
      if ((query === '') || (books.error)) {
        this.setState({ books: [] });

      } else {
        this.setState({ books: [...books] })
      }
    }).catch((err) => {
      console.log(err)
    })

  },1000)
  render() {
    let query = this.state.query;
    const showingBooks = this.state.books;
    const booksOnCurrentShelf = this.props.allbooks   
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/"> Close</Link>
          <div className="search-books-input-wrapper">
            {/*
                          NOTES: The search from BooksAPI is limited to a particular set of search terms.
                          You can find these search terms here:
                          https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                          However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                          you don't find a specific author or title. Every search is limited by search terms.
                        */}
            <input type="text"  onChange={(event) => this.updateSearch(event.target.value)} placeholder="Search by title or author" />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {showingBooks !== null ? showingBooks.map((c) => {
             const booksOnShelf = booksOnCurrentShelf.find(
               ({id} ) => c.id === id  );
             c.shelf  = booksOnShelf ? booksOnShelf.shelf:'none'

                return(<SingleBook book={c} key={c.id}  onUpdateBook={this.props.onUpdateBook}/>)
              }):null   }

          </ol>
        </div>
      </div>
    )

  }





}
  SearchBook.propTypes = {
    book: PropTypes.array.isRequired,
    onUpdateBook: PropTypes.func.isRequired,
    updateSearch:PropTypes.func.isRequired
  }

export default SearchBook;