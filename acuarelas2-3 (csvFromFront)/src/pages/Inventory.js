import React, { useEffect, useState } from "react";
import Papa from 'papaparse';
import ReactPaginate from "react-paginate";
import '../App.css';
import './styles/Tables.css';

export default function Inventory() {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage] = useState(100); //Número de elementos por página

    useEffect(() => {
        fetchCsv();
    }, []);

    const fetchCsv = async () => {
        const response = await fetch('/inventory.csv');
        const reader = response.body.getReader();
        const result = await reader.read(); //raw array
        const decoder = new TextDecoder('utf-8');
        const csv = decoder.decode(result.value); // the csv text
        const results = Papa.parse(csv, { header: true }); // object with { data, errors, meta }
        setData(results.data);
    };

    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
    }

    //Calcular el índice de los elementos que se van a mostrar en la página actual
    const offset = currentPage * itemsPerPage;
    const currentPageData = data.slice(offset, offset + itemsPerPage);

    return (
        <div className="inventory-container">
            <h1 className="inventory">INVENTARIO</h1>
            <table>
                <thead>
                    <tr>
                        {data.length > 0 && Object.keys(data[0]).slice(0,-2).concat(Object.keys(data[0]).slice(-1)).map((key) => (
                            <th key={key}>{key}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {currentPageData.map((item, index) => (
                        <tr key={index}>
                            {Object.values(item).slice(0, -2).concat(Object.values(item).slice(-1)).map((val, i) => (
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
    );
}