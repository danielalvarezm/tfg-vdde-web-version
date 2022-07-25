/* eslint-disable @typescript-eslint/no-unused-vars */
import { instance } from "./axiosInstance";

class FecundityService {
    private fecundity: any;

    constructor() {
        this.fecundity = this.obtainData();
    }

    async obtainData() {
        const response = await instance.get("fecundidad");
        return response.data;
    }

    getFecundity() {
        return this.fecundity;
    }

    getYearsAsLabels(fecundity: any) {
        const years: any = [];
        const values = fecundity[0].values;
        for (let i = 0; i < values.length; i++) {
            years.push(values[i].interval);
        }

        return years;
    }

    getAutonomousCommunitiesAsLabels(fecundity: any) {
        return fecundity.map((item: any) => {
            return item.ccaa;
        });
    }

    filter(fecundity: any, year = "0", autonomousCommunityName: string) {
        if (autonomousCommunityName != "Todas las comunidades") {
            return this.filterByAutonomousCommunity(
                fecundity,
                autonomousCommunityName
            );
        }

        return this.filterByYear(fecundity, year);
    }

    filterByAutonomousCommunity(fecundity: any, autonomousCommunityName: string) {
        let autonomousCommunityContent: any = [];

        for (let i = 0; i < fecundity.length; i++) {
            if (autonomousCommunityName != fecundity[i].ccaa) {
                continue;
            }
            autonomousCommunityContent = fecundity[i];
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

    filterByYear(fecundity: any, year: string) {
        const finalDataset: any = [];
        const dataFiltered: any = [];

        for (let i = 0; i < fecundity.length; i++) {
            const data = fecundity[i].values.filter(
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

export { FecundityService };
