// provider card to display on homepage and elsewhere
import Link from "next/link";
import Image from "next/image";

import classes from "./provider-card.module.css";

function ProviderCard(props) {
  const { id, name, data, image } = props;

  const exploreLink = `/providers/${id}`;

  return (
    <li className={classes.item}>
      <Link href={exploreLink}>
        <Image src={"/" + image} alt={name} width={250} height={160} />
        <div className={classes.content}>
          <div className={classes.summary}>
            <h2>{name}</h2>
            <div className={classes.category}>
              <h3>{data}</h3>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
}

export default ProviderCard;
