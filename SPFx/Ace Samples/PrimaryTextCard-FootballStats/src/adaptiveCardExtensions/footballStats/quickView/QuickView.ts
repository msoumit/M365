import { ISPFxAdaptiveCard, BaseAdaptiveCardView, IActionArguments } from '@microsoft/sp-adaptive-card-extension-base';
import * as strings from 'FootballStatsAdaptiveCardExtensionStrings';
import { IFootballStatsAdaptiveCardExtensionProps, IFootballStatsAdaptiveCardExtensionState, STANDINGSLISTING_VIEW_REGISTRY_ID, STANDINGS_VIEW_REGISTRY_ID } from '../FootballStatsAdaptiveCardExtension';
import { ApiService } from '../services/ApiService';

export interface IQuickViewData {
  leagues: any;
}
let _leaguesCopy: any = null;

export class QuickView extends BaseAdaptiveCardView<
  IFootballStatsAdaptiveCardExtensionProps,
  IFootballStatsAdaptiveCardExtensionState,
  IQuickViewData
> {
  public get data(): IQuickViewData {
    let leagues = require("../services/Leagues.json");
    _leaguesCopy = leagues;
    return {
      leagues: leagues
    };
  }

  public get template(): ISPFxAdaptiveCard {
    return require('./template/QuickViewTemplate.json');
  }

  public onAction = async (action: IActionArguments) => {
    try {
      if (action.type === 'Submit') {
        const { id, newIndex } = action.data;
        let _leagueTitle = _leaguesCopy != null ? _leaguesCopy.filter(({ value }) => value === action.data.league) : null;

        if (id === 'Standings') {
          let response = await ApiService.getStandingsByLeague(this.state.context, action.data.league);
          if (response.length == 0) {
            //this.quickViewNavigator.push(ERROR_VIEW_REGISTRY_ID);
            this.setState({
              standingsData: []
            });
          }
          else {
            if (action.data.label == "List") {
              this.quickViewNavigator.push(STANDINGSLISTING_VIEW_REGISTRY_ID);
            }
            else {
              this.quickViewNavigator.push(STANDINGS_VIEW_REGISTRY_ID);
            }
            this.setState({
              standingsData: response.standings[0].table,
              standingCurrentIndex: 0,
              selectedValue: (_leagueTitle != null && _leagueTitle.length > 0) ? _leagueTitle[0]["title"] : ''
            });
          }
        }
      }
    }
    catch (err) {
      console.log(err);
    }
  }
}