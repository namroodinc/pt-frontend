import { autorun, computed, observable } from "mobx";

class Store {
  @observable entry = {};
  @observable assetsList = [];
  @observable loading = true;
  @observable publicationList = [];

  isLoading() {
    return this.loading;
  }

  retrieveEntry() {
    return this.entry;
  }

  retrieveAssetsList() {
    return this.assetsList;
  }

  @computed get retrievePublicationList() {
    return this.publicationList.map((publication, i) => {
      const {
        fields,
        sys
      } = publication;

      const { avatar, name, overallRating } = fields;
      const { id, updatedAt } = sys;
      const assetIdIndex = this.assetsList.find(asset => asset.sys.id === avatar.sys.id);

      return {
        assetUrl: assetIdIndex.fields.file.url,
        id,
        name,
        overallRating,
        updatedAt
      }
    }).sort((a, b) => {
      const aOverallRating = a.overallRating[a.overallRating.length - 1].ratings.total;
      const bOverallRating = b.overallRating[b.overallRating.length - 1].ratings.total;
      return bOverallRating - aOverallRating;
    });
  }

  // Ratings for today, or n number of days
  // Ratings for the Last 7 days

  // All Circulations
  @computed get getAllCirculations() {
    return this.publicationList.map((publication, i) => {
      const {
        fields,
        sys
      } = publication;

      const { circulationHistroy, name, twitterAccounts } = fields;
      const { id } = sys;

      const circulations = circulationHistroy.map(item => {
        return {
          x: new Date(item.year),
          y: item.value,
          fill: `#${twitterAccounts[0].backgroundColor}`
        }
      });

      return {
        circulations,
        id,
        name
      }
    })
      .filter(publication => publication.circulations.length > 0)
      .sort((a, b) => b.circulations.length - a.circulations.length);
  }

  // Circulations for a single entryId

  // All alexa rankings by country

  // All prices by country

  // All complaints by country (currently only UK)

  @computed get getBrandColor() {
    // const {
    //   independentPressStandardsOrganisation,
    //   pressComplaints
    // } = this.entry.fields;
    //
    // const complaints = [];
    // if (pressComplaints.data !== undefined) {
    //   complaints.push(pressComplaints.data);
    // }
    // if (independentPressStandardsOrganisation.data !== undefined) {
    //   complaints.push(independentPressStandardsOrganisation.data);
    // }
    //
    // return complaints;
  }

  @computed get getPublicationName() {
    const {
      name
    } = this.entry.fields;

    return name;
  }

  @computed get getEntryComplaints() {
    const {
      independentPressStandardsOrganisation,
      pressComplaints
    } = this.entry.fields;

    const complaints = [];
    if (pressComplaints.data !== undefined) {
      complaints.push({
        data: pressComplaints.data,
        source: 'pcc'
      });
    }
    if (independentPressStandardsOrganisation.data !== undefined) {
      complaints.push({
        data: independentPressStandardsOrganisation.data,
        source: 'ipso'
      });
    }

    return complaints;
  }

  @computed get getEntryPrices() {
    const {
      publicationPrice
    } = this.entry.fields;

    const currencySymbol = {
      AUD: '$',
      GBP: '£',
      USD: '$'
    };

    const price = publicationPrice[publicationPrice.length - 1];
    const { currency, data } = price;
    const prices = data.map(price => {
      const actualPrice = price.price === 0 ? 'Free' : `${currencySymbol[currency]}${price.price.toFixed(2)}`;
      return `${price.name}, ${actualPrice}`;
    });
    const priceLastUpdated = price.timestamp;

    return {
      prices,
      priceLastUpdated
    }
  }
}

let store = new Store();
export default store;

autorun(() => {
  // Uncomment below this to see how autorun in action: https://mobx.js.org/refguide/autorun.html
  // const { publicationList } = store;
  // console.log(publicationList);
});
