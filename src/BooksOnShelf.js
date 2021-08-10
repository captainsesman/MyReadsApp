import React, { Component } from 'react'
import SingleBook from './SingleBook';


class BooksList extends Component {


    filterBooksByShelf = (allbooks, shelf) => allbooks.filter((c) => {
        return c.shelf === shelf;
    })

    render() {
        const { allbooks } = this.props;


        let setOfShelfCat = new Set()
        const shelfCategories = allbooks.map(cate => {
            setOfShelfCat.add(cate.shelf);
        });
        const shelfs = [...setOfShelfCat];


        return (
            <div>
                <div className="list-books">
                    <div className="list-books-title">
                        <h1>MyReads</h1>
                    </div>
                    <div className="list-books-content">
                        <div>
                            {
                                shelfs.map(shelf => {
                                    return (
                                        <div className="bookshelf" key={shelf}>
                                            <h2 className="bookshelf-title">{shelf}</h2>
                                            <div className="bookshelf-books">
                                                <ol className="books-grid">
                                                    {
                                                        this.filterBooksByShelf(allbooks, shelf).map(book => (
                                                            <SingleBook book={book} key={book.id} onUpdateBook={this.props.onUpdateBook} />
                                                        ))
                                                    }
                                                </ol>
                                            </div>
                                        </div>

                                    )
                                })
                            }
                        </div>
                    </div>
                </div>

            </div>
        )
    }




}

export default BooksList;