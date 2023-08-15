import Image from "next/image";

import ProviderIcon from "../icons/provider-icon";
import CategoryIcon from "../icons/category-icon";
import LogisticsItem from "./logistics-item";
import classes from "./nft-logistics.module.css";

function NftLogistics(props) {
  const { category, provider, image, imageAlt } = props;

  return (
    <section className={classes.logistics}>
      <div className={classes.image}>
        <Image src={`/${image}`} alt={imageAlt} width={400} height={400} />
      </div>
      <ul className={classes.list}>
        <LogisticsItem icon={CategoryIcon}>
          <h3>{category}</h3>
        </LogisticsItem>
        <LogisticsItem icon={ProviderIcon}>
          <h3>{provider}</h3>
        </LogisticsItem>
      </ul>
    </section>
  );
}

export default NftLogistics;
