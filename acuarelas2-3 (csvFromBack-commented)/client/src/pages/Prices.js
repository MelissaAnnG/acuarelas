import React, { useEffect, useState } from "react"; //importa las bibliotecas React, useEffect y useState
//react es necesario para definir componentes, mientras que useEffect y useState son hooks para manejar efectos secundarios y estados respectivamente
import ReactPaginate from "react-paginate"; //importa el componente ReactPaginate de la biblioteca react-paginate para agregar funcionalidad de paginación
import '../App.css'; //importa los archivos de estilo App.css y Tables.css para aplicar estilos a este componente
import './styles/Tables.css';

export default function Prices() { //define y exporta el componente Prices como una función. Declara tres estados usando el hook useState
    const [data, setData] = useState([]); //data para almacenar los datos obtenidos del servidor
    const [currentPage, setCurrentPage] = useState(0); //currentPage para almacenar el número de la página actual
    const [itemsPerPage] = useState(100); //itemsPerPage para definir el número de elementos que se mostrarán por página, establecido en 100

    useEffect(() => { //utiliza el hook useEffect para ejecutar la función fetchCsv cuando el componente se monta. El array vacío [] asegura que esto solo ocurra una vez
        fetchCsv();
    }, []);

    const fetchCsv = async () => { //define fetchCsv, una función asíncrona que obtiene datos desde el endpoint /api/inventory:
        const response = await fetch('/api/inventory'); //realiza una petición fetch para obtener los datos
        const results = await response.json(); //convierte la respuesta a formato JSON
        setData(results); //actualiza el estado data con los resultados obtenidos
    };

    const handlePageClick = (event) => { //define handlePageClick, una función que actualiza el estado currentPage con la página seleccionada cuando se hace clic en los controles de paginación
        setCurrentPage(event.selected);
    }

    //calcular el índice de los elementos que se van a mostrar en la página actual
    const offset = currentPage * itemsPerPage; //offset calcula el índice inicial basado en la página actual y el número de elementos por página
    const currentPageData = data.slice(offset, offset + itemsPerPage); //currentPageData obtiene una porción de los datos (data) correspondiente a la página actual usando slice

    return ( //devuelve el JSX que define la estructura visual del componente Prices
        <div>
            <div className="prices-container">
                <h1 className="prices">PRECIOS</h1>
                <table>
                    <thead> {/* thead contiene el encabezado de la tabla con una fila (tr). Si data tiene elementos, se generan dinámicamente las cabeceras (th) excluyendo la cuarta columna*/}
                        <tr>
                            {data.length > 0 && Object.keys(data[0]).filter((key, index) => index !== 4).map((key) => (
                                <th key={key}>{key}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody> {/* tbody contiene las filas de datos (tr), generadas dinámicamente a partir de currentPageData, excluyendo la cuarta columna */}
                        {currentPageData.map((item, index) => (
                            <tr key={index}>
                                {Object.values(item).filter((val, i) => i !== 4).map((val, i) => (
                                    <td key={i}>{val}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
                <ReactPaginate //reactPaginate configura la paginación
                    previousLabel={"← Anterior"} //definen los textos de los botones de paginación
                    nextLabel={"Siguiente →"} //definen los textos de los botones de paginación
                    pageCount={Math.ceil(data.length / itemsPerPage)} // calcula el número total de páginas basado en la longitud de data y itemsPerPage
                    onPageChange={handlePageClick} //onPageChange define la función a ejecutar cuando se cambia de página
                    containerClassName={"pagination"} //las demás props (containerClassName, pageClassName, etc.) definen las clases CSS para los elementos de paginación, permitiendo su estilización
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