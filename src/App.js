import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import * as BooksApi from './BooksAPI'
import BooksList from './BooksOnShelf'
import { Route } from 'react-router';
import SearchBook from './SearchBook';
import { Link } from "react-router-dom";

class BooksApp extends React.Component {
  state = {

    books: [],
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
    
  }
  async componentDidMount() {
    const books = await BooksApi.getAll().then((books) => {
      this.setState(() => ({
        books
         
      }))
    })
     
    
  }
  ChangeBookShelf = async (book, shelf) => {
    await BooksApi.update(book, shelf).then
      (this.setState((currentState) => ({
        books: currentState.books.filter((c) => {
          if (c.id === book.id) {
            c.shelf = shelf;
          }    
         return c;
        
        })
      })))
    
      await BooksApi.getAll().then((books) => ( this.setState(() =>( { books: books })) ))
    
  }
 
  render() {
     
    return (

      <div className="app">
          <Route exact path="/" render={({history}) => (<BooksList allbooks={this.state.books}
        
          onUpdateBook={(book, shelf) => {
            this.ChangeBookShelf(book, shelf)
             history.push('/')
          }} />)}>
         
        </Route>
        <Route path='/search' render={({history}) => (<SearchBook allbooks={this.state.books}
          onUpdateBook={(book, shelf) => {
            this.ChangeBookShelf(book, shelf)
            history.push('/search')
          }}
        
        />)}>
        </Route>
        
      
          
           <div className="open-search">
                <Link to="/search"><button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button></Link>
           </div>
      </div>
     
      
      )
  }
}

export default BooksApp
