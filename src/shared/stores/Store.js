import { autorun, computed, observable } from "mobx";
import { assign } from "lodash";
import moment from "moment";

class Store {
  @observable entry = {};
  @observable page = {};
  @observable assetsList = [];
  @observable loading = true;
  @observable publicationList = [];
  @observable circulationYear = '2018';

  isLoading() {
    return this.loading;
  }

  retrieveEntry() {
    return this.entry;
  }

  retrievePage() {
    return this.page.fields;
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
          currentRating,
          fill: `#${twitterAccounts[0].backgroundColor}`,
          id,
          name,
          overallRating,
          previousRating,
          ratingDiff,
          updatedAt
        }
      }).sort((a, b) => {
        const aOverallRating = a.overallRating[a.overallRating.length - 1].ratings.total;
        const bOverallRating = b.overallRating[b.overallRating.length - 1].ratings.total;
        return bOverallRating - aOverallRating;
      });
  }

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
          fill: `#${twitterAccounts[0].backgroundColor}`,
          id,
          name
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

  @computed get getAllRatings() {
    return this.publicationList
      .map((publication, i) => {
        const {
          fields,
          sys
        } = publication;

        const { avatar, name, overallRating, twitterAccounts } = fields;
        const { id } = sys;
        const assetIdIndex = this.assetsList.find(asset => asset.sys.id === avatar.sys.id);

        const ratings = overallRating
          .sort((a, b) => {
            return new Date(b.timestamp) - new Date(a.timestamp)
          })
          .map(item => {
            return {
              date: new Date(item.timestamp),
              value: item.ratings.total.toFixed(2)
            }
          });

        return {
          assetUrl: assetIdIndex.fields.file.url,
          fill: `#${twitterAccounts[0].backgroundColor}`,
          id,
          name,
          ratings
        }
      })
      .filter(publication => publication.ratings.length > 0)
      .sort((a, b) => b.ratings[0].value - a.ratings[0].value);
  }

  @computed get getLast7PossibleDays() {
    const getRatingsForLast7Days = this.getAllRatings
      .map(publication => {
        const { ratings } = publication;

        const splicedRatings = ratings
          .slice(0, 6);

        return assign({}, publication, {
          ratings: splicedRatings
        })
      });

    return Array.from(new Set([]
      .concat
      .apply([], getRatingsForLast7Days
        .map(publication => publication.ratings
          .map(rating => moment(rating.date).format('MMM DD YYYY'))
        )
      )))
      .sort((a, b) => new Date(b) - new Date(a));
  }

  @computed get getRatingsForLast7Days() {
    return this.getAllRatings
      .map(publication => {
        const { ratings } = publication;

        const last7Days = this.getLast7PossibleDays
          .map(day => ratings
            .find(rating => moment(rating.date).format('MMM DD YYYY') === day));

        return assign({}, publication, {
          ratings: last7Days
        })
      });
  }
  // Circulations for a single entryId

  // All alexa rankings by country

  // All prices by country
  @computed get getAllPricesByCountry() {
  }

  // All complaints by country (currently only UK)
  @computed get getAllComplaintsByCountry() {
  }

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
