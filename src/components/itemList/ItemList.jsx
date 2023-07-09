import { useDispatch, useSelector } from "react-redux";
import Item from "../item/Item";
import { setDetailResult, setShowModalDetailInResponsive } from "../../slices/searchSlice";
import Skeleton from "../skeleton/Skeleton";

const ItemList = ({ data }) => {
	const isSearching = useSelector((state) => state.search.isSearching);

	const dispatch = useDispatch();

	const handleClickItem = ({item}) => {
		dispatch(setDetailResult(item))
		dispatch(setShowModalDetailInResponsive(true));
	}
	
	return data.map((item) => {
		return (
			!isSearching ? <Item url={item.url} key={item.id} description={item.description} title={item.title} click={() => {handleClickItem({item})}} /> : <Skeleton />
		);
	});
};

export default ItemList;
