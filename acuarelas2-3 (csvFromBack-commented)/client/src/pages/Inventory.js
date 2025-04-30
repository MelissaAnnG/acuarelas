import React, { useEffect, useState } from "react"; //importa las bibliotecas React, useEffect, y useState necesarias para manejar los componentes y sus estados
import ReactPaginate from "react-paginate"; //importa ReactPaginate para la paginación
import '../App.css'; //importa archivos de estilo App.css y Tables.css para aplicar estilos a este componente
import './styles/Tables.css';

export default function Inventory() { //define y exporta el componente Inventory como una función. Declara tres estados usando el hook useState
    const [data, setData] = useState([]); //data para almacenar los datos obtenidos del servidor
    const [currentPage, setCurrentPage] = useState(0); //currentPage para almacenar el número de la página actual
    const [itemsPerPage] = useState(100); //itemsPerPage para definir el número de elementos que se mostrarán por página, establecido en 100

    useEffect(() => { //utiliza el hook useEffect para ejecutar la función fetchCsv cuando el componente se monta. El array vacío [] asegura que esto solo ocurra una vez
        fetchCsv();
    }, []);

    const fetchCsv = async () => { //define fetchCsv, una función asíncrona que obtiene datos desde el endpoint /api/inventory:
        try {
            const response = await fetch('/api/inventory'); //realiza una petición fetch para obtener los datos
            if (!response.ok) { //verifica si la respuesta es correcta. Si no lo es, lanza un error
                throw new Error('Network response was not ok');
            }
            const results = await response.json(); //convierte la respuesta a formato JSON
            setData(Array.isArray(results) ? results : []); //actualiza el estado data con los resultados obtenidos, asegurándose de que es un array
        } catch (error) { //en caso de error, lo captura y registra en la consola, y establece data como un array vacío
            console.error('Error fetching the data: ', error);
            setData([]);
        }
    };

    const handlePageClick = (event) => { //define handlePageClick, una función que actualiza el estado currentPage con la página seleccionada cuando se hace clic en los controles de paginación
        setCurrentPage(event.selected);
    }

    //calcular el índice de los elementos que se van a mostrar en la página actual
    const offset = currentPage * itemsPerPage; //offset calcula el índice inicial basado en la página actual y el número de elementos por página
    const currentPageData = data.slice(offset, offset + itemsPerPage); //currentPageData obtiene una porción de los datos (data) correspondiente a la página actual usando slice

    const excludedColumns = ["Precio_de_Costo", "Precio Venta (20%)"]; //define un array excludedColumns que contiene las columnas que deben ser excluidas de la tabla

    const filterColumns = (row) => { //define filterColumns, una función que filtra las columnas excluidas de cada fila de datos
        const filteredRow = {}; //crea un nuevo objeto filteredRow
        Object.keys(row).forEach((key) => { //itera sobre las claves del objeto row y añade las claves y valores al nuevo objeto solo si no están en excludedColumns
            if (!excludedColumns.includes(key)) {
                filteredRow[key] = row[key];
            }
        });
        return filteredRow; //retorna el objeto filtrado.
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