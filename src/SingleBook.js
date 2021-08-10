import React, {Component} from 'react';

class SingleBook extends Component {

    state = {
        bookonShelf:''
    }

      handleChangeBookShelf = (e) => {
        e.preventDefault();
          const bookChangedShelf = e.target.value;       
        this.props.onUpdateBook(this.props.book, bookChangedShelf);
        
        
    }

    render() {
        const {book} = this.props;       
        return (

                <li>
                    <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193,  backgroundImage: book.imageLinks != null ? `url(${book.imageLinks.smallThumbnail})` : null }}></div>
                        <div className="book-shelf-changer">
                        <select  defaultValue={book.shelf} onChange={this.handleChangeBookShelf}>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading </option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                        </div>
                    </div>
                    <div className="book-title">{book.title }</div>
                    <div className="book-authors">{book.authors}</div>
                    </div>
                </li>
    )
}



}

export default SingleBook;