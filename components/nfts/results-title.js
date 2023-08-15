import Button from '../ui/button';
import classes from './results-title.module.css';

function ResultsTitle(props) {
  const { category } = props;
  const { provider } = props;

  return (
    <section className={classes.title}>
      <h1>{category} NFTs from {provider}</h1>
      <Button link='/nfts'>Show all NFTs</Button>
    </section>
  );
}

export default ResultsTitle;