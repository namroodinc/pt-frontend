import { autorun, computed, observable } from "mobx";
import _, { assign } from "lodash";
import moment from "moment";
import parseDomain from "parse-domain";

import { currencySymbol } from "../constants/Index";

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

  @computed get getAllCountries() {
    const countries = this.publicationList
      .map(publication => {
        const {
          fields
        } = publication;
        return fields.country;
      });

    return Array.from(new Set(countries)).sort((a, b) => b - a);
  }

  @computed get getAllCirculationYears() {
    const circulations = this.publicationList
      .map((publication, i) => {
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
    const getAllRatings = this.getAllCountries
      .map(country => {
        const publicationList = this.publicationList
          .filter(publication => publication.fields.country === country)
          .map(publication => {
            const { fields, sys } = publication;
            const { avatar, name, publicationPrice, twitterAccounts } = fields;
            const { id } = sys;
            const { currency, data, timestamp } = publicationPrice[publicationPrice.length - 1];
            const assetIdIndex = this.assetsList.find(asset => asset.sys.id === avatar.sys.id);

            return data
              .map(price => assign({}, price, {
                assetUrl: assetIdIndex.fields.file.url,
                currency,
                fill: `#${twitterAccounts[0].backgroundColor}`,
                id,
                price: price.price === 0 ? 0 : price.price.toFixed(2),
                publication: name,
                symbol: currencySymbol[currency],
                timestamp
              }))
          })
          .filter(priceList => priceList.length > 0);

        const pricesArray = Array
          .from(new Set([]
            .concat
            .apply([], publicationList)))
          .sort((a, b) => b.price - a.price);

        return {
          country,
          pricesArray
        }
      });

    return getAllRatings;
  }

  @computed get getAllComplaints() {
    return this.publicationList
      .filter(publication => {
        const {
          independentPressStandardsOrganisation,
          pressComplaints
        } = publication.fields;

        return !_.isEmpty(independentPressStandardsOrganisation) || !_.isEmpty(pressComplaints)
      })
      .map((publication, i) => {
        const {
          fields,
          sys
        } = publication;

        const {
          avatar,
          name,
          independentPressStandardsOrganisation,
          pressComplaints,
          twitterAccounts,
          website
        } = fields;
        const { id } = sys;
        const assetIdIndex = this.assetsList.find(asset => asset.sys.id === avatar.sys.id);

        let allComplaints = [];
        if (!_.isEmpty(independentPressStandardsOrganisation)) {
          allComplaints.push(independentPressStandardsOrganisation.data);
        }
        if (!_.isEmpty(pressComplaints)) {
          allComplaints.push(pressComplaints.data);
        }

        const complaintsKeys = Object.keys(allComplaints[0]);
        const complaints = _.fromPairs(complaintsKeys.map(complaint => {
          const complaintTypeTotal = allComplaints
            .reduce((count, object) => count + object[complaint], 0);
          return [
            `${complaint}`,
            complaintTypeTotal
          ];
        }));

        const websiteText = parseDomain(website);
        const websiteUrl = website;

        return {
          assetUrl: assetIdIndex.fields.file.url,
          complaints,
          fill: `#${twitterAccounts[0].backgroundColor}`,
          id,
          name,
          websiteText: `${websiteText.domain}.${websiteText.tld}`,
          websiteUrl
        }
      })
      .filter(publication => publication.complaints.Total > 0)
      .sort((a, b) => b.complaints.Total - a.complaints.Total);
  }

  @computed get getBrandColor() {
  }

  @computed get getEntryComplaints() {
  }

  @computed get getEntryPrices() {
  }

  @computed get getPublicationName() {
    return this.entry.fields.name;
  }
}

let store = new Store();
export default store;

autorun(() => {
  // Uncomment below this to see how autorun in action: https://mobx.js.org/refguide/autorun.html
  // const { publicationList } = store;
  // console.log(publicationList);
});
