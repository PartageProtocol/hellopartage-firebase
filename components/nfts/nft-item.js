import Image from "next/image";

import Button from "../ui/button";
import CategoryIcon from "../icons/category-icon";
import ProviderIcon from "../icons/provider-icon";
import ArrowRightIcon from "../icons/arrow-right-icon";

import classes from "./nft-item.module.css";

function NftItem(props) {
  const { id, name, provider, category, image } = props;

  const exploreLink = `/nfts/${id}`;

  return (
    <li className={classes.item}>
      <Image src={"/" + image} alt={name} width={250} height={160} />
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{name}</h2>
          <div className={classes.category}>
            <CategoryIcon />
            <h3>{category}</h3>
          </div>
          <div className={classes.provider}>
            <ProviderIcon />
            <h3>{provider}</h3>
          </div>
        </div>
        <div className={classes.actions}>
          <Button link={exploreLink}>
            <span>Explore NFT</span>
            <span className={classes.icon}>
              <ArrowRightIcon />
            </span>
          </Button>
        </div>
      </div>
    </li>
  );
}

export default NftItem;
