import { useRef } from "react";

import Button from "../ui/button";
import classes from "./nfts-search.module.css";

function NftsSearch(props) {
  const categoryInputRef = useRef();
  const providerInputRef = useRef();

  function submitHandler(nft) {
    nft.preventDefault();

    const selectedCategory = categoryInputRef.current.value;
    const selectedProvider = providerInputRef.current.value;

    props.onSearch(selectedCategory, selectedProvider);
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.controls}>
        <div className={classes.control}>
          <label htmlFor="category">Category</label>
          <select id="category" ref={categoryInputRef}>
            <option value="Online event">Online event</option>
            <option value="Food Delivery">Food Delivery</option>
            <option value="Digital Badge">Digital Badge</option>
            <option value="Exclusive Merch">Exclusive Merch</option>
            <option value="In-Person Meeting">In-Person Meeting</option>
            <option value="Loyalty Card">Loyalty Card</option>
            <option value="Live Performance">Live Performance</option>
            <option value="Share Holding">Share Holding</option>
            <option value="Exclusive Content">Exclusive Content</option>
            <option value="Digital License">Digital License</option>
            <option value="Physical Item">Physical Item</option>
            <option value="In-Person Event">In-Person Event</option>
          </select>
        </div>
        <div className={classes.control}>
          <label htmlFor="provider">Provider</label>
          <select id="provider" ref={providerInputRef}>
            <option value="Ask Me Anything">Ask Me Anything</option>
            <option value="Awesome DAO">Awesome DAO</option>
            <option value="Coffee Producer">Coffee Producer</option>
            <option value="Fashion Designer">Fashion Designer</option>
            <option value="Re Coach">Re Coach</option>
            <option value="Neighbor Network">Neighbor Network</option>
            <option value="The Dental Institute">The Dental Institute</option>
            <option value="Music Festival">Music Festival</option>
            <option value="Music Producer">Music Producer</option>
            <option value="Metaverse Fashion">Metaverse Fashion</option>
            <option value="Real Estate Investment">Real Estate Investment</option>
            <option value="Soosh Restaurant">Soosh Restaurant</option>
            <option value="Software Developer">Software Developer</option>
            <option value="Sports Gear">Sports Gear</option>
            <option value="Trendy Chefs">Trendy Chefs</option>
            <option value="CBD Providers">CBD Providers</option>
          </select>
        </div>
      </div>
      <Button>Find NFTs</Button>
    </form>
  );
}

export default NftsSearch;
