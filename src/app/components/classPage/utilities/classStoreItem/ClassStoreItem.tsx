import { RewardStoreItem } from "../../../../../types/RewardSchema";
import ClampLines from "../../../utilities/clampLines/ClampLines";
const ClassStoreItem = ({ data }: { data: RewardStoreItem }) => {
  return (
    <div className="reward-store-item">
      <div className="reward-store-item-image">
        <img src={data.imgURL} />
      </div>
      <div className="reward-store-item-data">
        <ClampLines
          id={data._id.toString()}
          text={data.name}
          className={"reward-store-item-title"}
          lines={1}
          ellipsis="..."
          innerElement="h5"
          buttons={false}
        />
        <div className="reward-store-item-value">{data.price} points</div>
        <div className="reward-store-item-btn-container">
          <button aria-label={`buy-reward-item-${data.name}`}>
            Buy for <b>{data.price}</b>
          </button>
        </div>
      </div>
    </div>
  );
};
export default ClassStoreItem
