const ItemDetailPage = ({item}) => {

  return (
    <>
      <h2>{item.titulo} </h2>
      <h3>{item.subtitulo} </h3>
      <h4>{item.autor} </h4>
      <img src={item.imagen} alt="" />
      <p>{item.sinopsis} </p>
      <p>{item.paginas} </p>
      <p>{item.genero.join(', ')} </p>
      <p>{item.keywords.join(' ')} </p>

    </>
 
  );
};

export default ItemDetailPage;
