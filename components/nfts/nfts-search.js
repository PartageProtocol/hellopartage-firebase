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
            <option value="PhysicalEvent">Physical event</option>
            <option value="OnlineItem">Online item</option>
          </select>
        </div>
        <div className={classes.control}>
          <label htmlFor="provider">Provider</label>
          <select id="provider" ref={providerInputRef}>
            <option value="Tare">Tare</option>
            <option value="Stacksboard">Stacksboard</option>
          </select>
        </div>
      </div>
      <Button>Find NFTs</Button>
    </form>
  );
}

export default NftsSearch;
