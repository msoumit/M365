import { ISPFxAdaptiveCard, BaseAdaptiveCardView, IActionArguments } from '@microsoft/sp-adaptive-card-extension-base';
import * as strings from 'FootballStatsAdaptiveCardExtensionStrings';
import { IFootballStatsAdaptiveCardExtensionProps, IFootballStatsAdaptiveCardExtensionState } from '../FootballStatsAdaptiveCardExtension';

export interface IStandingsViewListingData {
    teamDetails: any;
}

export class StandingsViewListing extends BaseAdaptiveCardView<
    IFootballStatsAdaptiveCardExtensionProps,
    IFootballStatsAdaptiveCardExtensionState,
    IStandingsViewListingData
> {

    public get data(): IStandingsViewListingData {
        return {
            teamDetails: {
                teamData: this.state.standingsData,
                selectedValue: this.state.selectedValue
            }
        };
    }

    public get template(): ISPFxAdaptiveCard {
        return require('./template/StandingViewListingTemplate.json');
    }

}