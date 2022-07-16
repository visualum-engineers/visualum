import { useState, memo } from "react";

export type FilterType = {
  title: string;
  filterActive?: boolean;
  customStyles?: { [key: string]: string };
  customData?: {
    ascending?: { [key: string]: string };
    descending?: { [key: string]: string };
  };
  className?: string;
  ascendingCallback: (
    e?: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  descendingCallback: (
    e?: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  children?: JSX.Element;
};
export const FilterColumn = memo(({ data }: { data: FilterType }) => {
  const [filterDirection, setFilterDirection] = useState<
    undefined | "ascending" | "descending"
  >();
  const customData = data.customData;
  const ascendingData =
    customData && customData.ascending
      ? Object.entries(customData.ascending).map(([key, value]) => {
          return { [`data-${key}`]: value };
        })
      : {};
  const descendingData =
    customData && customData.descending
      ? Object.entries(customData.descending).map(([key, value]) => {
          return { [`data-${key}`]: value };
        })
      : {};
  return (
    <div
      className={`filter-column-container ${data.className}`}
      style={data.customStyles}
    >
      <div className="filter-column-header">
        <h2>{data.title}</h2>
        {data.filterActive && (
          <div className="filter-item-btns">
            <button
              aria-label={`ascending-${data.title}`}
              className={`ascending-filter-btn ${
                filterDirection === "ascending" ? "selected" : ""
              }`}
              onClick={(e) => {
                {
                  setFilterDirection("ascending");
                  data.ascendingCallback(e);
                }
              }}
              {...ascendingData}
            ></button>
            <button
              className={`descending-filter-btn ${
                filterDirection === "descending" ? "selected" : ""
              }`}
              aria-label={`descending-${data.title}`}
              onClick={(e) => {
                setFilterDirection("descending");
                data.descendingCallback(e);
              }}
              {...descendingData}
            ></button>
          </div>
        )}
      </div>
      <div className="filter-column-items">{data.children}</div>
    </div>
  );
});
const FilterList = ({
  className,
  data,
}: {
  className?: string;
  data: FilterType[];
}) => {
  return (
    <div className={`filter-list-container ${className}`}>
      {data.map((filterData) => {
        return <FilterColumn key={filterData.title} data={filterData} />;
      })}
    </div>
  );
};
export default FilterList;
