import React from 'react'; //Importa la biblioteca React, necesaria para definir componentes React.
import '../App.css'; //Importa el archivo de estilos App.css para aplicar estilos CSS a los componentes definidos en este archivo. La ruta relativa ../ indica que App.css está en el directorio principal del proyecto.
import HeroSection from '../components/HeroSection'; //Importa el componente HeroSection desde el archivo HeroSection.js ubicado en el directorio components.

function Home() { //Define el componente Home como una función. Este es un componente funcional de React.
    return (
        <> {/* Devuelve el JSX que define la estructura del componente Home. Aquí se utiliza el fragmento <>...</> para envolver el contenido, aunque en este caso es opcional ya que solo hay un componente hijo (HeroSection). El componente HeroSection es renderizado dentro del Home. */}
            <HeroSection />
        </>
    )
}

export default Home //Exporta el componente Home como el export por defecto del módulo, para que pueda ser importado y utilizado en otros archivos.