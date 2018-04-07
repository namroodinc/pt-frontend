import { autorun, computed, observable } from "mobx";
import _, { assign } from "lodash";
import color from "color";
import moment from "moment";
import parseDomain from "parse-domain";

import { currencySymbol, trendReplace } from "../constants/Index";

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
      .filter(publication => publication.fields.overallRating.length > 1)
      .map((publication, i) => {
        const {
          fields,
          sys
        } = publication;

        const { avatar, name, featured, overallRating, twitterAccounts } = fields;
        const { id, updatedAt } = sys;
        const assetIdIndex = this.assetsList.find(asset => asset.sys.id === avatar.sys.id);

        const currentRating = overallRating[0].ratings.total.toFixed(2);
        const previousRating = overallRating[1].ratings.total.toFixed(2);

        return {
          assetUrl: assetIdIndex.fields.file.url,
          currentRating,
          featured,
          fill: `#${twitterAccounts[0].backgroundColor}`,
          id,
          name,
          previousRating,
          updatedAt
        }
      }).sort((a, b) => b.currentRating - a.currentRating);
  }

  @computed get retrieveFeaturedPublications() {
    return this.retrievePublicationList
      .filter(publication => publication.featured && publication.featured !== undefined);
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
          .slice(0, 7);

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

  @computed get getTop10Ratings() {
    return this.getRatingsForLast7Days
      .filter(publication => publication.ratings.length > 1)
      .map(publication => {
        const { ratings } = publication;
        return assign({}, publication, {
          ratings: ratings.slice(0, 2)
        })
      })
      .slice(0, 10);
  }

  @computed get getTrendingTopicsPerPublication() {
    return this.publicationList
      .map((publication, i) => {
        const {
          fields,
          sys
        } = publication;

        const { articlesTags, avatar, name, twitterAccounts } = fields;
        const { id } = sys;
        const assetIdIndex = this.assetsList.find(asset => asset.sys.id === avatar.sys.id);

        const articleTrends = articlesTags
          // .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
          .map(tags => {
            const { timestamp, trends } = tags;
            let mergeTrends = [];

            const trendReplaced = trendReplace[trends.trend];
            const trendString = trendReplaced || trends.trend;
            const trendExists = mergeTrends.findIndex(trend => trend.trend === trendString);

            trends
              .map(t => {
                if (trendExists < 0) {
                  if (trendReplaced) {
                    mergeTrends.push({
                      trend: trendString,
                      count: t.count
                    });
                  } else {
                    mergeTrends.push(t);
                  }
                } else {
                  const currentCount = mergeTrends[trendExists].count;
                  mergeTrends[trendExists].count = currentCount + t.count;
                }
              });

            return {
              timestamp,
              trends: mergeTrends
            };
          });

        return {
          assetUrl: assetIdIndex.fields.file.url,
          fill: `#${twitterAccounts[0].backgroundColor}`,
          id,
          name,
          tags: articleTrends
        }
      })
      .filter(publication => publication.tags.length > 0)
      .sort((a, b) => b.name - a.name);
  }

  @computed get getTrendingTopicsNoPrej() {
    let mergeTrends = [];
    this.getTrendingTopicsPerPublication
      .map(publication => {
        const { tags } = publication;
        const trends = tags[tags.length - 1].trends;

        trends.map(t => {
          const trendReplaced = trendReplace[t.trend];
          const trendString = trendReplaced || t.trend;
          const trendExists = mergeTrends.findIndex(trend => trend.trend === trendString);

          if (trendExists < 0) {
            if (trendReplaced) {
              mergeTrends.push({
                trend: trendString,
                count: t.count
              });
            } else {
              mergeTrends.push(t);
            }
          } else {
            const currentCount = mergeTrends[trendExists].count;
            mergeTrends[trendExists].count = currentCount + t.count;
          }
        });
      });
    return mergeTrends
      .sort((a, b) => b.count - a.count);
  }

  @computed get getAllAlexaRankings() {
    return this.publicationList
      .map((publication, i) => {
        const {
          fields,
          sys
        } = publication;

        const { avatar, name, siteRankings, twitterAccounts } = fields;
        const { id } = sys;
        const assetIdIndex = this.assetsList.find(asset => asset.sys.id === avatar.sys.id);

        const rankings = siteRankings
          .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
          .map(ranking => {
            return {
              date: new Date(ranking.timestamp),
              value: ranking.data.globalRank
            }
          });

        return {
          assetUrl: assetIdIndex.fields.file.url,
          fill: `#${twitterAccounts[0].backgroundColor}`,
          id,
          name,
          rankings
        }
      })
      .filter(publication => publication.rankings.length > 0)
      .sort((a, b) => a.rankings[0].value - b.rankings[0].value);
  }

  @computed get getLast7PossibleDaysAlexa() {
    const getRankingsForLast7Days = this.getAllAlexaRankings
      .map(publication => {
        const { rankings } = publication;

        const splicedRankings = rankings
          .slice(0, 7);

        return assign({}, publication, {
          rankings: splicedRankings
        })
      });

    return Array.from(new Set([]
      .concat
      .apply([], getRankingsForLast7Days
        .map(publication => publication.rankings
          .map(ranking => moment(ranking.date).format('MMM DD YYYY'))
        )
      )))
      .sort((a, b) => new Date(b) - new Date(a));
  }

  @computed get getAlexaRankingsForLast7Days() {
    return this.getAllAlexaRankings
      .map(publication => {
        const { rankings } = publication;

        const last7Days = this.getLast7PossibleDaysAlexa
          .map(day => rankings
            .find(ranking => moment(ranking.date).format('MMM DD YYYY') === day));

        return assign({}, publication, {
          rankings: last7Days
        });
      });
  }

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

  @computed get getBrandColors() {
    const {
      twitterAccounts
    } = this.entry.fields;

    const brandColor = `#${twitterAccounts[0].backgroundColor}`;

    return {
      backgroundColor: brandColor,
      color: color(brandColor).isLight() ? '#000' : '#FFF'
    };
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
