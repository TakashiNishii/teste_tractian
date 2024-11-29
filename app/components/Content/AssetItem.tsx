
import { AssetsOrganized } from "../../enum/Types"
import { BoltIcon, ChevronDownIcon, ChevronRightIcon, MapPinIcon } from "@heroicons/react/16/solid";
import classNames from "classnames";
import { useState } from "react";
import Image from "next/image";
import { CubeIcon } from "@heroicons/react/24/outline";
import { useFiltersContext } from "../../context/FiltersContext";

interface AssetItemProps extends React.HTMLAttributes<HTMLDivElement> {
  asset: AssetsOrganized;
  typeAsset: string;
  level: number;
  isEmpty: boolean;
}
const AssetItem = (
  { asset, typeAsset, level, isEmpty, className }: AssetItemProps
) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const { selectedAsset, setSelectedAsset } = useFiltersContext()

  const toggleExpand = () => {
    if (!isEmpty) {
      setIsExpanded(!isExpanded);
    }
    if (typeAsset === "component") {
      setSelectedAsset(asset);
    }
  };

  const paddingLeft = `${level * 1.5 + 0.75}rem`;

  return (
    <>
      <div
        className={classNames("flex flex-row gap-1 cursor-pointer items-center hover:bg-gray-200",
          className,
          isEmpty && "ml-4",
          selectedAsset?.id === asset.id && "bg-accent"
        )}
        onClick={toggleExpand}
        style={{ paddingLeft }}
      >
        {!isEmpty && (
          <span>
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
        {
          typeAsset === "asset" &&
          <CubeIcon className="w-5 h-5 text-accent" />
        }
        {
          typeAsset === "component" &&
          (selectedAsset?.id === asset.id ? <Image src="/icons/component_selected.png" alt="Component" width={20} height={20} className="w-5 h-5" /> : <Image src="/icons/component.png" alt="Component" width={20} height={20} className="w-5 h-5" />)
        }


        <span className={classNames("text-md font-semibold",
          selectedAsset?.id === asset.id ? "text-white" : "text-primary"
        )}>
          {asset?.name}
        </span>

        {typeAsset === "component" && asset.sensorType && asset.sensorType === "energy" && (
          <BoltIcon className={classNames("w-5 h-5",
            asset.status === "operating" ? "text-[#52C41A]" : "text-[#ED3833]"
          )} />
        )}

        {typeAsset === "component" && asset.sensorType && asset.sensorType === "vibration" && (
          <>
            {asset.status === "operating" ? (
              <Image src="/icons/operating.png" alt="Vibration" width={8} height={8} className="w-2 h-2" />
            ) : (
              <Image src="/icons/alert.png" alt="Alert" width={8} height={8} className="w-2 h-2" />
            )}
          </>
        )}

      </div>
      {!isEmpty && isExpanded && asset.children && (
        <div className="flex flex-col gap-2">
          {asset.children.map((child) => (
            <AssetItem
              key={child.id}
              asset={child}
              isEmpty={child.children.length === 0}
              typeAsset={child.typeAssets}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </>
  )
}

export default AssetItem