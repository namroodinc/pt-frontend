import React from "react";

class ShareButtons extends React.Component {
  render() {
    const hashTags = 'wwe';
    const title = 'wwe title';
    const url = 'wwe.com';
    const source = 'wwe source';
    const summary = 'wwe summary';
    const userId = 'wwe';

    return (
      <div
        className="share-buttons"
      >
        <a
          className="share-buttons__facebook"
          href={`https://www.facebook.com/sharer.php?u=${url}`}
          target="_blank"
        >
          Facebook
        </a>
        <a
          className="share-buttons__twitter"
          href={`https://twitter.com/intent/tweet?url=${url}&text=${title}&via=${userId}&hashtags=${hashTags}`}
          target="_blank"
        >
          Twitter
        </a>
        <a
          className="share-buttons__linked-in"
          href={`https://www.linkedin.com/shareArticle?mini=true&url=${url}&text=${title}&summary=${summary}&source=${source}`}
          target="_blank"
        >
          LinkedIn
        </a>
      </div>
    );
  }
}

export default ShareButtons;
