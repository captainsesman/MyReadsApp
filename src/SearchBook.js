import React, { Component } from "react"
import { Link } from "react-router-dom";
import SingleBook from "./SingleBook";
import * as BooksApi from './BooksAPI'


class SearchBook extends Component{
  state = {
    books: [],
    query:'',
  }
  updateSearch = (query) => {
     this.setState(() => ({
            query: query
     }))
    
    BooksApi.search(query).then((books) => {
      if ((query === '') || (books.error)) {
        this.setState({ books: [] });
       
      } else {
         this.setState({books:[...books]})
     }
    }).catch((err)=> {
                console.log(err)
            })
    
  }
    render() {
      let query = this.state.query;
      const showingBooks = this.state.books;     

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
                       <input type="text" value={query} onChange={(event)=>this.updateSearch(event.target.value) } placeholder="Search by title or author"/>

                      </div>
                    </div>
                    <div className="search-books-results">
                      <ol className="books-grid">
                {
                  showingBooks.map((c) => (<SingleBook book={c} key={c.id} onUpdateBook={this.props.onUpdateBook } />))
                             }
                                
                        </ol>
                    </div>
                  </div>
        )

    }



}

export default SearchBook;