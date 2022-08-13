import SearchBar from "../../utilities/searchBar/SearchBar";
import ClassStoreItem from "../utilities/classStoreItem/ClassStoreItem";

const StorePage = () => {

    const storeItems = [
        { name: "Test Item", price: 10, _id: 'abs', num_available: 10, creation_date: 'Jan 1st, 2022' },
        { name: "Homework Pass", price: 10, _id: 'abs', num_available: 10, creation_date: 'Jan 1st, 2022' },
        { name: "One Free Nap", price: 50, _id: 'abs', num_available: 10, creation_date: 'Jan 1st, 2022' },
        { name: "Teach the Class", price: 40, _id: 'abs', num_available: 10, creation_date: 'Jan 1st, 2022' },
        { name: "Movie Day", price: 100, _id: 'abs', num_available: 10, creation_date: 'Jan 1st, 2022' },
    ]

    return (
        <div className="py-3">
            <div className="row">
                <div className="col-12 col-lg-4 col-md-6 ms-auto">
                    <SearchBar
                        onChange={(e) => {
                            //console.log(e);
                        }}
                        onSearch={(e) => { console.log(e) }}
                        style={{ width: "100%" }}
                    />
                </div>
            </div>
            <div className="row">
                {storeItems.map(item => {
                    return (
                        <div className="col-12 col-md-6 p-3">
                            <ClassStoreItem data={item} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
};
export default StorePage;
