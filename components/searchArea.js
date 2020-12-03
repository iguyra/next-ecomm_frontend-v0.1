

const SearchArea = () => {

    return (

        <section>
            <div className="search">
                <div className="search__back"><i className="fas fa-long-arrow-alt-left"></i></div>
                <input className="search__input" type="text" placeholder="search products" autoFocus />
                
                <div className="search__button">search</div>
            </div>
        </section>
    )
}

export default SearchArea