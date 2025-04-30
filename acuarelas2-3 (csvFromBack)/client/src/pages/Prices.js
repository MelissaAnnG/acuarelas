import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate"; 
import '../App.css'; 
import './styles/Tables.css';

export default function Prices() { 
    const [data, setData] = useState([]); 
    const [currentPage, setCurrentPage] = useState(0); 
    const [itemsPerPage] = useState(100); 

    useEffect(() => { 
        fetchCsv();
    }, []);

    const fetchCsv = async () => { 
        const response = await fetch('/api/inventory'); 
        const results = await response.json(); 
        setData(results); 
    };

    const handlePageClick = (event) => { 
        setCurrentPage(event.selected);
    }

    const offset = currentPage * itemsPerPage; 
    const currentPageData = data.slice(offset, offset + itemsPerPage); 

    return ( 
        <div>
            <div className="prices-container">
                <h1 className="prices">PRECIOS</h1>
                <table>
                    <thead> 
                        <tr>
                            {data.length > 0 && Object.keys(data[0]).filter((key, index) => index !== 4).map((key) => (
                                <th key={key}>{key}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody> 
                        {currentPageData.map((item, index) => (
                            <tr key={index}>
                                {Object.values(item).filter((val, i) => i !== 4).map((val, i) => (
                                    <td key={i}>{val}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
                <ReactPaginate 
                    previousLabel={"← Anterior"} 
                    nextLabel={"Siguiente →"} 
                    pageCount={Math.ceil(data.length / itemsPerPage)} 
                    onPageChange={handlePageClick} 
                    containerClassName={"pagination"} 
                    pageClassName={"page-item"}
                    pageLinkClassName={"page-link"}
                    previousClassName={"page-item"}
                    previousLinkClassName={"page-link"}
                    nextClassName={"page-item"}
                    nextLinkClassName={"page-link"}
                    breakClassName={"page-item"}
                    breakLinkClassName={"page-link"}
                    activeClassName={"active"}
                    disabledClassName={"disabled"}
                />
            </div>
        </div>
    );
}