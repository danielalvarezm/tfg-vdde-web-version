/* eslint-disable @typescript-eslint/no-unused-vars */
import { instance } from "./axiosInstance";

class NatalityService {
    private natality: any;

    constructor() {
        this.natality = this.obtainData();
    }

    async obtainData() {
        const response = await instance.get("natalidad");
        return response.data;
    }

    getNatality() {
        return this.natality;
    }

    getYearsAsLabels(natality: any) {
        const years: any = [];
        const values = natality[0].values;
        for (let i = 0; i < values.length; i++) {
            years.push(values[i].interval);
        }

        return years;
    }

    getAutonomousCommunitiesAsLabels(natality: any) {
        return natality.map((item: any) => {
            return item.ccaa;
        });
    }

    filter(natality: any, year = "0", autonomousCommunityName: string) {
        if (autonomousCommunityName != "Todas las comunidades") {
            return this.filterByAutonomousCommunity(
                natality,
                autonomousCommunityName
            );
        }

        return this.filterByYear(natality, year);
    }

    filterByAutonomousCommunity(natality: any, autonomousCommunityName: string) {
        let autonomousCommunityContent: any = [];

        for (let i = 0; i < natality.length; i++) {
            if (autonomousCommunityName != natality[i].ccaa) {
                continue;
            }
            autonomousCommunityContent = natality[i];
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

    filterByYear(natality: any, year: string) {
        const finalDataset: any = [];
        const dataFiltered: any = [];

        for (let i = 0; i < natality.length; i++) {
            const data = natality[i].values.filter(
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

export { NatalityService };
