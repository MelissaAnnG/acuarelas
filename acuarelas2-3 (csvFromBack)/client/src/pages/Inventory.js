import React, { useEffect, useState } from "react"; 
import ReactPaginate from "react-paginate"; 
import '../App.css'; 
import './styles/Tables.css';

export default function Inventory() { 
    const [data, setData] = useState([]); 
    const [currentPage, setCurrentPage] = useState(0); 
    const [itemsPerPage] = useState(100); 

    useEffect(() => { 
        fetchCsv();
    }, []);

    const fetchCsv = async () => { 
        try {
            const response = await fetch('/api/inventory'); 
            if (!response.ok) { 
                throw new Error('Network response was not ok');
            }
            const results = await response.json(); 
            setData(Array.isArray(results) ? results : []); 
        } catch (error) { 
            console.error('Error fetching the data: ', error);
            setData([]);
        }
    };

    const handlePageClick = (event) => { 
        setCurrentPage(event.selected);
    }

    const offset = currentPage * itemsPerPage; 
    const currentPageData = data.slice(offset, offset + itemsPerPage); 

    const excludedColumns = ["Precio_de_Costo", "Precio Venta (20%)"]; 

    const filterColumns = (row) => { 
        const filteredRow = {}; 
        Object.keys(row).forEach((key) => { 
            if (!excludedColumns.includes(key)) {
                filteredRow[key] = row[key];
            }
        });
        return filteredRow;
    };

    return (
        <div className="inventory-container">
            <h1 className="inventory">INVENTARIO</h1>
            <table>
                <thead>
                    <tr>
                        {data.length > 0 && Object.keys(filterColumns(data[0])).map((key) => (
                            <th key={key}>{key}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {currentPageData.map((item, index) => (
                        <tr key={index}>
                            {Object.values(filterColumns(item)).map((val, i) => (
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