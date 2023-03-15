import React from 'react';
import './GifList.css';
import { searchGifs, createURLParams } from '../api/GifSearchApi';
import { Gif } from "@giphy/react-components";

const pageLimit = 10;
const limit = 3;

export default class GifList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            gifs: [],
            totalPages: 0,
            currentPage: 0,
            searchTerm: ""
        }
        this.goToPreviousPage = this.goToPreviousPage.bind(this);
        this.goToNextPage = this.goToNextPage.bind(this);
    }

    async getGifs(searchTerm) {
        
        var offset = this.state.currentPage * limit;
        var urlParams = createURLParams(this.props.apiKey, searchTerm, offset, limit);

        var foundGifs = await searchGifs(this.props.baseURL, urlParams);
        this.setState({ 
            gifs: foundGifs.data, 
            totalPages: Math.ceil(foundGifs.pagination.total_count / limit),
            searchTerm: searchTerm
        });
    }

    clearGifs() {
        this.setState({ gifs: [], totalPages: 0, currentPage: 0 });
    }

    goToPreviousPage() {
        if (this.state.currentPage > 0) {
          this.setState(prevState => ({ 
            currentPage: prevState.currentPage - 1
          }), () => {
            this.getGifs(this.state.searchTerm);
          });
        }
    }
    
    goToNextPage() {
        if (this.state.currentPage + 1 < this.state.totalPages) {
          this.setState(prevState => ({ 
            currentPage: prevState.currentPage + 1
          }), () => {
            this.getGifs(this.state.searchTerm);
          });
        }
    }

    getPagination() {
        const allPages = [];
        
        if (this.state.gifs.length > 0 && pageLimit > this.state.totalPages) {
            for (let i = this.state.currentPage; i < this.state.totalPages; i++) {
                allPages.push(i);
            }
        } else {
            const middle = Math.floor(pageLimit / 2);
            var leftBound = this.state.currentPage - middle;
            var rightBound = this.state.currentPage + middle;

            if (leftBound < 0) {
                leftBound = 0;
                rightBound = pageLimit;
            } 

            if (rightBound > this.state.totalPages - 1) {
                leftBound -= rightBound - (this.state.totalPages - 1);
                rightBound = this.state.totalPages - 1;
            }

            for (let i = leftBound; i <= rightBound; i++) {
                allPages.push(i);
             }
        }

        return allPages;
    }

    render() {
        const mystyle={
            listStyleType:'none'
        }

        if (this.state.gifs.length > 0) {
            return (
                <div>
                    
                    <ul style={mystyle}>
                        {
                        this.state.gifs
                            .map(gif =>
                                <li key={gif.id}> <Gif gif={gif} height={200} width={200} /> </li>
                            )
                            
                        }
                    </ul>
                    
                    <button onClick={this.goToPreviousPage} > Previous </button>
                    
                    { this.getPagination().map((pageNumber, index) => (
                        <button key={index} className={pageNumber === this.state.currentPage ? "active" : undefined}> { pageNumber + 1 } </button>
                    ))}
        
                    <button onClick={this.goToNextPage}>Next</button>
    
                </div>
                
            );
        }
        else {
            return (
                <text> Enter search term. </text>
            );
        }
    }
}