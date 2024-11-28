
import { AssetsOrganized } from "../../enum/Types"
import { ChevronDownIcon, ChevronRightIcon, MapPinIcon } from "@heroicons/react/16/solid";
import classNames from "classnames";
import { useFiltersContext } from "../../context/FiltersContext";
import { useState } from "react";

interface AssetItemProps extends React.HTMLAttributes<HTMLDivElement> {
  asset: AssetsOrganized;
  typeAsset: string;
  level: number;
  isEmpty: boolean;
}
const AssetItem = (
  { asset, typeAsset, level, isEmpty, className }: AssetItemProps
) => {
  const { assets } = useFiltersContext()
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    if (!isEmpty) {
      setIsExpanded(!isExpanded);
    }
  };

  const paddingLeft = `${level * 1.5 + 0.75}rem`;


  const verifyIsEmpty = (assetId: string) => {
    return assets?.filter((asset) => asset.parentId === assetId).length === 0
  }
  return (
    <>
      <div
        className={classNames("flex flex-row gap-1 cursor-pointer hover:bg-gray-200",
          className,
        )}
        onClick={toggleExpand}
        style={{ paddingLeft }}
      >
        {!isEmpty && (
          <span className="-ml-4">
            {isExpanded ? (
              <ChevronDownIcon className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronRightIcon className="w-4 h-4 text-gray-500" />
            )}
          </span>
        )}

        {typeAsset === "location" &&
          (
            <MapPinIcon className="w-5 h-5 text-accent" />
          )
        }

        <span className="text-sm text-primary font-semibold">
          {asset?.name}
        </span>
      </div>
      {!isEmpty && isExpanded && asset.children && (
        <div>
          {asset.children.map((child) => (
            <AssetItem
              key={child.id}
              asset={child}
              isEmpty={verifyIsEmpty(child.id)}
              typeAsset={typeAsset}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </>
  )
}

export default AssetItem