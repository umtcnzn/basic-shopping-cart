import StoreItem from "../../../components/StoreItem"
import storeItems from "../../../data/storeItems.json"


export default function Store() {
    return <>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {storeItems.map((item) => (
                <StoreItem {...item} />
            ))}
        </div>
    </>
}