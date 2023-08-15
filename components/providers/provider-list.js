// this is a list of all providers
import ProviderCard from "./provider-card";
import classes from "./provider-list.module.css";

function ProviderList(props) {
  const { providers } = props;

  return (
    <ul className={classes.list}>
      {providers.map((provider) => (
        <ProviderCard
          key={provider.id}
          id={provider.id}
          name={provider.name}
          data={provider.data}
          bio={provider.bio}
          website={provider.website}
          instagram={provider.instagram}
          twitter={provider.twitter}
          image={provider.image}
        />
      ))}
    </ul>
  );
}

export default ProviderList;
