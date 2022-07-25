/* eslint-disable @typescript-eslint/no-unused-vars */
import { instance } from "./axiosInstance";

class AmountOfBirthsService {
    private amountOfBirths: any;

    constructor() {
        this.amountOfBirths = this.obtainData();
    }

    async obtainData() {
        const response = await instance.get("nacimientos");
        return response.data;
    }

    getAmountOfBirths() {
        return this.amountOfBirths;
    }

    getYearsAsLabels(amountOfBirths: any) {
        const years: any = [];
        const values = amountOfBirths[0].values;
        for (let i = 0; i < values.length; i++) {
            years.push(values[i].interval);
        }

        return years;
    }

    getAutonomousCommunitiesAsLabels(amountOfBirths: any) {
        return amountOfBirths.map((item: any) => {
            return item.ccaa;
        });
    }

    filter(amountOfBirths: any, year = "0", autonomousCommunityName: string) {
        if (autonomousCommunityName != "Todas las comunidades") {
            return this.filterByAutonomousCommunity(
                amountOfBirths,
                autonomousCommunityName
            );
        }

        return this.filterByYear(amountOfBirths, year);
    }

    filterByAutonomousCommunity(amountOfBirths: any, autonomousCommunityName: string) {
        let autonomousCommunityContent: any = [];

        for (let i = 0; i < amountOfBirths.length; i++) {
            if (autonomousCommunityName != amountOfBirths[i].ccaa) {
                continue;
            }
            autonomousCommunityContent = amountOfBirths[i];
        }

        const finalDataset: any = [];
        const allValues: any = [];

        const autonomousCommunityTotalValues = autonomousCommunityContent.values;
        for (let i = 0; i < autonomousCommunityTotalValues.length; i++) {
            allValues.push(autonomousCommunityTotalValues[i].value);
        }

        finalDataset.push({
            label: "Total",
            backgroundColor: "rgba(71,102,255,1)",
            data: allValues,
        });

        return finalDataset;
    }

    filterByYear(amountOfBirths: any, year: string) {
        const finalDataset: any = [];
        const dataFiltered: any = [];

        for (let i = 0; i < amountOfBirths.length; i++) {
            const data = amountOfBirths[i].values.filter(
                (location: any) => location.interval == year
            );
            dataFiltered.push(data[0].value);
        }

        finalDataset.push({
            label: "Total",
            backgroundColor: "rgba(71,102,255,1)",
            data: dataFiltered,
        });

        return finalDataset;
    }
}

export { AmountOfBirthsService };
