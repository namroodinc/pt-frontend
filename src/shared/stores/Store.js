import { autorun, computed, observable } from "mobx";
import { assign } from "lodash";

class Store {
  @observable entry = {};
  @observable page = {};
  @observable assetsList = [];
  @observable loadingEntry = true;
  @observable loadingPage = true;
  @observable publicationList = [];
  @observable circulationYear = '2018';

  isLoadingEntry() {
    return this.loadingEntry;
  }

  isLoadingPage() {
    return this.loadingPage;
  }

  retrieveEntry() {
    return this.entry;
  }

  retrievePage() {
    return this.page;
  }

  retrieveAssetsList() {
    return this.assetsList;
  }

  retrieveCirculationYear() {
    return this.circulationYear;
  }

  @computed get retrievePublicationList() {
    return this.publicationList
      .filter(publication => publication.fields.overallRating.length > 0)
      .map((publication, i) => {
        const {
          fields,
          sys
        } = publication;

        const { avatar, name, overallRating, twitterAccounts } = fields;
        const { id, updatedAt } = sys;
        const assetIdIndex = this.assetsList.find(asset => asset.sys.id === avatar.sys.id);

        const filteredRatings = overallRating.filter(r => r.ratings.total !== null);
        let currentRating = 0;
        if (filteredRatings.length > 0) {
          currentRating = filteredRatings[filteredRatings.length - 1].ratings.total.toFixed(2);
        }
        let previousRating = 0;
        if (filteredRatings.length > 1) {
          previousRating = filteredRatings[filteredRatings.length - 2].ratings.total.toFixed(2);
        }
        const ratingDiff = (currentRating - previousRating).toFixed(2);

        return {
          assetUrl: assetIdIndex.fields.file.url,
          id,
          name,
          overallRating,
          updatedAt,
          fill: `#${twitterAccounts[0].backgroundColor}`,
          currentRating,
          previousRating,
          ratingDiff
        }
      }).sort((a, b) => {
        const aOverallRating = a.overallRating[a.overallRating.length - 1].ratings.total;
        const bOverallRating = b.overallRating[b.overallRating.length - 1].ratings.total;
        return bOverallRating - aOverallRating;
      });
  }

  // Ratings for today, or n number of days
  // Ratings for the Last 7 days

  @computed get getAllCirculationYears() {
    const circulations = this.publicationList.map((publication, i) => {
      const {
        fields
      } = publication;
      const { circulationHistroy } = fields;
      return circulationHistroy
        .map(item => item.year);
    });

    const flattenedArray = [].concat(...circulations);

    return Array.from(new Set(flattenedArray)).sort((a, b) => b - a);
  }

  @computed get getPreviousCirculationYear() {
    const currentYear = this.circulationYear;
    const findIndexYear = this.getAllCirculationYears.findIndex(year => year === currentYear);
    return this.getAllCirculationYears[findIndexYear - 1];
  }

  @computed get getNextCirculationYear() {
    const currentYear = this.circulationYear;
    const findIndexYear = this.getAllCirculationYears.findIndex(year => year === currentYear);
    return this.getAllCirculationYears[findIndexYear + 1];
  }

  @computed get checkIfYearExistsBeforeOrAfter() {
    const currentYear = this.circulationYear;
    const findIndexYear = this.getAllCirculationYears.findIndex(year => year === currentYear);
    return {
      disableFirst: findIndexYear === 0,
      disableLast: findIndexYear === this.getAllCirculationYears.length - 1
    }
  }

  @computed get getAllCirculations() {
    return this.publicationList
      .map((publication, i) => {
        const {
          fields,
          sys
        } = publication;

        const { circulationHistroy, avatar, name, twitterAccounts } = fields;
        const { id } = sys;
        const assetIdIndex = this.assetsList.find(asset => asset.sys.id === avatar.sys.id);

        const circulations = circulationHistroy
          .sort((a, b) => {
            return new Date(b.year, 0, 31) - new Date(a.year, 0, 31)
          })
          .map(item => {
            return {
              date: new Date(item.year, 0, 31),
              value: item.value
            }
          });

        return {
          assetUrl: assetIdIndex.fields.file.url,
          circulations,
          id,
          name,
          fill: `#${twitterAccounts[0].backgroundColor}`
        }
      })
      .filter(publication => publication.circulations.length > 0)
      .sort((a, b) => b.circulations[0].value - a.circulations[0].value);
  }

  @computed get getAllCirculationsForGivenYear() {
    const year = this.circulationYear;

    return this.getAllCirculations
      .map(publication => {
        const circulations = publication.circulations
          .filter(item => item.date.getFullYear().toString() === year);
        return assign({}, publication, {
          circulations
        });
      })
      .filter(publication => publication.circulations.length > 0)
      .sort((a, b) => b.circulations[0].value - a.circulations[0].value);
  }

  @computed get getLast5Circulations() {
    const initialData = this.getAllCirculations
      .splice(0, 5);

    const colorScale = initialData
      .map(publication => publication.fill);

    const data = initialData
      .map(publication => {
        const { name, circulations } = publication;
        return circulations
          .splice(0, 5)
          .map((circulation, i) => {
            const { date, value } = circulation;
            return {
              x: date,
              y: value,
              label: i === 0 ? name : ''
            }
          });
      });

    return {
      colorScale,
      data
    }
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
    return this.entry.fields.name;
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
      EUR: '€',
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
